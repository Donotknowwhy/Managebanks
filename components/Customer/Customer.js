import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button
} from 'antd';
import ModalCustomer from './ModalCustomer'
import styles from './Customer.module.scss';
import { openNotification } from './CustomerMini'
import { getListCustomer, deleteCustomer } from '../../api/customer'
const { confirm } = Modal;

export default function Customer() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(false);
  };

  useEffect(() => {
    getListCustomer({ page: 1 })
      .then((res) => {
        setData(res.data)
        console.log('data', res.data[0]);
      }
      )
  }, [])
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
    console.log("id", id);
    const finalDataDelete = data.filter((item) => item.id !== id);
    setData(finalDataDelete)
    openNotification('bottomLeft');
  };

  return (
    <div>
      <Button type="primary" onClick={() => {
        setVisible(true);
      }}>Add</Button>
      <br />
      <br />
      <table className={styles.table}>
        <tr className={styles.tr}>
          <th className={styles.th} >Id Customer</th>
          <th className={styles.th} >Card Number</th>
          <th className={styles.th} >Full Name</th>
          <th className={styles.th} >Date of Bird</th>
          <th className={styles.th} >Email</th>
          <th className={styles.th} >Action</th>
        </tr>
        {
          data.map((item) => {
            const ngaySinh = new Date(item.person.ngaySinh);
            const dateOfBird = ngaySinh.getDate() + ' tháng ' +
              ngaySinh.getMonth() + ', ' + ngaySinh.getFullYear()
            return (
              <tr
                item={item}
                key={item.id}
              >
                <th className={styles.th} >{item.idCustomer}</th>
                <th className={styles.th} >{item.person.cardNumber}</th>
                <th className={styles.th} >{item.person.fullName.ho + " " +
                  item.person.fullName.ten + " " +
                  item.person.fullName.tenDem}</th>
                <th className={styles.th} > {dateOfBird} </th>
                <th className={styles.th} >{item.person.email}</th>
                <th className={styles.th}>
                  <Space>
                    <Button type="primary" onClick={() => {
                      setVisible(true);
                    }} >Sửa</Button>
                    <Button type="primary" onClick={() => {
                      showPromiseConfirm(item.id)
                    }}>Xóa</Button>
                  </Space>
                </th>
                {visible == true && <ModalCustomer
                  updateData={item}
                  title="Lưu"
                  toggle={toggle} />}
              </tr>

            )
          }

          )
        }
        {/* {visible == true && <ModalCustomer 
        //  updateData={item}
         title="Lưu"
          toggle={toggle} />} */}
      </table>
    </div>
  )
};