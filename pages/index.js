import Head from 'next/head'
import styles from './index.module.scss';
import PrivateLayout from '../layouts/PrivateLayout';
import { Layout, Menu, Breadcrumb,Space } from 'antd';
import SideBar from "../components/SideBar"
import Index from '../components/index'
import SearchIndex from '../components/SearchIndex'
import EditCell from '../components/EditCellIndex'
import EdiTable from '../components/EditTableIndex'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default function Home() {
  return (
    <PrivateLayout>
    {/* <div className={styles.container}> */}
        <SideBar />
        <Content className={styles.content}  >
          <Index />
          <SearchIndex />
          <EditCell />
          <EdiTable/>
        </Content>
    {/* </div> */}
    </PrivateLayout>
  )
}
