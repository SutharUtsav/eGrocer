import React, { useState } from 'react';
//import styles from '../component.module.css'
import { Login } from '../Login/Login';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import GeoLocation from '../GeoLocation/GeoLocation';
import { Link } from 'react-scroll';


//Header
export const Header = (props) => {
    const navigate = useNavigate();

    //Cart click
    const handleCartClick = () => {
        navigate('/viewcart')
    }

    const location = useSelector((state) => state.location.location)

    const [profileClick, setprofileClick] = useState(false)
    const [locationClick, setLocationClick] = useState(false)


    const handleProfileClick = () => {
        setprofileClick(!profileClick)
        document.getElementsByClassName("navbar")[0].classList.remove('active')
        // document.getElementsByClassName("login-form")[0].classList.toggle('active')
    }

    window.addEventListener('scroll', () => {
        setprofileClick(false)
        document.getElementsByClassName("navbar")[0].classList.remove('active')

        if (window.scrollY > 150) {
            document.getElementsByClassName('header-2')[0].classList.add('active')
        }
        else {
            document.getElementsByClassName('header-2')[0].classList.remove('active')
        }

    })

    return (
        <header>
            <div className="header-1">
                <a href='/' className="logo"><i className="bi bi-shop-window"></i>e-Grocery</a>

                <form onSubmit={(e) => { e.preventDefault() }} className='search-box-container'>
                    <input type="search" id="search-box" placeholder="Search here..." />
                    <label htmlFor="search-box"> <i className="bi bi-search"></i></label>
                    {/* <button className="btn" style={{ position: "relative", right: "50px" }} type="submit"><i className="bi bi-search"></i></button> */}
                </form>

                <div id="delivery-address">

                    {/* Delivery Location */}
                    {!props.islocation? (
                        <button type="button" id="dropdownDelivery" onClick={() => {
                            setprofileClick(false);
                            setLocationClick(!locationClick);
                        }} >
                            <i className="fa fa-map-marker" aria-hidden="true"></i> Select Location
                        </button>



                    ) : (
                        <button type="button" id="dropdownDelivery" onClick={() => {
                            setprofileClick(false);
                            setLocationClick(!locationClick);
                        }} >
                            <i className="fa fa-map-marker" aria-hidden="true"></i> Deliver to {location.formatted_address}
                        </button>
                    )}
                    {locationClick || !props.islocation ? <GeoLocation labelby="dropdownDelivery" setLocationClick={setLocationClick} setislocation={props.setislocation}/> : ""}
                </div>

            </div>


            <div className='header-2'>
                <div id="menu-bar" onClick={() => {
                    setprofileClick(false);
                    document.getElementsByClassName("navbar")[0].classList.toggle('active')
                }}><i className="fa fa-bars" aria-hidden="true"></i></div>
                <nav className='navbar'>
                    <Link to="home">Home</Link>
                    <Link to="offers">Offers</Link>
                    <Link to="category">category</Link>
                    <Link to="brands">brands</Link>
                    <Link to="products">Shop</Link>
                </nav>

                <div className='icons'>
                    <button onClick={handleProfileClick}><i className="bi bi-person"></i></button>
                    <button className=''><i className="bi bi-heart"></i></button>
                    <button onClick={handleCartClick} className=''><i className="bi bi-cart"></i></button>
                </div>

                {
                    profileClick ? (<Login setprofileClick={setprofileClick} />) : ""
                }

            </div>

        </header >
    );
};