import { configureStore } from '@reduxjs/toolkit'
import productReducer from './ProductReducer/productReducer'

export const store = configureStore({
  reducer: {
    // number: (state=1)=>{
    //     return state
    // }
    productReducer
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store
// khi set up v nó đã có thunk  devtool
// bổ sung kiểu dữ lieuj cho store 

// khi khai báo xong p productreduxcer thì nhớ khai báo Reducer trong configstore.