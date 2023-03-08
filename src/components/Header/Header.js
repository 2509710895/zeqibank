import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { message as msg } from 'antd'
import './Header.css'
export default function Header(props) {
    const { username, setUsername } = props
    const navigations = ['我的首页', '我的账户', '我的订单']
    const paths = ['/index', '/count', '/buyed']
    const btns = []
    const location = useLocation()
    const usenavigation = useNavigate()
    const clickBtn = (index) => {
        return () => {
            btns.forEach(btn => {
                btn.style.color = '#000000'
            })
            btns[index].style.color = "#d2002f"
            if (sessionStorage.id) {
                //console.log("现在：" + location.pathname + ",去" + paths[index])
                usenavigation(paths[index])
            } else {
                msg.error('请登录')
            }
        }
    }

    const clickLogin = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('username')
        setUsername('登录')
    }

    return (
        <div className='header'>
            <div className='headerDiv'>
                <div className='logoDiv'>
                    <img id='logo' alt='' src='https://static01.imgkr.com/temp/c98a0dd189a748529d38d7dec5b0450f.jpg'></img>
                    <div className='logotitle'>择栖银行秒杀系统</div>
                </div>
                <div className='loginAndReg'>
                    <Link to="/" onClick={clickLogin}>{sessionStorage.id ? sessionStorage.username + ',欢迎登录' : username}</Link>
                </div>
            </div>
            <div className='navigationBar'>
                <div id='navigationDivs'>
                    {
                        navigations.map((navigation, index) => {
                            return <span key={index + navigation} onClick={clickBtn(index)} ref={(r) => { if (r) btns.push(r) }}
                                className='iconfont navigation' >{navigation}</span>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
