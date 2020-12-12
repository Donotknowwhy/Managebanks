import { Row, Col, Table, Button, Space, Input, Card, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import styles from './Index.module.scss';
import reqwest from 'reqwest';
import {getUser} from '../api/user';
import Employee from './Employee'
import Customer from './Customer'
const { Search } = Input;
const { TabPane } = Tabs;
export default function PostComponent() {

  return (
    <>
      <Tabs  type="card">
      <TabPane tab="Nhân Viên" key="1">
        <Employee/>
      </TabPane>
      <TabPane tab="Khách hàng" key="2">
        <Customer/>
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
      <br />
      <br />
    </>
  )

}
