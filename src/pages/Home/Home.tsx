import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProductCarrd from '../../components/ProductCard/ProductCarrd'
import { DispatchType, RootState } from '../../redux/ConfigStore'
import {getProductApi, ProductModel} from '../../redux/ProductReducer/productReducer'
type Props = {}

export default function Home({}: Props) {

const {arrProduct} = useSelector((state:RootState)=>state.product);

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
    <div className="home">
    <div className="container">
      <div className="carousel">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-8">
                  <img src={arrProduct[8]?.image} className="d-block w-61 animate__animated animate__backInUp" alt="..." />
                </div>
                <div className="col-4 animate__animated animate__backInUp">
                  <h3>{arrProduct[8]?.name}</h3>
                  <p>{arrProduct[8]?.shortDescription}</p>
                  <NavLink className="btnBuyNow" to={`/detail/${arrProduct[8]?.id}`}>Buy now</NavLink>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-8">
                  <img src={arrProduct[7]?.image} className="d-block w-61 animate__animated animate__backInUp" alt="..." />
                </div>
                <div className="col-4 animate__animated animate__backInUp">
                  <h3>{arrProduct[7]?.name}</h3>
                  <p>{arrProduct[7]?.shortDescription}</p>
                  <NavLink className="btnBuyNow" to={`/detail/${arrProduct[7]?.id}`}>Buy now</NavLink>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-8">
                  <img src={arrProduct[12]?.image} className="d-block w-61 animate__animated animate__backInUp" alt="..." />
                </div>
                <div className="col-4 animate__animated animate__backInUp">
                  <h3>{arrProduct[12]?.name}</h3>
                  <p>{arrProduct[12]?.shortDescription}</p>
                  <NavLink className="btnBuyNow" to={`/detail/${arrProduct[12]?.id}`}>Buy now</NavLink>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <img src="./img/btnarrow-left.png" alt="" />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <img src="./img/btnarrow-right.png" alt="" />
          </button>
        </div>
      </div>
       <div className='productfeature'>
       <h3>-Product Feature -</h3>
       <div className='row mb-2 '>
       {arrProduct.map((prod:ProductModel,index:number)=>{
         return <div className='col-4' key = {index}>
          <ProductCarrd  prod={prod}/>
          </div>
          })}
       </div>
       </div>
 </div>
 </div>





    
  
  )
}