import './App.css';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Content } from './Components/Content/Content';
import React, { useState, useEffect } from 'react';
import api from './api';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ViewCart from './Components/Cart/ViewCart';
import { Spinner } from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';


function App() {

  const [user, setuser] = useState(null);
  const [isloggedin, setisloggedin] = useState(false)
  const [loading, setloading] = useState(true)
  // const [settings, setsettings] = useState([])
  const [location, setlocation] = useState({
    city: process.env.REACT_APP_DEFAULT_CITY,
    formatted_address: process.env.REACT_APP_DEFAULT_CITY,
    coordinates: {
      latitude: process.env.REACT_APP_DEFAULT_LATITUDE,
      longitude: process.env.REACT_APP_DEFAULT_LONGITUDE,
    }
  })

  useEffect(() => {
    const usr = localStorage.getItem('User');
    if (usr !== null) {
      setuser(JSON.parse(usr));
      setisloggedin(true)
    }

    // api.getSettings().then(response => response.json())
    //   .then(result => {
    //     setloading(false)
    //     if(result.status===1){
    //       setsettings(result.data)
    //     }
    //     else{
    //       console.log(result.error)
    //     }
    //   })
    //   .catch(error => console.log('error', error));

    api.getCity().then(response => response.json())
      .then(result => {
        setloading(false)
        if (result.status === 1) {
          setlocation({
            city: result.data.name,
            formatted_address: result.data.formatted_address,
            coordinates: {
              latitude: result.data.latitude,
              longitude: result.data.longitude,
            }
          })
        }
        else {
          setlocation({
            status: 0,
            message: result.message
          })
          console.log(result.message)
        }
      })
      .catch(error => console.log('error', error));

  }, [])


  return (

    <>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
          <Spinner animation="grow p-1" variant="danger" />
          <Spinner animation="grow p-1" variant="warning" />
          <Spinner animation="grow p-1" variant="info" />
          <Spinner animation="grow p-1" variant="success" />

        </div>
      ) : (
        <Router>
          <Header user={user} setuser={setuser} isloggedin={isloggedin} setisloggedin={setisloggedin} />
          <Routes>
            <Route exact path="/" element={
              <>
                <Content location={location} setlocation={setlocation} />
              </>}>
            </Route>
            <Route exact path="/viewcart" element={
              <>
                <ViewCart />
              </>
            }>
            </Route>
            {/* <Route exact path="/customer" element={<Home />}>
          </Route> */}
          </Routes>
          <Footer />
        </Router>
      )}
      {/* <ToastContainer/> */}
    </>


  );
}

export default App;
