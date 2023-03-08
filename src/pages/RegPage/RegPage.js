import React from 'react'
import axios from 'axios';

import {
    Form, Input, Button, Checkbox, Row,
    Col, message as msg,
} from 'antd';

import './RegPage.css'
import { useNavigate } from 'react-router-dom';
export default function RegPage() {
    const navigation = useNavigate()

    const onFinish = (values) => {
        //console.log('Success:', values);
        axios.post('/api/user/register', JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            //console.log(res);
            const { code, message } = res.data
            if (code === 1200) {
                msg.success('注册成功，前往登录')
                navigation('/')
            } else if (code === 1003) {
                msg.error(message)
            } else {
                message.error(message)
            }
        }).catch(err => {
            //console.log(err);
        })
    };

    const onFinishFailed = (errorInfo) => {
        //console.log('Failed:', errorInfo);
    };

    return (
        <div className='RegPage'>
            <div className='RegFormDiv'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size='large'
                    className='RegForm'
                >
                    <Form.Item
                        label="客户姓名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的姓名!',
                            },
                        ]}
                        className='RegFormItem'
                    >
                        <Input className='RegFormInput' />
                    </Form.Item>

                    <Form.Item
                        label="身份证号码"
                        name="idnumber"
                        rules={[
                            {
                                required: true,
                                message: '请输入身份证号码!',
                            },
                            () => ({
                                validator(_, value) {
                                    const patter = /^[0-9]{18}$/
                                    if (!value || patter.test(value)) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('请输入正确的身份证号!'));
                                },
                            }),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码!' },
                            () => ({
                                validator(_, value) {
                                    const patter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
                                    if (!value || patter.test(value)) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('请输入6-16位数字、字母密码!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入密码不匹配!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="卡号"
                        name="cardnumber"
                        rules={[
                            {
                                required: true,
                                message: '请输入卡号!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的手机号!',
                            },
                            () => ({
                                validator(_, value) {
                                    const patter = /^1[0-9]{10}$/
                                    if (!value || patter.test(value)) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('请输入正确的手机号!'));
                                },
                            }),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item label="验证码" extra="点击图片可刷新">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[{ required: true, message: '请输入验证码!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item> */}
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>阅读并同意<a href='https://www.baidu.com'>《xx银行个人网银开户协议》</a></Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

