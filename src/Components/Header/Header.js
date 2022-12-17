import React, { useRef } from 'react';
//import styles from '../component.module.css'
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../api';
import { useNavigate } from "react-router-dom";

//Header
export const Header = (props) => {
    const navigate = useNavigate();
    const LoginButtonRef = useRef();

    //Logout
    const handleLogout = () => {

        api.logout().then(response => response.json())
            .then(result => {
                //console.log(result)
                if (result.status === 1) {
                    toast.success(result.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    localStorage.removeItem('User')
                    localStorage.removeItem('access_token')
                    props.setuser(null)
                    props.setisloggedin(false)
                }
                else if (result.status === 0) {
                    toast.error(result.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

            })
            .catch(error => console.log('error', error));

    }

    //Cart
    const handleCart = (e) => {
        if (props.user === null) {
            LoginButtonRef.current.click();
        }
        else {
            navigate('/viewcart')
        }
    }

    return (
        <>
            <nav className="navbar">
                <div className="container container-fluid d-inline-flex flex-row">
                    <div>
                        <a href='/' className="navbar-brand">e-Grocery</a>
                    </div>

                    <div className="d-flex" role="search">
                        <input className="form-control me-2 col-1" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn" style={{ position: "relative", right: "75px" }} type="submit"><i className="fa fa-search btn " aria-hidden="true"></i></button>

                    </div>

                    <div className='d-flex'>
                        {
                            //props.isloggedin === false && props.user===null
                            (props.user === null) ? (
                                <div className='btn-group'>

                                    {/* Login Button trigger Modal  */}
                                    <button className="btn" type="button" data-bs-toggle="modal" data-bs-target='#setlogin' ref={LoginButtonRef}>Login</button>

                                    {/* Login Modal  */}
                                    <div className="modal fade" id='setlogin' tabIndex="-1" role="dialog" aria-labelledby="setloginTitle" aria-hidden="true" >
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content" style={{ backgroundColor: "teal" }}>
                                                <Login user={props.user} setuser={props.setuser} isloggedin={props.isloggedin} setisloggedin={props.setisloggedin}></Login>

                                            </div>
                                        </div>
                                    </div>


                                </div>) : (
                                <div className='btn-group'>

                                    {/* Profile Button trigger Modal  */}
                                    <button className="btn " type="button" data-bs-toggle="modal" data-bs-target='#profile' ><i className="fa fa-user mx-2" aria-hidden="true"></i>Profile</button>
                                    {/* Profile Modal  */}
                                    <div className="modal fade" id='profile' tabIndex="-1" role="dialog" aria-labelledby="profileTitle" aria-hidden="true" >
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content" style={{ backgroundColor: "teal" }}>
                                                <Profile ></Profile>
                                            </div>
                                        </div>
                                    </div>



                                    <button type="button" className='btn dropdown-toggle dropdown-toggle-split' id='profileDropdown' data-bs-toggle='dropdown' aria-haspopup="true" aria-expanded="false"></button>
                                    <ul className='dropdown-menu' aria-labelledby='profileDropdown'>
                                        <li><button className="dropdown-item" ><i className="fa fa-shopping-bag mx-2" aria-hidden="true"></i>
                                            Orders</button></li>
                                        <li><button className="dropdown-item" ><i className="fa fa-heart mx-2" aria-hidden="true"></i>
                                            Wishlist</button></li>
                                        <div className="dropdown-divider"></div>
                                        <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="fa fa-sign-out mx-2" aria-hidden="true"></i>
                                            Logout</button></li>
                                    </ul>

                                </div>
                            )}
                        <button className='btn btn-outline-dark' onClick={handleCart}><i className="fa fa-shopping-cart m-2" aria-hidden="true" ></i>
                            Cart</button>
                    </div>
                </div>
            </nav>
            <ToastContainer />

        </>
    );
};