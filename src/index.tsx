import React from 'react';
import ReactDOM from 'react-dom/client';
// setup react router dom phiên bản 6
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Cart from './pages/Cart/Cart';
import Detail from './pages/Detail/Detail';
import { Provider } from 'react-redux';
import { store } from './redux/ConfigStore';
//style
import './assets/scss/style.scss'
import Search from './pages/Search/Search';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
 <BrowserRouter>
 <Routes>
  <Route path ="" element={<HomeTemplate />} >
  <Route index element = {<Home/>} ></Route>
  <Route path='login' element = {<Login/>} ></Route>
  <Route path='profile' element = {<Profile/>} ></Route>
  <Route path='register' element = {<Register/>} ></Route>
  <Route path='cart' element = {<Cart/>} ></Route>
  <Route path='search' element = {<Search/>} ></Route>
  <Route path='detail' element = {<Detail/>} >
    <Route path=':id'></Route>
  </Route>
  <Route path='*' element = {<Navigate to =""/>} ></Route>
  </Route>

 </Routes>
 </BrowserRouter>
 </Provider>
);



