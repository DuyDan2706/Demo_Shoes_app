import React from 'react'
import { NavLink } from 'react-router-dom'
type Props = {

}
export default function Header(props:Props) {
  return (
    <div className='header' >
        <section className='logo-header'>
         <div className='logo'>
        Dan Khoa
         </div>
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
