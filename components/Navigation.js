import {
  Menu, Input, Button,
  Space, Image, Col, Row,
  Popover, Avatar, Dropdown,
} from 'antd';
import React from 'react';
import Link from 'next/link';
import {useState} from 'react';
import {
  MenuOutlined, DownOutlined,
} from '@ant-design/icons';
import {useUser} from '../utils/use-user';
import styles from './Navigation.module.scss';

export default function Navigation() {
  const {Search} = Input;
  const {user, logout} = useUser();


  return (
    <>
      <Row justify="space-between">
        <Col xs={14} sm={17} md={19} lg={6} xl={5} >
          <Row justify="center">
            <Space>
              <Col>
                <Link href="/">
                  <a >
                    <Image width={40} preview={false} src="images/logo.jpg" />
                  </a>
                </Link>
              </Col>
            </Space>
          </Row>
        </Col>

        <Col xs={10} sm={7} md={5} lg={5} >
          <Row justify="end">
            <Col xs={8} sm={7} lg={7} xl={6}>
                <Space>
                  <Avatar size={40} src={user ? user.photoURL : ''} />
                  <DownOutlined />
                </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
