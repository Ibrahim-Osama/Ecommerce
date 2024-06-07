import React, { useState } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Register()
{
let [loading , setloading] =useState(false) 
let [errrmassage , seterrrmassage] =useState('') 

    let navigate = useNavigate()
  // function validates(values)
  // {
  //   console.log(5);
  //   let errors = {};
  //   if(!values.name)
  //   {
  //     errors.name = 'Name Is required'
  //   }
  //   else if(values.name.length > 10 )
  //   {
  //     errors.name = 'Name Max Length is 10 '
  //   }
  //   else if(values.name.length < 3 )
  //   {
  //     errors.name = 'Name Min Length is 3 '
  //   }
    
  //   if(!values.email)
  //   {
  //     errors.email = 'Email Is required'
  //   }
  //   else if(values.email.length < 3 )
  //   {
  //     errors.email = 'Email Min Length is 3 '
  //   }
  //   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
  //   {
  //     errors.email = 'Email Invalid'
  //   }

  //   if(!values.password)
  //   {
  //     errors.password  = 'password  Is required'
  //   }
  //   else if(values.password.length < 3 )
  //   {
  //     errors.password  = 'password  Min Length is 3 '
  //   }
  //   else if(!/^[A-Z][a-z0-9]{5,10}$/i.test(values.password ))
  //   {
  //     errors.password  = 'password  Should start with uppercase ...'
  //   }

  //   if(!values.password)
  //   {
  //     errors.password  = 'rePassword  Is required'
  //   }
  //   else if(values.password.length < 3 )
  //   {
  //     errors.password  = 'rePassword  Min Length is 3 '
  //   }
  //   else if(values.password !== values.rePassword)
  //   {
  //     errors.password  = 'rePassword  does not matched ...'
  //   }

  //   if(!values.phone)
  //   {
  //     errors.phone  = 'phone  Is required'
  //   }
  //   else if(!/^01[0125]{1}[0-9]{8}$/i.test(values.password ))
  //   {
  //     errors.phone  = 'phone Must Be Valid Eg Phone Number...'
  //   }
  //   return errors
  // }
  let validate = Yup.object(
    {
      name:Yup.string().required('Name IS Required').min(3,'Min Length 3 Words').max(12,'Max Length 12 Words'),
      email:Yup.string().required('email IS Required').email('Not Valid Email'),
      password:Yup.string().required('password IS Required').matches(/^[A-Z][a-z0-9A-Z]{6,11}/,'Password Must Start with Captital Word').min(7,'Min Length 7 Words').max(12,'Max Length 20 Words'),
      rePassword:Yup.string().required('rePassword IS Required').oneOf([Yup.ref('password')],'Password Not Matches'),
      phone:Yup.string().required('phone IS Required').matches(/^201[0125]{1}[0-9]{8}/,'Start With Country Code Pls'),
    })

  let formik = useFormik(
    {
      initialValues:
      {
        name:'',
        phone:'',
        email:'',
        password:'',
        rePassword:''
      },
      validationSchema:validate,
      onSubmit:async (values)=>
      {
        setloading(true)
       let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((error)=>
       {
       setloading(false)    //مش شغاله 
         seterrrmassage(`${error.response.data.message}`)
         console.log(error.response.data.message);
       })
       if(data.message === 'success')
       {
       setloading(false)     //مش شغاله 
        navigate('/Login')
       }
        console.log(data);
      }
    })

    
  return <>
  <div className='w-75 mx-auto py-4'>
    <h3>Register Now</h3>
    <form onSubmit={formik.handleSubmit}>  {/* like e.preventmethod   */}
    
    {errrmassage !=='' ? <div className="alert alert-danger"> {errrmassage}</div>:null}


    <label htmlFor="name">Name :</label>
    <input onBlur={formik.handleBlur}  className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" />
    {formik.errors.name && formik.touched.name ?   <div className="alert alert-danger">{formik.errors.name}</div>:null}


    <label htmlFor="email">Email :</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
    {formik.errors.email && formik.touched.email ?   <div className="alert alert-danger">{formik.errors.email}</div>:null}

    <label htmlFor="password">Password :</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" autoComplete='on' />
     {formik.errors.password && formik.touched.password ?   <div className="alert alert-danger">{formik.errors.password}</div>:null}

    <label htmlFor="rePassword">rePassword :</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" autoComplete='on' />
    {formik.errors.rePassword && formik.touched.rePassword ?   <div className="alert alert-danger">{formik.errors.rePassword}</div>:null}
    
    <label htmlFor="phone">phone :</label>
    <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" />
    {formik.errors.phone && formik.touched.phone ?   <div className="alert alert-danger">{formik.errors.phone}</div>:null}

    {loading ?  <button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : 
     <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn bg-main text-white'>Submit</button>
    }
   
   

    </form>
  </div>



  </>
}
