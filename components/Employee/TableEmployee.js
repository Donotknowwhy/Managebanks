import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button
} from 'antd';
import ModalEmployee from './ModalEmployee'
import ModalUpdateEmployee from './ModalUpdateEmployee'
import styles from './Employee.module.scss';
import { openNotification } from './EmployeeMini'
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
      {visibleUpdate == true && <ModalUpdateEmployee
        updateData={props.item}
        toggleUpdate={toggleUpdate} />}
    </Space>
  )
}