import { Drawer } from 'antd';
import React from 'react';
import {Button, Popover, ActionList} from '@shopify/polaris';
import {ImportMinor, ExportMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
const Rightbar = (props) => {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer title="Basic Drawer" placement="right" onClose={props.onClose} open={props.open}>
        <p>Some contents...</p>
        

        <div>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {content: 'Import file', icon: ImportMinor},
            {content: 'Export file', icon: ExportMinor},
          ]}
        />
      </Popover>
    </div>
      </Drawer>
    </>
  );
};
export default Rightbar;