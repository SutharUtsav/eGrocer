import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { authentication } from '../../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { parsePhoneNumber } from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Model/action/authAction';
import { setAlert } from '../../Model/action/alertAction';
import { Profile } from '../Profile/Profile';
import { getUserDetails } from '../../Model/action/userAction';

export const Login = (props) => {

    const [mobilenum, setMobilenum] = useState()
    const [termsChecked, setTermsChecked] = useState(false)
    const [isOTP, setIsOTP] = useState(false);
    const [OTP, setOTP] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch])

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
            dispatch(setAlert({ message: "Accept Terms and Policies!", type: "error" }))
        }
        else {
            if (mobilenum === undefined) {
                dispatch(setAlert({ message: "Please enter phone number!", type: "error" }))
            }
            else if (validator.isMobilePhone(mobilenum)) {

                setIsOTP(true);
                setOTP("");

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
                setMobilenum();
                dispatch(setAlert({ message: "Enter a valid phone number", type: "error" }))
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

            //login call
            dispatch(login(num, OTP, countrycode));

            props.setprofileClick(false)
        }).catch(() => {
            // User couldn't sign in (bad verification code?)
            dispatch(setAlert({ message: "Invalid Code", type: "error" }))
        });
    }


    return (
        <>
            {Object.keys(user).length === 0 ? 
                ""
             : (

                <>
                    {user.user.status === 0 ? (
                        <>
                            {isOTP ? (
                                <form className='login-form' onSubmit={verifyOTP}>
                                    <h3>Verify Your Code</h3>
                                    <OTPInput className='otp-container' value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                                    <ResendOTP className='resend-container' onResendClick={resendOTP} />
                                    <button type="submit" className='login-btn' >Verify</button>
                                </form>
                            ) : (
                                <form onSubmit={handleLogin} className='login-form'>
                                    <h3>Login Now</h3>
                                    <PhoneInput placeholder="Enter phone number" defaultCountry="IN" value={mobilenum} id="mobile_code" onChange={setMobilenum}
                                        style={{
                                            width: "100%",
                                            margin: ".7rem 0",
                                            padding: "1rem",
                                            fontSize: "2rem",
                                        }}
                                    />
                                    <p>
                                        <input type="checkbox" value="" onChange={handleCheckbox} />
                                        I Agree to the <a href="/">Terms of Service </a>and<a href="/" > Privacy policy</a>
                                    </p>
                                    <button type="submit" className='login-btn' >Login</button>
                                </form>
                            )}

                        </>) : (
                        <Profile user={user.user} />
                    )}
                </>
            )}
            <div id="recaptcha-container" style={{ display: "none" }}></div>
        </>
    );
};