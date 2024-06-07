import React, { useContext, useEffect, useState } from 'react'
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Mycontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MySubcontext } from '../../Context/AllsubProductsContext';




export default function FeaturedProducts({products})
 {
  
  let [heart,setheart]=useState(0)
  let [liedprodect,setliedprodect]=useState([])
  let {Addtocart} = useContext(Mycontext)
  let {Add_likerd_Product,Getlikedproducts} = useContext(MySubcontext)
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



  let addLikeproduct = async (productid)=>
  {
    let respnonse = await Add_likerd_Product(productid)
    if(respnonse.data.status==='success')
    {
      toast(respnonse.data.message,
  {
    icon: '🛒🎁',
    style: {
      borderRadius: '10px',
      margin:'50px 0px',
      background: '#333',
      color: '#fff',
    },
  }
);
getalllikedproduct()
    console.log(respnonse);
    }
    else
    {
      toast(respnonse.data.message)
      console.log(respnonse);
    }
  }

  let getalllikedproduct = async ()=>
  {
    let respnonse = await Getlikedproducts()
    setliedprodect(respnonse.data.data)
    console.log(respnonse.data.data,666666666666666666666);
   
  }
useEffect(()=>
{
  getalllikedproduct()
},

[])


  // let [products , setproducts] = useState([])

  //  let  getdata = async ()=>
  // {
   
  //   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   setproducts(data.data)
  //   console.log(products);
  //   isallFeaturedProducts(false)
  // }


  // useEffect(()=>
  // {
  //   getdata()
  // },[])
  
  const renderHeartIcon = (elm) => {
    const isLiked = liedprodect.some(liked => liked.id === elm._id);
    if (isLiked) {
      return <FaHeartCirclePlus className='heart text-danger' />;
    } else {
      return <FaHeartCirclePlus onClick={() => addLikeproduct(elm._id)} className='heart text-dark' />;
    }
  };
  
  
  return <>
  <div className="row justify-content-center">
  {products.map((elm)=><div key={elm._id} className='col-md-2 col-md-3 col-lg-2'>
    <div className="product px-2 py-3">
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
       {renderHeartIcon(elm)}



     
        
      </div>
      <button onClick={()=>{addproduct(elm._id)}} className='btn bg-main text-white w-100 mt-3'>+ Add</button>

    </div>
  </div>)}
  </div>
 
  </>
}
