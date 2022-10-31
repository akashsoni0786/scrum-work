import "antd/dist/antd.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Radio, Space, Switch, Table } from "antd";
import React, { useCallback, useState } from "react";
import Rightbar from "../rightbar/Rightbar";
import { Stack, Tag } from "@shopify/polaris";
import Searchbar from "../searchbar/Searchbar.js";
import CssFile from "./TableData.module.css";
import { fetch_without_payload } from "../../utils/methods/Fetch.js";
import { useDispatch, useSelector } from "react-redux";
import { alldata, hideHeaders, removeChoices } from "../../store/slices/Slice.js";
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
  const filterTage = useSelector(state=> state.storeWork.filteredChoice)

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
      // width: "12%",
    },
    {
      title: "Product Details",
      dataIndex: "product_details",
      // width: "30%",
      key: "product_details",
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
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      // width: "12%",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      // width: "30%",
      key: "barcode",
    },
    {
      title: "ASIN",
      dataIndex: "asin",
      key: "asin",
    },
    {
      title: "Product Title",
      dataIndex: "product_title",
      key: "product_title",
    },
    
  ];

  React.useEffect(() => {
    const fetchalldata = () => {
      setHasData(false)
      setLoading(true)
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
        let fetchedData = [];
        response.data.rows.map((item, index) => {
          let row = {
            key: index,
            image: item.main_image,
            title: item.title,
            product_details: "",
            template: "",
            inventory: "",
            amazon_status: "",
            activity: "",
            actions: "",
            description: [
              item.items.map((subItem, subIndex) => ({
                key: subIndex,
                img:"https://www.useourfacilities.com/css/images/no-image-template.png",
                  // subItem.image === "" ? (
                  //   <img
                  //     className={CssFile.product_image}
                  //     alt=""
                  //     src={subItem.image}
                  //   />
                  // ) : (
                  //   <img
                  //     className={CssFile.product_image}
                  //     alt=""
                  //     src="https://www.useourfacilities.com/css/images/no-image-template.png"
                  //   />
                  // ),
                price: subItem.price,
                sku: subItem.sku,
                barcode: subItem.barcode,
                asin: subItem.source_product_id,
                product_title: subItem.title,
              })),
            ],
          };
          fetchedData.push(row);
        });
        console.log("fetchedData",fetchedData)
        dispatch(alldata(fetchedData));
        setLoading(false)
        setHasData(true)
      });
    };
    fetchalldata();
  }, []);

  const tableProps = {
    loading,
    expandable,
    showHeader,
    rowSelection,
  };
  // const [filterTage, setFilterTage] = useState(filteredChoice)

  // React.useEffect(()=>{
  //   dispatch(hideHeaders(false))
  // },[filterTage])
  const removeTag = 
  useCallback(
    (tag) => () => {
      // alert(tag)
      // filterTage.filter((previousTag) => previousTag !== tag);
      dispatch(removeChoices(''));
      dispatch(hideHeaders(true));
    }
    ,[]
  );

  const tagMarkup = filterTage.map((option) => 

    {
      dispatch(hideHeaders(false))
      return <Tag key={option} onRemove={removeTag(option)}>
      {option}
    </Tag>}
  );
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
        expandable={
          {
            expandedRowRender:(record)=>
              (<Table columns={subColumns} dataSource={record.description}/>),
          }
        }
        dataSource={hasData ? data : []}
      />
    </>
  );
};
export default Tables;
