import { Layout, Menu } from 'antd';
import Index from '../components/index';
import PrivateLayout from '../layouts/PrivateLayout';
import styles from './index.module.scss';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default function Home() {
  return (
    <PrivateLayout>
        <Content className={styles.content}  >
          <Index />
        </Content>
    </PrivateLayout>
  )
}
