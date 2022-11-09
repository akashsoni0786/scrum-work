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
import { bannerCount, changeTab } from "../../store/slices/Slice";
import { fetch_without_payload, fetch_with_payload } from "../../utils/methods/Fetch";
import { headers, postHeaders } from "../../utils/api/Headers";

const Dashboard = () => {
  const [selected, setSelected] = useState(0);
  const [notListed, setNotListed] = useState(0)
  const [inactive, setInactive] = useState(0)
  const [incomplete, setIncomplete] = useState(0)
  const [active, setActive] = useState(0)
  const bannerProductCount = useSelector((state) => state.storeWork.bannerProductCount);
  const dispatch = useDispatch();

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  React.useEffect(() => {
    const payload = {
      "filter[cif_amazon_multi_inactive][1]": "Not Listed",
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    const tabsDataCount = (notListedPayload) => {
      const url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount"
      );
      for (let i in notListedPayload) {
        url.searchParams.append(i, notListedPayload[i]);
      }
      fetch_without_payload("POST", url, headers).then((response) => {
        let notList = 0
        response.data.map((item, index) => {
          
          if (item._id === "Not Listed") {
            notList = notList + Number(item.total)
            setNotListed(notList)
          }
          if (item._id === null) {
            notList = notList + Number(item.total)
            setNotListed(notList)
          }
          if (item._id === "Not Listed: Offer") {
            notList = notList + Number(item.total)
            setNotListed(notList)
          }
          if (item._id === "Inactive") {
            setInactive(Number(item.total))
          }
          if (item._id === "Incomplete") {
            setIncomplete(Number(item.total))
          }
          if (item._id === "Active") {
            setActive(Number(item.total))
          }
        });
      });
    };
    tabsDataCount(payload);
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
          Not Listed <Badge status="new">{notListed}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Inactive",
      content: (
        <span>
          Inactive <Badge status="critical">{inactive}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Incomplete",
      content: (
        <span>
          Incomplete <Badge status="warning">{incomplete}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
      action: {},
    },
    {
      id: "Active",
      content: (
        <span>
          Active <Badge status="success">{active}</Badge>
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
    {
      id: "Error",
      content: (
        <span>
          Error
          {/* <Badge status="critical">{error}</Badge> */}
        </span>
      ),
      panelID: "accepts-marketing-fitted-content-3",
    },
  ];

  React.useEffect(() => {
    dispatch(changeTab(tabs[selected].id));
  }, [selected]);

  React.useEffect(() => {
    const bannerPayloads = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      target: {
        marketplace: "amazon",
        shopId: "476",
      },
      source: {
        marketplace: "shopify",
        shopId: "479",
      },
    };
    const url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/getMatchStatusCount"
    );
    fetch_with_payload("GET", url, postHeaders,bannerPayloads).then((response) => {
      dispatch(bannerCount(response.data.not_linked))
    });
  }, []);
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
              {bannerProductCount !== 0 && <Card>
                <Banner

                  title={`${bannerProductCount} Products are yet to be linked!`}
                  status="warning"
                  action={{ content: "Link Products", url: "" }}
                  onDismiss={() => {}}
                >
                  <p>
                  Link Amazon Listings with Shopify products to manage inventory and Amazon orders.
                  </p>
                </Banner>
              </Card>}
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