import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCarrd from '../../components/ProductCard/ProductCarrd'
import { DispatchType, RootState } from '../../redux/ConfigStore'
import {getProductApi, ProductModel} from '../../redux/ProductReducer/productReducer'
type Props = {}

export default function Home({}: Props) {

const {arrProduct} = useSelector((state:RootState)=>state.productReducer);

console.log(arrProduct)
const dispatch:DispatchType =useDispatch();
const getAllProductAPi = ()=>{
  //gọi api và đưa dữ lieuj lên (1)
  const actionAsync = getProductApi();
  dispatch(actionAsync);
}
// muốn  bất trang lên load luôn
 
useEffect (()=>{
//call api
getAllProductAPi()

},[])

  // const number =useSelector (state => state.number) nếu khai báo vậy sẽ báo lỗi 
  // const number =useSelector ((state:RootState) => state.number)
  return (
    <div className='container'>
    {/* number:{number} */}
    <h3>Product</h3>
    <div className='row mb-2 '>
      {arrProduct.map((prod:ProductModel,index:number)=>{
        return <div className='col-4' key = {index}>

    <ProductCarrd  prod={prod}/>

        </div>
      })}
    </div>
    </div>
  )
}