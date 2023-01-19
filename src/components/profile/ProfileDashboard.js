import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from '../../model/action-type';
import './profile.css'
import coverImg from '../../utils/cover-img.jpg'
import { FaUserCircle, FaListAlt, FaHome, FaBars } from 'react-icons/fa'
import { GoChecklist } from 'react-icons/go'
import { FiLogOut } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import { AiFillDelete } from 'react-icons/ai'
import { motion } from 'framer-motion'

import Cookies from 'universal-cookie'
import ProfileContent from './ProfileContent';
import { toast } from 'react-toastify';

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
                        <div className='cover'>
                            <img src={coverImg} className='img-fluid' alt="cover"></img>
                        </div>
                        <div className='container py-5'>
                            <div className='row content-container'>
                                <div className='col col-lg-3 col-sm-2 col-md-4'>
                                    <div className='bar' onClick={() => {
                                        document.getElementsByClassName('sidebar')[0].classList.toggle('active');
                                    }}><FaBars fill={'var(--secondary-color)'} fontSize={"3rem"} /></div>
                                    <div className='sidebar active'>

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

                                    </div>
                                </div>
                                <div className='col col-100 content'>
                                    <h5>Profile Dashboard</h5>


                                    {profileClick
                                        ? <ProfileContent isupdating={isupdating} setisupdating={setisupdating} />
                                        : null}

                                    {orderClick
                                        ? "order"
                                        : null}

                                    {transactionClick
                                        ? "transaction"
                                        : null}

                                    {addressClick
                                        ? "address"
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
