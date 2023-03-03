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

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './components/checkout/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
function App() {

  // const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');


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

  //paymentgateway-stripe
  // const id='sk'
  // const secret='tR3PYbcVNZZ796tH88S4VQ2u'
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: process.env.REACT_APP_STRIPE_CLEANTSECTET
  // };
// console.log(options)

  //authenticate current user
  useEffect(() => {
    if (cookies.get('jwt_token') !== undefined) {
      getCurrentUser(cookies.get('jwt_token'));
    }

  }, [])

  return (
    <AnimatePresence>
      <div className="w-100 h-auto ">
        <Header />
        <main id='main' className="main-app">
          <Routes>
            <Route path="/cart" element={<ViewCart />}></Route>
            {/* <Route path="/checkout" element={<Elements ><Checkout stripe={stripePromise} options={options}/></Elements>}></Route> */}
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
