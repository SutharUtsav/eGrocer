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
import CheckoutForm from './components/checkout/CheckoutForm';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
function App() {
  const PUBLIC_STIPE_KEY = "pk_test_51Mh61WSGE1GzOTGOyLFxb1d5ZLy5jae3jdXoHBjkWfrHhUOloFo48dSP5LaddrclqMoo4LcJONDn9mw1eBmcwrms00nOfYQraI"
  const stripeTestPromise = loadStripe(PUBLIC_STIPE_KEY)
  const SK='sk_test_51Mh61WSGE1GzOTGOcGVpbIEyBwqSfC6zs2SymfqWXBFkDMgAp8EOiiA0fy8omMVRflAflNB3j4RGhYqv3NzibTDc008QyNFV4S'
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

  // passing the client secret obtained from the server
  
  

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
            <Route path="/checkout" element={<Elements stripe={stripeTestPromise} client_secret={SK}><Checkout /></Elements>}></Route>
            {/* <Route path="/form" element={<Elements stripe={stripePromise} options={options}><CheckoutForm /></Elements>}></Route> */}
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
