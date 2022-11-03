import {
  Button,
  Popover,
  ActionList,
  Icon,
  Modal,
  TextContainer,
  Spinner,
  Toast
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import { fetch_with_payload } from "../../utils/methods/Fetch";
import { postHeaders } from "../../utils/api/Headers";

function ActionListInPopover() {
  const [active, setActive] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [loadLookup, setloadLookup] = useState(false);
  const [lookupMessage, setLookupMessage] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const amazonLookupAction = useCallback(
    () => setActiveModal(!activeModal),
    [activeModal]
  );

  const editProductAction = useCallback(
    () => console.log("Exported action"),
    []
  );

  const activator = (
    <Button onClick={toggleActive}>
      <Icon source={MobileVerticalDotsMajor} color="base" />
    </Button>
  );

  const amazonLookupStartAction = () => {
    setActiveModal(false);
    setloadLookup(true)
    const payload = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      target: {
        marketplace: "amazon",
        shopId: "640",
      },
      source: {
        marketplace: "shopify",
        shopId: "500",
      },
      source_product_ids: ["7939240558825"],
      limit: 1,
      activePage: 1,
    };
    const url = new URL(
      "https://multi-account.sellernext.com/home/public/connector/product/searchProduct"
    );
   
    fetch_with_payload("POST", url, postHeaders, payload).then((response) => {
      console.log(response);
      setLookupMessage(response.message);
      setloadLookup(false)
      setActiveToastResponse(true)
    });
  };

  const [activeToastResponse, setActiveToastResponse] = useState(false);

  const toggleActiveToast = useCallback(() => setActiveToastResponse((activeToastResponse) => !activeToastResponse), []);

  const toastMarkupResponse = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  return (
    <>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: "Edit Product",
              onAction: editProductAction,
            },
            {
              content: "Amazon Lookup",
              onAction: amazonLookupAction,
            },
          ]}
        />
      </Popover>
          {toastMarkupResponse}
      <Modal
        open={activeModal}
        onClose={amazonLookupAction}
        title="Amazon Lookup"
        primaryAction={{
          content:loadLookup? <Spinner accessibilityLabel="Small spinner example" size="small" />: "Start",
          onAction: amazonLookupStartAction,
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              You can choose a number of products you want Amazon Lookup to run
              for and update your listings that are “Not Listed: Offer”.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
}

export default ActionListInPopover;
