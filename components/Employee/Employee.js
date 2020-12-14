import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button, Row, Col
} from 'antd';
import  {getEmployee, postEmployee, deleteEmployee, getEmployeeById} from '../../api/employee'
import ModalEmployee from './ModalEmployee'
import styles from './Employee.module.scss'
import { openNotification } from './EmployeeMini';
import ModalUpdateEmployee from './ModalUpdateEmployee'
import TableEmployee from './TableEmployee'
const { confirm } = Modal;
const { Search } = Input;

export default function Employee(){

  // main

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [value,setValue] = useState('');
  const [visibleUpdate, setVisibleUpdate] = useState(false);

  const toggle = () => {
    setVisible(false);
  }

  const toggleUpdate = () => {
    setVisibleUpdate(!visibleUpdate);
  };

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

  const deleteData= (id) => {
    deleteEmployee(id)
    const finalDataDelete = data.filter((item) => item.id !== id);
    setData(finalDataDelete)
    openNotification('bottomLeft');
  }

  const onSearch = value => {
    getEmployeeById(value).then( (res)=>{
      setData([res.data])
    }).catch( (err)=>{
      setData([])
    } )
  }
  
  return(
    <div>
    <Row >
      <Col span={10} >
      <Search
      placeholder="Search id Employee"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      
    />
      </Col>
      <Col span={2} offset={12}>
      <Button type="primary" onClick={() => {
        setVisible(true);
      }}>Add employee</Button>
      </Col>
    </Row>   
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
                <TableEmployee
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
      </table>
      {visible == true && <ModalEmployee toggle={toggle} />}
    </div>
  )


}