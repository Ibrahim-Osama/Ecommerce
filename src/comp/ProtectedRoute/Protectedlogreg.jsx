import React from 'react'
import styles from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';
export default function Protectedlogreg(props)
{
  if(localStorage.getItem('usertoken')!== null )
  {
    return <Navigate to='/'/>
  }
  else
  {
    return props.children
  }
 
}
