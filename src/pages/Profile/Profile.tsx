import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/ConfigStore'
import { getProfileAsyncApi, getupdateProfileAsyncApi } from '../../redux/LoginReducer/loginReducer'
import { NavLink } from 'react-router-dom';
type Props = {}

export default function Profile({ }: Props) {

  const frmUserProfile = useFormik({
    initialValues:{},
    onSubmit:(value:any) => {
  const action = getupdateProfileAsyncApi()
     dispatch(action)
    }
  })
  const {userProfile} = useSelector((state:RootState) => state.login);
console.log ("dan", userProfile)
  const dispatch:DispatchType = useDispatch();

  useEffect(() => {
    //Gọi api get profile
    const actionThunk = getProfileAsyncApi();
    dispatch(actionThunk);

  },[])

  return (
    <div className='container'>
      <h3 className='profileText'>Profile</h3>
      <div className='row'>
        <div className='col-4'>
          <img src={userProfile?.avatar} alt="..." className='rounded-circle' width={200} height={200} />
        </div>
        <div className='col-8'>
          <form>
            <div className='row'>
              <div className='col-6'>
                <div className='form-group'>
                  <p>Email</p>
                  <input type="text" className='form-control' name="email" value={userProfile?.email} onChange={frmUserProfile.handleChange} />
                </div>
                <div className='form-group'>
                  <p>Phone</p>
                  <input type="text" className='form-control' name="phone"  value={userProfile?.phone} onChange={frmUserProfile.handleChange}/>
                </div>
              </div>
              <div className='col-6'>
                <div className='form-group'>
                  <p>Name</p>
                  <input className='form-control' name="name" />
                </div>
                <div className='form-group'>
                  <p>Password</p>
                  <input className='form-control' name="password" type="password"  value={userProfile?.password ?userProfile?.password  : '123'} onChange={frmUserProfile.handleChange}/>
                </div>
                <div className='form-group d-flex'>
                  <div className='w-75'>
                    <p>Gender</p>
                    <input name="gender" type="radio" /> Male
                    <input  name="gender" type="radio" /> Female
                  </div>
                  <div className='text-right w-25'>
                    <button type='submit' className='btn btn-primary mt-3'>Update</button>
                  </div>
                 
                </div>
                <div className="form-group d-flex justify-content-between align-items-center">
                  <NavLink to={"/changepassword"}>You want to change password?</NavLink>
                  </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}