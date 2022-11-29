import { Action } from '@remix-run/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCarrd from '../../components/ProductCard/ProductCarrd'
import Button from '@mui/material/Button';
import { DispatchType, RootState } from '../../redux/ConfigStore'
import { getProductDetailApi, RelatedProduct } from '../../redux/ProductReducer/productReducer'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import cartReducer, { cartAction } from '../../redux/CartReducer/cartReducer'

type Props = {



}

export default function Detail({}: Props) {

   const [quantity, setQuantity]  =  useState(1) ;
   //bóc tách dữ liệu
   const {productDetail} = useSelector((state:RootState)=> state.product)
   console.log(productDetail)
    const params=useParams();
    const dispatch:DispatchType = useDispatch();

  const getProductByIdApi = () =>{
  // lấy param tư url 
  const id:string|undefined = params.id
  // b2: Dispatch thunk 
   const actionThunk=getProductDetailApi(id as string);
   dispatch(actionThunk)
  }


   useEffect (()=>{

    getProductByIdApi();

   },[params.id])


   interface FormValues {
    quantity: string;
    
   }
   
   interface OtherProps {
     title?: string;
   }
   
   interface MyFormProps {
     initialQuantity?: number;

   }

   const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        title
    } = props;
    return (
      <div>
          <form onSubmit={handleSubmit}>
          {touched.quantity && errors.quantity && (
                <div>{errors.quantity}</div>
              )}
             <TextField
                margin="normal"
                required
                fullWidth
                id="quantity"
                label="Quantity"
                name="quantity"
                error={touched.quantity && errors.quantity ? true : undefined}
                autoComplete="quantity"
               
                onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.quantity}
              />
    <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
             Add to Cart
            </Button>
              </form>
              </div>);
  };
  const numberRegExp = /^[0-9]+$/
  const {arrCart} = useSelector((state:RootState)=>state.cart);
  const exist =  arrCart.find(item => item.id === productDetail?.id)
  const LoginForm = withFormik<MyFormProps, FormValues>({
  
    mapPropsToValues:(props) => ({
      quantity: "1",
     
    }),
    validationSchema: Yup.object().shape({
      quantity: Yup.number().max( exist ? (productDetail?.quantity ? productDetail?.quantity - exist.quantity   : 10) 
                                        : productDetail?.quantity ? productDetail?.quantity : 10,
                                         "Quantity quá lớn").min(1, "Quantity is valid")
    }),
    handleSubmit(
      {quantity}: FormValues,
    ){
   
        dispatch(cartAction.addTocart(
   { quantity: parseInt(quantity),
    name: productDetail?.name,
    price: productDetail?.price,
    id: productDetail?.id,
    image: productDetail?.image,
    quantityInShop: productDetail?.quantity}
      ))
     },
  })(InnerForm);

  return (
    <div className='container'>
  {/* <h3> Product Name</h3> */}
  < div className='row mt-2'>
    <div className='col-4'>
    <img src={productDetail?.image} alt='...' height={450} width={450} style={{objectFit:'cover'}} />
    </div>
    <div className='col-8 mt-4'>
        
    <h3 className='mt-4 '> Name:{productDetail?.name}</h3>
    <p className='mt-4'> Alias :{productDetail?.alias}</p>
     <p className='mt-4'> price :{productDetail?.price}</p>
      <p className='mt-4'>description:{productDetail?.description}</p>
      <Box
      
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
     
    >
    <div>
          <LoginForm />
          </div>  
    </Box>
   
    </div>


  </div>
   <h3 className='mt-2 text-center'> --Related Products---</h3>
   <div className='row'>
    {productDetail?.relatedProducts.map((prod:RelatedProduct , index : number)=>{
      return  <div key={index} className='col-4'>
      <ProductCarrd prod={prod} />
    </div>
    })}
   
    
   </div>
    </div>


   
  )
}