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

function App() {

  const [user, setuser] = useState(null);
  const [isloggedin, setisloggedin] = useState(false)
  const [loading, setloading] = useState(true)
  const [settings, setsettings] = useState([])
  useEffect(() => {
    const usr = localStorage.getItem('User');
    if (usr !== null) {
      setuser(JSON.parse(usr));
      setisloggedin(true)
    }

    api.getSettings().then(response => response.json())
      .then(result => {
        setloading(false)
        if(result.status===1){
          setsettings(result.data)
        }
        else{
          console.log(result.error)
        }
      })
      .catch(error => console.log('error', error));

  }, [])


  return (

    <div className="App">
      {loading ? (
        <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
          <Spinner animation="grow p-1" variant="danger" />
          <Spinner animation="grow p-1" variant="warning" />
          <Spinner animation="grow p-1" variant="info" />
          <Spinner animation="grow p-1" variant="success" />

        </div>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={
              <>
                <Header user={user} setuser={setuser} isloggedin={isloggedin} setisloggedin={setisloggedin} />
                <Content google_place_api_key = {settings.google_place_api_key}/>
                <Footer />
              </>}>
            </Route>
            <Route exact path="/viewcart" element={
              <>
                <Header user={user} setuser={setuser} isloggedin={isloggedin} setisloggedin={setisloggedin} />
                <ViewCart />
                <Footer />
              </>}>
            </Route>
            {/* <Route exact path="/customer" element={<Home />}>
          </Route> */}

          </Routes>
        </Router>
      )}
    </div>


  );
}

export default App;
