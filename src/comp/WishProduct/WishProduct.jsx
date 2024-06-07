import React, { useContext, useEffect, useState } from 'react'
import styles from './WishProduct.module.css';
import { MySubcontext } from '../../Context/AllsubProductsContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaHeartCirclePlus } from "react-icons/fa6";
import { Mycontext } from '../../Context/Cartcontext';
import Swal from 'sweetalert2'
import {Helmet} from "react-helmet";

export default function WishProduct() 
{
  let [loading , setloading] = useState(true)
  let {Getlikedproducts,Removelikedproduct} = useContext(MySubcontext)
  let {Addtocart} = useContext(Mycontext)
  let [products,setproducts]=useState([])

    let getdata =async()=>
    {
      let response = await Getlikedproducts()
      setproducts(response?.data?.data)
      setloading(false)
      console.log(response);
      
    }
    let Removedata =async(id)=>
    {
      let response = await Removelikedproduct(id)
      console.log(response);
      getdata()
    }
   

    useEffect(()=>
    {
      getdata()
    
    },[])



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









  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Wish Products</title>
            </Helmet>
  {loading?  <i className="fas fa-spinner fa-spin text-main mt-free fa-3x d-flex align-items-center justify-content-center"></i>
  :
  <div className="row justify-content-center mt-free">
  {products?.map((elm)=><div key={elm._id} className='col-md-2'>
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
    
      <div className='m-auto w-25 pointers'>
       
      {/* {liedprodect.map((liked)=>
      {
        if(liked.id == elm._id)
        {
          return <FaHeartCirclePlus className='heart'/>
        }
        else
        {
          return <FaHeartCirclePlus className='heart bg-dark'/>
        }
       

      })} */}
      



     
        
      </div>
      <button onClick={()=>{addproduct(elm._id)}} className='btn bg-main text-white w-100 mt-3'>+ Add</button>
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
            Removedata(elm._id)
            Swal.fire({
              background: '#303030',
              color: '#ffffff',
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            
          }
        });
        
        
        }} className='btn btn-danger text-white w-100 mt-3'>Remove</button>

    </div>
  </div>)}
  </div>
  }
 
  </>
}
