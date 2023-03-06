import { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import MainContainer from "./components/MainContainer";
import { AnimatePresence } from "framer-motion";
import { Footer } from "./components/footer/Footer";
import ProfileDashboard from './components/profile/ProfileDashboard'
import { ToastContainer } from 'react-toastify';

import Cookies from 'universal-cookie'
import { useDispatch } from 'react-redux';
import { ActionTypes } from './model/action-type';
import api from './api/api';


//react-toast
import 'react-toastify/dist/ReactToastify.css';
import ShowAllCategories from './components/category/ShowAllCategories';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import ViewCart from './components/cart/ViewCart';
import Wishlist from './components/favorite/Wishlist';
import Checkout from './components/checkout/Checkout';
import Transaction from './components/transaction/Transaction';


function App() {



  //initialize cookies
  const cookies = new Cookies();

  const dispatch = useDispatch();


  const getCurrentUser = (token) => {
    api.getUser(token)
      .then(response => response.json())
      .then(result => {
        if (result.status === 1) {

          dispatch({ type: ActionTypes.SET_CURRENT_USER, payload: result.user });
        }
      })
  }



  //authenticate current user
  useEffect(() => {
    if (cookies.get('jwt_token') !== undefined) {
      getCurrentUser(cookies.get('jwt_token'));
    }

  }, [])

  return (
    <AnimatePresence>
      <div className=" h-auto ">
        <Header />
        <main id='main' className="main-app">
          <Routes>
            <Route path="/cart" element={<ViewCart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path='/wishlist' element={<Wishlist />}></Route>
            <Route path="/profile" element={<ProfileDashboard />}></Route>
            <Route path='/categories' element={<ShowAllCategories />}></Route>
            <Route path='/products' element={<ProductList />}></Route>
            <Route path='/product' element={<ProductDetails />}></Route>
            <Route path='/transactions' element={<Transaction />}></Route>
            <Route path="/*" element={<MainContainer />}></Route>

          </Routes>
        </main>
        <Footer />
        <ToastContainer toastClassName='toast-container' />
      </div>
    </AnimatePresence>
  );
}

export default App;
