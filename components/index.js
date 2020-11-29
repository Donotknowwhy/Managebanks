import { Row, Col, Table, Button, Space, Input, Card } from 'antd';
import { useState, useEffect } from 'react';
import styles from './Index.module.scss';
import reqwest from 'reqwest';
import {getUser} from '../api/user';

const { Search } = Input;

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
      <br />
      {/* <Row justify='center'>
        <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        style={{'width' : '1000px'}}
        />
      </Row> */}
      <br />
    </>
  )

}
