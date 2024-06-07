import React, { useContext, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Mycontext } from "../../Context/Cartcontext";
import toast from "react-hot-toast";


export default function ProductDetails()
 {
  let {Addtocart} = useContext(Mycontext)
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

  let [loading,isloading]= useState(false)


  var settings = {
    dots: true,
    infinite: true,
    fade:false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear", 
    pauseOnHover: true,
    responsive:
    [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]



  };

  let [product , setproduct] =  useState({ images: [] });
  let {myVirousaid} = useParams()
  let  getdata = async ()=>
 {
  isloading(true)
   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products/'+myVirousaid)
    setproduct(data.data)
    console.log(data.data)
    isloading(false)
 }


 useEffect(()=>
 {
   getdata()
   
 },[])


  return <>
      <div className="container text-center">
      {loading ? <i className="mt-free fas fa-spinner fa-spin text-main  fa-3x d-flex align-items-center justify-content-center"></i> :<>
      <div className="row m-3 align-items-center">
        <div className="col-md-4 mt-free">
        <img className="w-100" src={product.imageCover} alt="" />
        <Slider {...settings}>
          
        {product?.images.map((elm)=><img className="" src={elm}/>)}
       
    </Slider>
        </div>
        <div className="col-md-8">
        <h3 className="mt-3">{product.title}</h3>
        <p>{product.description}</p>
        <div className='d-flex justify-content-between'>
        <span className='text-muted'>{product.price} EGP</span>
  
        <span>
          <i className='fas fa-star rating-color'>{product.ratingsAverage}</i>
        </span>
      </div>
        <button onClick={()=>addproduct(product._id)} className='btn bg-main text-white w-100'>+ Add</button>



        </div>
        
        </div>
      
      </> }
      
      </div>
    </>
}
