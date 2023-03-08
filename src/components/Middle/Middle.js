import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegPage from '../../pages/RegPage/RegPage'

import IndexPage from '../../pages/IndexPage/IndexPage'
import FirstPage from '../../pages/FirstPage/FirstPage'
import DetailPage from '../../pages/DetailPage/DetailPage'
import CountPage from '../../pages/CountPage/CountPage'
import BuyedDetailPage from '../../pages/BuyedDetailPage/BuyedDetailPage'
import BuyingPage from '../../pages/BuyingPage/BuyingPage'
import BuyedPage from '../../pages/BuyedPage/BuyedPage'
import Announcement from '../Announcement/Announcement'
import './Middle.css'
export default function Middle(props) {
    const { username, setUsername } = props
    return (
        <div className='middle'>
            <Routes>
                <Route path='/' element={<FirstPage username={username} setUsername={setUsername} />} />
                <Route path='/register' element={<RegPage />} />
                <Route path='/index' element={<IndexPage />} />
                <Route path='/index/detail/:id' element={<DetailPage />} />
                <Route path='/index/detail/:id/buying' element={<BuyingPage />} />
                <Route path='/count' element={<CountPage />} />
                <Route path='/buyed' element={<BuyedPage />} />
                <Route path='/buyed/detail/:orderId' element={<BuyedDetailPage />} />
                <Route path='/Announcement' element={<Announcement />} />
            </Routes>
        </div>
    )
}