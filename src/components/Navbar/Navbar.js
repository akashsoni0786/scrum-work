import { Frame, Navigation } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import {
  HomeMinor,
  AnalyticsMajor,
  OrdersMajor,
  ProductsMajor,
  CirclePlusOutlineMinor,
  ProductsMinor,
  CustomersMajor,
  OnlineStoreMajor,
  ViewMinor,
  MarketingMajor,
  DiscountsMajor,
  AppsMajor,
  PointOfSaleMajor
} from "@shopify/polaris-icons";
import React from "react";

function Navigationbar() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: "/path",
              label: "Home",
              icon: HomeMinor,
            },
            {
              url: "/path",
              label: "Order",
              icon: OrdersMajor,
              badge: "15",
              subNavigationItems: [
                {
                  url: "/path",
                  disabled: false,
                  new: true,
                  label: "New item",
                },
              ],
            },
            {
              url: "/path",
              label: "Products",
              icon: ProductsMajor,
              external: true,
            },
            {
              url: "/path",
              label: "Customers",
              icon: CustomersMajor,
            },
            {
              url: "/path",
              label: "Analytics",
              icon: AnalyticsMajor,
            },
            {
              url: "/path",
              label: "Marketing",
              icon: MarketingMajor,
            },
            {
              url: "/path",
              label: "Discount",
              
              icon: DiscountsMajor,
            },
            {
              url: "/path",
              label: "Apps",
              icon: AppsMajor,
            },
           
           
          ]}
          rollup={{
            after: 7,
            view: "view",
            hide: "hide",
            activePath: "/",
          }}
        />
        <Navigation.Section
          title="SALES CHANNELS"
          items={[
            {
              url: "/path/to/place",
              label: "Online Store",
              icon: OnlineStoreMajor,
            },
            {
              url: "/path/to/place",
              label: "Point of Sale",
              icon: PointOfSaleMajor,
            },
            {
              url: '/admin/products',
              label: 'Amazon By Cedcommerce',
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: '/?path=/story/all-components-navigation--navigation-with-multiple-secondary-navigations',
                  disabled: false,
                  selected: false,
                  label: 'Overview',
                },
                {
                  url: '/',
                  label: 'Listings',
                  selected: true,
                  secondaryAction: {
                    url: '/path/to/place/view',
                    accessibilityLabel: 'View your online store',
                    icon: ViewMinor,
                    tooltip: {
                      content: 'View your online store',
                    },
                  },
                },
                {
                  url: '/?path=/story/all-components-navigation--navigation-with-multiple-secondary-navigations',
                  disabled: false,
                  selected: false,
                  label: 'Product Linking',
                },
                {
                  url: '/?path=/story/all-components-navigation--navigation-with-multiple-secondary-navigations',
                  disabled: false,
                  selected: false,
                  label: 'Settings',
                },
                {
                  url: '/?path=/story/all-components-navigation--navigation-with-multiple-secondary-navigations',
                  disabled: false,
                  selected: false,
                  label: 'FAQ',
                },
              ],
            },
            
          ]}
          action={{
            accessibilityLabel: "Add sales channel",
            icon: CirclePlusOutlineMinor,
            onClick: () => {},
          }}
          separator
        />

        
      </Navigation>
    </Frame>
  );
}
export default Navigationbar;
