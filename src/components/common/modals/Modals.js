import {Button, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function Modals() {
  const [activityModal, setActivityModal] = useState(true);

  const handleActivityClose = useCallback(() => setActivityModal(!activityModal), [activityModal]);

  const activator = <Button onClick={handleActivityClose}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={activityModal}
        onClose={handleActivityClose}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleActivityClose,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleActivityClose,
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
      </Modal>
    </div>
  );
}
export default Modals