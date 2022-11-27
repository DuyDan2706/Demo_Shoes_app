import React from 'react'
import { useSelector } from 'react-redux'
import ProductCarrd from '../../components/ProductCard/ProductCarrd'
import { RootState } from '../../redux/ConfigStore'
import {ProductModel} from '../../redux/ProductReducer/productReducer'
type Props = {}

export default function Home({}: Props) {

const {arrProduct} = useSelector((state:RootState)=>state.productReducer);

console.log(arrProduct)


  // const number =useSelector (state => state.number) nếu khai báo vậy sẽ báo lỗi 
  // const number =useSelector ((state:RootState) => state.number)
  return (
    <div className='container'>
    {/* number:{number} */}
    <h3>Product</h3>
    <div className='row mb-2'>
      {arrProduct.map((prod:ProductModel,index:number)=>{
        return <div className='col-4' key = {index}>

    <ProductCarrd  prod={prod}/>

        </div>
      })}
    </div>
    </div>
  )
}