import { Autocomplete, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { changeTab, choices, searchedList } from "../../store/slices/Slice";
import { fetch_without_payload } from "../../utils/methods/Fetch";
import { headers } from "../../utils/api/Headers";

function Searchbar() {
  const dispatch = useDispatch();
  const [deselectedOptions, setDeselectedOptions] = useState([
    // { value: "Loading...", label: "Loading..." },
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  React.useEffect(() => {
    dispatch(choices(selectedOptions));
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
        (option) =>
          option.label.match(filterRegex) ||
          option.brand.match(filterRegex) ||
          option.product_type.match(filterRegex) ||
          "No Result Found"
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
        return matchedOption && matchedOption.label && matchedOption.brand;
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
      }
      let payload = {
        query: inputValue,
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
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
            item.title.toLowerCase().includes(inputValue) ||
            item.brand.toLowerCase().includes(inputValue) ||
            item.product_type.toLowerCase().includes(inputValue)
          ) {
            item.items.map((subitem, subindex) => {
              fetchedList.push({
                value: subitem.title,
                label: subitem.title,
                image: subitem.main_image,
                containerId: item.container_id,
                product_type: item.product_type,
                brand: item.brand,
              });
            });
          }
        });
        setDeselectedOptions(fetchedList);
      });
    };
    choiceList();
  }, [inputValue]);

  React.useEffect(() => {
    if (selectedOptions !== "") {
      deselectedOptions.map((item) => {
        if (item.label === selectedOptions[0]) {
          let actionPayload = {
            query: inputValue,
            containerId: item.containerId,
          };
          console.log("actionPayload", actionPayload);
          dispatch(searchedList(actionPayload));
          dispatch(changeTab("Search"));
        }
      });
    }
  }, [selectedOptions]);

  return (
    <div style={{ height: "10px" }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}
export default Searchbar;
