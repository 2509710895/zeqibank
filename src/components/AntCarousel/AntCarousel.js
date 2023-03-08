import React from 'react'
import { Carousel } from 'antd'
import './AntCarousel.css'
// import axios from 'axios';

export default function AntCarousel() {

    const contentStyle = {
        width: "100%",
        height: '400px',
        color: '#fff',
        lineHeight: '400px',
        textAlign: 'center',
        background: '#364d79',
    };
    //获取图片地址
    // axios.get('').then(res=>{
    //     //console.log(res);
    // }).catch(err=>{
    //     //console.log(err);
    // })

    return (
        <Carousel className='my-carousel' autoplay>
            <div>
                <img style={contentStyle} alt='' src="https://static01.imgkr.com/temp/314781a890ee44708c348ac12d87dbee.jfif"></img>
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
    )
}
