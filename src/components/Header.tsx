import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../redux/ConfigStore';
import { LoginAction } from '../redux/LoginReducer/loginReducer';

type Props = {

}
export default function Header(props:Props) {

  const dispatch:DispatchType =useDispatch();

  function handleLogoutClick() {
    dispatch(LoginAction.logout());
    window.location.reload();
}


useEffect(() => {
 
}, );

  let adminDashboard;
  if (localStorage.getItem(`token`)) {
    adminDashboard = (
      <div className='nav-bar-serch'>

     <div className='login flex-item'>
     <NavLink className={'login-link'} to= {'/login'}>
             {localStorage.getItem("email")}
     </NavLink>
     </div>
     <div className='login flex-item'>
     <NavLink onClick={handleLogoutClick} className={'login-link'} to= {'/login'}>
             logout
     </NavLink>
     </div>
        </div>
    )
  }else{
    adminDashboard =(
      <div className='nav-bar-serch'>
           <div className='search flex-item'>
            <NavLink className={'search-link'} to= {'/search'}>
       <i className='fa fa-search'/> search
            </NavLink>
           </div>
          <div className='carts flex-item'>
          <NavLink className={'carts-link'} to= {'/cart'}>
          <i className='fa fa-cart-plus'/> cart
          </NavLink>
          </div>
          <div className='login flex-item'>
          <NavLink className={'login-link'} to= {'/login'}>
                  login
          </NavLink>
          </div>
          <div className='register flex-item'>
          <NavLink className={'register-link'} to= {'/register'}>
          register
          </NavLink>
          </div>
             </div>
    )
  }
  return (
    <div className='header' >
        <section className='logo-header'>
         <div className='logo'>
        Dan Khoa
         </div>
             {adminDashboard}
        </section>
        <section className='menu d-flex align-items-center'>
          <nav className="nav-menu">
            <NavLink className="mx-2" to="">Home</NavLink>
            <NavLink className="mx-2" to="">Men</NavLink>
            <NavLink className="mx-2" to="">Women</NavLink>
            <NavLink className="mx-2" to="">Kid</NavLink>
            <NavLink className="mx-2" to="">sport</NavLink>
          </nav>
        </section>


    </div>
  )
}
