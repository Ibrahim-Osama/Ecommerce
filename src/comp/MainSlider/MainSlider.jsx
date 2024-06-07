import styles from './MainSlider.module.css';
import React, { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import slide1 from '../../Assets/imgs/slider-image-3.jpeg';
import slide2 from '../../Assets/imgs/slider-image-2.jpeg';
import slide3 from '../../Assets/imgs/slider-image-1.jpeg';
import Slider from "react-slick";

export default function MainSlider()
{

  var settings = {
    dots: true,
    infinite: true,
    fade:false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear", 
    pauseOnHover: true


  };


  
 

   
  return <>

    
    <div className='container mt-free'>
      <div className="row g-0">
        <div className="col-md-9">
        <img className='w-100' height={400} src={slide1} alt="" />
        </div>
        <div className="col-md-3">
        <img className='w-100' height={200} src={slide2} alt="" />
        <img className='w-100' height={200} src={slide3} alt="" />
        </div>
      </div>
    </div>
   
  </>
}
