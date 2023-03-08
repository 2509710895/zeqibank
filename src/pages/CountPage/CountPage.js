import React, { useEffect, useState } from 'react'
import { Descriptions, message as msg } from 'antd'
import axios from 'axios'


import './CountPage.css'
const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
export default function CountPage() {
    const [userData, setUserData] = useState({})

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
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后重试')
        })
    }, [])


    return (
        <div className='CountBox'>
            <div className='CountContent'>
                <Descriptions title="账户信息" bordered column={2}>
                    <Descriptions.Item label="姓名" >{userData.username}</Descriptions.Item>
                    <Descriptions.Item label="身份证号" >{userData.idnumber}</Descriptions.Item>
                    <Descriptions.Item label="账号" >{userData.cardnumber}</Descriptions.Item>
                    <Descriptions.Item label="余额" >{userData.balance && userData.balance.toLocaleString('zh-CN', CNYoptions)}</Descriptions.Item>
                    {/* <Descriptions.Item label="币种">{'人民币或者显示逾期记录'}</Descriptions.Item>
                    <Descriptions.Item label="签约分行">{'广西区或显示工作状态'}</Descriptions.Item>
                    <Descriptions.Item label="签约状态">已签约</Descriptions.Item>
                    <Descriptions.Item label="账户状态">正常</Descriptions.Item>
                    <Descriptions.Item label="开户网点">中国建设银行股份有限公司龙州支行</Descriptions.Item>
                    <Descriptions.Item label="已购产品份数">1</Descriptions.Item> */}
                </Descriptions>
            </div>
        </div>
    )
}
