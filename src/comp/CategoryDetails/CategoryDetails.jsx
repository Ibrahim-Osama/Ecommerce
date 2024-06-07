import React, { useContext, useEffect, useState } from 'react'
import styles from './CategoryDetails.module.css';
import { useParams } from 'react-router-dom';
import { Mycontext } from '../../Context/Cartcontext';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
export default function CategoryDetails() 
{
let {myVirousaid} = useParams()
let [loading , isloading] = useState(true)
let [data , setdeta] = useState(null)
let [data2 , setdeta2] = useState(null)
let {GetallSpeficCategorey,GetallSpeficSupCategorey} = useContext(Mycontext)



let getspicategry = async ()=>
{
  let response =  await GetallSpeficSupCategorey(myVirousaid)
  setdeta2(response?.data?.data)
  console.log(response);
  isloading(false)
}





let getdata = async()=>
{
  let response =  await GetallSpeficCategorey(myVirousaid)
  console.log(response);
  setdeta(response?.data?.data)
  getspicategry()
  isloading(false)
}

useEffect(()=>
{
  getdata()
  
},[])




  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Category Details</title>
            </Helmet>
    <div className='container d-flex justify-content-center align-items-center mt-free '>
        <div className="col-md-3">
        <img className='w-100 rounded-4' src={data?.image} alt="" />
    <h2 className='mt-3 text-center'>{data?.name}</h2>
        </div>



      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          {data2?.map((item)=><div className=' col-md-2 my-2'>
           <Link to={'/SubCategoryProduct/'+item._id}>
           <button className='btn btn-dark w-100 h-100 py-2 px-4'>{item.name}</button>

           </Link>
        </div> 

          )}
        </div>
        </div>

  </>
}
