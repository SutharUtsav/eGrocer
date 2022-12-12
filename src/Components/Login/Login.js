import React, { useState,useRef } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { authentication } from '../../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { parsePhoneNumber } from 'react-phone-number-input';

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

            var myHeaders = new Headers();
            myHeaders.append("x-access-key", "903361");
            myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGM3ZGQ5NTVmNjhlZTA0Nzg0YmViNjNhZDc5MjY5NWU3ZTFhMzVkNDhjODllMGZkMjM0OGI2YzY2NTA1NmFhNWEwZDU5MTExMmZiZjRkNzIiLCJpYXQiOjE2NzAyMjM1NjUuMzA2NTQyLCJuYmYiOjE2NzAyMjM1NjUuMzA2NTQ2LCJleHAiOjE3MDE3NTk1NjUuMzAzMDU3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.LZNn6N4E07ZQbmqDQ33pmK01jS09APpgAPYOArXkSk8zqSFzF258RthHs0VN3UWpK5J2di9-4RKREKDLcbQ7a4_T_ayrXPit-cH6uBQPEYqPqBL9b2W49ZSWbJjhoZdh2oZlUDJiIlu4kjxKJoZef7gtZKne7twoY0Um7rzl1bvFPoUn8Yq2ev_Jhnp0JkwRF3Bq1RMbimwIHKxyMFUsp0Gyvx3bnUbJTCYwhX7xZvfrPHuh0ZVTZiEbprDx8pUg0H-_smmmzbb1IW-aVt7ZOCMllb3mDJEkX0O_IpJ_FAam8e8eACbVIAVVfyrUjZCvBnTI9SIxVacoTR5i2fKb-60EN85hEtW_rKfCYfK31sH-wL-Xas3ML6x5ei9GQVr8agsPBngMV32M1P1LIOw0xIb0dVaZHHckCjHZcEKAb_8-qYHWVjJhlxnnjo61OknDbVmo8m5IA_mNerQsO5jr3L92XQOl4PdChtdLhl0mSMak19TBXPhveX2OxUxL1FgAfaJ2IpkG9EW3JVwwiU_c9MilyJc54Nhu2dMD0RdIVVPTDgNu-e1CZF9NYsvCLlkCqQTQdFOYLaWOrbeFFJkf2Tme8a3ujklURdGafRa4HSbPdviXe2VwdfDavThj_EsSSgs8TgW1zw2cQeKb0i6nWTDIMq0avTei29R1XVKmFWg");
            myHeaders.append("Cookie", "egrocer_session=m9jPWurA0M2mY06MAM2cdJcij9vbGEpYsvxR2Jz6");

            var formdata = new FormData();
            formdata.append("mobile", num);
            formdata.append("auth_uid", OTP);
            formdata.append("fcm_token", "murarisingh");
            formdata.append("country_code", countrycode);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://egrocer.netsofters.net/customer/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                    localStorage.setItem('access_token', result.data.access_token);
                    closeModalRef.current.click()
                    props.setuser(result.data.user)
                    props.setisloggedin(true)
                    

                })
                .catch(error => console.log('error', error));

            setOTP("");
            setMobilenum("");

            toast.success('User verified successfully', {
                position: toast.POSITION.TOP_RIGHT
            });

        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            toast.error('Wrong OTP', {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    }


    return (
        <div className="modal-body">
            <button id='closemodal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ position: "absolute", color: "white", top: "12px", left: "29pc" }} onClick={() => { setIsOTP(false); setTermsChecked(false) }} ref={closeModalRef} ></button>

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