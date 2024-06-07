import {  createBrowserRouter, createHashRouter, Navigate, RouterProvider } from "react-router-dom"
import Layout from "./comp/Layout/Layout"
import Home from "./comp/Home/Home"
import Cart from "./comp/Cart/Cart"
import Products from "./comp/Products/Products"
import Login from "./comp/Login/Login"
import Register from "./comp/Register/Register"
import CategoryDetails from "./comp/CategoryDetails/CategoryDetails"
import Categories from "./comp/Categories/Category"
import ProductDetails from "./comp/ProductDetails/ProductDetails"
import About from "./comp/About/About"
import NotFound from "./comp/NotFound/NotFound"
import { useRef, useState } from "react"
import ProtectedRoute from "./comp/ProtectedRoute/ProtectedRoute"
import { jwtDecode } from "jwt-decode"
import Cartcontextprovider from "./Context/Cartcontext"
import toast, { Toaster } from 'react-hot-toast';
import Protectedlogreg from "./comp/ProtectedRoute/Protectedlogreg"
import CheckOut from "./comp/CheckOut/CheckOut"
import { Offline } from "react-detect-offline";
import Brands from "./comp/Brands/Brands"
import SubCategoryProduct from "./comp/SubCategoryProduct/SubCategoryProduct"
import AllsubProductsContext from "./Context/AllsubProductsContext"
import Contact from "./comp/Contact/Contact"
import WishProduct from "./comp/WishProduct/WishProduct"
import Setting from "./comp/Setting/Setting"
import Authcontext from "./Context/AuthContext"
import OrderDetails from "./comp/OrderDetails/OrderDetails"
import Orders from "./Context/Orders"
import ForgetPassword from "./comp/ForgetPassword/ForgetPassword"


export default function App() {

  let divEl = useRef(0)
  let [userdata,setuserdata] = useState(null)
  function SaveUser_Data() {
    let Encodetoken = localStorage.getItem('usertoken')
    if (Encodetoken) 
    { 
      let decodetokken = jwtDecode(Encodetoken)
      setuserdata(decodetokken)
    }
    else{
      setuserdata(null)
    }
  }
  
  function Log_out()
  {

    setuserdata(null)
    localStorage.removeItem('usertoken')
    return <Navigate to='/Login'/>

  }

  

  let routers = createHashRouter(
    [
      {path:'',element:<Layout divEl={divEl} userdata={userdata} SaveUser_Data={SaveUser_Data}  setuserdata={setuserdata} Log_out={Log_out} /> , children:[
        {index:true, element: <ProtectedRoute> <Home/> </ProtectedRoute>},
        {path:'Products', element:<ProtectedRoute> <Products divEl={divEl}/> </ProtectedRoute>},
        {path:'Cart', element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
        {path:'WishProduct', element:<ProtectedRoute> <WishProduct/> </ProtectedRoute>},
        {path:'Brands', element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
        {path:'About', element:<ProtectedRoute> <About/> </ProtectedRoute>},
        {path:'Setting', element:<ProtectedRoute> <Setting SaveUser_Data={SaveUser_Data}/> </ProtectedRoute>},
        {path:'Allorders', element:<ProtectedRoute> <OrderDetails/> </ProtectedRoute>},
        {path:'Contact', element:<ProtectedRoute> <Contact/> </ProtectedRoute>},
        {path:'CheckOut', element:<ProtectedRoute> <CheckOut/> </ProtectedRoute>},
        {path:'SubCategoryProduct/:myVirousaid', element:<ProtectedRoute> <SubCategoryProduct/> </ProtectedRoute>},
        {path:'CategoryDetails/:myVirousaid', element:<ProtectedRoute> <CategoryDetails/> </ProtectedRoute>},
        {path:'ProductDetails/:myVirousaid', element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
        {path:'Categories', element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
        {path:'Login', element: <Protectedlogreg>  <Login SaveUser_Data={SaveUser_Data}/> </Protectedlogreg>    },
        {path:'Register', element:<Protectedlogreg><Register/></Protectedlogreg>},
        {path:'ForgetPassword', element:<Protectedlogreg><ForgetPassword SaveUser_Data={SaveUser_Data}/></Protectedlogreg>},
        {path:'*', element:<NotFound divEl={divEl}/>}
        
      ]}
    ])
  
  
  return  <Cartcontextprovider>
        <AllsubProductsContext>
        <Authcontext>
          <Orders>
    <Offline><div className="network">
      
    <h1>
    No Connection 

    </h1>
      </div></Offline>
        <Toaster/>
      <RouterProvider router={routers}></RouterProvider>
      </Orders>
      </Authcontext>
      </AllsubProductsContext>
  </Cartcontextprovider>   
  

  
  

  


}
