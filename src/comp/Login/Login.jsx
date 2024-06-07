import React, { useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom';



export default function Login({SaveUser_Data})//{setuserdata} or props.setuserdata
{
let [loading , setloading] =useState(false) 
let [errrmassage , seterrrmassage] =useState('') 

    let navigate = useNavigate()
  let validate = Yup.object(
    {
      email:Yup.string().required('email IS Required').email('Not Valid Email'),
      password:Yup.string().required('password IS Required').matches(/^[A-Z][a-z0-9A-Z]{6,11}/,'Password Must Start with Captital Word').min(7,'Min Length 7 Words').max(12,'Max Length 20 Words') 
    })

  let formik = useFormik(
    {
      initialValues:
      { 
        email:'',
        password:''      
      },
      validationSchema:validate,
      onSubmit:async (values)=>
      {
        setloading(true)
       let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((error)=>
       {
       setloading(false)    
         seterrrmassage(`${error.response.data.message}`)
         console.log(error.response.data.message);
       })
       if(data.message === 'success')
       {
       setloading(false)     
       localStorage.setItem('usertoken',data.token)
       SaveUser_Data()
        navigate(`/`)
       }
        console.log(data);
      }
    })

    
  return <>
  <div className='w-75 mx-auto py-4'>
    <h3>Login Now</h3>
    <form onSubmit={formik.handleSubmit}>  {/* like e.preventmethod   */}
    
    {errrmassage !=='' ? <div className="alert alert-danger"> {errrmassage}</div>:null}



    <label htmlFor="email">Email :</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
    {formik.errors.email && formik.touched.email ?   <div className="alert alert-danger">{formik.errors.email}</div>:null}

    <label htmlFor="password">Password :</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" autoComplete='on' />
     {formik.errors.password && formik.touched.password ?   <div className="alert alert-danger">{formik.errors.password}</div>:null}

    {loading ?  <button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : 
     <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn bg-main text-white'>LogIn</button>
    }
    <Link to={'/ForgetPassword'}>
    <button className='btn bg-dark mx-2 text-white'>Forget Password</button>
    </Link>
   

    </form>
  </div>



  </>
}
