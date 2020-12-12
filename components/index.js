import { Row, Col, Table, Button, Space, Input,Tabs, Card } from 'antd';
import { useState, useEffect } from 'react';
import styles from './Index.module.scss';
import reqwest from 'reqwest';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import {getUser} from '../api/user';
import Customer from '../components/Customer'

const { Search } = Input;
const { TabPane } = Tabs;

export default function PostComponent() {

  return (
    <>
      <div >
        <Row gutter={16}>
          <Col xs={24} sm={24} lg={12} xl={6}>
            <Card  bordered={false} className={styles.card}>
              <h2>2064</h2>
              <h4>Sessions</h4>
            </Card>
          </Col>
          <Col xs={24} sm={24} lg={12} xl={6}>
            <Card  bordered={false} className={styles.card}>
              <h2>2064</h2>
              <h4>Sessions</h4>
            </Card>
          </Col>
          <Col xs={24} sm={24} lg={12} xl={6}>
            <Card  bordered={false} className={styles.card}>
              <h2>2064</h2>
              <h4>Sessions</h4>
            </Card>
          </Col>
          <Col xs={24} sm={24} lg={12} xl={6}>
            <Card  bordered={false} className={styles.card}>
              <h2>2064</h2>
              <h4>Sessions</h4>
            </Card>
          </Col>
        </Row>
      </div>
      <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
          <AppleOutlined />
          Tab 1
        </span>
      }
      key="1"
    >
      <Customer/>
    </TabPane>
    <TabPane
      tab={
        <span>
          <AndroidOutlined />
          Tab 2
        </span>
      }
      key="2"
    >
      Tab 2
    </TabPane>
  </Tabs>,
      <br />
      <br />
    </>
  )

}
