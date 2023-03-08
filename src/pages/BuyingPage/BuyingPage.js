import React, { useEffect, useState } from 'react'
import {
    Descriptions,
    Button, Form, Checkbox,
    Select, Modal,
    Input, InputNumber,
    message as msg
} from 'antd';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import './BuyingPage.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;
const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
// const { confirm } = Modal;
export default function BuyingPage() {
    const location = useLocation()
    //console.log(location.state);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderData, setOrderData] = useState({})
    const [userData, setUserData] = useState({})
    const [dynamicUrl, setDynamicUrl] = useState("")
    //console.log('orderData', orderData);
    const { actData, verify } = location.state
    // //console.log(data);

    const [form] = Form.useForm();

    useEffect(() => {
        // 获取账户详情
        axios.get('/api/user/getamount/' + sessionStorage.getItem('id'), {
            headers: {
                'token': sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code, message, data } = res.data
            if (code === 1200) {
                setUserData(data)
                form.setFieldsValue({ cardnumber: data.cardnumber })
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后重试')
        })
        axios.post('/api/activity/getDynamicUrl', JSON.stringify({
            activityId: actData.activityId,
            userid: sessionStorage.id
        }), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'token': sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code, message } = res.data
            if (code === 1200) {
                const { data } = res.data
                //console.log(data);
                setDynamicUrl(data)
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后重试')
        })
    }, [])

    function onInputNumberChange(value) {
        //console.log('changed', value);
    }

    function handleChange(value) {
        //console.log(`selected ${value}`);
    }

    const handleOk = () => {
        //购买
        axios.post('/api/order/pay', JSON.stringify({
            orderId: orderData.orderId,
            userid: sessionStorage.id
        }), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'token': sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code, message, data } = res.data
            if (code === 1200) {
                //console.log(data);
                msg.success('支付成功')
                setIsModalVisible(false);
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后重试')
        })
    };

    const handleCancel = () => {
        // confirm({
        //     title: '您确定要取消订单吗？',
        //     icon: <ExclamationCircleOutlined />,
        //     // content: 'Some descriptions',
        //     okText: '是',
        //     okType: 'danger',
        //     cancelText: '否',
        //     onOk() {
        //         setIsModalVisible(false);
        //         //console.log('OK');
        //     },
        //     onCancel() {
        //         //console.log('Cancel');
        //     },
        // });
        setIsModalVisible(false);
    };

    const onFormFinish = (values) => {
        //console.log('Success:', values, actData);
        const { totalNumber } = values
        const { activityId, productId, price } = actData
        const value = {
            userid: Number(sessionStorage.getItem('id')),
            totalFee: price * totalNumber,
            activityId, productId, totalNumber,
            verifyHash: verify
        }
        //console.log('value', value);
        axios.post('/api/order/hashadd/' + dynamicUrl, JSON.stringify(value), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log("success", res);
            const { code, message } = res.data
            if (code === 1200) {
                //弹出确认框
                const { data } = res.data
                setOrderData({ ...value, ...actData, orderId: data.orderId })
                setIsModalVisible(true)
                msg.success('秒杀成功，请及时支付订单')
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后重试！')
        })
    };

    const onFinishFailed = (errorInfo) => {
        //console.log('Failed:', errorInfo);
    };

    const clickSpan = () => {
        form.setFieldsValue({ fengxian: '本人已经阅读风险揭示，愿意承担投资风险' })
    }

    return (
        <>
            <div className='DetailBox'>
                <div className='BuyFormDiv'>
                    <Form className='BuyForm'
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ totalNumber: 1, remember: true }}
                        onFinish={onFormFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        id='buyForm'
                    >
                        <Form.Item
                            label="产品名称"
                        // name="goodName"
                        >
                            <div>{actData.productName}</div>
                        </Form.Item>

                        <Form.Item
                            label="账户"
                            name="cardnumber"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        // initialValue={userData.cardnumber}
                        >
                            <Select style={{ width: 'auto' }} onChange={handleChange}>
                                <Option value={userData.cardnumber}>{userData.cardnumber}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="币种"
                        // name="1"
                        >
                            <div>人民币</div>
                        </Form.Item>
                        <Form.Item
                            label="参考余额"
                        // name="2"
                        >
                            <div>{userData.balance && userData.balance.toLocaleString()}</div>
                        </Form.Item>
                        <Form.Item
                            label="产品类型"
                        // name="3"
                        >
                            <div>存款产品</div>
                        </Form.Item>
                        <Form.Item
                            label="投资期限"
                        // name="4"
                        >
                            <div>{actData.period}天</div>
                        </Form.Item>
                        <Form.Item
                            label="分红方式"
                        // name="5"
                        >
                            <div>现金分红</div>
                        </Form.Item>
                        <Form.Item
                            label="购买份数"
                            name="totalNumber"
                            rules={[
                                { required: true, message: '请输入购买份数' }
                            ]}
                        >
                            {/* <Input style={{ width: '300px' }} placeholder='起点金额100,000.00，递增金额10,000.00' /> */}
                            <InputNumber min={1} max={actData.limit} onChange={onInputNumberChange} controls={true} />
                        </Form.Item>
                        <Form.Item
                            label="风险提示声明"
                        // name="7"
                        >
                            <div>本人已经阅读风险揭示，愿意承担投资风险</div>
                        </Form.Item>

                        <Form.Item
                            label="请输入上述风险提示声明"
                            name="fengxian"
                            rules={[
                                { required: true, message: '请输入上述风险提示声明' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value === '本人已经阅读风险揭示，愿意承担投资风险') {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('请输入上述风险提示声明!'));
                                    },
                                }),
                            ]}
                            extra={
                                <>
                                    <div>或<span onClick={clickSpan} style={{ color: 'rgb(234, 4, 55)', cursor: 'pointer' }}>点击此处</span>进行复制并粘贴</div>
                                </>
                            }
                        >
                            <Input style={{ width: '300px' }} placeholder='请输入上述风险提示声明' />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox id='fengxian'>本人已认真阅读并同意以下内容</Checkbox>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <div>本人未使用贷款、发行债券等筹集的非自有资金投资该产品</div>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                            label=""
                        // name="goodName"
                        >
                            <Link to={'/Announcement'}>《代销协议书》</Link>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Link to={'/Announcement'}>《投资协议书及投资者权益须知》</Link>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Link to={'/Announcement'}>《风险揭示书及产品说明书》</Link>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                购买
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Modal title="订单支付" okText={"支付"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <h4>点击取消可在30分钟内前往"我的产品"页面支付订单，过期则订单销毁！</h4>
                <Descriptions title="订单" bordered column={1}>
                    <Descriptions.Item label="订单编号">{orderData.orderId}</Descriptions.Item>
                    <Descriptions.Item label="购买人">{userData.username}</Descriptions.Item>
                    <Descriptions.Item label="购买账户">{userData.cardnumber}</Descriptions.Item>
                    <Descriptions.Item label="产品名称" >{orderData.productName}</Descriptions.Item>
                    <Descriptions.Item label="产品代码" >{orderData.productId}</Descriptions.Item>
                    <Descriptions.Item label="存款期限">{orderData.period}天</Descriptions.Item>
                    <Descriptions.Item label="产品金额/份">{(orderData.price && orderData.price.toLocaleString('zh-CN', CNYoptions))}元/份</Descriptions.Item>
                    <Descriptions.Item label="购买份数">{orderData.totalNumber}份</Descriptions.Item>
                    <Descriptions.Item label="购买总额">{(orderData.totalFee && orderData.totalFee.toLocaleString('zh-CN', CNYoptions))}</Descriptions.Item>
                    {/* <Descriptions.Item label="订单编号">{"710516165464321546"}</Descriptions.Item>
                    <Descriptions.Item label="购买人">{"测试客户"}</Descriptions.Item>
                    <Descriptions.Item label="购买账户">{"1234567812345678123"}</Descriptions.Item>
                    <Descriptions.Item label="产品名称" >{"测试产品一"}</Descriptions.Item>
                    <Descriptions.Item label="产品代码" >{"10000"}</Descriptions.Item>
                    <Descriptions.Item label="存款期限">{"180"}天</Descriptions.Item>
                    <Descriptions.Item label="产品金额/份">{((10000).toLocaleString('zh-CN', CNYoptions))}元/份</Descriptions.Item>
                    <Descriptions.Item label="购买份数">{5}份</Descriptions.Item>
                    <Descriptions.Item label="购买总额">{((50000).toLocaleString('zh-CN', CNYoptions))}</Descriptions.Item> */}
                </Descriptions>
            </Modal>
        </>
    )
}
