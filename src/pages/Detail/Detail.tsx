import { Action } from '@remix-run/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCarrd from '../../components/ProductCard/ProductCarrd'

import { DispatchType, RootState } from '../../redux/ConfigStore'
import { getProductDetailApi, RelatedProduct } from '../../redux/ProductReducer/productReducer'

type Props = {



}

export default function Detail({}: Props) {

   //bóc tách dữ liệu
   const {productDetail} = useSelector((state:RootState)=> state.product)
   console.log(productDetail)
    const params=useParams();
    const dispatch:DispatchType = useDispatch();

  const getProductByIdApi = () =>{
  // lấy param tư url 
  const id:string|undefined = params.id
  // b2: Dispatch thunk 
   const actionThunk=getProductDetailApi(id as string);
   dispatch(actionThunk)
  }


   useEffect (()=>{

    getProductByIdApi();

   },[params.id])



  return (
    <div className='container'>
  {/* <h3> Product Name</h3> */}
  < div className='row mt-2'>
    <div className='col-4'>
    <img src={productDetail?.image} alt='...' height={350} width={350} style={{objectFit:'cover'}} />
    </div>
    <div className='col-8 mt-4'>
        
    <h3 className='mt-4 '> Name:{productDetail?.name}</h3>
    <p className='mt-4'> Alias :{productDetail?.alias}</p>
     <p className='mt-4'> price :{productDetail?.price}</p>
      <p className='mt-4'>description:{productDetail?.description}</p>
    </div>


  </div>
   <h3 className='mt-2 text-center'> --Related Products---</h3>
   <div className='row'>
    {productDetail?.relatedProducts.map((prod:RelatedProduct , index : number)=>{
      return  <div className='col-4'>
      <ProductCarrd prod={prod} />
    </div>
    })}
   
    
   </div>
    </div>


   
  )
}