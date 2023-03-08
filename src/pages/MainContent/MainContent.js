import React, { useEffect, useState } from 'react'
import { Table, Button, message as msg } from 'antd';
import './MainContent.css'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import md5 from 'md5';
import axios from 'axios';

// import { useNavigate } from 'react-router-dom'
const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
export default function MainContent() {

    //console.log(md5('wmx18278118009'));
    const [actData, setActData] = useState([])
    // const [actData, setActData] = useState([
    //     {
    //         key: 1,
    //         productName: "演示产品二",
    //         income: 0.04,
    //         price: 10000,
    //         period: 180,
    //         startTime: "2022-04-22 10:00:00",
    //         buyed: "0/100"
    //     },
    //     {
    //         key: 2,
    //         productName: "演示产品一",
    //         income: 0.03,
    //         price: 10000,
    //         period: 180,
    //         startTime: "2022-04-21 10:00:00",
    //         buyed: "0/100"
    //     },
    //     {
    //         key: 3,
    //         productName: "测试产品一",
    //         income: 0.02,
    //         price: 10000,
    //         period: 180,
    //         startTime: "2022-04-20 10:00:00",
    //         buyed: "50/100"
    //     }
    // ])
    const navigate = useNavigate()
    useEffect(() => {
        // //console.log(iconsRefs);
        //console.log('token', sessionStorage.getItem('token'), sessionStorage.getItem('id'));
        axios.get('/api/activity/list', {
            headers: {
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code, message, data } = res.data
            if (code === 1200) {
                data.forEach((obj, index) => {
                    const { setTotal, quantity } = obj
                    const num = 1000
                    // //console.log(index, setTotal, quantity, num.toLocaleString() + '/' + num.toLocaleString());
                    obj.key = obj.activityId
                    obj.buyed = (setTotal - quantity).toLocaleString() + '/' + setTotal.toLocaleString()
                    // obj.buyed = str1 + '/' + str2
                })
                //console.log('倒置数组', data);
                setActData(data.reverse())
            } else {
                msg.error(message + ',请重试！')
            }
        }).catch(err => {
            //console.log(err);
            msg.error('服务器繁忙,请稍后重试！')
        })
    }, [])

    const columns = [
        {
            title: '产品名称',
            dataIndex: 'productName',
            // onClick: click
            render: (text) => {
                // const { key } = record
                // return <Link to={'/index/detail/' + key}>{text}</Link>
                return <div style={{ color: '#d2002f' }}>{text}</div>
            },
        },
        {
            title: '预计收益率',
            dataIndex: 'income',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.income - b.income,
            render: text => (text * 100).toFixed(2) + '%'
        },
        {
            title: '起购金额',
            dataIndex: 'price',
            render: text => text.toLocaleString('zh-CN', CNYoptions)
        },
        {
            title: '产品期限',
            dataIndex: 'period',
            render: text => text + '天'
        },
        {
            title: '秒杀开始时间',
            dataIndex: 'startTime',
        },
        {
            title: '已售',
            dataIndex: 'buyed',
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => {
                // //console.log(text, record);
                const { key } = record;
                const nowTime = moment().format("YYYY-MM-DD HH:mm:ss")
                let content;
                if (nowTime < record.startTime) {
                    content = '查看'
                } else {
                    content = '去秒杀'
                }
                //如果没到秒杀时间，查看，
                //如果到了秒杀时间，去秒杀
                //过了时间，disable
                return <Button disabled={nowTime >= record.endTime}
                    type='primary' onClick={toDetail(key)} >{content}</Button>
            }
            // render: (text, record) => {
            //     const { key } = record
            //     return <Link to={'/index/detail/' + key}>{text}</Link>
            // },
        },
    ];

    const toDetail = (key) => {
        return () => {
            navigate('/index/detail/' + key)
        }
    }

    function onChange(pagination, filters, sorter, extra) {
        //console.log('params', pagination, filters, sorter, extra);
    }

    return (
        // <div className='good-list'>
        //     {
        //         goods.map((goodObj) => {
        //             return (<div className='good-card' key={goodObj.id} >{goodObj.id} {goodObj.goodName}</div>)
        //         })
        //     }
        // </div>
        <div className='good-table'>
            <div className='table-title'>产品列表</div>
            <Table
                locale={{
                    cancelSort: '点击取消排序',
                    triggerAsc: '点击升序',
                    triggerDesc: '点击降序'
                }}
                columns={columns} dataSource={actData} onChange={onChange}
                pagination={{ defaultCurrent: 1, total: actData.length }} />
        </div>
    )
}
