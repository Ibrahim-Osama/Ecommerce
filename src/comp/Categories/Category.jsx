import React, { useContext, useEffect, useState } from 'react'
import styles from './Categories.module.css';
import { Mycontext } from '../../Context/Cartcontext';
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
export default function Categories()
{
  let [loading , isloading] = useState(true)
  let [data , setdeta] = useState(null)
  let {GetallCategorey} = useContext(Mycontext)
  
  let getdata = async()=>
  {
    let response =  await GetallCategorey()
    setdeta(response?.data?.data)
    console.log(response);
    isloading(false)
  }

useEffect(()=>
{
  getdata()
},[])






  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>All Category</title>
            </Helmet>
   <div className="container mt-free catContainer">
        {loading ? (
          <div className="itemSpin text-center py-3">
            <i className="fas fa-spinner fa-spin fa-3x text-main "></i>
          </div>
        ) : (
          <div className="row gy-3  mt-free justify-content-center">
          {data?.map((cat) => (
            <div key={cat._id} className="col-md-3">
              <div className="itemCat p-3 ">
              <Link className="photo " to={'/CategoryDetails/'+cat._id}>
                  <div>
                    <img
                      className="w-100 rounded-3"
                      height={250}
                      src={cat.image}
                      alt=""
                    />
                  </div>
                  <div className="glow-wrap">
                    <i className="glow"></i>
                  </div>
                  <div className="text-center lighty my-4">
                    <h2 className="h4 fw-bolder">{cat.name}</h2>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
}