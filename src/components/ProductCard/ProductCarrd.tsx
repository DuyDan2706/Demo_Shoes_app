import React from 'react'
import { NavLink } from 'react-router-dom'
import { ProductModel, RelatedProduct } from '../../redux/ProductReducer/productReducer'

type Props = {
  prod?:ProductModel |RelatedProduct
}

export default function ProductCarrd({prod} : Props) {

  // const {prod}=props;
  console.log(prod)
  return (
    <div className='card '>
        <div className='icon position-relative'>
            <i className='fa fa-heart position-absolute end-0 mt-2 mx-2x' style={{fontSize:20,color:'red'}}></i>
     
       <img className='w-100' src={prod?.image ? prod.image :'http://i.pravatar.cc?u=1'} alt=""/>
       <div className='card-body'>
           <h2 className='card-title ' style={{fontSize:20}}>{prod?.name ? prod.name :'Product name'}</h2>
           <p>{prod?.shortDescription}</p>
       </div>
       <div className=' d-flex'>
        <NavLink to={`/detail/${prod?.id}`} className={"btn btn-success w-50"} style={{borderRadius:'0px'}}>Buy now</NavLink>
        <div className='product-price text-center w-50 bg-secondary text-dark font-weight '>{prod?.price ? prod.price.toLocaleString(): '1.000$'} </div>
        </div>
       </div>
    </div>
  )
}