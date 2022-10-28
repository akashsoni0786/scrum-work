import {
    IndexTable,
    TextStyle,
    Card,
    useIndexResourceState,
    Thumbnail,
    Stack,
    Button,
    Icon,
  } from "@shopify/polaris";
  import {CirclePlusMinor} from "@shopify/polaris-icons";
  import React from "react";
  import Searchbar from "../Searchbar/Searchbar.js";
  
  function TableData() {
    const customers = [
      {
        id: "3411",
        img: "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg",
        url: "customers/341",
        name: "Mae Jemison",
        location: "Decatur, USA",
        orders: 20,
        amountSpent: "$2,400",
      },
      {
        id: "2561",
        img: "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg",
        url: "customers/256",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA",
        orders: 30,
        amountSpent: "$140",
      },
    ];
    const resourceName = {
      singular: "customer",
      plural: "customers",
    };
  
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
      useIndexResourceState(customers);
  
    const rowMarkup = customers.map(
      ({ id, img, name, location, orders, amountSpent }, index) => (
        
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
          <Icon source={CirclePlusMinor} />
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Thumbnail source={img} size="small" alt="" />
          </IndexTable.Cell>
          <IndexTable.Cell>
            <TextStyle variation="strong">{name}</TextStyle>
          </IndexTable.Cell>
          <IndexTable.Cell>{location}</IndexTable.Cell>
          <IndexTable.Cell>{orders}</IndexTable.Cell>
          <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
        </IndexTable.Row>
      )
    );
  
    return (
      <Card>
        <div style={{ margin: "10px 5px" }}>
          <Stack wrap={false}>
            <Searchbar />
            <Button>More Filters</Button>
            <Button>Sync Status</Button>
            <Button>Amazon Lookup</Button>
            <Button>Bulk Update</Button>
          </Stack>
        </div>
        <IndexTable
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "" },
            { title: "Image" },
            { title: "Name" },
            { title: "Location" },
            { title: "Order count" },
            { title: "Amount spent" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    );
  }
  export default TableData;
  