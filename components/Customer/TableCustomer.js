import React, { useState, useEffect } from 'react';
import {
  Space, 
  Button
} from 'antd';
import ModalUpdateCustomer from './ModalUpdateCustomer'


export default function TableCustomer(props) {
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const toggleUpdate = () => {
    setVisibleUpdate(false);
    props.toggleUpdate()
  };

  return (
    <Space>
      <Button type="primary" onClick={() => {
        setVisibleUpdate(true);
      }} >Sửa</Button>
      {visibleUpdate == true && <ModalUpdateCustomer
        updateData={props.item}
        toggleUpdate={toggleUpdate} />}
    </Space>
  )
}