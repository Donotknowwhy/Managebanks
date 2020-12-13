import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button
} from 'antd';
import ModalCustomer from './ModalCustomer'
import ModalUpdateCustomer from './ModalUpdateCustomer'
import styles from './Customer.module.scss';
import { openNotification } from './CustomerMini'
import { getListCustomer, deleteCustomer } from '../../api/customer'
const { confirm } = Modal;

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