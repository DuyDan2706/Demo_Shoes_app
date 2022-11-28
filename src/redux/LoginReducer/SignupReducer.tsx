import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import { DispatchType } from '../ConfigStore';
//productModel bao gồm các thuộc tính từ Api trả về
//có thể dùng type hoặc interface ( interface có thể mở rộng cao hơn so với type) 


export interface SignupModel   {
    email?: string;
    password?: string;
    name?:  string;
    gender?: boolean;  
    phone?: number;
    status?: boolean,
}


// khai báo thuộc tính bên trong
export type SiginupState = {
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team
    signup: SignupModel
}





const initialSingupState: SignupModel = {
  status: undefined,
  email: undefined,
  gender: undefined,
  name: undefined,
  password: undefined,
  phone: undefined,
};

const SignupReducer = createSlice({
  name: 'SignupReducer',
  initialState: initialSingupState,
  //thêm dữ liệu content vào reducer
  reducers: {
    signup:(state:SignupModel, action:PayloadAction<SignupModel>)=> {
        state.status = true;
       } ,
         
  }
});




export const SignupAction = SignupReducer.actions

export default SignupReducer.reducer 



/* ---------------------action api ..................*/

   export const postSignupApi = (data : SignupModel )=>{
    return async (dispatch:DispatchType) =>{
          
        try {
              const result = await axios ({
                url:'https://shop.cyberlearn.vn/api/Users/signup',
                method:'POST',
                data: data
              })
             
               //trả về dữ liệu (2)
               console.log("api", result.data)
               const action : PayloadAction<SignupModel>= SignupAction.signup (result.data.content);
               dispatch(action)
             
        }catch(err){
            console.log("ngu ne", err)
            alert("Email đã được sử dụng")
        }
    }
   }

//rcslice

// https://quicktype.io/ chuyển đổi dữ liệu api về nhanh hơn