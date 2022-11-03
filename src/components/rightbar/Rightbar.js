import { TextField, Card, Filters, Select } from "@shopify/polaris";
import { useState, useCallback } from "react";

export function Rightbar() {
  const [selected, setSelected] = useState(Array(8).fill(""));
  const [queryValue, setQueryValue] = useState(null);

  const handleTaggedWithChange = useCallback((value, index) => {
    let tempSelected = [...selected];
    tempSelected[index] = value;
    setSelected(tempSelected);
  }, []);

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
  const filters = [
    {
      key: "inventory",
      label: "Inventory",
      filter: (
        <>
          <Select placeholder="Equals"></Select>
          <br />
          <TextField
            label="Tagged with"
            value={selected[0]}
            onChange={(e) => handleTaggedWithChange(e, 0)}
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
          <Select placeholder="Contains"></Select>
          <br />
          <TextField
            label="Tagged with"
            value={selected[1]}
            onChange={(e) => handleTaggedWithChange(e, 1)}
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
export default Rightbar