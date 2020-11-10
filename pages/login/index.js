import {Form, Input, Button, Checkbox, Row, Col} from 'antd';
import {useRouter} from 'next/router';
import SocialLogin from '../../components/SocialLogin';
import React, {useState} from 'react';
import {signIn} from '../../api/firebase-client';
import styles from './login.module.scss';
import PublicLayout from '../../layouts/PublicLayout';
import Link from 'next/link';
import {getAccessToken} from '../../utils/cookies';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const AccessToken = getAccessToken();

  const login = () => signIn(email, password)
      .then(() => {
        router.push('/');
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorMessage = error.message;
        // ...
        window.alert('Error' + errorMessage);
      });
  if (AccessToken) {
    router.push('/');
  }

  return (
    <PublicLayout>
      <div>
        <h2 className={styles.formTitle}>Login</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{remember: true}}
          onFinish={(e) => e.preventDefault() && false}
        >
          <Form.Item
            name="email"
            rules={[
              {required: true, message: 'Please input your Email!'},
            ]}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {required: true, message: 'Please input your Password!'},
            ]}
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Row className={styles.formContainer}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                onClick={login}
              >
                Log in
              </Button>
            </Row>
          </Form.Item>
        </Form>
        <Row className={styles.formContainer}>
          <div className={styles.formDivSpan}>
            <span className={styles.formSpan}>
              Or
            </span>
          </div>
        </Row>
        <SocialLogin/>
      </div>
    </PublicLayout>
  );
}

export default Login;
