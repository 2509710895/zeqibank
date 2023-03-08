import React, { useEffect, useState } from 'react'
import {
    Descriptions, Alert, Button,
    message as msg, Modal
} from 'antd';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './BuyedDetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';

const { confirm } = Modal;
const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
export default function DetailPage() {
    const params = useParams()
    const [orderData, setOrderData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/order/get/' + params.orderId, {
            headers: {
                "token": sessionStorage.getItem('token'),
            }
        }).then(res => {
            //console.log(res);
            const { code, message } = res.data
            if (code === 1200) {
                const { data } = res.data
                setOrderData(data)
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('服务器繁忙，请稍后再试')
        })
    }, [])

    const payOrder = () => {
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
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后重试')
        })
    }

    const cancelOrder = () => {
        confirm({
            title: '您确定要取消订单吗？',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                //console.log('OK');
            },
            onCancel() {
                //console.log('Cancel');
            },
        });
    }

    const goBack = () => {
        navigate('/buyed', { replace: true })
    }

    return (
        <>
            <div className='DetailBox'>
                <div className='DetailContent'>
                    <Descriptions title="订单详情" bordered column={2}>
                        <Descriptions.Item label="订单编号" >{orderData.orderId}</Descriptions.Item>
                        {/* <Descriptions.Item label="产品名称" >{orderData.productName}</Descriptions.Item> */}
                        <Descriptions.Item label="产品代码" >{orderData.productId}</Descriptions.Item>
                        <Descriptions.Item label="产品生效日期">{orderData.effectTime}</Descriptions.Item>
                        <Descriptions.Item label="存款期限">{orderData.period}天</Descriptions.Item>
                        {/* <Descriptions.Item label="预计收益">{(orderData.income * 100).toFixed(3) + ''}%</Descriptions.Item>
                        <Descriptions.Item label="单位净值">{(1 + 1 * orderData.income + '').toLocaleString('zh-CN', CNYoptions)}</Descriptions.Item> */}
                        {/* <Descriptions.Item label="秒杀产品总额">{(orderData.setTotal * orderData.price).toLocaleString('zh-CN', CNYoptions)}</Descriptions.Item> */}
                        <Descriptions.Item label="产品金额/份">{(orderData.totalFee / orderData.totalNumber).toLocaleString('zh-CN', CNYoptions)}元/份</Descriptions.Item>
                        <Descriptions.Item label="购买份数">{orderData.totalNumber && orderData.totalNumber.toLocaleString()}份</Descriptions.Item>
                        <Descriptions.Item label="购买总额">{orderData.totalFee && orderData.totalFee.toLocaleString('zh-CN', CNYoptions)}份</Descriptions.Item>
                        <Descriptions.Item label="购买状态">{orderData.status === 1 ? "未支付" : "已支付"}</Descriptions.Item>

                        <Descriptions.Item label="订单生成时间">{orderData.createtime}</Descriptions.Item>
                        <Descriptions.Item label="订单支付时间">{orderData.paytime}</Descriptions.Item>

                        {/* <Descriptions.Item label="单人最大购买数">{orderData.limit}份</Descriptions.Item>
                        <Descriptions.Item label="已购份数">{(orderData.setTotal - orderData.quantity).toLocaleString()}/{(orderData.setTotal && orderData.setTotal.toLocaleString())}</Descriptions.Item>
                        <Descriptions.Item label="秒杀开始时间">{orderData.startTime}</Descriptions.Item>
                        <Descriptions.Item label="秒杀结束时间">{orderData.endTime}</Descriptions.Item> */}
                    </Descriptions>
                    {/* <Countdown title="Countdown" value={deadline} onFinish={onFinish} /> */}

                    <div className='Btns'>
                        <Button disabled={orderData.status === 2} type='primary' onClick={payOrder}>支付</Button>
                        <Button disabled={orderData.status === 2} type='primary' onClick={cancelOrder}>取消</Button>
                        <Button type='primary' onClick={goBack}>返回</Button>
                    </div>

                    {/* <Alert
                        message="温馨提示："
                        description={<div>理财非存款，产品有风险，投资须谨慎。<br />
                            理财产品过往业绩不代表其未来表现，不等于理财产品实际收益，投资须谨慎。<br />
                            本产品由建信理财有限责任公司发行和管理，中国建设银行不承担产品的投资、兑付和风险。</div>}
                        type="info"
                    /> */}
                </div>
            </div >

        </>
    )
}
