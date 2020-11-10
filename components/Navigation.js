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

  const content = (
    <div>
    </div>
  );

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/profile">Trang cá nhân</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">Cài đặt</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a onClick={() => logout()}>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );

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
            <Col xs={9} sm={8} lg={0}>
              <Popover placement="bottomRight"
                trigger="click" content={content}
              >
                <Button>{React.createElement(MenuOutlined)}</Button>
              </Popover>
            </Col>

            <Col xs={8} sm={7} lg={7} xl={6}>
              <Dropdown overlay={menu} trigger={['click']}>
                <Space>
                  <Avatar size={40} src={user ? user.photoURL : ''} />
                  <DownOutlined />
                </Space>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
