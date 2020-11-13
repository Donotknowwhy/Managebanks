import { Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import styles from './Index.module.scss';


export default function PostComponent() {
    const [lam,setLam]=useState("chao Lam Thon")


  return (
      <div className={styles.body} >
        <Row justify="space-around"  >
          <Col md={5} className={styles.a} >
            <h3>2,064</h3>
            <h4>Sessions</h4>
          </Col>
          <Col md={5} className={styles.a}>
           {lam}
          </Col>
          <Col md={5} className={styles.a}>
            chao anh em
          </Col>
          <Col md={5} className={styles.a}>
            chao anh em
          </Col>
        </Row>
       
      </div>
  )

}
