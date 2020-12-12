import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button
} from 'antd';
import styles from './Customer.module.scss';
import { openNotification } from './CustomerMini'
import { getListCustomer,deleteCustomer } from '../api/customer'
const originData = [];
const { confirm } = Modal;

export default function Customer() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(101);
  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    getListCustomer({ page: 1 })
      .then((res) => {
        setData(res.data)
        console.log('data',res.data[0]);
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
    console.log("id",id);
    const finalDataDelete = data.filter((item) => item.id !== id);
    setData(finalDataDelete)
    openNotification('bottomLeft');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleAdd = () => {
    const newData = {
      key: count,
      idCard: `00109901840${count}`,
      idCustomer: `11213${count}`,
      name: `Edrward ${count}`,
      dateOfBirth: new Date(2018, 11, 24, 10, 33, 30, 0),
      address: `London Park no. ${count}`,
    };

    originData.unshift(newData)
    // console.log('data sau',originData);
  };
  return (
    <div>
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
            const { address } = item.person;
            const add = address.soNha + "," + address.phuongXa + "," + address.quanHuyen + "," + address.tinhThanhpho
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
                    <Button type="primary" >Sửa</Button>
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
      </table>
    </div>
  )
};