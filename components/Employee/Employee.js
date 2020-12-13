import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button
} from 'antd';
import  {getEmployee, postEmployee, deleteEmployee} from '../../api/employee'
import ModalEmployee from './ModalEmployee'
import styles from './Employee.module.scss'
import { openNotification } from './EmployeeMini';
const { confirm } = Modal;
const { Search } = Input;

export default function Employee(){

  // main

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [value,setValue] = useState('');

  const toggle = () => {
    setVisible(false);
  }

  useEffect(() =>{
    getEmployee({page: 0}).then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  },[])

  useEffect(() => {  
      getEmployee({ page: 0 }).then((res) => {   
        setData(res.data)     
        }    
            )  
    }, [visible])

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

  const deleteData= (id) => {
    deleteEmployee(id)
    const finalDataDelete = data.filter((item) => item.id !== id);
    setData(finalDataDelete)
    openNotification('bottomLeft');
  }

  const onSearch = () => {
    console.log(value)
  }
  
  return(
    <div>
    {/* <Search
      placeholder="Search id Employee"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      onChange={e => setValue(e)}
    />
    <br/>
    <br/> */}
      <Button type="primary" onClick={() => {
        setVisible(true);
      }}>Add</Button>
      <br />
      <br />
      <table className={styles.table}>
        <tr className={styles.tr}>
          <th className={styles.th} >Id Employee</th>
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
            
            return(
              <tr
                item={item}
                key={item.id}
              >
                <th className={styles.th}>{item.idEmployee}</th>
                <th className={styles.th}>{item.person.cardNumber}</th>
                <th className={styles.th} >{item.person.fullName.ho + " " +
                  item.person.fullName.ten + " " +
                  item.person.fullName.tenDem}</th>
                <th className={styles.th}>{dateOfBird}</th>
                <th className={styles.th}>{item.person.email}</th>
                <th className={styles.th}>
                <Space>
                  <Button type="primary">Sửa</Button>
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
      {visible == true && <ModalEmployee toggle={toggle} />}
    </div>
  )


}