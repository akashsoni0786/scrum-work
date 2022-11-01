import "antd/dist/antd.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Radio, Space, Switch, Table } from "antd";
import React, { useCallback, useState } from "react";
import Rightbar from "../rightbar/Rightbar";
import { Badge, Icon, Stack, Tag } from "@shopify/polaris";
import Searchbar from "../searchbar/Searchbar.js";
import CssFile from "./TableData.module.css";
import { fetch_without_payload } from "../../utils/methods/Fetch.js";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  alldata,
  hideHeaders,
  removeChoices,
} from "../../store/slices/Slice.js";
import { headers } from "../../utils/api/Headers";
const ftghfg = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: "Action",
    key: "action",
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a>
          <Space>
            More actions
            <DownOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
];

const Tables = () => {
  const data = useSelector((state) => state.storeWork.gridData);
  const showHeader = useSelector((state) => state.storeWork.showHeader);
  const filterTage = useSelector((state) => state.storeWork.filteredChoice);
  const currentTab = useSelector((state) => state.storeWork.currentTab);

  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.children}</p>,
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img_url) => (
        <img className={CssFile.product_image} alt="" src={img_url} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Product Details",
      dataIndex: "product_details",
      key: "product_details",
      width: "24%",
    },
    {
      title: "Template",
      dataIndex: "template",
      key: "template",
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
    },
    {
      title: "Amazon Status",
      dataIndex: "amazon_status",
      key: "amazon_status",
      width: "20%",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Button>
          <Icon source={MobileVerticalDotsMajor} color="base" />
        </Button>
      ),
    },
  ];

  const subColumns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img_url) => (
        <img className={CssFile.product_image} alt="" src={img_url} />
      ),
    },
    {
      title: "Product Title",
      dataIndex: "product_title",
      key: "product_title",
    },
    {
      title: "Product Details",
      dataIndex: "product_details",
      key: "product_details",
      width: "24%",
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      width: "14%",
    },
    {
      title: "Amazon Status",
      dataIndex: "amazon_status",
      key: "amazon_status",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
  ];

  const hasChildren = (items) => {
    return (
      <>
        <p>
          <b>Price :</b> {items.price || "N/A"}
        </p>
        <p>
          <b>SKU</b> : {items.sku || "N/A"}
        </p>
        <p>
          <b>Barcode</b> : {items.barcode || "N/A"}
        </p>
        <p>
          <b>ASIN</b> : {items.source_product_id || "N/A"}
        </p>
      </>
    );
  };
  const forParent = (items) => {
    return (
      <>
        <p>
          <b>SKU</b> : {items.sku || "N/A"}
        </p>
        <p>
          <b>ASIN</b> : {items.source_product_id || "N/A"}
        </p>
      </>
    );
  };
  const inventoryCalculate = (item) => {
    let quantity = 0;
    item.map((subItem, subIndex) => {
      quantity = quantity + Number(`${subItem.quantity || 0}`);
    });
    return (
      quantity +
      " in Stock " +
      `${item.length === 1 ? "" : item.length + " variants"}`
    );
  };
  const fetchalldata = () => {
    setHasData(false);
    setLoading(true);
    const url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts"
    );
    fetch_without_payload("POST", url, headers).then((response) => {
      let fetchedData = [];
      console.log(response.data.rows)
      response.data.rows.map((item, index) => {
        let row = {
          key: index,
          source_product_id: item.source_product_id,
          image: item.main_image,
          title: item.title,
          template: "N/A",
          type: item.type,
          description: item.items.map((subItem, subIndex) => ({
            key: subIndex,
            img:
              subItem.main_image ||
              "https://www.useourfacilities.com/css/images/no-image-template.png",
            product_details: hasChildren(subItem),
            product_title: subItem.title,
            source_product_id: subItem.source_product_id,
            inventory: subItem.quantity || 0,
            amazon_status: item.error ?  <Badge status="critical">Error</Badge> : <Badge>{item.status || "Not Listed"}</Badge>,
          })),
          product_details:item.items.length === 1 ? 
          
          hasChildren(item.items[0]):
          
          item.items.map((subItem, subIndex) => {
            if (subItem.source_product_id === item.source_product_id) {
              return forParent(subItem);
            }
          }),
          inventory: inventoryCalculate(item.items),
          amazon_status:<Badge>{item.status || "Not Listed"}</Badge> ,
          
          // <Badge>Not Listed</Badge>,
          activity: "--",
          actions: "",
        };
        fetchedData = [...fetchedData, row];
      });
      
      dispatch(alldata(fetchedData));
      setLoading(false);
      setHasData(true);
    });
  };
  const fetchRestData = () => {
    setHasData(false);
    setLoading(true);
    var payloads;
    if (currentTab === "Not Listed") {
      payloads = {
        count: 50,
        "filter[cif_amazon_multi_inactive][1]": "Not Listed",
        productOnly: true,
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      };
    };
    if (currentTab === "Inactive") {
      payloads = {
        count: 50,
        "filter[items.status][1]": "Inactive",
        productOnly: true,
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      };
    };
    if (currentTab === "Incomplete") {
      payloads = {
        count: 50, 
        "filter[items.status][1]": "Incomplete",
        productOnly: true,
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      };
    };
    if (currentTab === "Active") {
      payloads = {
        count: 50, 
        "filter[items.status][1]": "Active",
        productOnly: true,
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      };
    };
    if (currentTab === "Error") {
      payloads = {
        count: 50, 
        "filter[cif_amazon_multi_activity][1]": "error",
        productOnly: true,
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      };
    };
    const url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts"
    );
    for (let i in payloads) {
      url.searchParams.append(i, payloads[i]);
    }
    
    fetch_without_payload("POST", url, headers).then((response) => {
      let fetchedData = [];
      
      response.data.rows.map((item, index) => {
        let row = {
          key: index,
          source_product_id: item.source_product_id,
          image: item.main_image,
          title: item.title,
          template: "N/A",
          type: item.type,
          description: item.items.map((subItem, subIndex) => ({
            key: subIndex,
            img:
              subItem.main_image ||
              "https://www.useourfacilities.com/css/images/no-image-template.png",
            product_details: hasChildren(subItem),
            product_title: subItem.title,
            source_product_id: subItem.source_product_id,
            inventory: subItem.quantity || 0,
            amazon_status: subItem.error ?  <Badge status="critical">Error</Badge> : <Badge>{subItem.status || "N/A"}</Badge>,
          })),
          product_details:item.items.length === 1 ? 
          
          hasChildren(item.items[0]):
          
          item.items.map((subItem, subIndex) => {
            if (subItem.source_product_id === item.source_product_id) {
              return forParent(subItem);
            }
          }),
          inventory: inventoryCalculate(item.items),
          amazon_status: item.status || <Badge>Not Listed</Badge>,
          activity: "--",
          actions: "",
        };
        fetchedData = [...fetchedData, row];
      });

      dispatch(alldata(fetchedData));
      setLoading(false);
      setHasData(true);
    });
  };
 
  React.useEffect(() => {
    if (currentTab === "All") fetchalldata();

    else fetchRestData();
  }, [currentTab]);

  const tableProps = {
    loading,
    expandable,
    showHeader,
    rowSelection,
  };
  const subtableProps = {
    loading,
    showHeader,
    rowSelection,
  };

  // const [filterTage, setFilterTage] = useState(filteredChoice)

  // React.useEffect(()=>{
  //   dispatch(hideHeaders(false))
  // },[filterTage])
  const removeTag = useCallback(
    (tag) => () => {
      // alert(tag)
      // filterTage.filter((previousTag) => previousTag !== tag);
      dispatch(removeChoices(""));
      dispatch(hideHeaders(true));
    },
    []
  );

  const tagMarkup = filterTage.map((option) => {
    dispatch(hideHeaders(false));
    return (
      <Tag key={option} onRemove={removeTag(option)}>
        {option}
      </Tag>
    );
  });

  return (
    <>
      <Rightbar onClose={onClose} open={open} />
      <div style={{ margin: "10px 5px" }}>
        <Stack wrap={false}>
          <Searchbar />
          <Button onClick={showDrawer}>More Filters</Button>
          <Button>Sync Status</Button>
          <Button>Amazon Lookup</Button>
          <Button>Bulk Update</Button>
        </Stack>
      </div>
      <Stack spacing="tight">{tagMarkup}</Stack>
      <Table
        {...tableProps}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              {...subtableProps}
              pagination={false}
              columns={subColumns}
              dataSource={record.description}
            />
          ),
          rowExpandable: (record) => record.type !== "simple",
        }}
        dataSource={hasData ? data : []}
      />
    </>
  );
};
export default Tables;
