import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
export let MyOrdersContext = createContext()
export default function Orders(props) 
{

  
    let headers = {token:localStorage.getItem('usertoken')}
    let GetUserOrders =  (userid)=>
    {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`)
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)
      
        
        
    }   










    
    return <MyOrdersContext.Provider value={{GetUserOrders}}>
    {props.children}
  </MyOrdersContext.Provider>


}
