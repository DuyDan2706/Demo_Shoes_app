import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import { DispatchType } from '../ConfigStore';
//productModel bao gồm các thuộc tính từ Api trả về
//có thể dùng type hoặc interface ( interface có thể mở rộng cao hơn so với type) 
export interface LoginState   {
    isLoggedIn: boolean;
    logging?: boolean;
    email?: string ;
    accessToken?: string;
}


export interface SigninModel   {
    email?: string;
    password?: string;
}

// khai báo thuộc tính bên trong
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team

export type SigininState = {
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team
    signin: SigninModel
}

const accessToken = localStorage.getItem("token")
const email = localStorage.getItem("email")
console.log("localstorage", email, accessToken)
const initialState: LoginState = accessToken && email ? {
   isLoggedIn: true,
   logging: true,
   email: email,
   accessToken: accessToken
} : {
  isLoggedIn: false,
  logging: false,
  email: undefined,
  accessToken: undefined
}




const loginReducer = createSlice({
  name: 'loginReducer',
  initialState,
  //thêm dữ liệu content vào reducer
  reducers: {
         login:(state:LoginState, action:PayloadAction<LoginState>)=> {
           state.logging = true;
           console.log("action", action.payload.email)
           if(action.payload.accessToken && action.payload.email){
            localStorage.setItem("token", action.payload.accessToken);
            localStorage.setItem("email", action.payload.email);
           }   
         } ,
         loginSuccess:(state:LoginState, action:PayloadAction<string>)=> {
            state.logging = false;
            state.email = action.payload;
         },
         loginFail:(state:LoginState, action:PayloadAction<string>)=> {
            state.logging = false;
         },
         logout:(state:LoginState) =>{
           state.logging = false;
           state.email = undefined
           localStorage.removeItem('token');
           localStorage.removeItem('email');
         } , 
  }
});

export const LoginAction = loginReducer.actions

export default loginReducer.reducer 



/* ---------------------action api ..................*/
export const postSigninApi = (data : SigninModel )=>{
    return async (dispatch:DispatchType) =>{
          
        try {
              const result = await axios ({
                url:'https://shop.cyberlearn.vn/api/Users/signin',
                method:'POST',
                data: data
              })
             
               //trả về dữ liệu (2)
               console.log("api", result.data)
               const action : PayloadAction<LoginState>= LoginAction.login (result.data.content);
               dispatch(action)
             
        }catch(err){
            console.log("ngu ne", err)
            alert("Tài khoản or mật khẩu sai")
        }
    }
   }



//rcslice

// https://quicktype.io/ chuyển đổi dữ liệu api về nhanh hơn