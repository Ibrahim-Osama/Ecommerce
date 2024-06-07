import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import axios from "axios";
import MainSlider from "../MainSlider/MainSlider";
import Cart from "../Cart/Cart";
import {Helmet} from "react-helmet";

export default function Home() {
  
  let [allCategorySlider, isallCategorySlider] = useState(true);
  let [allFeaturedProducts, isallFeaturedProducts] = useState(true);
  let [allhomeloading, isallhomeloading] = useState(true);

  let [category, setcategory] = useState([]);
  let [products, setproducts] = useState([]);

  let getdata = async () => {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories/"
    );
    setcategory(data.data);
    console.log(data.data);
    isallCategorySlider(false)
  };
  let getdata2 = async () => {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setproducts(data.data);
    isallFeaturedProducts(false)
    
    
  };




  
  useEffect(() => {
    getdata();
    getdata2();
  }, []);

  
 

  console.log(allhomeloading);
  return (
    <>
      { allCategorySlider || allFeaturedProducts ? (
       <i className="fas fa-spinner fa-spin text-main mt-free fa-3x d-flex align-items-center justify-content-center"></i>
      ) : (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
            </Helmet>


          <MainSlider />
          <CategorySlider category={category} />
          <FeaturedProducts products={products} />
          
        </>
      )}
    </>
  );
}
