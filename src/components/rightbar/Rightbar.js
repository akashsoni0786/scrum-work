import { Button, Drawer, Dropdown } from 'antd';
import React from 'react';

import {useState, useCallback} from 'react';
const Rightbar = (props) => {
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer title="Basic Drawer" placement="right" onClose={props.onClose} open={props.open}>
        <p>Some contents...</p>
        <Dropdown
      menu={{
        items,
      }}
      placement="bottom"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <Button>bottom</Button>
    </Dropdown>

    <div>
     
    </div>
      </Drawer>
    </>
  );
};
export default Rightbar;