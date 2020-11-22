import { Row, Col, Table, Button, Space, Input, Card } from 'antd';
import { useState, useEffect } from 'react';
import styles from './Index.module.scss';
import reqwest from 'reqwest';
import {getUser} from '../api/user';

const { Search } = Input;

export default function PostComponent() {
    const [data,setData] = useState([]);
    const [page, setPage] = useState(0);
    const [pagination,setPagination] = useState({
      current : 1,
      pageSize: 10,
    });
    const [loading, setLoading] = useState(false);
    

    const columns = [
      {
        title: 'City',
        dataIndex: 'location',
        width: '20%',
        render: location => `${location.city}`
      },
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        width: '20%',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' },
        ],
        width: '20%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '20%'
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        width: '20%',
      },
    ];

    
    const getRandomuserParams = params => {
      return {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params,
      };
    };
    

    useEffect(() => {
      fetch({pagination});
    },[])

    const handleTableChange = (pagination, filters, sorter) => {
      fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        pagination,
        ...filters,
      });
    };

    const fetch = (params = {}) => {
      setLoading(true);
      reqwest({
        url: 'https://randomuser.me/api',
        method: 'get',
        type: 'json',
        data: getRandomuserParams(params),
      }).then(data => {
        console.log(data);
        setLoading(false);
        setData(data.results);
        setPagination({...params.pagination, total: 200,});
      });
    };

    // useEffect(() => {
    //   getUser({pagination: pagination +1}).then( (res) =>{
    //     console.log(res.data);
    //   })
    //       .catch( (error) =>{
    //         console.log(error);
    //       });
    //     // setLoading(false);
    //     // setData(data.results);
    //     // setPagination({...params.pagination, total: 200,});   
    //     })



  return (
    <>
      <div >
        <Row gutter={16}>
          <Col xs={24} sm={24} lg={12} xl={6}>
            <Card  bordered={false} className={styles.card}>
              <h2>2064</h2>
              <h4>Sessions</h4>
            </Card>
          </Col>
          <Col xs={24} sm={24} lg={12} xl={6}>
            <Card  bordered={false} className={styles.card}>
              <h2>2064</h2>
              <h4>Sessions</h4>
            </Card>
          </Col>
          <Col xs={24} sm={24} lg={12} xl={6}>
            <Card  bordered={false} className={styles.card}>
              <h2>2064</h2>
              <h4>Sessions</h4>
            </Card>
          </Col>
          <Col xs={24} sm={24} lg={12} xl={6}>
            <Card  bordered={false} className={styles.card}>
              <h2>2064</h2>
              <h4>Sessions</h4>
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <Row justify='center'>
        <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        // onSearch={onSearch}
        style={{'width' : '1000px'}}
        // onChange={(e) => setInput(e.target.value)}
        />
      </Row>
      <br />
      <div className={styles.table}>
        <Table
        columns={columns}
        rowKey={record => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        size='middle'
        />
      </div>
    </>
  )

}
