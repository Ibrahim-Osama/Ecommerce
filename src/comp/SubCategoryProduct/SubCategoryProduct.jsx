import React, { useContext, useEffect, useState } from 'react'
import styles from './SubCategoryProduct.module.css';
import {  MySubcontext } from '../../Context/AllsubProductsContext';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mycontext } from '../../Context/Cartcontext';
export default function SubCategoryProduct() 
{
  let {Addtocart} = useContext(Mycontext)
    let {myVirousaid} = useParams()
    // console.log(myVirousaid);
    let [data,setdata] = useState([])
  let {Getallproductdata} = useContext(MySubcontext)

  let getdata = async()=>
  {
    let response = await Getallproductdata()
    let getrpoducts =  response?.data?.data?.filter((item)=>item.subcategory[0]._id == myVirousaid)
 
     setdata(getrpoducts)
    console.log(getrpoducts);
  }



  let addproduct = async (product)=>
  {
    let respnonse = await Addtocart(product)
    if(respnonse.data.status==='success')
    {
      toast(respnonse.data.message,
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

    console.log(respnonse);
    }
    else
    {
      toast(respnonse.data.message)
      console.log(respnonse);
    }
  }

  useEffect(()=>
  {
    getdata()
  }
  
  ,[])


  
return <>
  <h2>SubCategoryProduct</h2>
  <div className="mt-free row justify-content-center">
  {data.map((elm)=><div key={elm._id} className='col-md-2'>
    <div className="product  px-2 py-3">
    <Link to={'/ProductDetails/'+elm._id}>
    <img className='w-100' src={elm.imageCover} alt="" />
      <span className='text-main font-sm  fw-bold'>
        {elm.category.name}
      </span>
      <h3 className="h6 fw-bolder">{elm.title.split(' ').slice(0,2).join(' ')}</h3>
      <div className='d-flex justify-content-between'>
        <span className='text-muted'>{elm.price} EGP</span>
  
        <span>
          <i className='fas fa-star rating-color'>{elm.ratingsAverage}</i>
        </span>

      </div>
      </Link> 
    
      <button onClick={()=>{addproduct(elm._id)}} className='btn bg-main text-white w-100 mt-3'>+ Add</button>
    </div>
  </div>)}
  </div>
  </>
  
}
