import './App.css';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Content } from './Components/Content/Content';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ViewCart from './Components/Cart/ViewCart';
// import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchCity } from './Model/action/cityAction'
import Alert from './Components/Alert/Alert';
import { SelectedCategory } from './Components/Categories/SelectedCategory';
import { setLocation, clearLocation } from './Model/action/locationAction';
import { SelectedProduct } from './Components/Section/SelectedProduct';

function App() {

  const alert = useSelector((state) => state.alert)

  const dispatch = useDispatch();

  const [islocation, setislocation] = useState(true)


  useEffect(() => {
    //if location is not provided then first get it from user

    if (localStorage.getItem('location') === null) {
      setislocation(false)
    }
    else {
      if (Object.keys(JSON.parse(localStorage.getItem('location')).location).length === 0 && Object.keys(JSON.parse(localStorage.getItem('location')).city).length === 0) {
        setislocation(false);
      }
      else {
        dispatch(setLocation(JSON.parse(localStorage.getItem('location')).location));
        setislocation(true)
      }
    }

    return () => {
      dispatch(clearLocation());
    };

  }, [dispatch])


  return (

    <>
      {Object.keys(alert).length !== 0 ? <Alert type={alert.alert.type} message={alert.alert.message} /> : ""}

      <Router>

        <Header setislocation={setislocation} islocation={islocation} />
        {/* <Header user={user} setuser={setuser} isloggedin={isloggedin} setisloggedin={setisloggedin} /> */}
        <Routes>
          <Route exact path="/" element={
            <>
              <Content islocation={islocation} />
            </>
          }>
          </Route>
          <Route exact path="cn/:cname/cid/:cid" element={
            <>
              <SelectedCategory />
            </>
          }></Route>

          <Route exact path="prn/:pname/pid/:pid" element={
            <>
              <SelectedProduct />
            </>
          }></Route>

          <Route exact path="/viewcart" element={
            <>
              <ViewCart />
            </>
          }>
          </Route>

        </Routes>
        <Footer />
      </Router>

      {/* <ToastContainer/> */}
    </>
  );
}

export default App;
