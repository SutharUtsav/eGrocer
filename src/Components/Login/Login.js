import React, { useState, useRef } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { authentication } from '../../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { parsePhoneNumber } from 'react-phone-number-input';
import api from '../../api'


// import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    // const navigate = useNavigate();
    const closeModalRef = useRef()

    const [mobilenum, setMobilenum] = useState()
    const [termsChecked, setTermsChecked] = useState(false)
    const [isOTP, setIsOTP] = useState(false);
    const [OTP, setOTP] = useState("");


    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.

            }
        }, authentication);
    }


    const handleCheckbox = () => {
        setTermsChecked(!termsChecked)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!termsChecked) {
            toast.error('Accept Terms and Policies!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            if (validator.isMobilePhone(mobilenum)) {

                setIsOTP(true);
                setOTP("")

                //OTP Generation
                generateRecaptcha();
                let appVerifier = window.recaptchaVerifier;
                signInWithPhoneNumber(authentication, mobilenum, appVerifier)
                    .then(confirmationResult => {
                        window.confirmationResult = confirmationResult;
                    }).catch((error) => {
                        console.log(error)
                    })
            }
            else {
                toast.error('Enter Valid Phone Number', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }

    const resendOTP = () => {
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, mobilenum, appVerifier);
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(OTP).then((result) => {
            // User verified successfully.

            const countrycode = parsePhoneNumber(mobilenum).countryCallingCode;
            const num = parsePhoneNumber(mobilenum).nationalNumber;

            //API call
            api.login(num, OTP, countrycode).then(response => response.json())
                .then(result => {
                    localStorage.setItem('access_token', result.data.access_token);
                    localStorage.setItem('User', JSON.stringify(result.data.user));
                    closeModalRef.current.click()
                    props.setuser(result.data.user)
                    props.setisloggedin(true)
                })
                .catch(error => {
                    console.log('error', error)

                });
            setOTP("");
            setMobilenum("");

            toast.success('User verified successfully', {
                position: toast.POSITION.TOP_RIGHT
            });

        }).catch((error) => {
            console.log(error)
            // User couldn't sign in (bad verification code?)
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    }


    return (
        <div className="modal-body">
            <button id='closemodal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setIsOTP(false); setTermsChecked(false) }} ref={closeModalRef} ></button>

            <section className="vh-50" >
                <div className="container py-5 h-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="">
                                    <div className="col-md-6 col-lg-4 w-auto">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                            alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 align-items-center w-auto">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            {!isOTP ? (
                                                <form onSubmit={handleLogin}>
                                                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                                                    <div className="form-outline mb-4">

                                                        <PhoneInput placeholder="Enter phone number" defaultCountry="IN" value={mobilenum} id="mobile_code" onChange={setMobilenum} />
                                                    </div>
                                                    <div className='d-inline-flex'>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={handleCheckbox} />
                                                        </div>
                                                        <div>
                                                            <p>I Agree to the<a href="#!" className="small text-muted p-2">Terms of Service</a>and<a href="#!" className="small text-muted p-2">Privacy policy</a></p>
                                                        </div>
                                                    </div>

                                                    <div className="pt-3 mb-4">
                                                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                                    </div>
                                                </form>

                                            ) : (
                                                <div>
                                                    <form onSubmit={verifyOTP}>
                                                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Verify Your Code</h5>

                                                        <OTPInput className='justify-content-center' value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                                                        <ResendOTP className='px-5 py-3' onResendClick={resendOTP} />

                                                        <div className="pt-3 mb-4">
                                                            <button id="verifyOTP" className="btn btn-dark btn-lg btn-block" type="submit" >Verify</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="recaptcha-container" ></div>

                <ToastContainer />
            </section>
        </div>
    );
};