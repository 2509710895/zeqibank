import React from 'react'
import { Carousel, Form, Input, Button, Checkbox, message as msg } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './FirstPage.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';

export default function FirstPage(props) {
    const { setUsername } = props
    // axios({
    //     method: 'get',
    //     url: '/api/device/getAll',
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf-8'
    //     }
    // }).then(res => {
    //     console.log("success", res);
    // }).catch(err => {
    //     console.log(err);
    // })

    // axios.get('http://10.0.0.30:8001/user/allusers', {
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf-8'
    //     }
    // }).then(res => {
    //     //console.log("success", res);
    // }).catch(err => {
    //     //console.log(err);
    // })

    const navigate = useNavigate()

    const contentStyle = {
        width: '100%',
        height: '750px',
        color: '#fff',
        lineHeight: '750px',
        textAlign: 'center',
        background: '#364d79',
        objectFit: 'cover',
    };

    // 获取图片地址
    // axios.get('').then(res => {
    //     //console.log(res);
    // }).catch(err => {
    //     //console.log(err);
    // })

    const onFinish = (values) => {
        //console.log('Received values of form: ', values);
        //console.log(md5(values.password));
        // let temp = {
        //     phone: '123',
        //     password: 'dzm123456'
        // }
        // axios({
        //     method: 'post',
        //     url: 'http://10.0.0.30:8001/user/login',
        //     data: JSON.stringify(temp),
        //     headers: {
        //         'Content-Type': 'application/json; charset=utf-8'
        //     }
        // }).then(res => {
        //     //console.log("success", res);
        // }).catch(err => {
        //     //console.log(err);
        // })

        axios.post('/api/user/logintoken', JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            //console.log("success", res);
            const { code, data } = res.data
            if (code === 1200) {
                const { token, id, username } = data
                msg.success('登录成功')
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('id', id)
                sessionStorage.setItem('username', username)
                setUsername(username)
                navigate('/index')
            } else {
                msg.error('手机号或密码错误')
            }
        }).catch(err => {
            //console.log(err);
            msg.error("服务器繁忙，请稍后重试")
        })

        // fetch('http://10.0.0.30:8001/user/login', {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: new FormData().append('username', 'Jiaxin'),
        // });

    };

    const onFinishFailed = (errorInfo) => {
        //console.log("onFinishFailed", errorInfo);
    }

    return (
        <div className='CarouselDiv'>
            <Carousel className='carousel' autoplay>
                <div>
                    <img className='carousel-img' alt='' src='https://static01.imgkr.com/temp/314781a890ee44708c348ac12d87dbee.jfif' style={contentStyle}></img>
                </div>
                {/* <div>
                    <div style={contentStyle}>2</div>
                </div>
                <div>
                    <div style={contentStyle}>3</div>
                </div>
                <div>
                    <div style={contentStyle}>4</div>
                </div> */}
            </Carousel>
            <div className='LoginDiv'>
                <div className='login'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: '请输入您的手机号!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        {/* <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="http:">
                                忘记密码
                            </a>
                        </Form.Item> */}

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                        或<Link to="/register">注册</Link>
                    </Form>
                </div>
            </div>
        </div>
    )
}
