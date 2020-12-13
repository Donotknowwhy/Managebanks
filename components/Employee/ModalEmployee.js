import {
    Form, Input, Checkbox, Col, Row,
    Button, Modal, DatePicker, InputNumber
} from 'antd';
import { useState, useEffect } from 'react';
import { postEmployee } from '../../api/employee'

export default function ModalPost(props) {
    const [visible, setVisible] = useState(true);
    const [ho, setHo] = useState('')
    const [tenDem, setTenDem] = useState('')
    const [ten, setTen] = useState('')
    const [email, setEmail] = useState('')
    const [idEmployee,setIdEmployee] =useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [ngaySinh, setNgaySinh] = useState('')
    const [soNha, setSoNha] = useState('')
    const [phuongXa, setPhuongXa] = useState('')
    const [quanHuyen, setQuanHuyen] = useState('')
    const [tinhThanhpho, setTinhThanhpho] = useState('')
    const [id, setId] = useState(3)
    const [idLevel, setIdLevel] = useState('')
    const [idPos, setIdPos] = useState('')

    const handleOk = async () => {
        const employee = {
            person: {
                address: {
                    phuongXa,
                    quanHuyen,
                    soNha,
                    tinhThanhpho
                },
                email,
                fullName: {
                    ho,
                    ten,
                    tenDem
                },
                ngaySinh,
                cardNumber
            },
            idEmployee,
            position: {
                id: idPos,
            },
            level:{
                id: idLevel,
            }
        }
        console.log('employee', employee);
        await postEmployee(employee).then( (res)=>{
            console.log("thành công",res.data);
        }).catch( res=>{
            console.log("lỗi",res.data);
        })
        props.toggle();
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
        props.toggle();
    };
    return (
        <>
            <Modal
                visible={visible}
                onOk={handleOk}
                title="Tạo mới nhân viên"
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}
                footer={[
                    <Button key="submit" block type="primary"
                        onClick={handleOk}
                    disabled={ho && tenDem && ten && email &&
                         ngaySinh && cardNumber && idEmployee &&
                        soNha  && phuongXa && quanHuyen && tinhThanhpho && idPos && idLevel ? false : true}
                    >
                       
                        {props.savePost ? props.savePost : 'Đăng'}
                    </Button>
                ]}
            >

                <Form>
                    <Row justify="space-between">
                        <Col span={7}>
                            {/* <Input onChange={e => setHo(e.target.value)} placeholder="Họ" /> */}
                            <Form.Item name={['employee', 'Họ']} rules={[{ required: true }]}>
                                <Input onChange={e => setHo(e.target.value)} placeholder="Họ" />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item name={['employee', 'Tên đệm']} rules={[{ required: true }]}>
                                <Input onChange={e => setTenDem(e.target.value)} placeholder="Tên đệm" />
                            </Form.Item>
                            {/* <Input onChange={e => setTenDem(e.target.value)} placeholder="Tên đệm" /> */}
                        </Col>
                        <Col span={7}>
                            {/* <Input onChange={e => setTen(e.target.value)} placeholder="Tên" /> */}
                            <Form.Item name={['employee', 'Tên']} rules={[{ required: true }]}>
                                <Input onChange={e => setTen(e.target.value)} placeholder="Tên" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* <Input onChange={e => setEmail(e.target.value)} placeholder="Email" /> */}
                    <Form.Item name={['employee', 'email']} rules={[{ type: 'email' }]}>
                        <Input onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    </Form.Item>
                    
                    <Input onChange={e => setCardNumber(e.target.value)} placeholder="Số chứng minh thư" style={{ width: 470 }} />
                    <br/>
                    <br/>
                   
                    <Input onChange={e => setIdEmployee(e.target.value)} placeholder="Mã nhân viên" style={{ width: 470 }} />
                    <br/>
                    <br/>
                    <Form.Item name={['employee', 'idLevel']} rules={[{ type: 'number' }]}>
                        <InputNumber onChange={e => setIdLevel(e)} placeholder="Cấp bậc" style={{ width: 470 }} />
                    </Form.Item>
                    <Form.Item name={['employee', 'idPos']} rules={[{ type: 'number' }]}>
                        <InputNumber onChange={e => setIdPos(e)} placeholder="Vị trí" style={{ width: 470 }} />
                    </Form.Item>
                    {/* <Input onChange={e => setPhoneNumber(e.target.value)} placeholder="Số điện thoại" /> */}

                    Ngày sinh : <DatePicker onChange={(date, dateString) => setNgaySinh(dateString)}
                    />
                    <br />
                    <br />
                    <Row justify="space-between">
                        <Col span={11}>
                            <Input onChange={e => setSoNha(e.target.value)} placeholder="Số nhà" />
                        </Col>
                        <Col span={11}>
                            <Input onChange={e => setPhuongXa(e.target.value)} placeholder="Phường/Xã" />
                        </Col>

                    </Row>
                    <br />
                    <Row justify="space-between">
                        <Col span={11}>
                            <Input onChange={e => setQuanHuyen(e.target.value)} placeholder="Quận/Huyện" />
                        </Col>
                        <Col span={11}>
                            <Input onChange={e => setTinhThanhpho(e.target.value)} placeholder="Tỉnh/Thành phố" />
                        </Col>

                    </Row>
                </Form>
            </Modal >
        </>
    )
}

