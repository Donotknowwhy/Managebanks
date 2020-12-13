import {
    Form, Input, Checkbox, Col, Row,
    Button, Modal, DatePicker, InputNumber
} from 'antd';
import { useState, useEffect } from 'react';
import { postCustomer } from '../../api/customer'

export default function ModalPost(props) {
    const [visible, setVisible] = useState(true);
    const [ho, setHo] = useState('')
    const [tenDem, setTenDem] = useState('')
    const [ten, setTen] = useState('')
    const [email, setEmail] = useState('')
    const [idCustomer, setIdCustomer] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [ngaySinh, setNgaySinh] = useState('')
    const [soNha, setSoNha] = useState('')
    const [phuongXa, setPhuongXa] = useState('')
    const [quanHuyen, setQuanHuyen] = useState('')
    const [tinhThanhpho, setTinhThanhpho] = useState('')


    const handleOk = async () => {
        console.log("ten", ten);
        console.log('ngay sinh', ngaySinh);
        const customer = {
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
            idCustomer
        }
        console.log('customer', customer);
        await postCustomer(customer).then((res) => {
            console.log("thành công", res.data);
        }).catch(res => {
            console.log("lỗi", res.data);
        })
        props.toggle();
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
        props.toggle();
    };
    useEffect(() => {   
        if (props.updateData) {
            const {person} = props.updateData
            setHo(person.fullName.ho) ;
            setTen(person.fullName.ten) ;
            setTenDem(person.fullName.tenDem)
            setEmail(person.email)
            setIdCustomer(props.updateData.idCustomer)
            setCardNumber(person.cardNumber)
            setNgaySinh(person.ngaySinh)
            setSoNha(person.address.soNha)
            setPhuongXa(person.address.phuongXa)
            setQuanHuyen(person.address.quanHuyen)
            setTinhThanhpho(person.address.tinhThanhpho)
           
        }
        console.log('prop.data',props.updateData);
      }, [props.updateData]);
    return (
            <Modal
                visible={visible}
                onOk={handleOk}
                title="Tạo mới khách hàng"
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}
                footer={[
                    <Button key="submit" block type="primary"
                        onClick={handleOk}
                        disabled={ho && tenDem && ten && email &&
                            ngaySinh && cardNumber && idCustomer &&
                            soNha && phuongXa && quanHuyen && tinhThanhpho ? false : true}
                    >
                        {props.title ? props.title : 'Đăng'}
                    </Button>
                ]}
            >

                <Form>
                    <Row justify="space-between">
                        <Col span={7}>
                                <Input value={ho} onChange={e => setHo(e.target.value)}
                                 placeholder="Họ" />
                        </Col>
                        <Col span={7}>
                                <Input value={tenDem} onChange={e => setTenDem(e.target.value)} placeholder="Tên đệm" />
                        </Col>
                        <Col span={7}>
                                <Input value={ten} onChange={e => setTen(e.target.value)} placeholder="Tên" />
                        </Col>
                    </Row>
                    <br/>
                    <Form.Item name={['customer', 'email']} rules={[{ type: 'email' }]}>
                        <Input onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    </Form.Item>

                    <Form.Item name={['customer', 'cardNumber']} rules={[{ type: 'number' }]}>
                        <InputNumber onChange={e => setCardNumber(e)} placeholder="Số chứng minh thư" style={{ width: 470 }} />
                    </Form.Item>
                    <Form.Item name={['customer', 'idCustomer']} rules={[{ type: 'number' }]}>
                        <InputNumber onChange={e => setIdCustomer(e)} placeholder="Mã khách hàng" style={{ width: 470 }} />
                    </Form.Item>
                    Ngày sinh : <DatePicker onChange={(date, dateString) => setNgaySinh(dateString)}
                    />
                    <br />
                    <br />
                    <Row justify="space-between">
                        <Col span={11}>
                            <Input value={soNha} placeholder="Số nhà"
                            onChange={e => setSoNha(e.target.value)}  />
                        </Col>
                        <Col span={11}>
                            <Input value={phuongXa} placeholder="Phường/Xã" 
                             onChange={e => setPhuongXa(e.target.value)} />
                        </Col>
                    </Row>
                    <br />
                    <Row justify="space-between">
                        <Col span={11}>
                            <Input value={quanHuyen} placeholder="Quận/Huyện"
                            onChange={e => setQuanHuyen(e.target.value)}  />
                        </Col>
                        <Col span={11}>
                            <Input value={tinhThanhpho} placeholder="Tỉnh/Thành phố"
                            onChange={e => setTinhThanhpho(e.target.value)}  />
                        </Col>
                    </Row>
                </Form>
            </Modal >
    )
}

