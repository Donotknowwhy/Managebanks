import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button, Row, Col
} from 'antd';
import ModalCustomer from './ModalCustomer'
import ModalUpdateCustomer from './ModalUpdateCustomer'
import TableCustomer from './TableCustomer'
import styles from './Customer.module.scss';
import { openNotification } from './CustomerMini'
import { getListCustomer, deleteCustomer, getCustomerById } from '../../api/customer'
const { Search } = Input;
const { confirm } = Modal;

export default function Customer() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);

  const toggle = () => {
    setVisible(false);
  };

  const toggleUpdate = () => {
    setVisibleUpdate(!visibleUpdate);
  };

  useEffect(() => {
    getListCustomer({ page: 0 })
      .then((res) => {
        setData(res.data)
      }
      )
  }, [])
  useEffect(() => {
    getListCustomer({ page: 0 })
      .then((res) => {
        setData(res.data)
      }
      )
  }, [visible || visibleUpdate ])

  const showPromiseConfirm = async (id) => {
    confirm({
      title: 'Xóa bài viết?',
      content: 'Bạn có chắc chắn muốn xóa bài viết này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk() {
        deleteData(id)
      },
      onCancel() { },
    });
  };

  const deleteData = (id) => {
    deleteCustomer(id)
    const finalDataDelete = data.filter((item) => item.id !== id);
    setData(finalDataDelete)
    openNotification('bottomLeft');
  };


  const onSearch = value => {
    getCustomerById(value).then( (res)=>{
      setData([res.data])
    }).catch( (err)=>{
      setData([])
    } )
  }  
  return (
    <div>
      <Row >
      <Col span={10} >
      <Search
      placeholder="Search id Customer"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      
    />
      </Col>
      <Col span={2} offset={12}>
      <Button type="primary" onClick={() => {
        setVisible(true);
      }}>Add customer</Button>
      </Col>
    </Row>   
      <br />
      <table className={styles.table}>
        <thead>
        <tr className={styles.tr}>
          <th className={styles.th} >Id Customer</th>
          <th className={styles.th} >Card Number</th>
          <th className={styles.th} >Full Name</th>
          <th className={styles.th} >Date of Bird</th>
          <th className={styles.th} >Email</th>
          <th className={styles.th} >Action</th>
        </tr>
        </thead>
        <tbody>
        {
          data.map((item) => {
            const ngaySinh = new Date(item.person.ngaySinh);
            const dateOfBird = ngaySinh.getDate() + ' tháng ' +
              ngaySinh.getMonth() + ', ' + ngaySinh.getFullYear()
            return (
              <tr
                key={item.id}
              >
                <th className={styles.th} >{item.idCustomer}</th>
                <th className={styles.th} >{item.person.cardNumber}</th>
                <th className={styles.th} >{item.person.fullName.ho + " " +
                  item.person.fullName.tenDem + " " +
                  item.person.fullName.ten}</th>
                <th className={styles.th} > {dateOfBird} </th>
                <th className={styles.th} >{item.person.email}</th>
                <th className={styles.th}>
                  <Space>
                    <TableCustomer
                      item={item}
                      toggleUpdate={toggleUpdate}
                    />
                    <Button type="primary" onClick={() => {
                      showPromiseConfirm(item.id)
                    }}>Xóa</Button>
                  </Space>
                </th>
              </tr>
            )
          }
          )
        }
        </tbody>
      </table>
      {visible == true && <ModalCustomer
        toggle={toggle} />}
    </div>
  )
};