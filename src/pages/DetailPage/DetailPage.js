import React, { useEffect, useState } from 'react'
import {
    Statistic, Descriptions, Alert,
    Button, message as msg
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import YieldLine from '../../components/YieldLine/YieldLine';
import axios from 'axios';
import moment from 'moment';

import './DetailPage.css';
const { Countdown } = Statistic;

const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
export default function DetailPage() {
    const params = useParams()
    const [actData, setActData] = useState({})
    const [timeArrs, setTimeArrs] = useState([])
    const [strArrs, setStrArrs] = useState([])
    const [verify, setVerify] = useState('')
    const [ddate, setDate] = useState('')
    const navigate = useNavigate()

    // let deadline = actData ? moment(actData.startTime, "YYYY-MM-DD HH:mm:ss").valueOf() : 0;
    let deadline = new Date().getTime() + 60 * 60 * 1000;
    //console.log('ddl', deadline);
    useEffect(() => {
        //console.log('params:', params.id);
        //获取活动详情
        getActivity().then(res => {
            //console.log('one promise', res);
            if (res === 1200) {
                return getVerify()
            }
        }).then(res => {
            //console.log('two promise', res);
        })
    }, [params])
    useEffect(() => {
        if (JSON.stringify(actData) !== "{}") {
            // //console.log(actData);
            const timeArr = []
            const strArr = []
            const { startTime, endTime, effectTime, period } = actData
            const prodEndTime = moment(effectTime).add(period, 'days').format("YYYY-MM-DD")
            const date = moment().format("YYYY-MM-DD HH:mm:ss")
            const startDate = moment().add(3, 'days').format("YYYY-MM-DD");
            const endDate = moment().add(3, 'days').format("YYYY-MM-DD");
            //console.log(startDate, endDate, prodEndTime);
            if (date <= startTime) {
                timeArr.push(date)
                timeArr.push(startTime)
                timeArr.push(endTime)
                timeArr.push(effectTime)
                timeArr.push(prodEndTime)
                strArr.push('今日')
                strArr.push('秒杀开始')
                strArr.push('秒杀结束')
                strArr.push('产品生效')
                strArr.push('产品到期')
            } else if (date <= endTime) {
                timeArr.push(startTime)
                timeArr.push(date)
                timeArr.push(endTime)
                timeArr.push(effectTime)
                timeArr.push(prodEndTime)
                strArr.push('秒杀开始')
                strArr.push('今日')
                strArr.push('秒杀结束')
                strArr.push('产品生效')
                strArr.push('产品到期')
            } else if (date <= effectTime) {
                timeArr.push(startTime)
                timeArr.push(endTime)
                timeArr.push(date)
                timeArr.push(effectTime)
                timeArr.push(prodEndTime)
                strArr.push('秒杀开始')
                strArr.push('秒杀结束')
                strArr.push('今日')
                strArr.push('产品生效')
                strArr.push('产品到期')
            } else if (date <= prodEndTime) {
                timeArr.push(startTime)
                timeArr.push(endTime)
                timeArr.push(effectTime)
                timeArr.push(date)
                timeArr.push(prodEndTime)
                strArr.push('秒杀开始')
                strArr.push('秒杀结束')
                strArr.push('产品生效')
                strArr.push('今日')
                strArr.push('产品到期')
            } else {
                timeArr.push(startTime)
                timeArr.push(endTime)
                timeArr.push(effectTime)
                timeArr.push(prodEndTime)
                timeArr.push(date)
                strArr.push('秒杀开始')
                strArr.push('秒杀结束')
                strArr.push('产品生效')
                strArr.push('产品到期')
                strArr.push('今日')
            }
            setDate(date)
            setTimeArrs(timeArr)
            setStrArrs(strArr)
        }
    }, [actData])
    const getActivity = () => {
        return new Promise((resolve, reject) => {
            const value = {
                userid: sessionStorage.id,
                activityId: params.id
            }
            axios.post('/api/activity/get', JSON.stringify(value), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "token": sessionStorage.getItem('token'),
                }
            }).then(res => {
                //console.log(res);
                const { code, data, message } = res.data
                if (code === 1200) {
                    setActData({ ...data[0], ...data[1], ...data[2] })
                } else if (code === 1400) {
                    setActData({ ...data })
                    msg.error("您未通过初筛，无法参加活动！您可查看下方的初筛规则")
                } else {
                    msg.error(message)
                }
                resolve(code)
            }).catch(err => {
                //console.log(err);
                msg.error('服务器繁忙，请稍后再试')
            })
        })
    }
    const getVerify = () => {
        return new Promise((resolve, reject) => {
            const httpData = {
                userid: sessionStorage.id,
                activityId: params.id
            }
            axios.post('/api/user/getVerify', JSON.stringify(httpData), {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'token': sessionStorage.token
                }
            }).then(res => {
                //console.log(res);
                const { code, message, data } = res.data
                if (code === 1200) {
                    setVerify(data)
                    resolve(code)
                } else {
                    msg.error(message)
                }
            }).catch(err => {
                //console.log(err);
                reject(err)
                msg.error('网络繁忙，请稍后再试')
            })
        })
    }

    function onFinish() {
        //console.log('finished!');
    }

    const toBuying = () => {
        navigate('/index/detail/' + params.id + '/buying', {
            state: {
                actData,
                verify
            }
        })
    }
    const goBack = () => {
        navigate('/index', { replace: true })
    }

    return (
        <>
            <div className='DetailBox'>
                <div className='DetailContent'>
                    <Descriptions title="秒杀产品详情" bordered column={2}>
                        <Descriptions.Item label="产品名称" >{actData.productName}</Descriptions.Item>
                        <Descriptions.Item label="产品代码" >{actData.productId}</Descriptions.Item>
                        <Descriptions.Item label="产品生效日期">{actData.effectTime}</Descriptions.Item>
                        <Descriptions.Item label="存款期限">{actData.period}</Descriptions.Item>
                        <Descriptions.Item label="预计收益">{(actData.income * 100).toFixed(3) + ''}%</Descriptions.Item>
                        <Descriptions.Item label="单位净值">{(1 + 1 * actData.income + '').toLocaleString('zh-CN', CNYoptions)}</Descriptions.Item>
                        <Descriptions.Item label="秒杀产品总额">{(actData.setTotal * actData.price).toLocaleString('zh-CN', CNYoptions)}</Descriptions.Item>
                        <Descriptions.Item label="产品金额/份">{(actData.price && actData.price.toLocaleString('zh-CN', CNYoptions))}元/份</Descriptions.Item>
                        <Descriptions.Item label="单人最大购买数">{actData.limit}份</Descriptions.Item>
                        <Descriptions.Item label="已购份数">{(actData.setTotal - actData.quantity).toLocaleString()}/{(actData.setTotal && actData.setTotal.toLocaleString())}</Descriptions.Item>
                        <Descriptions.Item label="秒杀开始时间">{actData.startTime}</Descriptions.Item>
                        <Descriptions.Item label="秒杀结束时间">{actData.endTime}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ width: '100%' }}>
                        <div className='rule-title'>
                            秒杀倒计时
                        </div>
                        <Countdown value={deadline} onFinish={onFinish}
                            valueStyle={{ color: '#d2002f', margin: '0 auto', fontSize: 48, }} />
                    </div>

                    <div className='time-horizontal-div'>
                        <div className='rule-title'>
                            秒杀活动时间轴
                        </div>
                        <div className='time-top'>
                            <span className='time-top-span'>{timeArrs[0]}</span>
                            <span className='time-top-span'>{timeArrs[1]}</span>
                            <span className='time-top-span'>{timeArrs[2]}</span>
                            <span className='time-top-span'>{timeArrs[3]}</span>
                            <span className='time-top-span' style={{ textAlign: 'right' }}>{timeArrs[4]}</span>
                            {/* <span className='time-top-span'>{"2022-04-22 10:00:03"}</span>
                            <span className='time-top-span'>{"2022-04-22 11:00:00"}</span>
                            <span className='time-top-span'>{"2022-04-22 22:12:23"}</span>
                            <span className='time-top-span'>{"2022-04-28"}</span>
                            <span className='time-top-span' style={{ textAlign: 'right' }}>{"2022-05-28"}</span> */}
                        </div>
                        <div className="time-horizontal">
                            <span className={ddate >= timeArrs[0] ? 'fli time-span time-span-ed' : 'fli time-span'}><b></b></span>
                            <span className={ddate >= timeArrs[1] ? 'time-span time-span-ed' : 'time-span'}><b></b></span>
                            <span className={ddate >= timeArrs[2] ? 'time-span time-span-ed' : 'time-span'}><b></b></span>
                            <span className={ddate >= timeArrs[3] ? 'time-span time-span-ed' : 'time-span'}><b></b></span>
                            <span className={ddate >= timeArrs[4] ? 'time-span time-span-ed' : 'time-span'}><b></b></span>
                        </div>
                        <div className='time-top'>
                            <span className='time-top-span'>{strArrs[0]}</span>
                            <span className='time-top-span'>{strArrs[1]}</span>
                            <span className='time-top-span' style={{ textAlign: 'center' }}>{strArrs[2]}</span>
                            <span className='time-top-span' style={{ textAlign: 'center' }}>{strArrs[3]}</span>
                            <span className='time-top-span' style={{ textAlign: 'right' }}>{strArrs[4]}</span>
                            {/* <span className='time-top-span'>{"今日"}</span>
                            <span className='time-top-span'>{"秒杀开始时间"}</span>
                            <span className='time-top-span' style={{ textAlign: 'center' }}>{"秒杀结束时间"}</span>
                            <span className='time-top-span' style={{ textAlign: 'center' }}>{"产品生效时间"}</span>
                            <span className='time-top-span' style={{ textAlign: 'right' }}>{"产品到期时间"}</span> */}
                        </div>
                    </div>
                    <div>
                        <div className='rule-title'>
                            往期产品收益
                        </div>
                        <YieldLine />
                    </div>


                    <div className='Btns'>
                        <Button type='primary' onClick={toBuying}>秒杀</Button>
                        <Button type='primary' onClick={goBack}>返回</Button>
                    </div>
                    {/* <div className='rule'>
                        <div className='rule-title'>
                            交易规则
                        </div>
                        <div className='rule-content'>
                            <div className='rule-content-kid'>
                                <div className='rule-content-kid-l'>购买规则</div>
                                <div className='rule-content-kid-r'>购买时间：每个产品工作日的9:00至15:00，起购金额：1元起购，1元递增，购买费率：无，购买确认：申购份额于T+2个工作日确认</div>
                            </div>
                            <div className='rule-content-kid'>
                                <div className='rule-content-kid-l'>收益规则</div>
                                <div className='rule-content-kid-r'>客户收益：本产品无分红机制，客户收益=客户持有份额*（客户赎回确认产品单位净值-客户购买确认产品单位净值），产品费用：固定销售费率：0.3%/年；管理费率：0.2%/年 托管费率：0.02%/年；赎回费率：详见赎回规则</div>
                            </div>
                            <div className='rule-content-kid'>
                                <div className='rule-content-kid-l'>赎回规则</div>
                                <div className='rule-content-kid-r'> 赎回时间：每月15日为赎回截止日（非工作日顺延），赎回截止日前4个工作日为赎回开放日。客户持有产品180天后，可在赎回开放日1:00-23:00及赎回申请截止日1:00-15:00申请赎回，赎回金额：1份起赎，赎回费率：客户持有产品期限大于等于180天但小于270天时，收取0.5%；持有期限大于等于270天但小于360天时，收取0.25%；持有期限大于等于360天时，不收取赎回费，赎回确认：赎回申请于赎回截止日后第2个工作日确认并赎回资金到账</div>
                            </div>
                        </div>
                    </div> */}

                    <Alert
                        message="初筛规则："
                        description={<div>
                            {actData.isoverdue && actData.agelimit && actData.poorCredit && actData.unemployment ? `${actData.isoverdue ? `除${actData.overdueDebt}元${actData.overdueDate}天内还清外${actData.overdueYear}年内逾期${actData.overdueCount}次者, ` : ``}${actData.poorCredit ? `失信人员,` : ``}${actData.unemployment ? `无业/失业人员,` : ``}年龄低于${actData.agelimit}岁者` : `无`}
                        </div>}
                        type="info"
                    />
                    <div></div>
                </div>
            </div >
        </>
    )
}
