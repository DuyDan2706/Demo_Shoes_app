import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import { array } from 'yup';
import { number } from 'yup/lib/locale';
import { DispatchType } from '../ConfigStore';
//productModel bao gồm các thuộc tính từ Api trả về
//có thể dùng type hoặc interface ( interface có thể mở rộng cao hơn so với type) 
export interface CartModel   {
    name?: string;
    price?: number;
    id?: number;
    quantity: number;
    
}




// khai báo thuộc tính bên trong
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team

export type CartState = {
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team
    arrCart: CartModel[]
}


const initialState: CartState = {
    arrCart: [],
}
   
const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    //thêm dữ liệu content vào reducer
    reducers: {
            addTocart : (state:CartState,action:PayloadAction<CartModel>) =>{
                
                const exist =  state.arrCart.find(item => item.id === action.payload.id)
                const objIndex = state.arrCart.findIndex((obj => obj.id == action.payload.id));  
               
                if(exist){
                    if(exist.quantity && action.payload.quantity)
                    exist.quantity +=  action.payload.quantity
                    console.log("ngu vc", action.payload,  exist.quantity , )
                    state.arrCart[objIndex].quantity  =   exist.quantity  ;
                }else{
                    state.arrCart.push(action.payload)
                }
               
                // state.arrCart.map((item : CartModel, index: number) => {
                //    if(state.arrCart.length <= 0){
                //     state.arrCart.push(action.payload) 
                //    }
                //     if(item.id !== action.payload.id){
                //         state.arrCart.push(action.payload) 
                //     }
                //     else{
                //         if(action.payload.quantity && item.quantity){
                //             item.quantity = item.quantity + action.payload.quantity
                //         }                        
                       
                //     }
                // })
                
              }
    
    },
    // cách 2 createAction
   
  });
  
  

export const cartAction = cartReducer.actions

export default cartReducer.reducer 



/* ---------------------action api ..................*/




//rcslice

// https://quicktype.io/ chuyển đổi dữ liệu api về nhanh hơn