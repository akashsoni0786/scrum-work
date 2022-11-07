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

  const [selectedInventory, setSelectedInventory] = useState("");
  const [valueInventory, setValueInventory] = useState("");

  const [selectedSKU, setSelectedSKU] = useState("");
  const [valueSKU, setValueSKU] = useState("");

  const [valueTags, setValueTags] = useState("");

  const [valueProductType, setValueProductType] = useState("");

  const [valueVendor, setValueVendor] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");

  const [selectedProductStatus, setSelectedProductStatus] = useState("");

  const handleSelectProductStatus = useCallback(
    (value) => setSelectedProductStatus(value),
    []
  );

  const [selectedVariantAttributes, setSelectedVariantAttributes] = useState("");

  const handleSelectVariantAttributes = useCallback(
    (value) => setSelectedVariantAttributes(value),
    []
  );

  const [selectedActivity, setSelectedActivity] = useState("");

  const handleSelectActivity = useCallback(
    (value) => setSelectedActivity(value),
    []
  );

  const [selectedType, setSelectedType] = useState("");

  const handleSelectType = useCallback(
    (value) => setSelectedType(value),
    []
  );

  const handleInventoryNumber = useCallback((value, index) => {
    setValueInventory(value);
  }, []);

  const handleSelectInventory = useCallback(
    (value) => setSelectedInventory(value),
    []
  );
  const handleSelectSku = useCallback((value) => setSelectedSKU(value), []);

  const handleSKUNumber = useCallback((value, index) => {
    setValueSKU(value);
  }, []);

  const handleValueTags = useCallback((value) => {
    console.log("handleValueTags",value)
    setValueTags(value)}, []);
  const handleValueProductType = useCallback(
    (value) => setValueProductType(value),
    []
  );

  const handleVendorValue = useCallback((value, index) => {
    setValueVendor(value);
  }, []);
  const handleSelectVendor = useCallback(
    (value) => setSelectedVendor(value),
    []
  );


  const inventoryOptions = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Greater than or Equal to", value: "8" },
    { label: "Less than or Equal to", value: "9" },
  ];

  const skuOptions = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Does not contains", value: "4" },
    { label: "Starts with", value: "5" },
    { label: "Ends with", value: "6" },
  ];

  const vendorOptions = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
  ];

  const productStatusOptions = [
    { label: "Active", value: "Active" },
    { label: "Not Listed", value: "Not Listed" },
    { label: "Inactive", value: "Inactive" },
    { label: "Incomplete", value: "Incomplete" },
    { label: "Not Listed:Offer", value: "Not Listed:Offer" },
  ];

  const variantAttributeOptions = [
    { label: "Title", value: "Title" },
    { label: "Size", value: "Size" },
    { label: "Color, Size", value: "Color, Size" },
    { label: "Size, Color", value: "Size, Color" },
    { label: "Title, Color", value: "Title, Color" },
    { label: "Size, Material", value: "Size, Material" },
    { label: "Color", value: "Color" },
    { label: "Size, Scent", value: "Size, Scent" },
    { label: "Title, Scent", value: "Title, Scent" },
    { label: "Size, Title", value: "Size, Title"},
  ];

  const activityOptions = [
    { label: "In progress", value: "1" },
    { label: "Error", value: "2" },
  ];

  const typeOptions = [
    { label: "Simple", value: "Simple" },
    { label: "Variation", value: "Variation" },
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

  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      let filterObj = {
        tags: { value: valueTags },
      };

      dispatch(storedFilter(filterObj));
    }, 1000);
  }, [valueTags]);

  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      let filterObj = {
        productType: { value: valueProductType },
      };

      dispatch(storedFilter(filterObj));
    }, 1000);
  }, [valueProductType]);

  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      let filterObj = {
        vendor: { value: valueVendor, option: selectedVendor },
      };
      dispatch(storedFilter(filterObj));
    }, 1000);
  }, [valueVendor, selectedVendor]);

  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      let filterObj = {
        productStatus: { option: selectedProductStatus },
      };
      dispatch(storedFilter(filterObj));
    }, 1000);
  }, [selectedProductStatus]);

  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      let filterObj = {
        variantAttributes: { option: selectedVariantAttributes },
      };
      dispatch(storedFilter(filterObj));
    }, 1000);
  }, [selectedVariantAttributes]);

  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      let filterObj = {
        activity: { option: selectedActivity },
      };
      dispatch(storedFilter(filterObj));
    }, 1000);
  }, [selectedActivity]);

  React.useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      let filterObj = {
        type: { option: selectedType },
      };
      dispatch(storedFilter(filterObj));
    }, 1000);
  }, [selectedType]);

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
            value={selectedInventory}
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
          <Select
            placeholder="Contains"
            options={skuOptions}
            onChange={handleSelectSku}
            value={selectedSKU}
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
          value={valueTags}
          onChange={(e) => handleValueTags(e)}
          autoComplete="off"
          labelHidden
          hideTags={false}
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
          value={valueProductType}
          onChange={(e) => handleValueProductType(e)}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    // {
    //   key: "vendor",
    //   label: "Vendor",
    //   filter: (
    //     <>
    //       <Select
    //         placeholder="Select here...."
    //         options={vendorOptions}
    //         onChange={handleSelectVendor}
    //         value={selectedVendor}
    //       ></Select>
    //       <TextField
    //         label="Tagged with"
    //         value={valueVendor}
    //         onChange={(e) => handleVendorValue(e)}
    //         autoComplete="off"
    //         labelHidden
    //       />
    //     </>
    //   ),
    //   shortcut: true,
    // },
    {
      key: "templateName",
      label: "Template Name",
      filter: (
        <>
          <Select placeholder="No template found"></Select>
        </>
      ),
      shortcut: true,
    },
    {
      key: "productStatus",
      label: "Product Status",
      filter: (
        <>
          <Select
            placeholder="Select here...."
            options={productStatusOptions}
            onChange={handleSelectProductStatus}
            value={selectedProductStatus}
          ></Select>
        </>
      ),
      shortcut: true,
    },
    {
      key: "variantAttribute",
      label: "Variant Attribute",
      filter: (
        <>
          <Select
            placeholder="Select here...."
            options={variantAttributeOptions}
            onChange={handleSelectVariantAttributes}
            value={selectedVariantAttributes}
          ></Select>
        </>
      ),
      shortcut: true,
    },
    {
      key: "activity",
      label: "Activity",
      filter: (
        <>
          <Select
            placeholder="Select here...."
            options={activityOptions}
            onChange={handleSelectActivity}
            value={selectedActivity}
          ></Select>
        </>
      ),
      shortcut: true,
    },
    {
      key: "type",
      label: "Type",
      filter: (
        <>
          <Select
            placeholder="Select here...."
            options={typeOptions}
            onChange={handleSelectType}
            value={selectedType}
          ></Select>
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
          // hideTags
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
