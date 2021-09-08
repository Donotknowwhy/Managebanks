import {
    Form, Input, Checkbox, Col, Row,
    Button, Modal, DatePicker, InputNumber
} from 'antd';
import { useState, useEffect } from 'react';
import { putCustomer } from '../../api/customer'

export default function ModalUpdateCustomer(props) {
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
        const customer = {
            id:props.updateData.id,
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
        await putCustomer(customer).then((res) => {
            console.log("thành công", res.data);
        }).catch(res => {
            console.log("lỗi", res.data);
        })
        props.toggleUpdate();
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
        props.toggleUpdate();
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
                    Lưu
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
                    <Input value={email} placeholder="Email"
                     onChange={e => setEmail(e.target.value)}  />
                <br/>
                <br/>
                <Input value={cardNumber} placeholder="Số chứng minh thư"
                    onChange={e => setCardNumber(e)} />
                <br />
                <br />
                <Input value={idCustomer} placeholder="Mã khách hàng"
                    onChange={e => setIdCustomer(e)} />
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

