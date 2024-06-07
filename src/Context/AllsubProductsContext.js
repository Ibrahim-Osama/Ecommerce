import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
export let MySubcontext = createContext()
export default function AllsubProductsContext(props) 
{
  
  let headers = {token:localStorage.getItem('usertoken')}

  let Add_likerd_Product =  (productId)=>
  {
     return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
     {
      productId:productId
     },
     {
      headers:headers
     })
     .then((res)=>
      {  
         return res
        })
        .catch((err)=>err)   
      
  }


  let Getlikedproducts =  ()=>
  {
     return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
     {
      headers:headers
     })
     .then((res)=>
      {  
         return res
        })
        .catch((err)=>err)

  }

  
  let Getallproductdata =  ()=>
  {
     return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
     .then((res)=>
      {  
         return res
        })
        .catch((err)=>err)

  }

  let Removelikedproduct =  (productid)=>
  {
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,
     {
      headers:headers
     })
     .then((res)=>
      {  
         return res
        })
        .catch((err)=>err)

  }



    
    return <MySubcontext.Provider value={{Removelikedproduct,Add_likerd_Product,Getlikedproducts,Getallproductdata}}>
    {props.children}
  </MySubcontext.Provider>
}

