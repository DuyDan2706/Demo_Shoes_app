import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { UserLoginModel } from '../../pages/Login/Login';
import { ACCESS_TOKEN, history, http, settings, USER_LOGIN } from '../../util/config';
//change password

export interface Changepass {
    newPassword: string;
    newPasswordConfirm:String
  }

//update profile 
export interface UpdateProfile {
    email:    string;
    password: string;
    name:     string;
    gender:   boolean;
    phone:    string;
  }
  
/* userProfile*/
export interface UserProfile {
    ordersHistory: OrdersHistory[];
    email:         string;
    name:          string;
    password:      null;
    gender:        boolean;
    phone:         string;
    facebookId:    string;
    deleted:       boolean;
    avatar:        string;
}
export interface OrdersHistory {
    orderDetail: OrderDetail[];
    id:          number;
    date:        Date;
    status:      null;
    email:       string;
    alias:       string;
}
export interface OrderDetail {
    name:             string;
    alias:            string;
    shortDescription: string;
    quantity:         number;
    price:            number;
    image:            string;
    description:      string;
}


/* userLogin */
export interface UserLoginResult {
    email: string,
    accessToken: string
}


export interface UserState {
    userLogin: UserLoginResult,
    userProfile:UserProfile | null
    updateProfile:UpdateProfile | null
    changepass :Changepass | null
}



const initialState: UserState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
    userProfile: null,
    updateProfile:null,
    changepass:null
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loginAsyncApi.fulfilled, (state: UserState, action: PayloadAction<UserLoginResult>) => {
            state.userLogin = action.payload;
            settings.setStorageJson(USER_LOGIN,action.payload);
            settings.setCookieJson(USER_LOGIN,action.payload,30);
            settings.setStorage(ACCESS_TOKEN,action.payload.accessToken);
            settings.setCookie(ACCESS_TOKEN,action.payload.accessToken,30);
            history.push('/');
        });

        //X??? l?? profile
        builder.addCase(getProfileAsyncApi.fulfilled,(state:UserState,action:PayloadAction<UserProfile>) => {
            state.userProfile = action.payload
        });
//update
builder.addCase(getupdateProfileAsyncApi.fulfilled,(state:UserState,action:PayloadAction<UpdateProfile>) => {
    state.updateProfile = action.payload
});

//change pass
builder.addCase(getchangepassAsyncApi.fulfilled,(state:UserState,action:PayloadAction<Changepass>) => {
    state.changepass = action.payload
});
    }


});

export const { } = userReducer.actions
export default userReducer.reducer
export const loginAsyncApi = createAsyncThunk(
    'userReducer/loginAsyncApi',
    async (userLogin: UserLoginModel):Promise<UserLoginResult> => {
        const response = await http.post(`/api/Users/signin`, userLogin);
        return response.data.content;
    }
);
export const getProfileAsyncApi = createAsyncThunk(
    'userReducer/getProfileAsyncApi',
    async ():Promise<UserProfile> => {
        const response = await http.post('/api/users/getProfile');
        return response.data.content;
    }
);

export const getupdateProfileAsyncApi = createAsyncThunk(
    'userReducer/getupdateProfileAsyncApi',
    async ():Promise<UpdateProfile> => {
        const response = await http.post('/api/Users/updateProfile');
        return response.data.content;
    }
);

export const getchangepassAsyncApi = createAsyncThunk(
    'userReducer/getchangepassAsyncApi',
    async ():Promise<Changepass> => {
        const response = await http.post('/api/Users/changePassword');
        return response.data.content;
    }
);





