import React, { useContext, useEffect, useState } from 'react'
import styles from './OrderDetails.module.css';
import { jwtDecode } from 'jwt-decode';
import { MyOrdersContext } from '../../Context/Orders';
import ReactPaginate from 'react-paginate';
import { PiCubeThin } from "react-icons/pi";
import { FaCircleArrowRight } from "react-icons/fa6";
import { GiDeliveryDrone } from "react-icons/gi";
import {Helmet} from "react-helmet";

import img from '../../Assets/imgs/orders.jpg'
export default function OrderDetails()
{

  
  let [data ,setdata] = useState([])
  let {GetUserOrders} = useContext(MyOrdersContext)
  let getdata = async (userid)=>
  {
    let res = await GetUserOrders(userid)
    setdata(res)
    console.log(res);
  }



  useEffect(()=>
  {
  let Encodetoken = localStorage.getItem('usertoken')
  let userid = jwtDecode(Encodetoken).id
    getdata(userid)
  },[])

  let [newdata,setsnewdata] =useState('')

  let itemsPerPage = 3
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = newdata === ''? data?.data?.slice(itemOffset, endOffset) :newdata?.slice(itemOffset, endOffset);
  const pageCount = newdata  === ''? Math.ceil( data?.data?.length / itemsPerPage)
                    :Math.ceil( newdata?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.data?.length 
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  let [rows ,setrows] = useState({})

  let itemsPerPage1 = 3
  const [itemOffset1, setItemOffset1] = useState(0);
  const endOffset1 = itemOffset1 + itemsPerPage1;
  console.log(`Loading items from ${itemOffset1} to ${endOffset1}`);
  const currentItems1 = rows?.cartItems?.slice(itemOffset1, endOffset1)
  const pageCount1 = Math.ceil( rows?.cartItems?.length / itemsPerPage1)
                   

  const handlePageClick1 = (event) => {
    const newOffset1 = (event.selected * itemsPerPage1) % rows?.cartItems?.length 
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset1}`
    );
    setItemOffset1(newOffset1);
  };








  function searchby(word)
  {
    let seachinfo = (data?.data?.filter((item)=> item?.id.toString().includes(word.toString())))
    setsnewdata(seachinfo)
    console.log(seachinfo);
  }
  let getrow = (row)=>
  {
      setrows(row)
      document.getElementById('none').classList.remove('d-none')
  }
  


  let getdate = (datee)=>
  {
    datee = new Date(datee);
    let day = datee.getDate() + 5 
    let year = datee.getFullYear()
    let month = datee.getMonth() + 1

    let fulldate = `${year}-${month}-${day}`

    return fulldate
  }
  





  return <>
 <Helmet>
                <meta charSet="utf-8" />
                <title>Orders Details</title>
            </Helmet>
<div className="row">
<div className='col-md-6'>
  <div className='mt-free pt-4'>
 <div className='col-md-8 '>
 <input className='form-control'onChange={(e)=>
 {
  
  searchby(e.target.value)
  
  }}  type="text" name="" id="search" placeholder='Search By Order_Id'/>
 </div>
  {
  currentItems?.map((item)=>
  {return <div className="py-3">
    <div className='pointers col-md-8 bg-dark d-flex justify-content-between align-items-center p-2 rounded-3 lighty' onClick={(e)=>
      {

        getrow(item)
      }}>
    <img className='w-25 rounded-3' src={img} alt=""/>
    
   <div>
   <h4>{item.paymentMethodType}</h4>
    <h4>{Math.round(item.totalOrderPrice - (item.totalOrderPrice*.02) + (item.totalOrderPrice*.05))}$</h4>
   </div>
    <h5>Order ID :{item.id}</h5>
    
    </div>

    




   </div>

  })}
     
</div>
<ReactPaginate 
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName=' d-flex mt-5 align-items-center'
        pageClassName='virus'
        pageLinkClassName='linke'
        activeLinkClassName='lighty '
        activeClassName='lighty bg-lighty'
      
      />
  </div>

  <div className='col-md-6 mt-free d-none' id='none'>
  <div className='d-flex pt-4 justify-content-between '>
 <div className='d-flex align-items-center'>
   <PiCubeThin className=' fs-5 mx-2 mb-1'></PiCubeThin>
  <h5 className='fs-6'>OrderID{rows ? rows?.id:null}</h5>
  <h5 className='mx-2 fs-6 bg-mm p-2'>Order In Transmit</h5>
  </div>
    <div className=''>
    <button className='bg-success  btn text-white mx-2'>Ready To Ship</button>
  <button onClick={()=>
      {
        document.getElementById('none').classList.add('d-none')
      }} className='bg-success btn text-white '>   <FaCircleArrowRight className=''></FaCircleArrowRight> </button>
    </div>
  </div>
  <h6 className='my-4'>Order Tracking</h6>

  <div className='d-flex justify-content-between my-4'>
  <h5>Product in Transmit</h5>
  <h5>Delivery Time 3 Days</h5>
  </div>

  <div className='d-flex justify-content-around rgb  mt-4 '>
  <h6>Order date</h6>
  <h6>Delivery date</h6>
  <h6>Courier</h6>
  <h6>Address</h6>
  </div>
  <div className='d-flex justify-content-around mb-4 '>
  <h6>{rows ? rows?.createdAt?.slice(0,10):null}</h6>
  <h6 className='ms-5'>{rows ? getdate(rows?.createdAt?.slice(0,10)) :null}</h6>
  <h6 className='ms-1'><GiDeliveryDrone className='drone'/> Drone Delivery</h6>
  <h6 className='me-4'>{rows?.shippingAddress?.city ? rows?.shippingAddress?.city:'Cairo'}</h6>
  </div>
  <h5 className='mt-3'>
    Order Summery
  </h5>
  <div>

    <div className=''>
      
    <div className='d-flex justify-content-between my-3'>
        <h5>Sup Total</h5>
        <h5>${rows.totalOrderPrice}</h5>
      </div>

      <div className='d-flex justify-content-between my-3'>
        <h5>Discount</h5>
        <h5>${rows.totalOrderPrice*.02}</h5>
      </div>

      <div className='d-flex justify-content-between my-3'>
        <h5>Shipping</h5>
        <h5>${Math.round(rows.totalOrderPrice*.05)}</h5>
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        <h5>Total Amount</h5>
        <h5>${Math.round(rows.totalOrderPrice - (rows.totalOrderPrice*.02) + (rows.totalOrderPrice*.05))}</h5>
      </div>

    </div>

    <hr />
    <h5>Order Info</h5>
      {currentItems1?.map((i)=><div className="d-flex align-items-center pb-4">
        <div className='d-flex align-items-center '>
        <img src={i.product.imageCover} className='w-25 rounded-4 mx-3 rounded-3' alt="" />
         <h6 className=''>{i.product.title.slice(0,13)}</h6>
        </div>
   
        <div className='d-flex flex-column align-items-center '>
         <h6>Quentity:{i.count}</h6>
         <h6>Price:{i.price}</h6>
        </div>
       </div>
      )}
<ReactPaginate 
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick1}
        pageRangeDisplayed={5}
        pageCount={pageCount1}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName='d-flex ms-5  mt-5 align-items-center'
        pageClassName='virus'
        pageLinkClassName='linke'
        activeLinkClassName='lighty '
        activeClassName='lighty bg-lighty'
      
      />

  </div>
  






  </div>
</div>
 


  </>
}
