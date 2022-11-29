import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/ConfigStore'
import DeleteIcon from '@mui/icons-material/Delete';
import { cartAction, CartModel, orderAsyncApi, orderModel } from '../../redux/CartReducer/cartReducer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getProductDetailApi } from '../../redux/ProductReducer/productReducer';
import { useParams } from 'react-router-dom';
import { string } from 'yup';
type Props = {}

export default function Cart({}: Props) {

  const {arrCart} = useSelector((state:RootState)=>state.cart);
  const { userLogin } = useSelector((state: RootState) => state.login);
  interface ProductDetailsModel   {
    productId : string;
        quantity: number;
}
const productdetails = arrCart.map((item, index)=> ({
  productId  : item.id,
  quantity : item.quantity
}))

  const body : orderModel ={
        email: userLogin.email,
        orderDetail: productdetails
  }

  const handleOrder = () =>{
   
       const actionAsyncLogin = orderAsyncApi(body);
      dispatch(actionAsyncLogin);
        }
        

    const dispatch:DispatchType = useDispatch();
    const handlechangeQuantity = (value: string, item: CartModel ) =>{
      
      if(item.quantityInShop ? parseInt(value) > item.quantityInShop : null){
        alert("so qua to")
      }else{
        dispatch(cartAction.changeQuantityTocart(
          { quantity:  parseInt(value),
           name: item?.name,
           price: item?.price,
           id: item?.id,
           image: item?.image,
           quantityInShop: item?.quantity}
             ))
      }
  
          }
          
  const handleDeleteCart = (item: CartModel ) =>{
    dispatch(cartAction.delteteTocart(
      { quantity: item.quantity,
       name: item?.name,
       price: item?.price,
       id: item?.id,
       image: item?.image,
       quantityInShop: item?.quantity}
         ))
        }
  const handleIncrease = (item: CartModel ) =>{
       
          dispatch(cartAction.increaseQuantityTocart(
            { quantity: item.quantity,
             name: item?.name,
             price: item?.price,
             id: item?.id,
             image: item?.image}
               ))
             
        }
          
   const handleDecrease = (item: CartModel ) =>{
              if(item.quantity > 1){
                dispatch(cartAction.decreaseQuantityTocart(
                  { quantity: item.quantity,
                   name: item?.name,
                   price: item?.price,
                   id: item?.id,
                   image: item?.image,
                   quantityInShop: item?.quantity}
                     ))
                    }
              
              else{
                dispatch(cartAction.delteteTocart(
                  { quantity: item.quantity,
                   name: item?.name,
                   price: item?.price,
                   id: item?.id,
                   image: item?.image,
                   quantityInShop: item?.quantity}
                     ))
              }
               
            }

  return (
    <div>
          <h3>Carts</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>image</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>total</th>
                        <th> action</th>
                    </tr>
                </thead>
                {arrCart ? arrCart.map((item,index) => {
                  return(
                    <tbody key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td><img src={item.image} width={50}/>  </td>
                    <td>{item.price}.000đ</td>
                    <td>
                    <button onClick={() => handleDecrease(item)}>
                        <RemoveIcon />
                        </button>
                       <input type="number" min="0"
                       value={item.quantity == null ? 1 : item.quantity } onChange={(e) => handlechangeQuantity(e.target.value, item)}/>
                        <button disabled={item.quantityInShop ? item.quantity  >= item.quantityInShop : false} onClick={() =>  handleIncrease(item)}>
                        <AddIcon />
                        </button>
                    </td>
                    <td>{item.price ? (item.price * (typeof item.quantity === "number" ? item.quantity : 0) ).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.") + "đ" : null}</td>
                    <td>
                       <button  onClick={() => handleDeleteCart(item)}>
                        <DeleteIcon />
                        </button>
                    </td>

           </tbody>
                  )
                }) : null}
               
                </table>
              <div className='d-flex justify-content-end '  >
                <button type="button" className="btn btn-primary p-2 m-2 " onClick={handleOrder} > Order </button>
              </div>
    </div>
  )
}