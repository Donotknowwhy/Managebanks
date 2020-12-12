import { Table, Input, Button, Space, InputNumber, Popconfirm, Form ,Tabs} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import reqwest from 'reqwest';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
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

export default function Employee() {
  // search table
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchInput, setSearchInput] = useState();

    const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const [data,setData] = useState([]);
  const [pagination,setPagination] = useState({
    current : 1,
    pageSize: 20,
  });
  const [loading, setLoading] = useState(false);
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
      // editable: true,
      // ...getColumnSearchProps('gender'),
    },

    {
      title: 'Card Number',
      dataIndex: 'idEmployee',
      width: '20%',
      // editable: true,
      // ...getColumnSearchProps('gender'),
    },
    {
      title: 'Email',
      dataIndex: 'person',
      width: '20%',
      render: person => `${person.email} `,
      // editable: true,
      // ...getColumnSearchProps('email'),
    },
    {
      title: 'Name',
      dataIndex: 'person',
      width: '20%',
      render: person => `${person.fullName.ho} ${person.fullName.tenDem} ${person.fullName.ten}`,
      
    },
    {
      title: 'Position',
      dataIndex: 'position',
      width: '20%',
      render: position => `${position.viTri}`,
      
    },
    // {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   render: (_, record) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <a
    //           href="javascript:;"
    //           onClick={() => save(record.key)}
    //           style={{
    //             marginRight: 8,
    //           }}
    //         >
    //           Save
    //         </a>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <a disabled={editingKey !== ''} onClick={() => edit(record)}>
    //         Edit
    //       </a>
    //     );
    //   },
    // },
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
    setEditingKey('');
  };

  const fetch = (params = {}) => {
    setLoading(true);
    for (let i = 1; i <= 4; i++) {
    reqwest({
      url: `http://localhost:3000/employee?page= ${i}`,
      method: 'get',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      console.log(data);
      setLoading(false);
      setData(data);
      setPagination({...params.pagination, total: 200,});
    });
    
  }
  };


  // edit table

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
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

  const mergedColumns = columns.map((col) => {
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
  });

    return (
      <>
      <Form form={form} component={false}>
        <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
          columns={mergedColumns}
          rowClassName="editable-row"
          bordered
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          size='middle'
          />
        </Form>
        </>
    )
  }