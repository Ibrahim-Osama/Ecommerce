import React, { useContext, useEffect, useState } from 'react'
import styles from './Brands.module.css';
import { Mycontext } from '../../Context/Cartcontext';
import PaginatedItems from '../Pagenation/Pagenation';
import ReactPaginate from 'react-paginate';
import {Helmet} from "react-helmet";
export default function Brand()
{
  let [result ,setresult] = useState([])
  let [loading ,setloading] = useState(true)
  let {GetBrands} = useContext(Mycontext)

  
  let itemsPerPage = 12
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = result?.data?.data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(result?.data?.data?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % result?.data?.data?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };



  let getallbrands = async ()=>
  {
    let respnonse = await GetBrands()
    setresult(respnonse)
    setloading(false)
    console.log(respnonse);
  } 

  useEffect(()=>
  {
    getallbrands()
  },[])





  
  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
  {loading? <i className="fas fa-spinner fa-spin text-main mt-free fa-3x d-flex align-items-center justify-content-center"></i>:<div className='mt-free container'>
      <h1 className='lighty bg-dark mt-3 p-3 text-center rounded-5 border-0'>Welcome to Our Brands</h1>
    <div className="row mt-4  justify-content-center brands ">
    {currentItems.map((item)=><div className='col-md-3 col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center   mt-4  text-center   '>  

 <div className="card  cardrespon" style={{width: "15rem"}}>
 <img src={item.image} className="card-img-top w-100" alt={item.name}/>
 <div className="card-body bg-dark">
 <h4 className='lighty'>{item.name}</h4>
 </div>
  
 </div>
</div>



)}
    </div>
  </div>
     }
  
   
  <ReactPaginate 
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName=' d-flex justify-content-center w-25 mt-5 pagecointiner mx-auto align-items-center'
        pageClassName='virus'
        pageLinkClassName='linke'
        activeLinkClassName='lighty '
        activeClassName='lighty bg-lighty'
      
      />
  </>
}
