import React, { useEffect, useRef, useState } from 'react'
import './Footer.css'
import ClassHook from '../ClassHook'
// import axios from 'axios'
export default function Footer() {
    // const click = () => {
    //     axios.get("/api/hello").then(res => {
    //         console.log(res);
    //     })
    // }

    // const [data, setData] = useState('a')
    // const btnRef = useRef(null)
    // useEffect(() => {
    //     btnRef.current.onclick = function () {
    //         // setTimeout(() => {
    //         console.log("data 前", data);
    //         setData(data + "a")
    //         console.log("data 后", data);
    //         // }, 0)
    //     }
    // }, [data])
    return (
        <div className='Footer'>
            <div className='content'>
                Copyright © www.zeqibank.com All Rights Reserved.<br />
                备案号：川ICP备xxxxxxx号-x
            </div>
            {/* <button onClick={click}>点击</button> */}
            {/* <button ref={btnRef}>点击data:{data}</button> */}
            <ClassHook />
        </div>
    )
}
