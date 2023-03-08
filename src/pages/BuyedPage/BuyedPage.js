import React, { useEffect, useState } from 'react'
import { Button, Table, message as msg } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BuyedPage.css'
const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
export default function BuyedPage() {

    const [buyedData, setBuyedData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('/api/user/getpro/' + sessionStorage.getItem('id'), {
            headers: {
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            const { code, data, message } = res.data
            if (code === 1200) {
                data.forEach(obj => {
                    obj.key = obj.orderId
                })
                setBuyedData(data.reverse())
            } else {
                msg.error(message)
            }
            // setFlag(1)
        }).catch(err => {
            //console.log(err);
            msg.error('服务器繁忙，请稍后再试')
        })
    }, [])

    const columns = [
        // {
        //     title: '账号',
        //     dataIndex: 'count',
        // },
        {
            title: '产品名称',
            dataIndex: 'productName',
            render: (text) => <div style={{ color: '#d2002f' }}>{text}</div>
        },
        {
            title: '持有份额',
            dataIndex: 'totalFee',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                let type = a.type - b.type
                let yield1 = a.yield1 - b.yield1
                if (type !== 0) {
                    return type
                } else {
                    return yield1
                }
            },
            render: text => <div>{text && text.toLocaleString('zh-CN', CNYoptions)}</div>
        },
        {
            title: '预计收益',
            dataIndex: 'income',
            render: (text, record) => {
                return <div>{text && (record.totalFee * text).toLocaleString('zh-CN', CNYoptions)}</div>
            }
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            render: (text) => {
                let content;
                if (text === 1) {
                    content = '待支付'
                } else if (text == 2) {
                    content = '已支付'
                } else {
                    content = '已过期'
                }
                return content
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => <Button disabled={record.status > 2}
                type='primary' onClick={clickCheck(record.orderId)}>查看</Button>
        },
    ];

    const clickCheck = (orderId) => {
        return () => {
            navigate('/buyed/detail/' + orderId)
        }
    }

    function onChange(pagination, filters, sorter, extra) {
        //console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <>
            <div className='BuyedBox'>
                <div className='BuyedContent'>
                    <div className='buyed-table-title'>订单列表</div>
                    <Table
                        locale={{
                            cancelSort: '点击取消排序',
                            triggerAsc: '点击升序',
                            triggerDesc: '点击降序'
                        }}
                        columns={columns} dataSource={buyedData} onChange={onChange}
                        pagination={{ defaultCurrent: 1, total: buyedData.length }} />
                </div>
            </div>

        </>
    )
}
