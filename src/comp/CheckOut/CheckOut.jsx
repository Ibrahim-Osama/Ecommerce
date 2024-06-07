import React, { useContext, useEffect, useState } from 'react'
import styles from './CheckOut.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Mycontext } from '../../Context/Cartcontext';
import img from '../../Assets/imgs/cartem2.gif'
import toast from "react-hot-toast";
import {Helmet} from "react-helmet";




export default function CheckOut()
{
  let navigate = useNavigate()
  let [cartproducts , setcartproducts] = useState(true)
  let [cartdetails , setcartdetails] = useState('')
  let {OnlinePaymenht,cartite , oflinePaymenht} = useContext(Mycontext)
  

  let{getlogedusercart} = useContext(Mycontext)
  let getdata = async ()=>
  {
    
    let respnonse = await getlogedusercart()

    if(respnonse?.data?.status==='success')
    {
      if(respnonse.data.numOfCartItems > 0 )
      {
        setcartproducts(false)

      }
    console.log(respnonse.data.data);
    }
  }

useEffect(()=>
{
  getdata()
},[])




  console.log(cartite);
  let formik =useFormik(
    {
      initialValues:
      {
        details:'',
        phone:'',
        city:''
      },onSubmit: async (values, { setSubmitting }) => {
        // ده هيتنادى بس مش هيعمل حاجة لأننا هندير الأكشنات في الدوال الزرار
        setSubmitting(false);
      }
    })
    const handleSubmit = async (values, actionType) => {
      if (actionType === 'online') {
        let response = await OnlinePaymenht(cartite.data.data._id, values);
        if (response?.data?.status === 'success') {
          window.location.href = response.data.session.url;
          console.log(response);
  
        } else {
          console.log(response);
        }
      } else if (actionType === 'cashout') {
        let response = await oflinePaymenht(cartite.data.data._id, values);
        if (response?.data?.status === 'success') {
          toast('Ok Payment Confirmed With Cash ',
          
            {
              icon: '🛒🎁',
              style: {
                borderRadius: '10px',
                background: '#333',
                margin:'50px 0px',
                color: '#fff',
              },
            }
          );
          navigate('/')
          // هنا يمكنك تحديد الأكشن اللي هيتم لما الدفع الكاش يكون ناجح
          console.log('Cash out payment successful', response);
        } else {
          console.log(response);
        }
      }
    };


  return <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Payment Page</title>
            </Helmet>
  {cartproducts? <div><img className='w-100' src={img} alt="" /></div>:
  <div className="w-50 py-5 mx-auto mt-free">
    <form  onSubmit={formik.handleSubmit}>
      <label htmlFor="details">Detalis :</label>
      <input type="text" className='form-control' value={formik.values.details} onChange={formik.handleChange} name="details" id="details" />
      
      <label htmlFor="phone">phone :</label>
      <input type="tel" className='form-control' value={formik.values.phone} onChange={formik.handleChange} name="phone" id="phone" />
      
      <label htmlFor="city">city :</label>
      <input type="text" className='form-control' value={formik.values.city} onChange={formik.handleChange} name="city" id="city" />
      
      <button
          type='button'
          className='btn btn-primary w-100 mt-3 text-center p-2'
          onClick={() => handleSubmit(formik.values, 'online')}
          disabled={formik.isSubmitting}
        >
          Online Payment
        </button>
        
        <button
          type='button'
          className='btn btn-primary w-100 mt-3 text-center p-2'
          onClick={() => 
            handleSubmit(formik.values, 'cashout')
            
         
        
        }
          disabled={formik.isSubmitting}
        >
          Cash Out Payment
        </button>
    </form>
  </div>
 }
  </>
}
