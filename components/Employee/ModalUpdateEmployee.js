import {
    Form, Input, Checkbox, Col, Row,
    Button, Modal, DatePicker, InputNumber
} from 'antd';
import { useState, useEffect } from 'react';
import { putEmployee } from '../../api/employee'

export default function ModalUpdateEmployee(props) {
    const [visible, setVisible] = useState(true);
    const [ho, setHo] = useState('')
    const [tenDem, setTenDem] = useState('')
    const [ten, setTen] = useState('')
    const [email, setEmail] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [ngaySinh, setNgaySinh] = useState('')
    const [soNha, setSoNha] = useState('')
    const [phuongXa, setPhuongXa] = useState('')
    const [quanHuyen, setQuanHuyen] = useState('')
    const [tinhThanhpho, setTinhThanhpho] = useState('')
    const [idEmployee,setIdEmployee] =useState('')
    const [idLevel, setIdLevel] = useState('')
    const [idPos, setIdPos] = useState('')

    const handleOk = async () => {
        const employee = {
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
            idEmployee,
            position: {
                id: idPos,
            },
            level:{
                id: idLevel,
            }
        }
        await putEmployee(employee).then((res) => {
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
            setIdEmployee(props.updateData.idEmployee)
            setCardNumber(person.cardNumber)
            setNgaySinh(person.ngaySinh)
            setSoNha(person.address.soNha)
            setPhuongXa(person.address.phuongXa)
            setQuanHuyen(person.address.quanHuyen)
            setTinhThanhpho(person.address.tinhThanhpho)
            setIdLevel(props.updateData.idLevel)
            setIdPos(props.updateData.idPos)

        }
    }, [props.updateData]);
    return (
        <Modal
            visible={visible}
            onOk={handleOk}
            title="Tạo mới Nhân viên"
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}
            footer={[
                <Button key="submit" block type="primary"
                    onClick={handleOk}
                    disabled={ho && tenDem && ten && email &&
                         ngaySinh && cardNumber && idEmployee &&
                        soNha  && phuongXa && quanHuyen && tinhThanhpho && idPos && idLevel ? false : true}
                >
                    Lưu
                    </Button>
            ]}
        >

<Form>
                    <Row justify="space-between">
                        <Col span={7}>
                            {/* <Input onChange={e => setHo(e.target.value)} placeholder="Họ" /> */}
                            
                                <Input value={ho} onChange={e => setHo(e.target.value)} placeholder="Họ" />
                                <br/>
                        <br/>
                        </Col>
                        <Col span={7}>
                                <Input value={tenDem} onChange={e => setTenDem(e.target.value)} placeholder="Tên đệm" />
                                <br/>
                        <br/>
                        </Col>
                        <Col span={7}>
                            {/* <Input onChange={e => setTen(e.target.value)} placeholder="Tên" /> */}
                                <Input value={ten} onChange={e => setTen(e.target.value)} placeholder="Tên" />
                                <br/>
                        <br/>
                        </Col>
                    </Row>

                    {/* <Input onChange={e => setEmail(e.target.value)} placeholder="Email" /> */}
                  
                        <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                   
                        <br/>
                        <br/>
                  
                        <Input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="Số chứng minh thư" style={{ width: 470 }} />
                        <br/>
                        <br/>
                        <Input value={idEmployee} onChange={e => setIdEmployee(e.target.value)} placeholder="Mã nhân viên" style={{ width: 470 }} />
                        <br/>
                        <br/>
                        <InputNumber value={idLevel} onChange={e => setIdLevel(e)} placeholder="Cấp bậc" style={{ width: 470 }} />
                        <br/>
                        <br/>
                        <InputNumber value={idPos} onChange={e => setIdPos(e)} placeholder="Vị trí" style={{ width: 470 }} />
                        <br/>
                        <br/>

                    Ngày sinh : <DatePicker onChange={(date, dateString) => setNgaySinh(dateString)}
                    />
                    <br />
                    <br />
                    <Row justify="space-between">
                        <Col span={11}>
                            <Input value={soNha} onChange={e => setSoNha(e.target.value)} placeholder="Số nhà" />
                        </Col>
                        <Col span={11}>
                            <Input value={phuongXa} onChange={e => setPhuongXa(e.target.value)} placeholder="Phường/Xã" />
                        </Col>

                    </Row>
                    <br />
                    <Row justify="space-between">
                        <Col span={11}>
                            <Input value={quanHuyen} onChange={e => setQuanHuyen(e.target.value)} placeholder="Quận/Huyện" />
                        </Col>
                        <Col span={11}>
                            <Input value={tinhThanhpho} onChange={e => setTinhThanhpho(e.target.value)} placeholder="Tỉnh/Thành phố" />
                        </Col>

                    </Row>
                </Form>
        </Modal >
    )
}

