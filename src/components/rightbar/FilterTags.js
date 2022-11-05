export const FilterTags=(selectedFilters)=>{
    // {
    //     sku: {seelctedValue: 12, inputValue: 1}
    // }
    const tagsProperty ={
        inventory : "filter[items.quantity]",
        sku : "filter[items.sku]",
        tags : "filter[tags]",
        productType : "filter[product_type]",
        vendor : "filter[brand]",
        templateName :"filter[profile.profile_name]",
        productStatus :"filter[items.status]",
        variantAttributes : "filter[variant_attributes]",
        activity : "filter[cif_amazon_multi_activity]",
        type : "filter[type]"
    }
    const result ={};

    for(let key in selectedFilters){
        console.log("first...",selectedFilters)
        if(Object.hasOwnProperty.call(tagsProperty, key))
        {
            if(selectedFilters[key].value){
                result[`${tagsProperty[key]}[${selectedFilters?.[key]?.selectedValue}]`] = selectedFilters[key]["value"];
            }
        }
    }
console.log("result",result)
    return result;
}