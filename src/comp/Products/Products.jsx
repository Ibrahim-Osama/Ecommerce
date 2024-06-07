import styles from './Products.module.css';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MySubcontext } from '../../Context/AllsubProductsContext';
import { Mycontext } from '../../Context/Cartcontext';
import ReactPaginate from 'react-paginate';
import {Helmet} from "react-helmet";

export default function Products({ divEl }) {
  let [res, setRes] = useState([]);
  let [filteredProducts, setFilteredProducts] = useState([]);
  let [filterCategory, setFilterCategory] = useState(null);
  let [sortType, setSortType] = useState(null);

  let { Getallproductdata } = useContext(MySubcontext);

  let getData = async () => {
    let response = await Getallproductdata();
    setRes(response.data.data);
    setFilteredProducts(response.data.data);
  };

  let applyFiltersAndSorting = () => {
    let updatedProducts = [...res];

    if (filterCategory) {
      updatedProducts = updatedProducts.filter(
        (item) => item.category.name === filterCategory
      );
    }

    if (sortType) {
      if (sortType === 'Min Price') {
        updatedProducts.sort((a, b) => a.price - b.price);
      } else if (sortType === 'Name') {
        updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortType === 'Max Price') {
        updatedProducts.sort((a, b) => b.price - a.price);
      }
    }

    setFilteredProducts(updatedProducts);
  };

  let handleCategoryFilter = (category) => {
    setFilterCategory(category);
  };

  let handleSort = (type) => {
    setSortType(type);
  };

  useEffect(() => {
    getData();
    divEl.current.className = "";
    return () => {
      divEl.current.className = "container";
    };
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [filterCategory, sortType, res]);

  let { Addtocart } = useContext(Mycontext);
  let addProduct = async (product) => {
    let response = await Addtocart(product);
    if (response.data.status === 'success') {
      toast(response.data.message, {
        icon: '🛒🎁',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.log(response);
    } else {
      toast(response.data.message);
      console.log(response);
    }
  };

  let itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            </Helmet>
      <div className="row mt-5">
        <div className='col-md-2 d-flex flex-column py-2 bg-dark lighty fixedH ps-3'>
          <h4>Filter By </h4>
          <hr />
          <h4>Categories </h4>
          <hr />
          <form className='d-flex flex-column'>
            <div className='mt-2'>
              <input
                value="Women's Fashion"
                onClick={(e) => handleCategoryFilter(e.target.value)}
                type="radio"
                name="pick"
                id="Women"
              />
              <label htmlFor="Women" className='ms-2'>Women's Fashion</label>
            </div>
            <div className='mt-2'>
              <input
                value="Men's Fashion"
                onClick={(e) => handleCategoryFilter(e.target.value)}
                type="radio"
                name="pick"
                id="Man"
              />
              <label htmlFor="Man" className='ms-2'>Men's Fashion</label>
            </div>
            <div className='mt-2'>
              <input
                value="Electronics"
                onClick={(e) => handleCategoryFilter(e.target.value)}
                type="radio"
                name="pick"
                id="Electronics"
              />
              <label htmlFor="Electronics" className='ms-2'>Electronics</label>
            </div>
          </form>

          <h4 className='mt-5'>Sort By </h4>
          <hr />
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Dark mode</label>
          </div>

          <h4 className='mt-5'>Sort By </h4>
          <hr />
          <form className='d-flex flex-column'>
            <div className='mt-2'>
              <input
                value='Name'
                onClick={(e) => handleSort(e.target.value)}
                type="radio"
                name="pick1"
                id="Name"
              />
              <label htmlFor="Name" className='ms-2'>Name</label>
            </div>
            <div className='mt-2'>
              <input
                value="Min Price"
                onClick={(e) => handleSort(e.target.value)}
                type="radio"
                name="pick1"
                id="Min"
              />
              <label htmlFor="Min" className='ms-2'>Min Price</label>
            </div>
            <div className='mt-2'>
              <input
                value="Max Price"
                onClick={(e) => handleSort(e.target.value)}
                type="radio"
                name="pick1"
                id="Max"
              />
              <label htmlFor="Max" className='ms-2'>Max Price</label>
            </div>
          </form>
        </div>

        <div className="col-md-8 container offset-1 mt-3">
          <div className="row justify-content-center">
            {currentItems.map((elm) => (
              <div key={elm._id} className='col-md-3'>
                <div className="product px-2 py-3">
                  <Link to={'/ProductDetails/' + elm._id}>
                    <img className='w-100' src={elm.imageCover} alt="" />
                    <span className='text-main font-sm fw-bold'>
                      {elm.category.name}
                    </span>
                    <h3 className="h6 fw-bolder">
                      {elm.title.split(' ').slice(0, 2).join(' ')}
                    </h3>
                    <div className='d-flex justify-content-between'>
                      <span className='text-muted'>{elm.price} EGP</span>
                      <span>
                        <i className='fas fa-star rating-color'>{elm.ratingsAverage}</i>
                      </span>
                    </div>
                  </Link>
                  <button onClick={() => { addProduct(elm._id) }} className='btn bg-main text-white w-100 mt-3'>+ Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName='d-flex justify-content-center w-25 mt-5 mx-auto align-items-center'
        pageClassName='virus'
        pageLinkClassName='linke'
        activeLinkClassName='lighty'
        activeClassName='lighty bg-lighty'
      />
    </>
  );
}
