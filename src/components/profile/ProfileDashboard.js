import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from '../../model/action-type';
import './profile.css'
import coverImg from '../../utils/cover-img.jpg'
import { FaUserCircle, FaListAlt, FaHome } from 'react-icons/fa'
import { GoChecklist } from 'react-icons/go'
import { FiLogOut } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import { AiFillDelete, AiOutlineCloseCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'
import logoPath from '../../utils/logo_egrocer.svg'
import Cookies from 'universal-cookie'
import ProfileContent from './ProfileContent';
import { toast } from 'react-toastify';
import Order from '../order/Order';
import Address from '../address/Address';
import Transaction from '../transaction/Transaction';

const ProfileDashboard = () => {
    //initialize Cookies
    const cookies = new Cookies();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => (state.user))

    useEffect(() => {
        if (user.status === 'loading') {
            navigate('/')
        }
    }, [user])


    const [profileClick, setprofileClick] = useState(true)
    const [orderClick, setorderClick] = useState(false)
    const [addressClick, setaddressClick] = useState(false)
    const [transactionClick, settransactionClick] = useState(false)

    const [isupdating, setisupdating] = useState(false);

    const handleLogout = () => {
        cookies.remove('jwt_token')
        dispatch({ type: ActionTypes.LOGOUT_AUTH, payload: null });
        toast.info("You're Successfully Logged Out")
    }


    const profileNav = () => {
        return (
            <>
                {isupdating
                    ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )
                    : <img src={user.user.profile} alt='logo'></img>
                }


                {/* {user.user.name} */}
                <h5>{user.user.name}</h5>

                {/* {user.user.email} */}
                <span>{user.user.email}</span>

                <motion.button type='button' className='w-100 ' onClick={() => {
                    setprofileClick(true)
                    setaddressClick(false)
                    setorderClick(false)
                    settransactionClick(false)
                }}>
                    <div className='d-flex justify-content-between'>
                        <motion.div >
                            <FaUserCircle className='mx-3' fill={'var(--secondary-color)'} />
                            My Profile
                        </motion.div>
                        <IoIosArrowForward />
                    </div>
                </motion.button>
                <motion.button type='button' className='w-100 ' onClick={() => {
                    setprofileClick(false)
                    setaddressClick(false)
                    setorderClick(true)
                    settransactionClick(false)
                    setisupdating(false)
                }}>
                    <div className='d-flex justify-content-between'>
                        <motion.div >
                            <FaListAlt className='mx-3' fill={'var(--secondary-color)'} />
                            All Orders
                        </motion.div>
                        <IoIosArrowForward />
                    </div>
                </motion.button>
                <motion.button type='button' className='w-100 ' onClick={() => {
                    setprofileClick(false)
                    setaddressClick(true)
                    setorderClick(false)
                    settransactionClick(false)
                    setisupdating(false)
                }}>
                    <div className='d-flex justify-content-between'>
                        <motion.div >
                            <FaHome className='mx-3' fill={'var(--secondary-color)'} />
                            Manage Address
                        </motion.div>
                        <IoIosArrowForward />
                    </div>
                </motion.button>
                <motion.button type='button' className='w-100 ' onClick={() => {
                    setprofileClick(false)
                    setaddressClick(false)
                    setorderClick(false)
                    settransactionClick(true)
                    setisupdating(false)
                    if (window.innerWidth < 768)
                        document.getElementsByClassName('sidebar')[0].classList.toggle('active')
                }} >
                    <div className='d-flex justify-content-between'>
                        <div >
                            <GoChecklist className='mx-3' fill={'var(--secondary-color)'} />
                            Transaction History
                        </div>
                        <IoIosArrowForward />
                    </div>
                </motion.button>
                <motion.button type='button' className='w-100 ' onClick={handleLogout}>
                    <div className='d-flex justify-content-between'>
                        <div >
                            <FiLogOut className='mx-3' fill={'var(--secondary-color)'} />
                            Logout
                        </div>
                        <IoIosArrowForward />
                    </div>
                </motion.button>
                <motion.button type='button' className='w-100 '>
                    <div className='d-flex justify-content-between'>
                        <div >
                            <AiFillDelete className='mx-3' fill={'var(--secondary-color)'} />
                            Delete Account
                        </div>
                        <IoIosArrowForward />
                    </div>
                </motion.button>
            </>
        )
    }
    return (
        <>
            {user.status === 'loading'
                ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <section id='profile'>


                        <div className="hide-desktop offcanvas offcanvas-start" tabIndex="-1" id="profilenavoffcanvasExample" aria-labelledby="profilenavoffcanvasExampleLabel" data-bs-backdrop="false">
                            <div className="canvas-header">
                                <div className='site-brand'>
                                    <img src={logoPath} height="50px" alt="logo"></img>
                                </div>

                                <button type="button" className="close-canvas" data-bs-dismiss="offcanvas" aria-label="Close" onClick={()=>{
                                        document.getElementsByClassName('profile-account')[0].classList.remove('active')

                                }}><AiOutlineCloseCircle /></button>
                            </div>
                            <div className='sidebar'>
                                {profileNav()}
                            </div>
                        </div>

                        <div className='cover'>
                            {/* <img src={coverImg} className='img-fluid' alt="cover"></img> */}
                        </div>
                        <div className='container py-5'>
                            <div className='content-container'>

                                <div className='sidebar hide-mobile-screen'>

                                    {profileNav()}


                                </div>
                                <div className='content'>
                                    <h4>Profile Dashboard</h4>


                                    {profileClick
                                        ? <ProfileContent isupdating={isupdating} setisupdating={setisupdating} />
                                        : null}

                                    {orderClick
                                        ? <Order />
                                        : null}

                                    {transactionClick
                                        ? <Transaction />
                                        : null}

                                    {addressClick
                                        ? <Address />
                                        : null}

                                </div>
                            </div>

                        </div>

                    </section>
                )}
        </>
    )
}

export default ProfileDashboard
