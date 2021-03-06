import { Row, Col, Table, Button, Space, Input,Tabs, Card } from 'antd';
import { useState, useEffect } from 'react';
import styles from './Index.module.scss';
import reqwest from 'reqwest';
import { AppleOutlined, AndroidOutlined ,UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import {getUser} from '../api/user';
import Customer from './Customer/Customer'
import Employee from './Employee/Employee'
const { Search } = Input;
const { TabPane } = Tabs;

export default function PostComponent() {

  return (
    <>
      <Tabs defaultActiveKey="1">
    <TabPane
      tab={
        <span>
          <UserOutlined />
          Khách hàng
        </span>
      }
      key="1"
    >
      <Customer/>
    </TabPane>
    <TabPane
      tab={
        <span>
          <UserSwitchOutlined />
          Nhân Viên
        </span>
      }
      key="2"
    >
      <Employee/>
    </TabPane>
  </Tabs>
      <br />
      <br />
    </>
  )

}
