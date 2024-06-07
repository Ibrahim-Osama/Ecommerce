import React, { useRef } from 'react'
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';


export default function Layout({userdata , setuserdata , Log_out , divEl ,SaveUser_Data}) {
  
 
  return <>
 <Navbar userdata={userdata} setuserdata={setuserdata} SaveUser_Data={SaveUser_Data} Log_out={Log_out}/>
 <div ref={divEl} className="container">
  <Outlet></Outlet>
 </div>
<Footer/>
    
  </>
}
