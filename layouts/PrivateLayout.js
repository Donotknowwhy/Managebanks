import {Layout, Space, Affix} from 'antd';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import Navigation from '../components/Navigation';
import {getAccessToken} from '../utils/cookies';
import styles from './PrivateLayout.module.scss';
import {useUser} from '../utils/use-user';

import {
  LoadingOutlined,
} from '@ant-design/icons';
function PrivateLayout(props) {
  const {Header, Footer} = Layout;
  const accessToken = getAccessToken();
  const router = useRouter();
  const {user} = useUser();
  useEffect(() => {
    if (!accessToken) router.push('/login');
  }, []);

  if (!user) {
    return (
      <div>
        <LoadingOutlined />
      </div>
    );
  }
  return (
    <>
      <Layout >
        <Space size={50} direction="vertical">
          <Affix>
            <Header className={styles.formHeader}>
              <Navigation />
            </Header>
          </Affix>
          <Layout>
            {props.children}
          </Layout>
        </Space>
        <Footer style={{textAlign: 'center'}}>
          Design by 105C7
        </Footer>
      </Layout>
    </>
  );
}
export default PrivateLayout;
