import React from 'react';
//import styles from '../component.module.css'
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { ToastContainer, toast } from 'react-toastify';


//Header
export const Header = (props) => {

    const handleLogout = () => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-key", "903361");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
        myHeaders.append("Cookie", "egrocer_session=OqYqjWnvp7vS6R80R2Kv9UdF2uG8kB6wii1myWmu");

        var formdata = new FormData();
        formdata.append("fcm_token", "sdasdasd");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://egrocer.netsofters.net/customer/logout", requestOptions)
            .then(response => response.json())
            .then(result => () => {
                toast.success(result.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => console.log('error', error));
        props.setuser(null)
        localStorage.removeItem('access_token')
        props.setisloggedin(false)
    }

    return (
        <>
            <nav className="navbar bg-light">
                <div className="container container-fluid d-flex flex-row">
                    <div>
                        <a href='/' className="navbar-brand">e-Grocery</a>
                    </div>

                    <div className="d-flex" role="search">
                        <input className="form-control me-2 col-1" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn" style={{ position: "relative", right: "75px" }} type="submit"><i className="fa fa-search btn " aria-hidden="true"></i></button>

                    </div>

                    <div className='d-flex'>
                        {
                            (props.isloggedin === false && props.user===null) ? (
                                <div className='btn-group'>

                                    {/* Login Button trigger Modal  */}
                                    <button className="btn" type="button" data-bs-toggle="modal" data-bs-target='#setlogin'>Login</button>

                                    {/* Login Modal  */}
                                    <div className="modal fade" id='setlogin' tabIndex="-1" role="dialog" aria-labelledby="setloginTitle" aria-hidden="true" >
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content" style={{ backgroundColor: "teal" }}>
                                                <Login user={props.user} setuser={props.setuser} isloggedin={props.isloggedin} setisloggedin={props.setisloggedin}></Login>

                                            </div>
                                        </div>
                                    </div>

                                    {/* <button type="button" className='btn dropdown-toggle dropdown-toggle-split' id='loginDropdown' data-bs-toggle='dropdown' aria-haspopup="true" aria-expanded="false"></button>
                                    <ul className='dropdown-menu' aria-labelledby='loginDropdown'>
                                        <li><button className="dropdown-item" ><i className="fa fa-shopping-bag mx-2" aria-hidden="true"></i>
                                            Orders</button></li>
                                        <li><button className="dropdown-item" ><i className="fa fa-heart mx-2" aria-hidden="true"></i>
                                            Wishlist</button></li>
                                    </ul> */}
                                </div>) : (
                                <div className='btn-group'>

                                    {/* Profile Button trigger Modal  */}
                                    <button className="btn " type="button" data-bs-toggle="modal" data-bs-target='#profile' ><i className="fa fa-user mx-2" aria-hidden="true"></i>Profile</button>
                                    {/* Profile Modal  */}
                                    <div className="modal fade" id='profile' tabIndex="-1" role="dialog" aria-labelledby="profileTitle" aria-hidden="true" >
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content" style={{ backgroundColor: "teal" }}>
                                                <Profile user={props.user} setuser={props.setuser} ></Profile>

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
                        <button className='btn '><i className="fa fa-shopping-cart m-2" aria-hidden="true"></i>
                            Cart</button>
                    </div>

                </div>
            </nav>
            <ToastContainer />

        </>
    );
};