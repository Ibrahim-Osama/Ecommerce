import React, { useContext, useState } from 'react'
import styles from './Setting.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from "react-hot-toast";
import { MyAuthcontext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
export default function Setting({SaveUser_Data})
{
  let navigate = useNavigate()
  let [loading , setloading] =useState(false) 

  const notify = (massage) => toast(massage, {
    icon: '🔐',
    style: {
      borderRadius: '10px',
      background: '#333',
      margin:'50px 0px',
      color: '#fff',
    },
  });
  
  let {ForgetUserPassword} = useContext(MyAuthcontext)
  let getuserpaswword=async(email)=>
  {
    setloading(true)
    let response = await ForgetUserPassword(email)
    console.log(response);
    if(response.data.message === "success"){

      setloading(false)
      localStorage.clear()
      SaveUser_Data()
      notify(response.data.message)
      navigate('/login')


    }
  }

  let myvalidate = Yup.object(
    {
      currentPassword:Yup.string().required('currentPassword Required'),
      password:Yup.string().required('password IS Required').matches(/^[A-Z][a-z0-9A-Z]{6,11}/,'Password Must Start with Captital Word').min(7,'Min Length 7 Words').max(12,'Max Length 20 Words'),
      rePassword:Yup.string().required('rePassword IS Required').oneOf([Yup.ref('password')],'Password Not Matches'),
    })
  let form1 = useFormik(
    {

      initialValues:
      {
        currentPassword:'',
        password:'',
        rePassword:''
        
      },
      onSubmit:(values)=>
      {
        console.log(values);
        getuserpaswword(values)
      },
      validationSchema:myvalidate
    })
 
 

 
 return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Setting</title>
            </Helmet>
 <form className='mt-free' onSubmit={form1.handleSubmit}>
  <div className='d-flex flex-column justify-content-center align-items-center '>
    <label htmlFor="currentPassword">currentPassword</label>
    <input onChange={form1.handleChange} value={form1.values.currentPassword} className='form-control w-50' placeholder='Enter UR currentPassword' type="password" name="currentPassword" id="currentPassword" />
    <p className='text-danger'>{form1.errors.currentPassword}</p>

    <label htmlFor="password">password</label>
    <input onChange={form1.handleChange} value={form1.values.password} className='form-control w-50' placeholder='Enter UR password' type="password" name="password" id="password" />
    <p className='text-danger'>{form1.errors.password}</p>

    <label htmlFor="rePassword">rePassword</label>
    <input onChange={form1.handleChange} value={form1.values.rePassword} className='form-control w-50' placeholder='Enter UR rePassword' type="Password" name="rePassword" id="rePassword" />
    <p className='text-danger'>{form1.errors.rePassword}</p>

    {loading ?  <button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> :
    <button disabled={!(form1.dirty && form1.isValid)} type='submit'className='btn btn-dark  p-2'>Send Code</button> }
  
  
  </div>
 </form>
    
  </>
}
