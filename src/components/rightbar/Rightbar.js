import { TextField, Card, Filters, Select } from "@shopify/polaris";
import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storedFilter } from "../../store/slices/Slice";

export function Rightbar() {
  const [selected, setSelected] = useState(Array(8).fill(""));
  const [queryValue, setQueryValue] = useState(null);
  const dispatch = useDispatch();
  const ref = useRef();
  // const resultFltrInventory = useSelector((state)=> state.storeWork.inventoryFilter)

  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleTaggedWithRemove = useCallback(() => setSelected(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const handleTaggedWithChange = useCallback((value, index) => {
    let tempSelected = [...selected];
    tempSelected[index] = value;
    setSelected(tempSelected);
  }, []);

  const [selectedInventory, setSelectedInventory] = useState(0);
  const [valueInventory, setValueInventory] = useState("");

  const [selectedSKU, setSelectedSKU] = useState(0);
  const [valueSKU, setValueSKU] = useState("");

  const handleInventoryNumber = useCallback((value, index) => {
    setValueInventory(value);
  }, []);

  const handleSelectInventory = useCallback(
    (value) => setSelectedInventory(value),
    []
  );
  const handleSelectSku = useCallback(
    (value) => setSelectedSKU(value),
    []
  );

  const handleSKUNumber = useCallback((value, index) => {
    setValueSKU(value);
  }, []);
  
  const inventoryOptions = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Greater than or Equal to", value: "3" },
    { label: "Less than or Equal to", value: "4" },
  ];

  const skuOptions = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Does not contains", value: "4" },
    { label: "Starts with", value: "5" },
    { label: "Ends with", value: "6" },
  ];

  React.useEffect(() => {
    clearTimeout(ref.current);

    ref.current = setTimeout(() => {

      let filterInventoryObj = {
        inventory: { value: valueInventory, option: selectedInventory },
      };

      dispatch(storedFilter(filterInventoryObj));
    }, 1000);
  }, [valueInventory, selectedInventory]);

  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {

      let filterObj = {
        sku: { value: valueSKU, option: selectedSKU },
      };

      dispatch(storedFilter(filterObj));
    }, 1000);
  }, [valueSKU, selectedSKU]);

  const filters = [
    {
      key: "inventory",
      label: "Inventory",
      filter: (
        <>
          <Select
            label="Date range"
            options={inventoryOptions}
            onChange={handleSelectInventory}
            value={selected}
          />
          <br />
          <TextField
            label="Tagged with"
            value={valueInventory}
            onChange={(e) => handleInventoryNumber(e, 0)}
            autoComplete="off"
            labelHidden
            type="number"
          />
        </>
      ),
      shortcut: true,
    },
    {
      key: "sku",
      label: "SKU",
      filter: (
        <>
          <Select placeholder="Contains"
          options={skuOptions}
          onChange={handleSelectSku}
          value={selected}
          />
          <br />
          <TextField
            label="Tagged with"
            value={valueSKU}
            onChange={(e) => handleSKUNumber(e, 1)}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
      shortcut: true,
    },
    {
      key: "tags",
      label: "Tags",
      filter: (
        <TextField
          label="Tagged with"
          value={selected[2]}
          onChange={(e) => handleTaggedWithChange(e, 2)}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "productType",
      label: "Product Type",
      filter: (
        <TextField
          label="Tagged with"
          value={selected[3]}
          onChange={(e) => handleTaggedWithChange(e, 3)}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "vendor",
      label: "Vendor",
      filter: (
        <>
          <Select></Select>
          <TextField
            label="Tagged with"
            value={selected[4]}
            onChange={() => handleTaggedWithChange(4)}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
      shortcut: true,
    },
    {
      key: "templateName",
      label: "Template Name",
      filter: (
        <>
          <Select></Select>
        </>
      ),
      shortcut: true,
    },
    {
      key: "productStatus",
      label: "Product Status",
      filter: (
        <>
          <Select></Select>
        </>
      ),
      shortcut: true,
    },
    {
      key: "variantAttribute",
      label: "Variant Attribute",
      filter: (
        <>
          <Select></Select>
        </>
      ),
      shortcut: true,
    },
    {
      key: "activity",
      label: "Activity",
      filter: (
        <>
          <Select></Select>
        </>
      ),
      shortcut: true,
    },
    {
      key: "type",
      label: "Type",
      filter: (
        <>
          <Select></Select>
        </>
      ),
      shortcut: true,
    },
  ];
  const appliedFilters = [];

  if (selected[0] !== "") {
    const key = "inventory";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, selected[0]),
      onRemove: handleTaggedWithRemove,
    });
  }
  if (!isEmpty(selected[1])) {
    const key = "sku";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, selected[1]),
      onRemove: handleTaggedWithRemove,
    });
  }

  return (
    <div style={{}}>
      <Card>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={handleQueryValueRemove}
          onClearAll={handleFiltersClearAll}
          hideQueryField
          labelHidden
          hideTags
        />
      </Card>
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "inventory":
        return `Inventory is ${selected[0]}`;
      case "sku":
        return `SKU is ${selected[1]}`;
      case "accountStatus":
        return value.map((val) => `Customer ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}
export default Rightbar;
