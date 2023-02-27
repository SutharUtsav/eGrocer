import React, { useState, useEffect, useRef } from 'react'
import './header.css'
import { BsShopWindow } from 'react-icons/bs'
import { BiUserCircle } from 'react-icons/bi'
import { MdSearch, MdGTranslate, MdOutlineAccountCircle } from "react-icons/md";
import { IoContrast, IoNotificationsOutline, IoHeartOutline, IoCartOutline } from 'react-icons/io5';
import { IoMdArrowDropdown, IoIosArrowDown } from "react-icons/io"
import { GoLocation } from 'react-icons/go'
import { FiMenu, FiFilter } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom';
import Location from '../location/Location';
import logoPath from '../../utils/logo_egrocer.svg'
import { getLocation } from '../../utils/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/api';
import { ActionTypes } from '../../model/action-type';
import Login from '../login/Login';
import Category from '../category/Category';
import Cookies from 'universal-cookie'
import Cart from '../cart/Cart';
import { toast } from 'react-toastify';
import Favorite from '../favorite/Favorite';


// import 'bootstrap/dist/js/bootstrap.bundle.js'
// import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';


const Header = () => {

    // const [islocationclick, setislocationclick] = useState(false);
    // const [issearchClick, setissearchClick] = useState(false);
    const [isLocationPresent, setisLocationPresent] = useState(false);

    const locationModalTrigger = useRef();

    const dispatch = useDispatch();

    const city = useSelector(state => (state.city))
    const cssmode = useSelector(state => (state.cssmode))
    const user = useSelector(state => (state.user))
    const cart = useSelector(state => (state.cart))
    const favorite = useSelector(state => (state.favorite))
    // const categories = useSelector(state => (state.category))

    //initialize cookies
    const cookies = new Cookies();

    const curr_url = useLocation();


    useEffect(() => {
        let location = getLocation();
        if (location !== null) {

            if (Object.keys(location).length !== 0) {
                api.getCity(location.city, location.lat, location.lng)
                    .then(response => response.json())
                    .then(result => {
                        if (result.status === 1) {
                            dispatch({ type: ActionTypes.SET_CITY, payload: result.data });
                        }
                    })
                setisLocationPresent(true);
            }
        }
        else {
            locationModalTrigger.current.click();
        }
    }, [dispatch])


    const fetchCart = async (token, latitude, longitude) => {
        await api.getCart(token, latitude, longitude)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    dispatch({ type: ActionTypes.SET_CART, payload: result })
                }
                else {
                    dispatch({ type: ActionTypes.SET_CART, payload: null })
                }
            })
            .catch(error => console.log(error))
        await api.getCart(token, latitude, longitude, 1)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    dispatch({ type: ActionTypes.SET_CART_CHECKOUT, payload: result.data })
                }

            })
            .catch(error => console.log(error))


    }

    const fetchFavorite = async (token, latitude, longitude) => {
        await api.getFavorite(token, latitude, longitude)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    dispatch({ type: ActionTypes.SET_FAVORITE, payload: result })
                }
                else {
                    dispatch({ type: ActionTypes.SET_FAVORITE, payload: null })
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (city.city !== null && cookies.get('jwt_token') !== undefined && user.user !== null) {
            fetchCart(cookies.get('jwt_token'), city.city.latitude, city.city.longitude)
            fetchFavorite(cookies.get('jwt_token'), city.city.latitude, city.city.longitude)
        }
    }, [city, user])


    const handleCssModeChange = (e) => {
        dispatch({ type: ActionTypes.SET_CSSMODE, payload: e.target.value });
    }

    const handleLanguageChange = (e) => {
        dispatch({ type: ActionTypes.SET_LANGUAGE, payload: e.target.value });
    }

    return (
        <>

            {/* sidebar */}
            <div className="hide-desktop offcanvas offcanvas-start" tabIndex="-1" id="sidebaroffcanvasExample" aria-labelledby="sidebaroffcanvasExampleLabel">
                <div className='site-scroll ps'>

                    <div className="canvas-header">
                        <div className='site-brand'>
                            <img src={logoPath} height="50px" alt="logo"></img>
                        </div>

                        <button type="button" className="close-canvas" data-bs-dismiss="offcanvas" aria-label="Close"><AiOutlineCloseCircle /></button>
                    </div>
                    <div className="canvas-main">
                        <div className='site-location'>
                            <motion.button whileTap={{ scale: 0.8 }} type='buton' data-bs-toggle="modal" data-bs-target="#locationModal" ref={locationModalTrigger}>
                                <div className='d-flex flex-row gap-2'>
                                    <div className='icon location p-1 m-auto'>
                                        <GoLocation />
                                    </div>
                                    <div className='d-flex flex-column flex-grow-1'>
                                        <span className='location-description'>Deliver to <IoMdArrowDropdown /></span>
                                        <span className='current-location'>{isLocationPresent
                                            ? (
                                                <>
                                                    {city.status === 'fulfill'
                                                        ? city.city.formatted_address
                                                        : (
                                                            <div className="d-flex justify-content-center">
                                                                <div className="spinner-border" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                </>)
                                            : "Please select location"
                                        }</span>
                                    </div>
                                </div>
                            </motion.button>
                        </div>

                        <div className='all-categories locked'>
                            {/* <motion.button whileTap={{ scale: 0.8 }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="false" aria-controls="collapseCategories">
                                <FiMenu />
                                <span className='text'>All categories</span>
                                <IoIosArrowDown />
                            </motion.button>

                            <div className="collapse" id="collapseCategories">
                                Category
                            </div> */}
                            <Category />

                        </div>

                        <div className='canvas-title'>
                            <h6 className='entry-title'>Site Navigation</h6>
                        </div>

                        <nav className='canvas-menu canvas-primary vertical'>
                            <ul id='menu-menu-1' className='menu'>
                                <li className=' menu-item menu-item-type-post_type menu-item-object-page'>
                                    <Link to='/'>Home</Link>
                                </li>

                                <li className='dropdown mega-menu menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children' >
                                    <button type="button" >
                                        Shop
                                    </button>
                                    <ul className="sub-menu dropdown-menu" aria-labelledby="ShopDropDown">
                                        <li className='dropdown-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children'>
                                            <button type='button'>Cart</button>
                                        </li>

                                        <li className='dropdown-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children'>
                                            <button type='button'>Checkout</button>
                                        </li>

                                        <li className='dropdown-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children'>
                                            <button type='button'>My Account</button>
                                        </li>

                                        <li className='dropdown-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children'>
                                            <button type='button'>wishlist</button>
                                        </li>

                                        <li className='dropdown-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children'>
                                            <button type='button'>Order Tracking</button>
                                        </li>
                                    </ul>
                                    <button className='menu-dropdown' id="ShopDropDown" type='button' data-bs-toggle="dropdown" aria-expanded="false">
                                        <IoIosArrowDown />
                                    </button>
                                </li>

                                <li className=' menu-item menu-item-type-post_type menu-item-object-page'>
                                    <Link to='/about'>About Us</Link>
                                </li>
                                <li className=' menu-item menu-item-type-post_type menu-item-object-page'>
                                    <Link to='/contact'>Contact Us</Link>
                                </li>
                                <li className=' menu-item menu-item-type-post_type menu-item-object-page'>
                                    <Link to='/faq'>FAQ</Link>
                                </li>
                                <li className='dropdown-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children'>
                                    <button type='button'>Notification</button>
                                </li>

                            </ul>


                            <div className='lang-mode-utils'>
                                <div className='util'>
                                    <span>Select Language</span>
                                    <select className='' onChange={handleLanguageChange}>
                                        <option value="english">English</option>
                                        <option value="gujarati">Gujarati</option>
                                        <option value="hindi">Hindi</option>
                                    </select>
                                </div>
                                <div className='util'>
                                    <span>Select Mode</span>
                                    <select className='' onChange={handleCssModeChange}>
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>

                            </div>
                        </nav>

                        <div className='canvas-footer'>
                            <div className='site-copyright'>
                                Copyright © 2022.All right Reversed By eGrocer.
                            </div>
                        </div>


                    </div>
                </div>

            </div>

            {/* header */}
            <header className='site-header desktop-shadow-disable mobile-shadow-enable mobile-nav-enable'>


                {/* top header */}
                <div className={`header-top header-wrapper hide-mobile ${(cssmode.cssmode === "dark") ? "dark-header-top" : ''}`}>
                    <div className={`container`}>
                        <div className='column column-left'>
                            <Link to='/about' className={`p-2 border-end ${(cssmode.cssmode === "dark") ? "dark-header-1" : ''}`} > About us</Link>
                            <Link to='/contact' className={`p-2 border-end`} > Contact us</Link>
                            <Link to='/faq' className={`p-2 border-end`} > faq</Link>
                        </div>
                        <div className='column column-right'>
                            <div className='d-flex justify-content-center align-items-center border-start px-2'>
                                <div>
                                    <IoContrast className='fs-3' />
                                </div>
                                <select className='p-2' onChange={handleCssModeChange}>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>

                            <div className='d-flex justify-content-center align-items-center border-start px-2'>
                                <div>
                                    <MdGTranslate className='fs-3' />
                                    <select className='p-2' onChange={handleLanguageChange}>
                                        <option value="english">English</option>
                                        <option value="gujarati">Gujarati</option>
                                        <option value="hindi">Hindi</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* bottom header */}
                <div className="header-main header-wrapper border-bottom">
                    <div className='container'>

                        <div className='column column-left '>

                            <div className='header-buttons hide-desktop' style={curr_url.pathname === '/profile' ? { display: "none" } : null}>

                                <button className='header-canvas button-item' type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebaroffcanvasExample" aria-controls="sidebaroffcanvasExample">
                                    <div className='button-menu'>
                                        <FiMenu />
                                    </div>
                                </button>


                            </div>


                            <Link to='/' className='site-brand' style={curr_url.pathname === '/profile' ? { marginLeft: '4px' } : null}>
                                <img src={logoPath} height="50px" alt="logo" className='desktop-logo hide-mobile' />
                                <img src={logoPath} height="50px" alt="logo" className='mobile-logo hide-desktop' />

                            </Link>
                        </div>


                        <div className='column column-center'>

                            {/* location modal trigger button */}
                            <motion.button whileTap={{ scale: 0.6 }} type='buton' className='header-location site-location hide-mobile' data-bs-toggle="modal" data-bs-target="#locationModal" ref={locationModalTrigger}>
                                <div className='d-flex flex-row gap-2'>
                                    <div className='icon location p-1 m-auto'>
                                        <GoLocation />
                                    </div>
                                    <div className='d-flex flex-column flex-grow-1'>
                                        <span className='location-description'>Deliver to <IoMdArrowDropdown /></span>
                                        <span className='current-location'>{isLocationPresent
                                            ? (
                                                <>
                                                    {city.status === 'fulfill'
                                                        ? city.city.formatted_address
                                                        : (
                                                            <div className="d-flex justify-content-center">
                                                                <div className="spinner-border" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                </>)
                                            : "Please select location"
                                        }</span>
                                    </div>
                                </div>
                            </motion.button>

                            <></>
                            <div className='header-search'>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    // console.log(document.getElementById('search-box').value)
                                }} className='search-form'>
                                    <input type="search" id="search-box" placeholder="What are you lookinh for..." />

                                    <button type='submit'>
                                        <MdSearch fill='white' />
                                    </button>
                                </form>
                            </div>


                        </div>


                        <div className='column column-right gap-5'>
                            <motion.div whileTap={{ scale: 0.6 }} className='icon position-relative hide-mobile'>
                                <IoNotificationsOutline />
                                <span className="position-absolute start-100 translate-middle badge rounded-pill fs-5 ">
                                    9+
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </motion.div>

                            {city.city === null || cookies.get('jwt_token') === undefined
                                ? <motion.button whileTap={{ scale: 0.6 }} className='icon position-relative hide-mobile-screen'
                                    onClick={() => {
                                        if (cookies.get('jwt_token') === undefined) {
                                            toast.error("OOPS!You have to login first to see your cart!")
                                        }
                                        else if (city.city === null) {
                                            toast.error("Please Select you delivery location first!")
                                        }
                                    }}>
                                    <IoHeartOutline />
                                </motion.button>
                                : <motion.button whileTap={{ scale: 0.6 }} className='icon position-relative hide-mobile-screen' data-bs-toggle="offcanvas" data-bs-target="#favoriteoffcanvasExample" aria-controls="favoriteoffcanvasExample"
                                    onClick={() => {
                                        if (cookies.get('jwt_token') === undefined) {
                                            toast.error("OOPS!You have to login first to see your cart!")
                                        }
                                        else if (city.city === null) {
                                            toast.error("Please Select you delivery location first!")
                                        }
                                    }}>
                                    <IoHeartOutline />

                                    {favorite.favorite !== null ?
                                        <span className="position-absolute start-100 translate-middle badge rounded-pill fs-5 ">
                                            {favorite.favorite.total}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                        : null}

                                </motion.button>
                            }

                            {city.city === null || cookies.get('jwt_token') === undefined
                                ? <motion.button type='button' whileTap={{ scale: 0.6 }} className='icon position-relative'

                                    onClick={() => {
                                        if (cookies.get('jwt_token') === undefined) {
                                            toast.error("OOPS!You have to login first to see your cart!")
                                        }
                                        else if (city.city === null) {
                                            toast.error("Please Select you delivery location first!")
                                        }
                                    }}>
                                    <IoCartOutline />
                                </motion.button>

                                : <motion.button type='button' whileTap={{ scale: 0.6 }} className='icon position-relative' data-bs-toggle="offcanvas" data-bs-target="#cartoffcanvasExample" aria-controls="cartoffcanvasExample"

                                    onClick={() => {
                                        if (cookies.get('jwt_token') === undefined) {
                                            toast.error("OOPS!You have to login first to see your cart!")
                                        }
                                        else if (city.city === null) {
                                            toast.error("Please Select you delivery location first!")
                                        }
                                    }}>
                                    <IoCartOutline />

                                    {cart.cart !== null ?
                                        <span className="position-absolute start-100 translate-middle badge rounded-pill fs-5">
                                            {cart.cart.total}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                        : null}
                                </motion.button>
                            }

                            {user.status === 'loading'
                                ? (
                                    <div className='hide-mobile-screen'>
                                        <motion.div whileTap={{ scale: 0.6 }} className='d-flex flex-row user-profile gap-1' data-bs-toggle="modal" data-bs-target="#loginModal">
                                            <div className='d-flex flex-column user-info my-auto'>
                                                <span className='name'> Utsav Suthar</span>
                                                <span className='number'>+91-9999988888</span>
                                            </div>
                                            <img src={user.status === "loading"
                                                ? "https://egrocer.wrteam.in/storage/logo/1669957448_21176.png"
                                                : user.user.profile} alt="user" className='rounded-3'></img>
                                        </motion.div>

                                    </div>
                                )
                                : (
                                    <div className='hide-mobile-screen'>
                                        <Link to='/profile' className='d-flex flex-row user-profile gap-1' >
                                            <div className='d-flex flex-column user-info my-auto'>
                                                <span className='name'> {user.user.name}</span>
                                                <span className='number'>{user.user.country_code + "-" + user.user.mobile}</span>
                                            </div>
                                            <img src={user.user.profile} alt="user"></img>
                                        </Link>
                                    </div>
                                )}

                        </div>

                    </div>

                </div>


                {/* Mobile bottom Nav */}
                <nav className='header-mobile-nav'>
                    <div className='mobile-nav-wrapper'>
                        <ul>
                            <li className='menu-item'>
                                <Link to='/products' className='shop' onClick={() => {
                                    document.getElementsByClassName('shop')[0].classList.toggle('active')
                                    if (curr_url.pathname === '/products') {
                                        document.getElementsByClassName('filter')[0].classList.remove('active')
                                    }
                                    if (curr_url.pathname === '/profile') {
                                        document.getElementsByClassName('profile-account')[0].classList.remove('active')
                                    }
                                    document.getElementsByClassName('wishlist')[0].classList.remove('active')
                                    document.getElementsByClassName('search')[0].classList.remove('active')
                                    document.getElementsByClassName('header-search')[0].classList.remove('active')
                                }}>
                                    <div>
                                        <BsShopWindow />
                                    </div>
                                    <span>Shop</span>
                                </Link>
                            </li>

                            <li className='menu-item'>
                                <button type='button' className='search' onClick={() => {

                                    document.getElementsByClassName('search')[0].classList.toggle('active')
                                    if (curr_url.pathname === '/products') {
                                        document.getElementsByClassName('filter')[0].classList.remove('active')
                                    }
                                    if (curr_url.pathname === '/profile') {
                                        document.getElementsByClassName('profile-account')[0].classList.remove('active')
                                    }
                                    document.getElementsByClassName('wishlist')[0].classList.remove('active')
                                    document.getElementsByClassName('shop')[0].classList.remove('active')
                                    document.getElementsByClassName('header-search')[0].classList.toggle('active')
                                }}>
                                    <div>
                                        <MdSearch />
                                    </div>
                                    <span>Search</span>
                                </button>
                            </li>

                            {curr_url.pathname === '/products' ? (
                                <li className='menu-item'>
                                    <button type='button' className='filter' data-bs-toggle="offcanvas" data-bs-target="#filteroffcanvasExample" aria-controls="filteroffcanvasExample" onClick={() => {
                                        if (curr_url.pathname === '/profile') {
                                            document.getElementsByClassName('profile-account')[0].classList.remove('active')
                                        }
                                        document.getElementsByClassName('filter')[0].classList.toggle('active')
                                        document.getElementsByClassName('search')[0].classList.remove('active')
                                        document.getElementsByClassName('wishlist')[0].classList.remove('active')
                                        document.getElementsByClassName('shop')[0].classList.remove('active')
                                        document.getElementsByClassName('header-search')[0].classList.remove('active')
                                    }}>
                                        <div>
                                            <FiFilter />
                                        </div>
                                        <span>Filter</span>
                                    </button>
                                </li>
                            ) : ""}

                            <li className='menu-item'>
                                {city.city === null || cookies.get('jwt_token') === undefined
                                    ? <button type='button' className='wishlist' onClick={() => {

                                        if (cookies.get('jwt_token') === undefined) {
                                            toast.error("OOPS!You have to login first to see your cart!")
                                        }
                                        else if (city.city === null) {
                                            toast.error("Please Select you delivery location first!")
                                        }
                                        else {
                                            document.getElementsByClassName('wishlist')[0].classList.toggle('active')
                                            if (curr_url.pathname === '/products') {
                                                document.getElementsByClassName('filter')[0].classList.remove('active')
                                            }
                                            if (curr_url.pathname === '/profile') {
                                                document.getElementsByClassName('profile-account')[0].classList.remove('active')
                                            }
                                            document.getElementsByClassName('shop')[0].classList.remove('active')
                                            document.getElementsByClassName('search')[0].classList.remove('active')
                                            document.getElementsByClassName('header-search')[0].classList.remove('active')
                                        }


                                    }}>
                                        <div>
                                            <IoHeartOutline />

                                        </div>
                                        <span>Wishlist</span>
                                    </button>
                                    : <button type='button' className='wishlist' onClick={() => {

                                        if (cookies.get('jwt_token') === undefined) {
                                            toast.error("OOPS!You have to login first to see your cart!")
                                        }
                                        else if (city.city === null) {
                                            toast.error("Please Select you delivery location first!")
                                        }
                                        else {
                                            document.getElementsByClassName('wishlist')[0].classList.toggle('active')
                                            if (curr_url.pathname === '/products') {
                                                document.getElementsByClassName('filter')[0].classList.remove('active')
                                            }
                                            if (curr_url.pathname === '/profile') {
                                                document.getElementsByClassName('profile-account')[0].classList.remove('active')
                                            }
                                            document.getElementsByClassName('shop')[0].classList.remove('active')
                                            document.getElementsByClassName('search')[0].classList.remove('active')
                                            document.getElementsByClassName('header-search')[0].classList.remove('active')
                                        }


                                    }} data-bs-toggle="offcanvas" data-bs-target="#favoriteoffcanvasExample" aria-controls="favoriteoffcanvasExample">
                                        <div>
                                            <IoHeartOutline />

                                            {favorite.favorite !== null ?
                                                <span className="position-absolute translate-middle badge rounded-pill fs-5" style={{background:"var(--secondary-color)", borderRadius:"50%", color:"#fff", top:"1px",right:"-9px"}}>
                                                    {favorite.favorite.total}
                                                    <span className="visually-hidden">unread messages</span>
                                                </span>
                                                : null}
                                        </div>
                                        <span>Wishlist</span>
                                    </button>}

                            </li>

                            {curr_url.pathname === '/profile' ? (
                                <li className='menu-item'>
                                    <button type='button' className='profile-account' onClick={() => {

                                        document.getElementsByClassName('profile-account')[0].classList.toggle('active')
                                        document.getElementsByClassName('wishlist')[0].classList.remove('active')
                                        if (curr_url.pathname === '/products') {
                                            document.getElementsByClassName('filter')[0].classList.remove('active')
                                        }
                                        document.getElementsByClassName('shop')[0].classList.remove('active')
                                        document.getElementsByClassName('search')[0].classList.remove('active')
                                        document.getElementsByClassName('header-search')[0].classList.remove('active')

                                    }} data-bs-toggle="offcanvas" data-bs-target="#profilenavoffcanvasExample" aria-controls="profilenavoffcanvasExample">
                                        <div>
                                            <MdOutlineAccountCircle />

                                        </div>
                                        <span>Account</span>
                                    </button>
                                </li>
                            ) :
                                (
                                    <li className='menu-item'>
                                        {user.status === 'loading'
                                            ? (
                                                <>
                                                    <button type='button' className='account' data-bs-toggle="modal" data-bs-target="#loginModal" onClick={() => {

                                                        document.getElementsByClassName('wishlist')[0].classList.remove('active')
                                                        if (curr_url.pathname === '/products') {
                                                            document.getElementsByClassName('filter')[0].classList.remove('active')
                                                        }
                                                        document.getElementsByClassName('shop')[0].classList.remove('active')
                                                        document.getElementsByClassName('search')[0].classList.remove('active')
                                                        document.getElementsByClassName('header-search')[0].classList.remove('active')

                                                    }}>
                                                        <div>
                                                            <BiUserCircle />
                                                        </div>
                                                        <span>Login</span>

                                                    </button>

                                                </>
                                            )
                                            : (
                                                <>
                                                    <Link to='/profile' className='d-flex user-profile gap-1 account' onClick={() => {

                                                        document.getElementsByClassName('wishlist')[0].classList.remove('active')
                                                        if (curr_url.pathname === '/products') {
                                                            document.getElementsByClassName('filter')[0].classList.remove('active')
                                                        }
                                                        document.getElementsByClassName('shop')[0].classList.remove('active')
                                                        document.getElementsByClassName('search')[0].classList.remove('active')
                                                        document.getElementsByClassName('header-search')[0].classList.remove('active')

                                                    }}>
                                                        <div className='d-flex flex-column user-info my-auto'>
                                                            <span className='name'> {user.user.name}</span>
                                                            <span className='number'>{user.user.country_code + "-" + user.user.mobile}</span>
                                                        </div>
                                                        <img src={user.user.profile} alt="user"></img>
                                                        <span>Profile</span>
                                                    </Link>
                                                </>
                                            )}


                                    </li>
                                )}


                        </ul>
                    </div>
                </nav>




                {/* login modal */}
                <Login modal_id='loginModal' />


                {/* location modal */}
                <div className="modal fade location" id="locationModal" data-bs-backdrop="static" aria-labelledby="locationModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ borderRadius: "10px" }}>
                            <Location isLocationPresent={isLocationPresent} setisLocationPresent={setisLocationPresent} />
                        </div>
                    </div>
                </div>


                {/* Cart Sidebar */}
                <Cart />

                {/* favorite sidebar */}
                <Favorite />

            </header>
        </>
    )
}

export default Header
