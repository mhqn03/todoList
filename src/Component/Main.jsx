import React, { useState } from 'react'
import '../index.css'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import SideBar from './SideBar/SideBar'
function Main() {
    const [select, setSelect] = useState(null)


  return (
    <div>
        <SideBar setSelect={setSelect} />
        <Header select={select} />
        <Footer select={select} />
    </div>
  )
}

export default Main