import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
export let MyAuthcontext = createContext()
export default function AuthContext(props) 
{
  
  let headers = {token:localStorage.getItem('usertoken')}
    let ForgetUserPassword =  (value)=>
    {
       return axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,value,
       {
        headers:headers
       })
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)
      
        
        
    }

    let ForgetEmailpasword =  (email)=>
    {
     console.log(email);
       return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,email)
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)
      
        
        
    }
    let verifyResetCode =  (resetCode)=>
    {
        console.log(resetCode,666666666666);
       return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,resetCode)
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)
      
        
        
    }
    let resetPassword =  (resetCode)=>
    {
        console.log(resetCode,666666666666);
       return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,resetCode)
       .then((res)=>
        {  
           return res
          })
          .catch((err)=>err)
      
        
        
    }



    
    return <MyAuthcontext.Provider value={{resetPassword,verifyResetCode,ForgetEmailpasword,ForgetUserPassword}}>
    {props.children}
  </MyAuthcontext.Provider>
}

