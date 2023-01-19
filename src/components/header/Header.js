import React, { useState, useEffect, useRef } from 'react'
import './header.css'
import { MdSearch, MdGTranslate } from "react-icons/md";
import { IoContrast, IoNotificationsOutline, IoHeartOutline, IoCartOutline } from 'react-icons/io5';
import { IoMdArrowDropdown } from "react-icons/io"
import { GoLocation } from 'react-icons/go'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import Location from '../location/Location';
import logoPath from '../../utils/logo_egrocer.svg'
import { getLocation } from '../../utils/manageLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/api';
import { ActionTypes } from '../../model/action-type';
import Login from '../login/Login';

// import 'bootstrap/dist/js/bootstrap.bundle.js'
// import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';


const Header = () => {

    // const [islocationclick, setislocationclick] = useState(false);
    const [issearchClick, setissearchClick] = useState(false);
    const [isLocationPresent, setisLocationPresent] = useState(false);

    const locationModalTrigger = useRef();

    const dispatch = useDispatch();

    const city = useSelector(state => (state.city))
    const cssmode = useSelector(state => (state.cssmode))
    const user = useSelector(state => (state.user))

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

    const handleCssModeChange = (e) => {
        dispatch({ type: ActionTypes.SET_CSSMODE, payload: e.target.value });
    }

    const handleLanguageChange = (e) => {
        dispatch({ type: ActionTypes.SET_LANGUAGE, payload: e.target.value });
    }

    return (
        <header>

            {/* top header */}
            <div className={`border-bottom header-1 ${(cssmode.cssmode === "dark") ? "dark-header-1" : null}`}>
                <div className={`container d-flex justify-content-between`}>
                    <div className='d-flex pages'>
                        <Link to='/about' className={`p-2 text-decoration-none border-end ${(cssmode.cssmode === "dark") ? "dark-header-1" : null}`} > About us</Link>
                        <Link to='/contact' className='p-2 text-decoration-none border-end' > Contact us</Link>
                        <Link to='/faq' className='p-2 text-decoration-none border-end' > faq</Link>
                    </div>
                    <div className='d-flex utils border-start'>
                        <IoContrast className='my-auto fs-3' />
                        <select className='p-2 border-end' onChange={handleCssModeChange}>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                        <MdGTranslate className='my-auto fs-3' />
                        <select className='p-2' onChange={handleLanguageChange}>
                            <option value="english">English</option>
                            <option value="gujarati">Gujarati</option>
                            <option value="hindi">Hindi</option>
                        </select>
                    </div>
                </div>
            </div>


            {/* bottom header */}
            <div className="header-2 border-bottom">
                <div className='container d-flex justify-content-between flex-row logo'>
                    <Link to='/' className='py-3'>
                        <img src={logoPath} height="50px" alt="logo" />
                    </Link>

                    <div className='d-flex gap-3'>

                        {/* location modal trigger button */}
                        <motion.button whileTap={{ scale: 0.6 }} type='buton' className='delivery-button' data-bs-toggle="modal" data-bs-target="#locationModal" onClick={() => {
                            setissearchClick(false)
                        }} ref={locationModalTrigger}>
                            <div className='d-flex flex-row gap-2'>
                                <GoLocation fill='var(--secondary-color)' className='border icon icon-location p-1 m-auto' />
                                <div className='d-flex flex-column'>
                                    <span className='secondary-span'>Deliver to <IoMdArrowDropdown /></span>
                                    <span className='address'>{isLocationPresent
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

                        <div className="modal fade location" id="locationModal" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="locationModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content" style={{borderRadius:"10px"}}>
                                    <Location isLocationPresent={isLocationPresent} setisLocationPresent={setisLocationPresent} />
                                </div>
                            </div>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault() }} className='search-box-container my-auto'>
                            <input type="text" className='border' id="search-box" placeholder="What are you lookinh for..." />
                            <label htmlFor="search-box" onClick={() => {
                                setissearchClick(!issearchClick);
                                // setislocationclick(false);
                            }}>
                                <MdSearch fill='white' />
                            </label>

                            {issearchClick ? <input type="search" id="search-box-resp" placeholder="What are you lookinh for..." className='border p-2 rounded' /> : null}

                        </form>
                    </div>


                    <div className='d-flex gap-5 my-auto'>
                        <motion.div whileTap={{ scale: 0.6 }} className='icon position-relative'>
                            <IoNotificationsOutline />
                            <span className="position-absolute start-100 translate-middle badge rounded-pill fs-5 ">
                                9+
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </motion.div>

                        <motion.div whileTap={{ scale: 0.6 }} className='icon position-relative'>
                            <IoHeartOutline />
                            <span className="position-absolute start-100 translate-middle badge rounded-pill fs-5 ">
                                9+
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </motion.div>

                        <motion.div whileTap={{ scale: 0.6 }} className='icon position-relative'>
                            <IoCartOutline />
                            <span className="position-absolute start-100 translate-middle badge rounded-pill fs-5">
                                9+
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </motion.div>


                        {user.status === 'loading'
                            ? (
                                <>
                                    <motion.div whileTap={{ scale: 0.6 }} className='d-flex flex-row user-profile gap-1' data-bs-toggle="modal" data-bs-target="#loginModal">
                                        <div className='d-flex flex-column user-info my-auto'>
                                            <span className='name'> Utsav Suthar</span>
                                            <span className='number'>+91-9999988888</span>
                                        </div>
                                        <img src={user.status === "loading"
                                            ? "https://egrocer.wrteam.in/storage/logo/1669957448_21176.png"
                                            : user.user.profile} alt="user" className='rounded-3'></img>
                                    </motion.div>
                                    <Login modal_id='loginModal' />
                                </>
                            )
                            : (
                                <>
                                    <Link to='/profile' className='d-flex flex-row user-profile gap-1' >
                                        <div className='d-flex flex-column user-info my-auto'>
                                            <span className='name'> { user.user.name}</span>
                                            <span className='number'>{user.user.country_code + "-" + user.user.mobile}</span>
                                        </div>
                                        <img src={user.user.profile} alt="user"></img>
                                    </Link>
                                </>
                            )}

                    </div>


                    {/* {islocationclick ? <SelectLocation setislocationclick={setislocationclick} /> : null} */}

                </div>

            </div>
        </header>
    )
}

export default Header
