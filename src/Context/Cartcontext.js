import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
export let Mycontext = createContext()
export default function Cartcontextprovider(props) 
{
    let [cartite ,setcartite] = useState([])
    let headers = {token:localStorage.getItem('usertoken')}
    let GetBrands =  (value)=>
    {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)    
        
    }

    
    let getlogedusercart =  ()=>
    {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
       {
        headers:headers
       })
       .then((res)=>
        {  
         setcartite(res)
           return res
          })
          .catch((err)=>err)
      
        
        
    }

    
    let deleteSpecficCart =  (productid)=>
    {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
       {
        headers:headers
       })
       .then((res)=>
        {  
         setcartite(res)
           return res
          })
          .catch((err)=>err)
      
        
        
    }

    
    let updateQuentity =  (productid,count)=>
    {
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
       {
        count:count
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

    
    let deleteAllcart =  ()=>
    {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
       {
        headers:headers
       })
       .then((res)=>
        {  
         setcartite(res)
           return res
          })
          .catch((err)=>err)
      
        
        
    }
    let GetallSpeficCategorey =  (catid)=>
    {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catid}`)
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)
      
        
        
    }
    let GetallSpeficSupCategorey =  (supid)=>
    {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${supid}/subcategories`)
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)
      
        
        
    }

    
    let GetallCategorey =  ()=>
    {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)
      
        
        
    }

    let OnlinePaymenht =  (cartId,shippingAddress)=>
    {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
       {
        shippingAddress:shippingAddress
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

    let oflinePaymenht =  (cartId,shippingAddress)=>
    {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
       {
        shippingAddress:shippingAddress
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

    let Addtocart =  (productId)=>
    {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
       {
        productId:productId
       },
       {
        headers:headers
       })
       .then((res)=>
        {  
         setcartite(res)
           return res
          })
          .catch((err)=>err)
      
        
        
    }



      useEffect(()=>
      {
         getlogedusercart()
      }
      ,[])



    // cartite checkout jux and Navbar jux ,,




    
    return <Mycontext.Provider value={{cartite,GetBrands,getlogedusercart,deleteSpecficCart,updateQuentity,deleteAllcart,GetallSpeficCategorey,GetallSpeficSupCategorey,GetallCategorey,OnlinePaymenht,oflinePaymenht,Addtocart,}}>
    {props.children}
  </Mycontext.Provider>
}

