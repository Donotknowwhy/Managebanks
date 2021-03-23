import { Row, Col, Table, Button, Space, Input, Tabs, Card } from "antd";
import { useState, useEffect } from "react";
import styles from "./Index.module.scss";
import reqwest from "reqwest";
import {
  AppleOutlined,
  AndroidOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { getUser } from "../api/user";
import Customer from "./Customer/Customer";
import Employee from "./Employee/Employee";
const { Search } = Input;
const { TabPane } = Tabs;

export default function PostComponent() {
  return (
    <div className={styles.content}>
      <div className={styles.time}>Ngày 18/03/2021 :</div>
      <div className={styles.notify}><span>THÔNG BÁO</span> V/v: Hướng dẫn đăng ký chuyên ngành trên hệ thống qldt.ptit.edu.vn cho sinh viên khóa 2018 các ngành: Quản trị kinh doanh; Công nghệ thông tin; MarketingTin tức mới cập nhật (18/03/2021)</div>
    </div>
  );
}
