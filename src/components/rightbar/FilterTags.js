export const FilterTags = (selectedFilters, url) => {
  const tagsProperty = {
    inventory: "filter[items.quantity]",
    sku: "filter[items.sku]",
    tags: "filter[tags]",
    productType: "filter[product_type]",
    vendor: "filter[brand]",
    templateName: "filter[profile.profile_name]",
    productStatus: "filter[items.status]",
    variantAttributes: "filter[variant_attributes]",
    activity: "filter[cif_amazon_multi_activity]",
    type: "filter[type]",
  };


    
    for (let key in selectedFilters) {
        if (tagsProperty.hasOwnProperty(key)) {
          if (selectedFilters[key].value) {
            url =
              url +
              "&" +
              tagsProperty[key] +
              "[" +
              [selectedFilters?.[key]?.option] +
              "]=" +
              selectedFilters[key]["value"];
          }
          else{
            url =
              url +
              "&" +
              tagsProperty[key] +"="+
              selectedFilters[key]["value"];
          }
        }
      }
  

//    url =url + "&productOnly=true&target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9";
    console.log(url)
  return url;
};
