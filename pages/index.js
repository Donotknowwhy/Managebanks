import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PrivateLayout from '../layouts/PrivateLayout';
import { Layout, Menu, Breadcrumb,Space } from 'antd';
import SideBar from "../components/SideBar"
import Index from '../components/index'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default function Home() {
  return (
    <PrivateLayout>
    {/* <div className={styles.container}> */}
    <Space size={40} align="start" >
        <SideBar />
        <Content >
          <Index />
        </Content>
      </Space>
    {/* </div> */}
    </PrivateLayout>
  )
}
