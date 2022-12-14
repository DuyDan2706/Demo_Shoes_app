import { configureStore } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type'
import cartReducer from './CartReducer/cartReducer'
import loginReducer from './LoginReducer/loginReducer'
import SignupReducer from './LoginReducer/SignupReducer'
import productReducer from './ProductReducer/productReducer'

export const store = configureStore({
  reducer: {
    // number: (state=1)=>{
    //     return state
    // }
    cart: cartReducer,
    signup: SignupReducer,
    login: loginReducer,
    product: productReducer
  },
})
export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch
export default store








// khi set up v nó đã có thunk  devtool
// bổ sung kiểu dữ lieuj cho store 

// khi khai báo xong p productreduxcer thì nhớ khai báo Reducer trong configstore.