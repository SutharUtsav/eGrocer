import './App.css';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Content } from './Components/Content/Content';
import React, { useState, useEffect } from 'react';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [user, setuser] = useState(null);
  const [isloggedin, setisloggedin] = useState(false)

  useEffect(() => {
    return () => {
      if (localStorage.getItem('access_token') !== null && user!==null && isloggedin!==false) {
        setisloggedin(true)
      }
    };
  }, [isloggedin])
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={
            <>
              <Header user={user} setuser={setuser} isloggedin={isloggedin} setisloggedin={setisloggedin} /><Content user={user} setuser={setuser} /><Footer />
            </>}>
          </Route>
          {/* <Route exact path="/customer" element={<Home />}>
          </Route> */}

        </Routes>
      </Router>
    </div>


  );
}

export default App;
