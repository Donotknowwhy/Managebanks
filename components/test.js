import React, { useState, useEffect } from 'react';
import {
  Table, Input, InputNumber,
  Popconfirm, Form, Space, Modal, notification,
  Button
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {openNotification} from './CustomerMini'
import {getListCustomer} from '../api/customer'
const originData = [];
const { confirm } = Modal;

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    idCard: `00109901840${i}`,
    idCustomer: `11213${i}`,
    name: `Edrward ${i}`,
    dateOfBirth: new Date(2018, 11, 24, 10, 33, 30, 0),
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td >
      {editing ? ( // check have editing
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};

export default function Customer() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState();
  const [count, setCount] = useState(101);
  const isEditing = (record) => record.key === editingKey;

  useEffect( ()=>{
    getListCustomer( {page:1})
    .then( (res) =>{
      console.log("chao anh em..",res.data[0]);
    }
    // console.log("chao anh em");
  )
  })
  const showPromiseConfirm = async (record) => {
    confirm({
      title: 'Xóa bài viết?',
      content: 'Bạn có chắc chắn muốn xóa bài viết này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk() {
        deleteData(record)
      },
      onCancel() { },
    });
  };

  // const getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={node => {
  //           setSearchInput(node);
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //           Reset
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
  //       : '',
  //   render: text =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //         text
  //       ),
  // });
  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = clearFilters => {
  //   clearFilters();
  //   setSearchText('');
  // };

  const edit = (record) => {
    form.setFieldsValue({
      idCard: '',
      idCustomer: '',
      name: '',
      dateOfBirth: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key); //position want delete
  };

  const cancel = () => {
    setEditingKey('');
  };

  const deleteData = (record) => {
    const finalDataDelete = data.filter((item) => item.key !== record.key);
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
    console.log('data sau',originData);
  };

  const columns = [
    {
      title: 'Chứng minh thư',
      dataIndex: 'idCard',
      width: '20%',
      editable: true,
      // ...getColumnSearchProps('idCard'),
    },
    {
      title: 'Mã số khách hàng',
      dataIndex: 'idCustomer',
      width: '25%',
      editable: true,
      // ...getColumnSearchProps('idCustomer'),
    },
    {
      title: 'tên',
      dataIndex: 'name',
      width: '10%',
      editable: true,
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'ngày sinh',
      dataIndex: 'dateOfBirth',
      width: '10%',
      editable: true,
      // ...getColumnSearchProps('dateOfBirth'),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: '20%',
      editable: true,
      // ...getColumnSearchProps('address'),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);  //true,false
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <Space>
              <a onClick={() => edit(record)}>
                Edit
              </a>
              <a onClick={() => {
                showPromiseConfirm(record);
              }}>
                Delete
              </a>
            </Space>
          );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    // console.log('col',col);
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
    //handle when click edit
  });
  return (
    <Form form={form} component={false}>
       <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
      />
    </Form>
  );
};