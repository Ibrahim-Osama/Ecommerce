import styles from './CategorySlider.module.css';
import React, { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider({category})
 {
  
  // let [category , setcategory] =  useState([] );
  let {myVirousaid} = useParams()
  
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
    pauseOnHover: true,
    responsive:
    [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  


  };
  var settings2 = {
    dots: true,
    infinite: true,
    fade:false,
    speed: 100,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    responsive:
    [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]

  };

//   let getdata = async ()=>
//  {
  
//    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/')
//     setcategory(data.data)
//     console.log(data.data)
//     isallCategorySlider(false)
//  }


//  useEffect(()=>
//  {
//    getdata()
   
//  },[])

  
  return <>
 
      <Slider {...settings}>
          
          {category.map((elm)=><div className='mt-3' key={elm._id}>

            <img height={200}  className="w-100" src={elm.image}/>
            <h2 className="h6 text-center mt-2">{elm.name}</h2>
          </div>)}
         
      </Slider>
 
      <Slider {...settings2}>
          
          {category.map((elm)=><div className='mt-5' key={elm._id}>

            <img height={200}  className="w-100" src={elm.image}/>
            <h2 className="h6 text-center mt-2">{elm.name}</h2>
          </div>)}
         
      </Slider>
  </>
}
