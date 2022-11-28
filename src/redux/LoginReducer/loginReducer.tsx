import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import { DispatchType } from '../ConfigStore';
//productModel bao gồm các thuộc tính từ Api trả về
//có thể dùng type hoặc interface ( interface có thể mở rộng cao hơn so với type) 
export interface LoginState   {
    isLoggedIn: boolean;
    logging?: boolean;
    email: string  | undefined;
    accessToken: string| undefined;
}

export interface SignupModel   {
    email: string;
    password: string;
    name:  string;
    gender: boolean;  
    phone: number;
    
}
export interface SigninModel   {
    email?: string;
    password?: string;
   
}

// khai báo thuộc tính bên trong
export type SiginupState = {
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team
    signup: SignupModel
}
export type SigininState = {
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team
    signin: SigninModel
}


const initialState: LoginState = {
   isLoggedIn: false,
   logging: false,
   email: undefined,
   accessToken: undefined
};

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

export const selectIsLoggedIn = (state: any) => state.loginReducer.isLoggedIn;
export const selectIsLogging = (state: any) => state.loginReducer.logging;

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
            alert("Tài Khoản Or Mật Khẩu sai")
        }
    }
   }

//rcslice

// https://quicktype.io/ chuyển đổi dữ liệu api về nhanh hơn