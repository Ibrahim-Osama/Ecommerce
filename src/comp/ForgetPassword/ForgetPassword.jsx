import React, { useContext, useState } from 'react'
import styles from './ForgetPassword.module.css';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { MyAuthcontext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

export default function ForgetPassword({SaveUser_Data})
{
  const notify = (massage) => toast(massage, {
    icon: '📩✅Ⓜ',
    style: {
      borderRadius: '10px',
      background: '#333',
      margin:'50px 0px',
      color: '#fff',
    },
  });


  let navigate = useNavigate()
  let [codesend ,setcodesend] = useState(false)
  let [passwordcgange ,setpasswordcgange] = useState(false)


  let {ForgetEmailpasword,verifyResetCode,resetPassword} = useContext(MyAuthcontext)

  let validate = Yup.object(
    {
      email:Yup.string().required('Email Required').email('Not Valid Email')
    })


  let validate2 = Yup.object(
    {
      resetCode:Yup.number().typeError("Code must be A number").required('Code Required').max(999999,'must be 6 digts')
    })

  let validate3 = Yup.object(
    {
      email:Yup.string().required('Email Required').email('Not Valid Email'),
      newPassword:Yup.string().required('password IS Required').matches(/^[A-Z][a-z0-9A-Z]{6,11}/,'Password Must Start with Captital Word').min(7,'Min Length 7 Words').max(12,'Max Length 20 Words') 
    })


  let formic = useFormik(
    {
      initialValues:
      {
        email:''
      },
      onSubmit: async(value)=>
      {
        console.log(value);
        let res = await ForgetEmailpasword(value)
          console.log(res);
          notify('Code Sent')
          setcodesend(true)
        
      },
      validationSchema:validate
    })


  let formic2 = useFormik(
    {
      initialValues:
      {
        resetCode:''
      },
      onSubmit: async(value)=>
      {
        console.log(value);
        let res = await verifyResetCode(value)
        notify(res?.response?.data?.message)
        if(res?.response?.data?.message !== 'Reset code is invalid or has expired')
        {
          setpasswordcgange(true)

        }
        
      },
      validationSchema:validate2
    })



  let formic3 = useFormik(
    {
      initialValues:
      {
        email:'',
        newPassword:''
      },
      onSubmit: async(value)=>
      {
        console.log(value);
        let res = await resetPassword (value)
        
        if(res?.statusText== "OK")
        {
          localStorage.setItem('usertoken',res?.data?.token)
          SaveUser_Data()
          notify('Password Changed')
          navigate('/')
            console.log(res.data);
        }
          
      },
      validationSchema:validate3
    })




  return <>
 <div>
   <form onSubmit={formic.handleSubmit}   className='mt-free d-flex justify-content-center align-items-center flex-column'>
   <label htmlFor="Email"></label>
    <input onBlur={formic.handleBlur} onChange={formic.handleChange} value={formic.values.email} className='form-control w-50 my-3' placeholder='Enter UR Email' type="email" name="email" id="email" />
    {formic.errors.email ?  <p className='alert alert-danger w-50'>{formic.errors.email}</p>:null}
    <button disabled={!(formic.dirty && formic.isValid)} className='btn btn-dark' type='submit'>Send Code</button>
   </form>

    {codesend ? <>   <form onSubmit={formic2.handleSubmit}   className='mt-free d-flex justify-content-center align-items-center flex-column'>
   <label htmlFor="resetCode"></label>
    <input onBlur={formic2.handleBlur} onChange={formic2.handleChange} value={formic2.values.resetCode} className='form-control w-50 my-3' placeholder='Enter UR resetCode' type="text" name="resetCode" id="resetCode" />
    {formic2.errors.resetCode ?  <p className='alert alert-danger w-50'>{formic2.errors.resetCode}</p>:null}
    <button disabled={!(formic2.dirty && formic2.isValid)} className='btn btn-dark' type='submit'>Verfiy</button>
   </form>
   </>:null}

   {passwordcgange ? <><form onSubmit={formic3.handleSubmit}   className='mt-free d-flex justify-content-center align-items-center flex-column'>
   <label htmlFor="email"></label>
    <input onBlur={formic3.handleBlur} onChange={formic3.handleChange} value={formic3.values.email} className='form-control w-50 my-3' placeholder='Enter UR Emait' type="email" name="email" id="email" />
    {formic3.errors.email && formic3.touched.email ?  <p className='alert alert-danger w-50'>{formic3.errors.email}</p>:null}

   <label htmlFor="newPassword"></label>
    <input onBlur={formic3.handleBlur} onChange={formic3.handleChange} value={formic3.values.newPassword} className='form-control w-50 my-3' placeholder='Enter UR newPassword' type="password" name="newPassword" id="newPassword" />
    {formic3.errors.newPassword && formic3.touched.newPassword ?  <p className='alert alert-danger w-50'>{formic3.errors.newPassword}</p>:null}

    <button disabled={!(formic3.dirty && formic3.isValid)} className='btn btn-dark' type='submit'>Send resetCode</button>
   </form></>:null}
 </div>
  </>
}
