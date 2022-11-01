import React, { useCallback, useState } from "react";
import {
  Banner,
  Card,
  Frame,
  Heading,
  Page,
  Columns,
  Badge,
  Tabs,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Navigationbar from "../navbar/Navbar";
import TableData from "../tables/TableData";
import TopNavbar from "../topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../../store/slices/Slice";
import { fetch_without_payload } from "../../utils/methods/Fetch";
import { headers } from "../../utils/api/Headers";

const Dashboard = () => {
  const [selected, setSelected] = useState(0);
  const [tabCount, setTabCount] = useState({
    notListed: 0,
    inactive: 0,
    incomplete: 0,
    active: 0,
    error: 0,
  });
  const tabstatus = useSelector((state) => state.storeWork.currentTab);
  const dispatch = useDispatch();

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
//Not Listed Count
  React.useEffect(() => {
    const notListedPayload = {
      "filter[cif_amazon_multi_inactive][1]": "Not Listed",
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };

    const notListedDataCount = (notListedPayload) => {
      const url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount"
      );
      for (let i in notListedPayload) {
        url.searchParams.append(i, notListedPayload[i]);
      }
      fetch_without_payload("POST", url, headers).then((response) => {
        response.data.map((item, index) => {
          if (item._id === "Not Listed") {
            setTabCount({
              ...tabCount,
              notListed: tabCount.notListed + Number(item.total),
            });
          }
          if (item._id === null) {
            setTabCount({
              ...tabCount,
              notListed: tabCount.notListed + Number(item.total),
            });
          }
        });
      });
    };
    notListedDataCount(notListedPayload);
  }, []);
//Inactive COunt
  React.useEffect(() => {
    const inactivePayload = {
      "filter[items.status][1]": "Inactive",
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    const inactiveDataCount = (inactivePayload) => {
      const url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount"
      );
      for (let i in inactivePayload) {
        url.searchParams.append(i, inactivePayload[i]);
      }
      fetch_without_payload("POST", url, headers).then((response) => {
        response.data.map((item, index) => {
          if (item._id === "Inactive") {
            setTabCount({
              ...tabCount,
              inactive: tabCount.inactive + Number(item.total),
            });
          }
        });
      });
    };
    inactiveDataCount(inactivePayload);
  }, []);
//Incomplete Count
  React.useEffect(() => {
    const incompletePayload = {
      "filter[items.status][1]": "Incomplete",
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    const incompleteDataCount = (inactivePayload) => {
      const url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount"
      );
      for (let i in inactivePayload) {
        url.searchParams.append(i, inactivePayload[i]);
      }
      fetch_without_payload("POST", url, headers).then((response) => {
        response.data.map((item, index) => {
          if (item._id === "Incomplete") {
            setTabCount({
              ...tabCount,
              Incomplete: tabCount.Incomplete + Number(item.total),
            });
          }
          if (item._id === "error") {
            setTabCount({
              ...tabCount,
              error: tabCount.error + Number(item.total),
            });
          }
          if (item._id === "active") {
            setTabCount({
              ...tabCount,
              active: tabCount.active + Number(item.total),
            });
          }
        });
      });
    };
    incompleteDataCount(incompletePayload);
  }, []);
//Active Count
  React.useEffect(() => {
    const activePayload = {
      "filter[items.status][1]": "Active",
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    const activeDataCount = (inactivePayload) => {
      const url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount"
      );
      for (let i in inactivePayload) {
        url.searchParams.append(i, inactivePayload[i]);
      }
      fetch_without_payload("POST", url, headers).then((response) => {
        response.data.map((item, index) => {
          if (item._id === "active") {
            setTabCount({
              ...tabCount,
              active: tabCount.active + Number(item.total),
            });
          }
        });
      });
    };
    activeDataCount(activePayload);
  }, []);
//Error Count
  React.useEffect(() => {
    const errorPayload = {
      "filter[cif_amazon_multi_activity][1]": "error",
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    const errorDataCount = (inactivePayload) => {
      const url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount"
      );
      for (let i in inactivePayload) {
        url.searchParams.append(i, inactivePayload[i]);
      }
      fetch_without_payload("POST", url, headers).then((response) => {
        response.data.map((item, index) => {
          if (item._id === "error") {
            setTabCount({
              ...tabCount,
              error: tabCount.error + Number(item.total),
            });
          }
        });
      });
    };
    errorDataCount(errorPayload);
  }, []);
  const tabs = [
    {
      id: "All",
      content: <span>All</span>,
      accessibilityLabel: "All customers",
      panelID: "all-customers-fitted-content-3",
    },
    {
      id: "Not Listed",
      content: (
        <span>
          Not Listed <Badge status="new">{tabCount.notListed}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Inactive",
      content: (
        <span>
          Inactive <Badge status="critical">{tabCount.inactive}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Incomplete",
      content: (
        <span>
          Incomplete <Badge status="warning">{tabCount.incomplete}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
      action: {},
    },
    {
      id: "Active",
      content: (
        <span>
          Active <Badge status="success">{tabCount.active}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Error",
      content: (
        <span>
          Error 
          {/* <Badge status="critical">{tabCount.error}</Badge> */}
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
  ];

  React.useEffect(() => {
    dispatch(changeTab(tabs[selected].id));
  }, [selected]);

  return (
    <div>
      <TopNavbar />
      <Columns
        columns={{ xs: 2, sm: "0.5fr 2fr", md: ".5fr 2fr" }}
        spacing={{ xs: 5 }}
      >
        <Navigationbar />
        <div>
          <Page>
            <Frame>
              <div className="upperheading">
                <Heading>Listings</Heading>
                <p>
                  Add weights to show accurate rates at checkout and when buying
                  shipping labels in Shopify.
                </p>
              </div>
              <Card>
                <Banner
                  title="Some of your product variants are missing weights"
                  status="warning"
                  action={{ content: "Edit variant weights", url: "" }}
                  // secondaryAction={{ content: "Learn more", url: "" }}
                  onDismiss={() => {}}
                >
                  <p>
                    Add weights to show accurate rates at checkout and when
                    buying shipping labels in Shopify.
                  </p>
                </Banner>
              </Card>
              <Card>
                <Tabs
                  tabs={tabs}
                  selected={selected}
                  onSelect={handleTabChange}
                  fitted
                ></Tabs>

                <TableData />
              </Card>
            </Frame>
          </Page>
        </div>
      </Columns>
    </div>
  );
};

export default Dashboard;
