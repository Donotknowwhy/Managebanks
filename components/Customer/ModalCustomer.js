import {
    Form, Input, Checkbox, Col, Row,
    Button, Modal, DatePicker, InputNumber
} from 'antd';
import { useState, useEffect } from 'react';
import { postCustomer } from '../../api/customer'

export default function ModalPost(props) {
    const [visible, setVisible] = useState(true);
    const [ho, setHo] = useState('Lê')
    const [tenDem, setTenDem] = useState('Trung')
    const [ten, setTen] = useState('Thực')
    const [email, setEmail] = useState('thucleit99@gmail.com')
    const [idCustomer, setIdCustomer] = useState('10')
    const [cardNumber, setCardNumber] = useState('001099018304')
    const [ngaySinh, setNgaySinh] = useState('1999-07-25')
    const [soNha, setSoNha] = useState('23D')
    const [phuongXa, setPhuongXa] = useState('Hà Trì 1')
    const [quanHuyen, setQuanHuyen] = useState('Phú Xuyên')
    const [tinhThanhpho, setTinhThanhpho] = useState('Hà Nội')


    const handleOk = async () => {
        const customer = {
            address: {
                phuongXa,
                quanHuyen,
                soNha,
                tinhThanhpho
            },
            cardNumber,
            email,
            fullName: {
                ho,
                ten,
                tenDem
            },
            // ngaySinh,
        }
        console.log('customer', customer);
        await postCustomer(customer).then((res) => {
            console.log("thành công", res.data);
        }).catch(res => {
            console.log("lỗi", res);
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
            const { person } = props.updateData
            setHo(person.fullName.ho);
            setTen(person.fullName.ten);
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
                <br />
                <Form.Item name={['customer', 'email']} rules={[{ type: 'email' }]}>
                    <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </Form.Item>

                < Input placeholder="Số chứng minh thư" value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)} />
                <br />
                <br />
                <Input value={idCustomer} onChange={e => setIdCustomer(e.target.value)} placeholder="Mã khách hàng" />
                <br />
                <br />
                    Ngày sinh : <DatePicker onChange={(date, dateString) => setNgaySinh(dateString)}
                />
                <br />
                <br />
                <Row justify="space-between">
                    <Col span={11}>
                        <Input value={soNha} placeholder="Số nhà"
                            onChange={e => setSoNha(e.target.value)} />
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
                            onChange={e => setQuanHuyen(e.target.value)} />
                    </Col>
                    <Col span={11}>
                        <Input value={tinhThanhpho} placeholder="Tỉnh/Thành phố"
                            onChange={e => setTinhThanhpho(e.target.value)} />
                    </Col>
                </Row>
            </Form>
        </Modal >
    )
}

