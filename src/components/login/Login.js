import React, { useState, useRef } from 'react'
import './login.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import api from '../../api/api'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { ActionTypes } from '../../model/action-type'
import { toast } from 'react-toastify'

//phone number input
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber } from 'react-phone-number-input';
import validator from 'validator'

//otp
import OTPInput from 'otp-input-react';

//firebase
import { authentication } from '../../utils/firebase/firebase-config'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'


const Login = (props) => {

    //initialize Cookies
    const cookies = new Cookies();

    const closeModalRef = useRef();

    const dispatch = useDispatch();

    const [phonenum, setPhonenum] = useState()
    const [checkboxSelected, setcheckboxSelected] = useState(false)
    const [error, setError] = useState("", setTimeout(() => {
        if (error !== "")
            setError("")
    }, 5000))
    const [isOTP, setIsOTP] = useState(false);
    const [OTP, setOTP] = useState("");
    const [isLoading, setisLoading] = useState(false)

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, authentication);
    }


    const handleLogin = (e) => {
        e.preventDefault();
        if (!checkboxSelected) {
            setError("Accept Terms and Policies!");
        }
        else {
            if (phonenum === undefined) {
                setError("Please enter phone number!")
            }
            else if (validator.isMobilePhone(phonenum)) {

                setIsOTP(true);
                setOTP("");

                //OTP Generation
                generateRecaptcha();
                let appVerifier = window.recaptchaVerifier;
                signInWithPhoneNumber(authentication, phonenum, appVerifier)
                    .then(confirmationResult => {
                        window.confirmationResult = confirmationResult;
                    }).catch((error) => {
                        console.log(error)
                    })
            }
            else {
                setPhonenum()
                setError("Enter a valid phone number")
            }
        }
    }


    const getCurrentUser = (token) => {
        api.getUser(token)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    dispatch({ type: ActionTypes.SET_CURRENT_USER, payload: result.user });
                    toast.success("You're successfully Logged In")
                }
            })
    }

    const loginApiCall = async (num, OTP, countrycode) => {
        await api.login(num, OTP, countrycode)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {

                    const decoded = jwt(result.data.access_token)

                    cookies.set("jwt_token", result.data.access_token, {
                        expire: new Date(decoded.exp * 1000)
                    })

                    getCurrentUser(result.data.access_token);
                    closeModalRef.current.click()
                }
                else {
                    setError(result.message);
                    setOTP("")
                }

                setisLoading(false);
            })
            .catch(error => console.log("error ", error))
    }

    //otp verification
    const verifyOTP = (e) => {
        e.preventDefault();
        setisLoading(true);

        let confirmationResult = window.confirmationResult;
        // confirmationResult.confirm(OTP).then((result) => {
        //     // User verified successfully.

        //     const countrycode = parsePhoneNumber(phonenum).countryCallingCode;
        //     const num = parsePhoneNumber(phonenum).nationalNumber;


        //     //login call
        //     loginApiCall(num, OTP, countrycode)



        // }).catch(() => {
        //     // User couldn't sign in (bad verification code?)
        //     setError("Invalid Code")
        // });


        const countrycode = parsePhoneNumber(phonenum).countryCallingCode;
        const num = parsePhoneNumber(phonenum).nationalNumber;


        //login call
        loginApiCall(num, OTP, countrycode)
    }


    return (
        <>
            <div className="modal fade login" id={props.modal_id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="loginLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{borderRadius:"10px"}}>
                        <div className="d-flex flex-row justify-content-between header">
                            <h5>Login</h5>
                            <button type="button" className="" data-bs-dismiss="modal" aria-label="Close" ref={closeModalRef} onClick={() => {
                                setError("")
                                setOTP("")
                                setcheckboxSelected(false)
                                setisLoading(false);
                                setIsOTP(false)
                            }}><AiOutlineCloseCircle /></button>
                        </div>
                        <div className="modal-body d-flex flex-column gap-3 align-items-center body">
                            <img src='https://egrocer.wrteam.in/storage/logo/1669957448_21176.png' alt='logo'></img>

                            {isOTP
                                ? (
                                    <>
                                        <h5>enter verification code</h5>
                                        <span>we have sent verification code to <p>{phonenum}</p></span>
                                    </>
                                )
                                : (
                                    <>
                                        <h5>Welcome!</h5>
                                        <span>Enter phone number to continue and we will send a verification code to this number.</span>
                                    </>
                                )}

                            {error === ''
                                ? ""
                                : <span className='error-msg'>{error}</span>}

                            {isOTP
                                ? (
                                    <form className='d-flex flex-column gap-3' onSubmit={verifyOTP}>
                                        {isLoading
                                            ? (
                                                <div className="d-flex justify-content-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            )
                                            : null}
                                        <OTPInput className='otp-container' value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                                        <span>
                                            <input type="checkbox" className='mx-2' checked={checkboxSelected} required onChange={() => {
                                                setcheckboxSelected(!checkboxSelected)
                                            }} />
                                            I Agree to the <a href="/">Terms of Service </a>and<a href="/" > Privacy policy</a>
                                        </span>
                                        <motion.button whileTap={{ scale: 0.6 }} type="submit" className='login-btn' >Verify</motion.button>
                                    </form>
                                )
                                : (
                                    <form className='d-flex flex-column gap-3' onSubmit={handleLogin}>


                                        <div>
                                            <PhoneInput value={phonenum} defaultCountry='IN' onChange={setPhonenum} />
                                        </div>


                                        <span>
                                            <input type="checkbox" className='mx-2' required checked={checkboxSelected} onChange={() => {
                                                setcheckboxSelected(!checkboxSelected)
                                            }} />
                                            I Agree to the <a href="/">Terms of Service </a>and<a href="/" > Privacy policy</a>
                                        </span>
                                        <motion.button whileTap={{ scale: 0.6 }} type='submit'> Login to Continue</motion.button>
                                    </form>
                                )}


                        </div>
                    </div>
                    <div id="recaptcha-container" style={{ display: "none" }}></div>
                </div>
            </div >

        </>
    )
}

export default Login
