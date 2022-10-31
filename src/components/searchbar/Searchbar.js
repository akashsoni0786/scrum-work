import { Autocomplete, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { choices } from "../../store/slices/Slice";
import { fetch_without_payload } from "../../utils/methods/Fetch";

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
    // console.log("selectedOptions",selectedOptions)
  }, [selectedOptions]);


  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection =
  useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0]);
    },[options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      //   label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search with title..."
    />
  );

  React.useEffect(() => {
    const choiceList = () => {
      const headers = {
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 530,
        "Ced-Target-Name": "amazon",
        appCode:
          "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ== appTag: amazon_sales_channel",

        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY3MjI1NTMwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWY5ZjdhMGI5YjIwMTVlNTQ0MjM2NyJ9.Tbaa3G1Jv8r7xAg6Y16fK2FTTso8j-NuI5IcMn9FJ8W4bd_k4uiNqJVMC__NC1OWn8ldrcmzJGwffop5rNQLRIdObWbIzr2TBxmDwtJKRSMh-4-amDO6wJQiJSe1rl6CIyZXMcZnAB3rPf9vka4JWhFfNntLgZlGfoLWYCnOsww_xygFyvxXKNrBEZic3XHBn3fnrlDahyrPwp0M3VQaE2lNJDZgSERvdkbLkL-Kkj9St7GT9nc01k8TcVGiKmy84a9MJd6VmeZqNXaamG-Fm-_ju1tvZfwO3O3Bln8BaCDvgpgqbYlLEEUBROJbccYFl46-z_GqIBVgKbdaCrl3KQ",
      };
      const url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts"
      );
      fetch_without_payload("GET", url, headers).then((response) => {
        let fetchedList = [];
        response.data.rows.map((item, index) => {
          fetchedList.push({ value: item.title, label: item.title });
        });
        // console.log("fetchedList", fetchedList);
        setDeselectedOptions(fetchedList);
      });
    };
    choiceList();
  }, []);

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
