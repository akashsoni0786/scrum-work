import {Badge, Button, Card, Modal, Tabs, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ErrorModals(props) {

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'Product Error',
      content: <><span>Product Error</span> &nbsp;<Badge status='warning'>3</Badge></>,
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-2',
    },
    {
      id: 'Variant Error',
      content: <><span>Variant Error</span> &nbsp;<Badge status='critical'>3</Badge></>,
      panelID: 'accepts-marketing-fitted-Ccontent-2',
    },
  ];

  return (
    <div style={{height: '500px'}}>
      <Modal
        open={props.errorModal}
        onClose={props.handleErrorClose}
        title="Errors"
        primaryAction={{
          content: 'Fix Errors',
          onAction: props.handleErrorClose,
        }}
        secondaryActions={[
          {
            content: 'Close',
            onAction: props.handleErrorClose,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
          <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} >
        <Card.Section title={tabs[selected].content}>
          {selected === 0 && <p>AKASH</p>}
          {selected === 1 && <p>Patal</p>}
        </Card.Section>
      </Tabs>
    </Card>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
export default ErrorModals