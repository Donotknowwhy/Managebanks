import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import styles from './EditCellIndex.module.scss'
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className={styles.editable-cell-value-wrap}
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default function EditCell() {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);
  const [count,setCount] = useState(2);
  
    // const columns = [
    //   {
    //     title: 'name',
    //     dataIndex: 'name',
    //     width: '30%',
    //     editable: true,
    //   },
    //   {
    //     title: 'age',
    //     dataIndex: 'age',
    //   },
    //   {
    //     title: 'address',
    //     dataIndex: 'address',
    //   },
    //   {
    //     title: 'operation',
    //     dataIndex: 'operation',
    //     render: (text, record) =>
    //       dataSource.length >= 1 ? (
    //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //           <a>Delete</a>
    //         </Popconfirm>
    //       ) : null,
    //   },
    // ];

    const [columns, setColumns] = useState([{
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
      },
      {
        title: 'address',
        dataIndex: 'address',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },])


   const handleDelete = (key) => {
    // const newDataSource = [...dataSource];
    // const index = newDataSource.filter((item) => item.key !== key);
    // setDataSource(index)

    const dataSource = [...dataSource];
    console.log(dataSource)
    const index = dataSource.filter((item) => item.key !== key);
    // console.log(index)
    // console.log(key)
    // newData.splice(index, 1, { ...item, ...row });
    setDataSource(index);
  };

   const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };


    const handleSave = (row) => {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setDataSource(newData);
  };

  
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    // useEffect(() =>{
    //   setColumns([columns.map((col) => {
    //     if (!col.editable) {
    //       return col;
    //     }
    //     return {
    //       ...col,
    //       onCell: (record) => ({
    //         record,
    //         editable: col.editable,
    //         dataIndex: col.dataIndex,
    //         title: col.title,
    //         handleSave: handleSave,
    //       }),
    //     };
    //   })]) 
    // })

    return (
      <div>
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
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
}