import "antd/dist/antd.min.css";
import { DownOutlined } from "@ant-design/icons";
import { Form, Image, Radio, Space, Switch, Table } from "antd";
import React, { useCallback, useState } from "react";
import Rightbar from "../rightbar/Rightbar";
import {
  Badge,
  Icon,
  Stack,
  Tag,
  Modal,
  TextContainer,
  Toast,
  Popover,
  ActionList,
  DropZone,
  Thumbnail,
  Caption,
  Text,
  RadioButton,
  Checkbox,
  Banner,
  Spinner,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import Searchbar from "../searchbar/Searchbar.js";
import CssFile from "./TableData.module.css";
import {
  fetch_fileUpload,
  fetch_without_payload,
  fetch_with_payload,
} from "../../utils/methods/Fetch.js";

import {
  ClockMinor,
  NoteMinor,
  ArrowLeftMinor,
  ArrowRightMinor,
} from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  alldata,
  changeTab,
  hideHeaders,
  removeChoices,
} from "../../store/slices/Slice.js";
import { headers, postHeaders } from "../../utils/api/Headers";
import ActionListInPopover from "../tablePopover/TablePopover";
import { FilterTags } from "../rightbar/FilterTags";
import ErrorModals from "../common/modals/Modals";
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
  const searchContent = useSelector((state) => state.storeWork.searchContent);
  const resultFltrInventoryvalue = useSelector(
    (state) => state.storeWork.inventoryFilter.value
  );
  const resultFilter = useSelector((state) => state.storeWork.moreFilter);
  const searchContainerId = useSelector(
    (state) => state.storeWork.searchContainerId
  );

  const searchModeVisibility = useSelector(
    (state) => state.storeWork.searchMode
  );
  const [badgeStatus, setBadgestatus] = useState({
    Error: "critical",
    Inactive: "critical",
    Incomplete: "warning",
    "Not Listed": "new",
  });
  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.children}</p>,
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [active, setActive] = useState(false);
  const [activeSync, setActiveSync] = useState(false);
  const [amazonLookupResponse, setAmazonLookupResponse] = useState("");
  const [amazonLookupToast, setAmazonLookupToast] = useState(false);
  const [amazonSyncResponse, setAmazonSyncResponse] = useState("");
  const [importFileResponse, setImportFileResponse] = useState("");
  const [importFileResponseValue, setImportFileResponseValue] = useState("");

  const [amazonSyncToast, setAmazonSyncToast] = useState(false);
  const [activeBulkUpdate, setActiveBulkUpdate] = useState(false);
  const [selectedImage, setSelectedImage] = useState(true);
  const [loadLookup, setLoadLookup] = useState(false);
  const [loadSync, setLoadSync] = useState(false);
  const [csvFileName, setCsvFileName] = useState("Loadng....");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [files, setFiles] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPages, setNextPages] = useState("");
  const [previousPages, setPreviousPages] = useState("");
  const [inProgressActivity, setinProgressActivity] = useState([]);
  const [activityModal, setActivityModal] = useState(false);
  const [showProductError, setShowProductError] = useState("");
  const handleActivityClose = useCallback(
    () => setActivityModal(!activityModal),
    [activityModal]
  );
  const handleActivityProceed = () => {
    fetchalldata();
    fetchRestData();
    setActivityModal(false);
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img_url) => (
        <Image
          width={100}
          height={100}
          src={img_url}
          placeholder={<Image preview={false} src={img_url} width={700} />}
        />
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
      with: "5%",
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
      width: "25%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => <ActionListInPopover />,
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
  const colorStatus = (status) => {
    if (status === "Inactive") {
      return "success";
    }
    if (status === "Incomplete") {
      return "warnng";
    }
    if (status === "Not Listed") {
      return "surface";
    }
    if (status === "Active") {
      return "interactive";
    }
    if (status === "Error") {
      return "critical";
    }
  };
  const inProgress = (param) => {
    console.log(param.process_tags);
    setinProgressActivity(param.process_tags);
    setActivityModal(true);
  };
  const [errorModal, setErrorModal] = useState(false);
  const handleErrorClose = useCallback(() => setErrorModal(!errorModal), [errorModal]);
  const viewErrorModal = (data) => {
    console.log(data);
    setErrorModal(true);
  };
  const fetchalldata = () => {
    setLoading(true);
    setHasData(false);
    let payloads = {
      count: 50,
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    let url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts"
    );

    for (let key in resultFilter) {
      if (resultFilter.hasOwnProperty(key)) {
        if (key === "inventory" && resultFilter[key].value !== "") {
          payloads[`filter[items.quantity][${resultFilter[key].option}]`] =
            resultFilter[key].value;
        }
        if (key === "sku" && resultFilter[key].value !== "") {
          payloads[`filter[items.sku][${resultFilter[key].option}]`] =
            resultFilter[key].value;
        }
        if (key === "tags" && resultFilter[key].value !== "") {
          payloads[`filter[tags][3]`] = resultFilter[key].value;
        }
        if (key === "vendor" && resultFilter[key].value !== "") {
          payloads[`filter[brand][${resultFilter[key].option}]`] =
            resultFilter[key].value;
        }
        if (key === "productStatus" && resultFilter[key].option !== "") {
          payloads[`filter[items.status][1]`] = resultFilter[key].option;
        }
        if (key === "variantAttributes" && resultFilter[key].value !== "") {
          payloads[`filter[variant_attributes][1]`] = resultFilter[key].option;
        }
        if (key === "activity" && resultFilter[key].value !== "") {
          payloads[`filter[cif_amazon_multi_activity][1]`] =
            resultFilter[key].option;
        }
        if (key === "type" && resultFilter[key].option !== "") {
          payloads[`filter[type][1]`] = resultFilter[key].option;
        }
      }
    }

    if (searchModeVisibility === "On" && searchContainerId !== "") {
      payloads["filter[container_id][1]"] = searchContainerId;
      payloads["productOnly"] = true;
    }
    
    if (nextPages !== "") {
      payloads["next"] = nextPages;
    }
    if (previousPages !== "") {
      payloads["prev"] = previousPages;
    }
    const pageCountUrl = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProductCount"
    );
    for (let i in payloads) {
      url.searchParams.append(i, payloads[i]);
    }
    fetch_without_payload("GET", pageCountUrl, headers).then((response) => {
      setTotalPages(Math.ceil(Number(response.data.count) / 50));
    });
    fetch_without_payload("GET", url, headers).then((response) => {
      let fetchedData = [];
      if (response.data.prev !== null) setPreviousPages(response.data.prev);
      if (response.data.next !== null) setNextPages(response.data.next);

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
            amazon_status: Object.keys(subItem).includes("error") ? (
              <Badge status="critical">Error</Badge>
            ) : subItem.status ? (
              <Badge status="new">{subItem.status}</Badge>
            ) : (
              <Badge status="surface">Not Listed</Badge>
            ),
          })),
          product_details:
            item.items.length === 1
              ? hasChildren(item.items[0])
              : item.items.map((subItem, subIndex) => {
                  if (subItem.source_product_id === item.source_product_id) {
                    return forParent(subItem);
                  }
                }),
          inventory: inventoryCalculate(item.items),
          amazon_status:
            amazonStatus(item)[0] === "error" ? (
              <>
                <Badge status="critical">Error</Badge>
                <br />
                {/* <a
                  onClick={() => {
                    setShowProductError(amazonStatus(item)[1]);
                  }}
                  href
                > */}
                  <a onClick={()=>viewErrorModal(item[0])} href>view Error</a>
                  {/* <a onClick={()=>{showProductErrorFunc(amazonStatus(item)[1])}} href> */}
                  {/* view error
                </a> */}
              </>
            ) : (
              <Badge status="new">{amazonStatus(item)}</Badge>
            ),
          activity:
            Object.keys(item).includes("process_tags") ||
            Object.keys(item.items[0]).includes("process_tags") ? (
              <Button
                plain
                monochrome
                onClick={() => inProgress(item.items[0] || item.process_tags)}
              >
                <Icon source={ClockMinor} />
                In progress
              </Button>
            ) : (
              "--"
            ),
          actions: "",
        };
        fetchedData = [...fetchedData, row];
      });
      dispatch(alldata(fetchedData));
      setLoading(false);
      setHasData(true);
    });
  };
  const amazonStatus = (item) => {
    var status = "";
    if (item.items.length === 1) {
      if (Object.keys(item.items[0]).includes("error")) {
        return ["error", "Product Error : " + item.items[0]["error"].product];
      } else if (Object.keys(item.items[0]).includes("status"))
        status = item.items[0]["status"];
      else status = "Not Listed";
    } else {
      if (Object.keys(item.items[0]).includes("error")) {
        return ["error", "Product Error : " + item.items[0]["error"].product];
      } else {
        status = "Not Listed";
      }
    }
    return [status, ""];
  };
  const fetchRestData = () => {
    setLoading(true);
    setHasData(false);
    let payloads = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    if (currentTab === "Not Listed") {
      payloads = {
        count: 50,
        "filter[cif_amazon_multi_inactive][1]": "Not Listed",
        productOnly: true,
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      };
    }
    if (currentTab === "Inactive") {
      payloads = {
        count: 50,
        "filter[items.status][1]": "Inactive",
      };
    }
    if (currentTab === "Incomplete") {
      payloads = {
        count: 50,
        "filter[items.status][1]": "Incomplete",
      };
    }
    if (currentTab === "Active") {
      payloads = {
        count: 50,
        "filter[items.status][1]": "Active",
      };
    }
    if (currentTab === "Error") {
      payloads = {
        count: 50,
        "filter[cif_amazon_multi_activity][1]": "error",
      };
    }
    let url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts"
    );
    for (let key in resultFilter) {
      if (resultFilter.hasOwnProperty(key)) {
        if (key === "inventory" && resultFilter[key].value !== "") {
          payloads[`filter[items.quantity][${resultFilter[key].option}]`] =
            resultFilter[key].value;
        }
        if (key === "sku" && resultFilter[key].value !== "") {
          payloads[`filter[items.sku][${resultFilter[key].option}]`] =
            resultFilter[key].value;
        }
        if (key === "tags" && resultFilter[key].value !== "") {
          payloads[`filter[tags][3]`] = resultFilter[key].value;
        }
        if (key === "vendor" && resultFilter[key].value !== "") {
          payloads[`filter[brand][${resultFilter[key].option}]`] =
            resultFilter[key].value;
        }
        if (key === "productStatus" && resultFilter[key].option !== "") {
          payloads[`filter[items.status][1]`] = resultFilter[key].option;
        }
        if (key === "variantAttributes" && resultFilter[key].value !== "") {
          payloads[`filter[variant_attributes][1]`] = resultFilter[key].option;
        }
        if (key === "activity" && resultFilter[key].value !== "") {
          payloads[`filter[cif_amazon_multi_activity][1]`] =
            resultFilter[key].option;
        }
        if (key === "type" && resultFilter[key].option !== "") {
          payloads[`filter[type][1]`] = resultFilter[key].option;
        }
      }
    }
    if (searchModeVisibility === "On" && searchContainerId !== "") {
      payloads["filter[container_id][1]"] = searchContainerId;
      payloads["productOnly"] = true;
    }
    
    if (nextPages !== "") {
      payloads["next"] = nextPages;
    }
    if (previousPages !== "") {
      payloads["prev"] = previousPages;
    }
    const pageCountUrl = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProductCount"
    );
    for (let i in payloads) {
      url.searchParams.append(i, payloads[i]);
    }
    fetch_without_payload("GET", pageCountUrl, headers).then((response) => {
      setTotalPages(Math.ceil(Number(response.data.count) / 50));
    });
    fetch_without_payload("GET", url, headers).then((response) => {
      let fetchedData = [];
      if (response.data.prev !== null) setPreviousPages(response.data.prev);
      if (response.data.next !== null) setNextPages(response.data.next);
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
            amazon_status: Object.keys(subItem).includes("error") ? (
              <Badge status="critical">Error</Badge>
            ) : subItem.status ? (
              <Badge status="new">{subItem.status}</Badge>
            ) : (
              <Badge status="surface">Not Listed</Badge>
            ),
          })),
          product_details:
            item.items.length === 1
              ? hasChildren(item.items[0])
              : item.items.map((subItem, subIndex) => {
                  if (subItem.source_product_id === item.source_product_id) {
                    return forParent(subItem);
                  }
                }),
          inventory: inventoryCalculate(item.items),
          amazon_status:
            amazonStatus(item)[0] === "error" ? (
              <>
                <Badge status="critical">Error</Badge>
                <br />
                <a
                  onClick={() => {
                    setShowProductError(amazonStatus(item)[1]);
                  }}
                  href
                >
                  {/* <p onClick={()=>viewErrorModal(item[0])}>View Error</p> */}
                  {/* <a onClick={()=>{showProductErrorFunc(amazonStatus(item)[1])}} href> */}
                  view error
                </a>
              </>
            ) : (
              <Badge status="new">{amazonStatus(item)}</Badge>
            ),
          activity:
            Object.keys(item).includes("process_tags") ||
            Object.keys(item.items[0]).includes("process_tags") ? (
              <Button
                plain
                monochrome
                onClick={() => inProgress(item.items[0] || item.process_tags)}
              >
                <Icon source={ClockMinor} />
                In progress
              </Button>
            ) : (
              "--"
            ),
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
    if (currentTab === "All") {
      fetchalldata();
    }
    if (currentTab === "All" && searchModeVisibility === "On") {
      fetchalldata();
    } else {
      fetchRestData();
    }
  }, [
    currentTab,
    searchContainerId,
    searchModeVisibility,
    pageCount,
    resultFltrInventoryvalue,
    resultFilter,
  ]);
  React.useEffect(() => {
    setPageCount(1);
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
  const removeTag = (tag) => () => {
    dispatch(removeChoices(tag));
    dispatch(hideHeaders(true));
  };
  const tagMarkup = filterTage.map((option) => {
    dispatch(hideHeaders(false));
    return (
      <Tag key={option} onRemove={removeTag(option)}>
        {option}
      </Tag>
    );
  });
  const amazonLookup = () => {
    setActive(true);
  };
  const amazonLookupProceed = () => {
    setActive(false);
    setLoadLookup(true);
    let payload = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      target: {
        marketplace: "amazon",
        shopId: "479",
      },
      source: {
        marketplace: "shopify",
        shopId: "476",
      },
    };
    const url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/searchProduct"
    );
    fetch_with_payload("POST", url, postHeaders, payload).then((response) => {
      setAmazonLookupResponse(response.message);
      setAmazonLookupToast(true);
      setLoadLookup(false);
    });
  };
  const amazonLookupClose = useCallback(() => setActive(!active), [active]);
  const toggleAmazonLookupToast = useCallback(
    () => setAmazonLookupToast((amazonLookupToast) => !amazonLookupToast),
    []
  );
  const toastMarkupAmazonLookup = amazonLookupToast ? (
    <Toast content={amazonLookupResponse} onDismiss={toggleAmazonLookupToast} />
  ) : null;
  const amazonSyncFunc = () => {
    setActiveSync(true);
  };
  const amazonSyncProceed = () => {
    setActiveSync(false);
    setLoadSync(true);
    let payload = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      target: {
        marketplace: "amazon",
        shopId: "479",
      },
      source: {
        marketplace: "shopify",
        shopId: "476",
      },
      data: {
        matchWith: "sku",
      },
    };
    const url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/matchProduct"
    );
    for (let i in payload) {
      url.searchParams.append(i, payload[i]);
    }
    fetch_with_payload("POST", url, postHeaders, payload).then((response) => {
      setAmazonSyncResponse(response.message);
      setAmazonSyncToast(true);
      setLoadSync(false);
    });
  };
  const amazonSyncClose = useCallback(
    () => setActiveSync(!activeSync),
    [activeSync]
  );
  const toggleAmazonSyncToast = useCallback(
    () => setAmazonSyncToast((amazonSyncToast) => !amazonSyncToast),
    []
  );
  const toastMarkupAmazonSync = amazonSyncToast ? (
    <Toast content={amazonSyncResponse} onDismiss={toggleAmazonSyncToast} />
  ) : null;
  const toggleBulkUpdate = useCallback(
    () => setActiveBulkUpdate((activeBulkUpdate) => !activeBulkUpdate),
    []
  );
  const activatorbulkupdate = (
    <Button onClick={toggleBulkUpdate} disclosure>
      Bulk Update
    </Button>
  );
  const [activeImportedAction, setActiveImportedAction] = useState(false);
  const handleImportedAction = useCallback(() => {
    setActiveImportedAction(true);
    const url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/csv/exportedFileName"
    );
    fetch_without_payload("POST", url, headers).then((response) => {
      setCsvFileName(response.data.value);
    });
  }, []);

  const ImportedActionClose = useCallback(() => {
    setActiveImportedAction(!activeImportedAction);
    setFiles("");
  }, [activeImportedAction]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      if (acceptedFiles[0].name.includes(".csv")) {
        setFiles(acceptedFiles[0]);
        setUploadedFileName(acceptedFiles[0].name);
        if (files === []) {
          setSelectedImage(true);
          importFileResponseValue("Please choose file");
        } else {
          setSelectedImage(false);
          setFiles(acceptedFiles);
        }
      } else {
        importFileResponseValue("This is not a csv file");
      }

      // acceptedFiles = _dropFiles.filter((file) => file.type === "text.csv");
      // _rejectedFiles = _dropFiles.filter((file) => file.type !== "text.csv");
    },
    []
  );
  const validImageTypes = "text/csv";
  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts  csv only" />
  );

  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: "0" }}>
      <Stack vertical>
        {files.map((file, index) => (
          <Stack alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteMinor
              }
            />
            <div>
              {file.name} <Caption>{file.size} bytes</Caption>
            </div>
          </Stack>
        ))}
      </Stack>
    </div>
  );
  const toggleFileUploadToast = useCallback(
    () => setImportFileResponse((importFileResponse) => !importFileResponse),
    []
  );
  const toasrMarkupFileUploadToast = importFileResponse ? (
    <Toast
      content={importFileResponseValue}
      onDismiss={toggleFileUploadToast}
    />
  ) : null;
  const ImportedActionProceed = () => {
    const formData = new FormData();

    formData.append("file", files[0]);
    let url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/csv/importCSV"
    );
    let payload = {
      file: formData,
    };
    let res = "No response found!"
    fetch_fileUpload("POST", url, headers, payload.file).then((response) => {
      if(response){
        res = response.message
      }

    });
    setImportFileResponseValue(res);
    setImportFileResponse(true);
    setActiveImportedAction(false);
  };

  const [activeExportedAction, setActiveExportedAction] = useState(false);

  const handleExportedAction = useCallback(() => {
    setActiveExportedAction(true);
  }, []);

  const ExportedActionProceed = () => {
    setActiveExportedAction(false);
  };
  const ExportedActionClose = useCallback(
    () => setActiveExportedAction(!activeExportedAction),
    [activeExportedAction]
  );
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  const previousPageFunc = () => {
    setPageCount(pageCount - 1);
    setNextPages("");
  };
  const nextPageFunc = () => {
    setPageCount(pageCount + 1);
    setPreviousPages("");
  };
  return (
    <>
      {toasrMarkupFileUploadToast}
      <div style={{ margin: "10px 5px" }}>
        <Stack wrap={false}>
          <Searchbar />
          <Rightbar />
          <Button onClick={amazonSyncFunc}>
            {loadSync ? (
              <Spinner
                accessibilityLabel="Small spinner example"
                size="small"
              />
            ) : (
              "Sync Status"
            )}
          </Button>
          <Button onClick={amazonLookup}>
            {loadLookup ? (
              <Spinner
                accessibilityLabel="Small spinner example"
                size="small"
              />
            ) : (
              "Amazon Lookup"
            )}
          </Button>
          <Popover
            active={activeBulkUpdate}
            activator={activatorbulkupdate}
            autofocusTarget="first-node"
            onClose={toggleBulkUpdate}
          >
            <ActionList
              actionRole="menuitem"
              items={[
                {
                  content: "Import file",
                  onAction: handleImportedAction,
                },
                {
                  content: "Export file",
                  onAction: handleExportedAction,
                },
              ]}
            />
          </Popover>
        </Stack>
      </div>
      <Stack spacing="tight">{tagMarkup}</Stack>
      <Table
        pagination={false}
        {...tableProps}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              pagination={false}
              {...subtableProps}
              columns={subColumns}
              dataSource={record.description.filter(
                (item) => item.source_product_id !== record.source_product_id
              )}
            />
          ),
          rowExpandable: (record) => record.type !== "simple",
        }}
        dataSource={hasData ? data : []}
      />
      <div className={CssFile.buttonsInCenter}>
        <ButtonGroup segmented>
          <Button onClick={previousPageFunc} disabled={pageCount === 1}>
            <Icon source={ArrowLeftMinor} color="base" />
          </Button>
          <b>
            &nbsp;&nbsp; {totalPages ? pageCount : 0}&nbsp;/&nbsp; {totalPages}{" "}
            Page &nbsp;&nbsp;
          </b>
          <Button onClick={nextPageFunc} disabled={pageCount === totalPages}>
            <Icon source={ArrowRightMinor} color="base" />
          </Button>
        </ButtonGroup>
      </div>
      {toastMarkupAmazonLookup}
      {toastMarkupAmazonSync}
      <div>
        <Modal
          open={active}
          onClose={amazonLookupClose}
          title="Amazon Lookup"
          primaryAction={{
            content: "Proceed",
            onAction: amazonLookupProceed,
          }}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                You can choose to run Amazon Lookup for any number of products
                you want. This will update the status of those products that are
                currently under “Not Listed: Offer” status
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeSync}
          onClose={amazonSyncClose}
          title="Sync Status"
          primaryAction={{
            content: "Proceed",
            onAction: amazonSyncProceed,
          }}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                It will search sku(s) in your Amazon’s seller panel. For all the
                products with matching sku(s), status of main products will
                shown under Amazon Status and variant’s status will reflect on
                Edit Product page.
                <br />
                <br />
                Do you want to proceed with matching all the product(s) from
                Amazon to that on app ?
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeImportedAction}
          onClose={ImportedActionClose}
          title="Import Products"
          primaryAction={{
            content: "Import Products",
            onAction: ImportedActionProceed,
            disabled: selectedImage,
          }}
          secondaryActions={[
            {
              content: "Close",
              onAction: ImportedActionClose,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                <b>Import Updated Product CSV</b>
                <br />
                <br />
                To ensure seamless Product update, first export the Product
                information in the form of a CSV file, make the necessary
                updates to this CSV file and then import this very same updated
                CSV file. All changes will be reflected on the App as well as on
                your Shopify store too.
              </p>
              <br />
              <Banner status="warning" onDismiss={false}>
                <p>
                  Last exported file was{" "}
                  {csvFileName === "Loading..." ? (
                    <Spinner
                      accessibilityLabel="Small spinner example"
                      size="small"
                    />
                  ) : (
                    csvFileName
                  )}
                  .
                </p>
              </Banner>
              <br />
              <DropZone onDrop={handleDropZoneDrop}>
                {uploadedFiles}
                {fileUpload}
              </DropZone>
              <u>
                <a href="https://docs.cedcommerce.com/shopify/amazon-channel-cedcommerce/?section=csv-bulk-action">
                  Need help importing Products?
                </a>
              </u>
            </TextContainer>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeExportedAction}
          onClose={ExportedActionClose}
          title="Export Products"
          primaryAction={{
            content: "Proceed",
            onAction: ExportedActionProceed,
          }}
          secondaryActions={[
            {
              content: "Close",
              onAction: ExportedActionProceed,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                <b>Export Product Information </b>
                <br />

                <Text variant="bodyMd" as="p" color="subdued">
                  Get details of selected/all Products in the form of a CSV
                  document and make the necessary changes to that information.
                </Text>
                <br />
                <div className={CssFile.rowsetup}>
                  <RadioButton
                    label="Current Page"
                    // helpText="Customers will only be able to check out as guests."
                    // checked={value === 'disabled'}
                    id="disabled"
                    name="accounts"
                    // onChange={handleChange}
                  />
                  <RadioButton label="All" id="disabled" name="accounts" />

                  <RadioButton
                    disabled={true}
                    label="
Selected Products: 0 Product"
                    id="disabled"
                    name="accounts"
                  />

                  <RadioButton
                    disabled={false}
                    label="
                    Found 50+ matching products corresponding to your search"
                    id="disabled"
                    name="accounts"
                  />
                </div>
                <br />
                <Banner status="warning">
                  <p>
                    To ensure seamless Product update, export the Product
                    information in the form of a CSV file, make the necessary
                    updates to this CSV file and then import this very same
                    updated CSV file.
                  </p>
                </Banner>
                <br />
                <b>
                  Please select the columns to be exported based on the applied
                  filters
                </b>
                <br />

                <div className={CssFile.columnsetup}>
                  <Checkbox
                    label="All"
                    checked={checked}
                    onChange={handleChange}
                  />

                  <Checkbox
                    label="Title"
                    checked={checked}
                    onChange={handleChange}
                  />

                  <Checkbox
                    label="Quantity"
                    checked={checked}
                    onChange={handleChange}
                  />

                  <Checkbox
                    label="Price"
                    checked={checked}
                    onChange={handleChange}
                  />

                  <Checkbox
                    label="Barcode"
                    checked={checked}
                    onChange={handleChange}
                  />
                  <Checkbox
                    label="SKU"
                    checked={checked}
                    onChange={handleChange}
                  />
                </div>
                <p>
                  Learn more about{" "}
                  <u>
                    <a href="https://docs.cedcommerce.com/shopify/amazon-channel-cedcommerce/?section=csv-bulk-action">
                      exporting Products to CSV file
                    </a>
                  </u>{" "}
                  or the{" "}
                  <u>
                    <a href="https://docs.cedcommerce.com/shopify/amazon-channel-cedcommerce/?section=csv-bulk-action">
                      bulk editor
                    </a>
                  </u>
                  .
                </p>
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>

        <Modal
          // activator={activator}
          open={activityModal}
          onClose={handleActivityClose}
          title="Actions in progress"
          primaryAction={{
            content: "Refresh to update status",
            onAction: handleActivityProceed,
          }}
          secondaryActions={[
            {
              content: "Close",
              onAction: handleActivityClose,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              {inProgressActivity.map((i, index) => {
                return (
                  <p>
                    <b>{index + 1}:&nbsp;&nbsp;</b>
                    {i}
                  </p>
                );
              })}
            </TextContainer>
          </Modal.Section>
        </Modal>
        <ErrorModals errorModal={errorModal} handleErrorClose={handleErrorClose} />
        {/* <Modal
        // activator={activator}
        open={errorModal}
        onClose={handleErrorClose}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleErrorClose,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleErrorClose,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            
            <p>
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal> */}
      </div>
    </>
  );
};
export default Tables;
