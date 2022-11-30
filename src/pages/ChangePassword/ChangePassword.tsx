import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { getchangepassAsyncApi } from '../../redux/LoginReducer/loginReducer';
import { DispatchType } from '../../redux/ConfigStore';
type Props = {}

export default function ChangePassword({}: Props) {
    const dispatch:DispatchType = useDispatch();
    useEffect(() => {
       
        const actionThunk = getchangepassAsyncApi();
        dispatch(actionThunk);
    
      },[])
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            newPasswordConfirm:''
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .required("Password không được để trống!!")
                .min(6, "Password phải dài hơn 6 ký tự!!")
                .max(15, "Password phải ít hơn 15 ký tự!!"),
            newPasswordConfirm: Yup.string()
                .required("Xác nhận mật khẩu không được bỏ trống")
                .oneOf([Yup.ref('newPassword')], "Xác nhận mật khẩu không khớp với mật khẩu")
        }),
       
        onSubmit:(value:any) => {
            const action = getchangepassAsyncApi()
     dispatch(action)
            
        }
        
    })

  return (
    <div className='changePassword'>
    <div className="container">
        <form action="" onSubmit={formik.handleSubmit}>
            <div className="form-group" >
                <p>New Password</p>
                <input type="text" className='form-control' name='newPassword' onChange={formik.handleChange} />
                <p className='errorsTextInput'>{formik.errors.newPassword}</p>
            </div>
            <div className="form-group">
                <p>Password Confirm</p>
                <input type="text" className='form-control' name='newPasswordConfirm' onChange={formik.handleChange} />
                <p className='errorsTextInput'>{formik.errors.newPasswordConfirm}</p>
            </div>
            <div className="form-group">
                <button className='btn btn-primary mt-3'>Change Password</button>
            </div>
        </form>
    </div>
</div>
  )
}