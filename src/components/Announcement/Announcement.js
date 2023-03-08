import React from 'react'
import { Typography, Divider } from 'antd';
import './Announcement.css'
const { Title, Paragraph, Text } = Typography;

export default function Announcement() {
    return (
        <>
            <div className='ABox'>
                <div className='ADiv'>
                    <Typography>
                        <Title>择栖银行秒杀系统</Title>
                        <Paragraph>
                            该项目聚焦银行理财产品在线秒杀，结合数据可视化、SM2、redission等创新技术手段，打造一套高并发，高性能，高可用的秒杀系统，解决在线秒杀存在的痛点，实现对管理员发布秒杀活动，管理活动，查看秒杀进程，配置初筛规则，客户参与秒杀活动，防止脚本，处理高并发等功能性需求的全面覆盖。兼具极强的复用性和创新型，同时具有极高的<Text style={{ color: "#d2002f" }}>使用价值和商业价值</Text>。
                        </Paragraph>
                        <Divider />
                        <Paragraph>
                            秒杀系统客户端提供给银行客户使用，其实现秒杀方案设计如下：
                        </Paragraph>
                        <Paragraph>
                            <Text strong>登录注册</Text>：客户打开秒杀系统客户端网页，输入手机号输入手机号和密码登录系统，才可进行秒杀、查看账户、查看订单等操作。若没有注册，则需前往注册页进行注册后，再进行登录。
                        </Paragraph>
                        <Paragraph>
                            <Text strong>参与秒杀活动</Text>：客户登录后，可在首页查看所有秒杀产品的产品名称，起购金额，投资期限，秒杀开始时间，已售量等部分重要信息，点击选中一款秒杀产品可进入该产品详情页查看秒杀产品的产品代码，产品生效时间，单人最大购买量等全部信息。客户点击购买，进入订单页填写购买信息，并支付。
                        </Paragraph>
                        <Paragraph>
                            <Text strong>查看个人信息与订单</Text>：客户查看账户可获知个人账户余额等信息；查看历史订单可查看个人所有已发起的产品订单，进入订单详情页可获知订单的所有信息并支付未支付订单。
                        </Paragraph>
                    </Typography>
                </div>
            </div>

        </>
    )
}
