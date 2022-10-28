import React, { useCallback, useState } from 'react'
import { Banner, Card, Frame, Heading, Page, Columns, Badge, Tabs } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import Navigationbar from '../Navbar/Navbar';
import TableData from '../Tables/TableData';
import TopNavbar from '../Topbar/Topbar';


const Dashboard = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all',
      content: (
        <span>
          All 
          {/* <Badge status="new">10+</Badge> */}
        </span>
      ),
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-3',
    },
    {
      id: 'Not Listed',
      content: (
        <span>
          Not Listed <Badge status="new">4</Badge>
        </span>
      ),
      panelID: 'accepts-marketing-fitted-content-3',
    },
    {
        id: 'Inactive',
        content: (
          <span>
            Inactive <Badge status="critical">4</Badge>
          </span>
        ),
        panelID: 'accepts-marketing-fitted-content-3',
      },
      {
        id: 'Incomplete',
        content: (
          <span>
            Incomplete <Badge status="warning">4</Badge>
          </span>
        ),
        panelID: 'accepts-marketing-fitted-content-3',
      },
      {
        id: 'Active',
        content: (
          <span>
            Active <Badge status="success">4</Badge>
          </span>
        ),
        panelID: 'accepts-marketing-fitted-content-3',
      },
      {
        id: 'Error',
        content: (
          <span>
            Error <Badge status="critical">4</Badge>
          </span>
        ),
        panelID: 'accepts-marketing-fitted-content-3',
      },
  ];

  return (
    <div>
      <TopNavbar />
       <Columns
        columns={{ xs: 2,sm:"0.5fr 2fr",md:".5fr 2fr" }}
        spacing={{xs:5}}
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
                Add weights to show accurate rates at checkout and when buying
                shipping labels in Shopify.
              </p>
            </Banner>
          </Card>
          <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        {/* <Card.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </Card.Section> */}
      </Tabs>
      <TableData />
    </Card>

        </Frame>
      </Page>
    </div>
      </Columns>
    </div>
  )
}

export default Dashboard