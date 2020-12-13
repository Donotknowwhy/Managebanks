import {Layout, Space, Affix, Row} from 'antd';
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
      <Row justify='center'>
        <LoadingOutlined />
      </Row>
      </div>
    );
  }
  return (
    <>
      <Layout >
          <Affix>
            <Header className={styles.formHeader}>
              <Navigation />
            </Header>
          </Affix>
          <Layout>
            {props.children}
          </Layout>
        <Footer style={{textAlign: 'center'}}>
          Design by 105C7
        </Footer>
      </Layout>
    </>
  );
}
export default PrivateLayout;
