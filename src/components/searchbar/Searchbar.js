import { Autocomplete, Icon, Spinner } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { changeTab, choices, searchedList, setSearchMode } from "../../store/slices/Slice";
import { fetch_without_payload } from "../../utils/methods/Fetch";
import { headers } from "../../utils/api/Headers";
import CssFile from "./Searchbar.module.css";
function Searchbar() {
  const dispatch = useDispatch();
  const [deselectedOptions, setDeselectedOptions] = useState([]);
  const ref = useRef();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const [options, setOptions] = useState([]);
  React.useEffect(() => {
    dispatch(choices(selectedOptions));
    dispatch(setSearchMode("On"))
  }, [selectedOptions]);
  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }
      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter(
        (option) => option.label.match(filterRegex)
        //  ||
        // option.brand.match(filterRegex) ||
        // option.product_type.match(filterRegex) ||
        // "No Result Found"
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );
  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.value;
        // && matchedOption.brand
        // && matchedOption.brand;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0]);
    },
    [options]
  );
  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search with Title,Vendor and Product Type"
    />
  );
  React.useEffect(() => {
    const choiceList = () => {
      if (inputValue === "") {
        let actionPayload = {
          query: "",
          containerId: "",
        };
        dispatch(searchedList(actionPayload));
        dispatch(setSearchMode("Off"))
      } else {
        setShowLoading(true);
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {

        let payload = {
          query: inputValue,
          target_marketplace:
            "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        };
        const url = new URL(
          "https://multi-account.sellernext.com/home/public/connector/product/getSearchSuggestions"
        );
        for (let i in payload) {
          url.searchParams.append(i, payload[i]);
        }
        let fetchedList = [];
        fetch_without_payload("POST", url, headers).then((response) => {
          response.data.map((item, index) => {
            if (
              item.product_type.toLowerCase().includes(inputValue) ||
              item.title.toLowerCase().includes(inputValue) ||
              item.brand.toLowerCase().includes(inputValue)
            ) {
              item.items.map((subitem, subindex) => {
                fetchedList.push({
                  containerId: item.container_id,
                  value: subitem.title,
                  label: (
                    <div className={CssFile.labelDiv}>
                      <img src={subitem.main_image} alt="" />
                      <div className={CssFile.details}>
                        <h1>{subitem.title}</h1>
                        <p>{item.brand}</p>
                      </div>
                    </div>
                  ),
                });
              });
            }
          });
          setOptions(fetchedList);
          setShowLoading(false);
          if (fetchedList === []) {
            setOptions([{ value: "", label: "Result not found" }]);
          }
        });

        }, 500);
      }
    };

    choiceList();
  }, [inputValue]);

  React.useEffect(() => {
    if (selectedOptions !== "") {
      options.map((item) => {
        if (item.value === selectedOptions[0]) {
          
          let actionPayload = {
            query: inputValue,
            containerId: item.containerId,
          };
          dispatch(searchedList(actionPayload));
          // dispatch(changeTab("Search"));
        }
      });
    }
  }, [selectedOptions]);

  return (
    <div style={{ height: "10px" }}>
      <Autocomplete
        loading={showLoading}
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}
export default Searchbar;
