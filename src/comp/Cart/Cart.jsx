import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { Mycontext } from '../../Context/Cartcontext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import img from '../../Assets/imgs/cartempty.gif'
import {Helmet} from "react-helmet";



export default function Cart()
 {
  let productid = 0
  const Swal = require('sweetalert2')

  
  let [cartproducts , setcartproducts] = useState(true)
  let [cartdetails , setcartdetails] = useState('')
  let [loading , setloading] = useState(true)
  
  let{getlogedusercart , deleteSpecficCart , updateQuentity,deleteAllcart} = useContext(Mycontext)
  let getdata = async ()=>
  {
    
    let respnonse = await getlogedusercart()
    setloading(false)
 
    if(respnonse?.data?.status==='success')
    {
      setcartdetails(respnonse.data.data)
      if(respnonse.data.numOfCartItems > 0 )
      {
        setcartproducts(false)

      }
    console.log(respnonse.data.data);
    }
  }
  
  let removeData = async (Productid)=>
  {
    let respnonse = await deleteSpecficCart(Productid)
    if(respnonse?.data?.status==='success')
    {
     setcartdetails(respnonse.data.data)
    }
  }
  let Cleardata = async ()=>
  {
    let respnonse = await deleteAllcart()
    setcartdetails(respnonse.data.data)
    if(respnonse?.data?.status==='success')
    {
    }
  }
  let updatequ = async (Productid,count)=>
  {
    let respnonse = await updateQuentity(Productid , count)
   
    setcartdetails(respnonse.data.data)

  }
  
  useEffect(()=>
  { 
    
    getdata()
  }
  ,[])

  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Cart Details</title>
            </Helmet>
    {loading?  <i className="fas fa-spinner fa-spin text-main mt-free fa-3x d-flex align-items-center justify-content-center"></i>
    :
    cartproducts? <div><img className='w-100  mt-free' src={img} alt="" /></div>:
    <div className='container mt-free '>
    <h3 className='w-100 text-center'>Shopping cart </h3>
    <hr />
    <div className='row responsivetable px-2'>
      <div className='col-md-2'>
          <h3>Product</h3>
      </div>
      <div className='col-md-2 '>
           <h4 >Name</h4>
      </div>
      <div className='col-md-2 '>
            <h3>Quantity</h3>
      </div>
      <div className='col-md-2 '>
            <h3>Price</h3>
      </div>
      <div className='col-md-2 '>
            <h3>Total</h3>
      </div>
      <div className='col-md-2 '>
            <h3 className='text-danger'>Remove</h3>
      </div>
    </div>



      {cartdetails?.products?.map((item)=>
      {return <div key={item._id} id={`${productid++}`} className='imgcartrespoinse row border bg-dark p-2 rounded-4 mt-3 align-items-center'>
        <div className="col-md-2  my-3">
          <img className='w-100 ' src={item.product.imageCover} alt="" />
        </div>
        
        <div className='col-md-2 '>
            <h5 className='lighty fw-bolder fonntresponsive'>{item.product.title}</h5>
        </div>
        <div className='col-md-2 d-flex justify-content-center align-items-center'>
          <button onClick={()=>{updatequ(item.product._id,item.count +1)}} className=" fonntresponsivebtn btn btn-outline-info fw-bold  rounded me-3 ">+</button>
          <span className='lighty h4'> {item.count} </span>
          <button disabled={item.count > 1 ? false : true } onClick={()=>{updatequ(item.product._id,item.count -1)}} className="fonntresponsivebtn btn btn-outline-info fw-bold  rounded ms-3 ">-</button>
        </div>
        <div className='col-md-2 fonntresponsiveparent'>
            <span className='fonntresponsive   lighty h5 fw-bolder'>{item.price} EGP </span>
        </div>
        <div className='col-md-2 fonntresponsiveparent'>
            <span className='fonntresponsive lighty h5 fw-bolder'>{(item.price)*(item.count)} EGP </span>
        </div>
        <div className='col-md-2'>
        <button  onClick={()=>{
          
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            background: '#303030',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              removeData(item.product._id)
              Swal.fire({
                background: '#303030',
                color: '#ffffff',
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              
            }
          });
          }} className='fonntresponsivebtn bg-transparent px-3 py-2'>  <i className="fa-lg lighty fa-solid fa-trash-can"></i></button>
        </div>
        
    </div>
      })}

<div className="w-100 ms-2 rounded-4 mt-3 lighty d-flex justify-content-end">
            {cartdetails?.totalCartPrice ? (
              <h3 className="bg-dark p-4 rounded-4 carttotal ">Total: {cartdetails.totalCartPrice} EGP</h3>
            ) : null}
          </div>

      <div className=' d-flex align-items-center justify-content-around mt-3 '>
    <Link className='btn mb-5 btn-primary py-3 rounded-5 w-25 text-center' to={'/'}>
    shopping
    </Link>
    <Link className='btn mb-5 btn-success py-3 rounded-5 w-25 text-center' to={'/CheckOut'}>
    Check Out
    </Link>
     
      <button onClick={()=>{
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            background: '#303030',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Cleardata()
              Swal.fire({
                background: '#303030',
                color: '#ffffff',
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              setcartproducts(true)
            }
          });
        
          
        }} className='btn btn-danger py-3 rounded-5 w-25 mb-5 text-center'>Remove All</button>
      </div>
        
    </div>
    }
  
    
  </>
  



//  وقفت في 6.30
    
}
