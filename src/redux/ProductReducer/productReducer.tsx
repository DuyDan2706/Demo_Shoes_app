import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import { DispatchType } from '../ConfigStore';
//productModel bao gồm các thuộc tính từ Api trả về
//có thể dùng type hoặc interface ( interface có thể mở rộng cao hơn so với type) 
export interface ProductModel   {
    id: number;
    name: string;
    alias:  string;
    price: number;
    description:string;
    size:string;
    shortDescription: string;
    quantity:number;
    deleted: boolean;
    categories:string;
    relatedProducts:string;
    feature: boolean;
    image: string;
}


// khai báo thuộc tính bên trong
export type ProductState = {
    // product sẽ hiện lên giao diện diện sẽ gọi là ProductModel hoặc ProductViewModel tùy thuocj vào team
    arrProduct:ProductModel[]
}


const initialState:ProductState = {
    arrProduct: [
        {
            "id": 1,
            "name": "Adidas Prophere",
            "alias": "adidas-prophere",
            "price": 350,
            "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
            "size": "[36,37,38,39,40,41,42]",
            "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
            "quantity": 995,
            "deleted": false,
            "categories": "[{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"MEN\",\"category\":\"MEN\"},{\"id\":\"WOMEN\",\"category\":\"WOMEN\"}]",
            "relatedProducts": "[2,3,5]",
            "feature": true,
            "image": "https://shop.cyberlearn.vn/images/adidas-prophere.png"
          }
    ] // js khai báo rỗng thì ok còn ts thì phải khai báo 

}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  //thêm dữ liệu content vào reducer
  reducers: {
          setArrProductAction : (state:ProductState,action:PayloadAction<ProductModel[]>) =>{
            state.arrProduct = action.payload
          }

  }
});

export const {setArrProductAction} = productReducer.actions

export default productReducer.reducer

/* ---------------------action api ..................*/
export const getProductApi = ()=>{
    return async (dispatch:DispatchType) =>{
          
        try {
              const result = await axios ({
                url:'https://shop.cyberlearn.vn/api/Product',
                method:'GET'
              })

               //trả về dữ liệu (2)
              const content:ProductModel[] = result.data.content;
              //sau khi lấy dữ liệu từ api về ta lấy dispatch lên store 
              const action : PayloadAction<ProductModel[]>= setArrProductAction (content);
              dispatch(action)

              console.log('content',content)
        }catch(err){
            console.log(err)
        }
   


    }
   }
   
  




//rcslice

// https://quicktype.io/ chuyển đổi dữ liệu api về nhanh hơn