import React, { useContext, useEffect } from 'react'
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/imgs/1.png'
import { useNavigate } from 'react-router-dom';
import { Mycontext } from '../../Context/Cartcontext';
export default function Navbar({userdata,SaveUser_Data, Log_out }) 
{ 
  let{cartite} = useContext(Mycontext)



  useEffect(()=>
  {
    SaveUser_Data()
  },[])





  // if(localStorage.getItem('usertoken'))
  // {
  //   setuserdata( localStorage.getItem('usertoken'))
    
  // }

  
  // let navigate = useNavigate()
  // let logout = ()=>
  // {
  //   localStorage.removeItem('usertoken')
  //    window.location.href = './Login'
  // }


  
  return <>
  <nav
    className="navbar fixed-top  navbar-expand-lg navbar-dark bg-dark index "
  >
    <div className="container-fluid">
      <Link className="navbar-brand" to="/"><img  src={Logo} alt="" /></Link>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">

        {userdata !== null? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" to="/" aria-current="page"
              >Home
              <span className="visually-hidden">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="CheckOut">CheckOut</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="WishProduct">WishedProducts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Brands">Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="allorders">Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Cart">

              <div className='position-relative'>
              <i className="text-info fa-solid fa-cart-shopping"></i>
              <span className=' position-absolute top-0 start-100 translate-middle badge rounded-5 bg-success'>
              {cartite?.data?.numOfCartItems}
              </span>
  
              </div>
              
              </Link>
          </li>
        </ul> : null}

        <ul className="navbar-nav ms-auto  mt-2 mt-lg-0">
        
      
          {userdata !== null?    <>
        <li className="nav-item">
            
            <div class="dropdown responsive">
            <button class="btn btn-dark  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
             Helping
            </button>
            <ul class="dropdown-menu bg-dark">
            <Link className="nav-link lighty" to="Contact">Contact Center</Link>
            <Link className="nav-link lighty" to="Setting">Setting</Link>
            
            </ul>
          </div>
          </li>


          <li className="nav-item">
            <Link onClick={Log_out}  className="nav-link" to="Login">Logout</Link>
          </li>
        </> :<>
          <li className="nav-item">
            <Link className="nav-link" to="Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Register">Register</Link>
          </li>
          </> }
      
      
        </ul>
     
      </div>
    </div>
  </nav>
  
  </>
}
