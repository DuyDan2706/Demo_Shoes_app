import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import { array } from 'yup';
import { number } from 'yup/lib/locale';
import { DispatchType } from '../ConfigStore';
import { history } from '../../util/config';
//productModel bao gồm các thuộc tính từ Api trả về
//có thể dùng type hoặc interface ( interface có thể mở rộng cao hơn so với type) 
export interface CartModel   {
    name?: string;
    price?: number;
    id?: number;
    quantity: number;
    quantityInShop?: number;
    image?: string;
}
export interface orderModel   {
    orderDetail?: {
        productId : number | undefined ;
        quantity: number;
    }[];
    email: string;
}




// khai báo thuộc tính bên trong
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team

export type CartState = {
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team
    arrCart: CartModel[]
}
export interface OrderResult {
    content: string
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
              },
              delteteTocart : (state:CartState,action:PayloadAction<CartModel>) =>{            
                    state.arrCart = state.arrCart.filter(item => item.id != action.payload.id)
            },increaseQuantityTocart : (state:CartState,action:PayloadAction<CartModel>) =>{            
                const exist =  state.arrCart.find(item => item.id === action.payload.id)
                const objIndex = state.arrCart.findIndex((obj => obj.id == action.payload.id));  
                if(exist) state.arrCart[objIndex].quantity  =   exist.quantity + 1  ;
        },decreaseQuantityTocart : (state:CartState,action:PayloadAction<CartModel>) =>{            
            const exist =  state.arrCart.find(item => item.id === action.payload.id)
            const objIndex = state.arrCart.findIndex((obj => obj.id == action.payload.id));  
            if(exist) state.arrCart[objIndex].quantity  =   exist.quantity - 1  ;
    },changeQuantityTocart : (state:CartState,action:PayloadAction<CartModel>) =>{
        console.log("ngu 1", Number.isNaN(action.payload.quantity)  , typeof action.payload.quantity)            
        const exist =  state.arrCart.find(item => item.id === action.payload.id)
        const objIndex = state.arrCart.findIndex((obj => obj.id == action.payload.id));  
        if(exist) state.arrCart[objIndex].quantity  =   Number.isNaN(action.payload.quantity) == false ? action.payload.quantity : 1   ;     
  }
        
    }
    
    , extraReducers(builder) {
        builder.addCase(orderAsyncApi.fulfilled, (state: CartState, action: PayloadAction<OrderResult>) => {
            state.arrCart = state.arrCart.filter(item => item.id == 0)
            history.push('/');
        });
    // cách 2 createAction
   
  }});
  
  

export const cartAction = cartReducer.actions

export default cartReducer.reducer 



/* ---------------------action api ..................*/
export const orderAsyncApi = createAsyncThunk(
    'cartReducer/orderAsyncApi',
    async (order: orderModel):Promise<OrderResult> => {
        const response = await axios.post(`https://shop.cyberlearn.vn/api/Users/order`, order);
        return response.data.content;
    }
);

//rcslice

// https://quicktype.io/ chuyển đổi dữ liệu api về nhanh hơn