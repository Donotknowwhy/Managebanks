import { AppstoreOutlined, DownOutlined, MailOutlined,HomeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Dropdown, Image, Input, Menu,
  Space
} from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "../utils/use-user";
import styles from "./Navigation.module.scss";

const { SubMenu } = Menu;

export default function Navigation() {
  const { Search } = Input;
  const { user, logout } = useUser();
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const menu = (
    <Menu>
      <Menu.Item key="3">
        <a onClick={() => logout()}>Đăng xuất</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a>Cài đặt</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.menu}>
      <Link href="/" >
        <a className={styles.logo}>
          <Image width={40} preview={false} src="images/logo.jpg" />
        </a>
      </Link>
      <p></p>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="item1" className={styles.menuItem}>
          Trang chủ
        </Menu.Item>
        <Menu.Item key="item2" className={styles.menuItem} >
          Đăng ký môn học
        </Menu.Item>
        <Menu.Item key="item3" className={styles.menuItem} >
          Xem thời khóa biểu
        </Menu.Item>
        <Menu.Item key="item4"className={styles.menuItem} >
          Xem lịch giảng dạy
        </Menu.Item>
        <Menu.Item key="item5" className={styles.menuItem}>
          Sửa thông tin cá nhân
        </Menu.Item>
        <Menu.Item key="item6" className={styles.menuItem}>
          Góp ý kiến
        </Menu.Item>
      </Menu>
      <Dropdown overlay={menu} trigger={["click"]} className={styles.profile}>
        <Space>
          <Avatar
            size={40}
            src={user ? user.photoURL : ""}
            className={styles.avatarNavbar}
          />
          <DownOutlined className={styles.iconExit}/>
        </Space>
      </Dropdown>
    </div>
  );
}
