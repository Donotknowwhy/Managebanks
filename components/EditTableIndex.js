import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber,
   Popconfirm, Form, Space,Modal,notification } from 'antd';
const originData = [];
const {confirm} = Modal;

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

export default function EditableTable() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;


  const openNotification = (placement) => {
    notification.success({
      message: `Bạn đã xóa bài viết thành công`,
      placement,
    });
  };
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

  const columns = [
    {
      title: 'Chứng minh thư',
      dataIndex: 'idCard',
      width: '20%',
      editable: true,
    },
    {
      title: 'Mã số khách hàng',
      dataIndex: 'idCustomer',
      width: '25%',
      editable: true,
    },
    {
      title: 'tên',
      dataIndex: 'name',
      width: '10%',
      editable: true,
    },
    {
      title: 'ngày sinh',
      dataIndex: 'dateOfBirth',
      width: '10%',
      editable: true,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: '20%',
      editable: true,
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