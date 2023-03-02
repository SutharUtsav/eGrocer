import React, { useEffect, useState, useCallback } from 'react'
import { Calendar } from 'react-calendar'
import coverImg from '../../utils/cover-img.jpg'
import Address from '../address/Address'
import './checkout.css'
import 'react-calendar/dist/Calendar.css'
import api from '../../api/api'
import rozerpay from '../../utils/payments/rozerpay.png'
import paystack from '../../utils/payments/paystack.png'
import Paytm from '../../utils/payments/Paytm.png'
import Stripe from '../../utils/payments/Stripe.png'
import cod from '../../utils/payments/cod.png'
import { useSelector } from 'react-redux'
import { FaRupeeSign } from "react-icons/fa";
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import logoPath from '../../utils/logo_egrocer.svg'
import ReactDOM from 'react-dom';

//payment methods
import useRazorpay from 'react-razorpay'
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import { PaymentElement } from '@stripe/react-stripe-js';

const Checkout = (props) => {
    console.log(props)
    const stripe = useStripe();
    const elements = useElements();
    const cart = useSelector(state => (state.cart))
    const user = useSelector(state => (state.user))
    const cookies = new Cookies();

    const fetchTimeSlot = () => {
        api.fetchTimeSlot()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    settimeslots(result.data)
                    setexpectedTime(result.data.time_slots[0])
                }
            })
            .catch(error => console.log(error))

    }

    useEffect(() => {
        fetchTimeSlot()
    }, [])



    const [timeslots, settimeslots] = useState(null)
    const [selectedAddress, setselectedAddress] = useState(null)
    const [expectedDate, setexpectedDate] = useState(new Date())
    const [expectedTime, setexpectedTime] = useState(null)
    const [paymentMethod, setpaymentMethod] = useState("COD")
    // const [paymentSettings, setpaymentSettings] = useState(null)
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    const Razorpay = useRazorpay()
    const handleRozarpayPayment = useCallback(
        (delivery_time) => {
            const amount = cart.checkout.total_amount
            const name = user.user.name
            const email = user.user.email
            const mobile = user.user.mobile
            const options = {
                key: 'rzp_test_nrzk0huxwp56ro',
                amount: amount * 100,
                currency: "INR",
                name: name,
                description: "Test Transaction",
                image: "https://egrocer.wrteam.in/storage/logo/1669957448_21176.png",
                handler: (res) => {
                    console.log(res.razorpay_payment_id);

                    //place order

                    // api.placeOrder(cookies.get('jwt_token'), cart.checkout.product_variant_id, cart.checkout.quantity, cart.checkout.sub_total, cart.checkout.delivery_charge.total_delivery_charge, cart.checkout.total_amount, paymentMethod, delivery_time)
                    //     .then(response => response.json())
                    //     .then(result => {

                    //     })
                    //     .catch(error => console.log(error))
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: mobile,
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#51BD88",
                },
            };

            const rzpay = new Razorpay(options);
            rzpay.open();
        },
        [Razorpay]
    )

    const handlePlaceOrder = async () => {
        console.log(selectedAddress.id)
        console.log(expectedDate)
        console.log(expectedTime)
        console.log(paymentMethod)

        var delivery_time = `${expectedDate.getDate()}-${expectedDate.getMonth() + 1}-${expectedDate.getFullYear()} ${expectedTime.title}`


        // await api.getPaymentSettings(cookies.get('jwt_token'))
        //     .then(response => response.json())
        //     .then(result => {
        //         if (result.status === 1) {
        //             setpaymentSettings(result.data)
        //         }
        //     })
        //     .catch(error => console.log(error))

        if (paymentMethod === 'COD') {

        }
        else if (paymentMethod === 'Razorpay') {
            handleRozarpayPayment(delivery_time);
        }
        else if (paymentMethod === 'paystack') {
        }
        else if (paymentMethod === 'Stripe') {
            console.log('stripe222');
            handleSubmit();
        }
        else if (paymentMethod === 'Paytm') {

        }
    }
    
    

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "https://example.com/order/123/complete",
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }
    return (
        <section id='checkout'>
            {paymentMethod === 'Stripe' ? <PaymentElement /> : console.log("null")}
            <div className='cover'>
                <img src={coverImg} className='img-fluid' alt="cover"></img>
                <div className='title'>
                    <h3>Checkout</h3>
                    <span>home / </span><span className='active'>checkout</span>
                </div>
            </div>

            <div className='checkout-container container'>
                <div className='checkout-util-container'>
                    <div className='billibg-address-wrapper checkout-component'>
                        <span className='heading'>billing address</span>

                        <Address setselectedAddress={setselectedAddress} />
                    </div>

                    <div className='delivery-day-wrapper checkout-component'>
                        <span className='heading'>preferred delivery day</span>
                        <div className='d-flex justify-content-center p-3'>
                            <Calendar value={expectedDate} onChange={(e) => {
                                if (new Date(e) >= new Date()) {
                                    setexpectedDate(new Date(e))
                                }
                                else if (new Date(e).getDate() === new Date().getDate() && new Date(e).getMonth() === new Date().getMonth() && new Date(e).getFullYear() === new Date().getFullYear()) {
                                    setexpectedDate(new Date(e))
                                }
                                else {
                                    toast.info('Please Select Valid Delivery Day')
                                }
                            }} />
                        </div>
                    </div>

                    <div className='delivery-time-wrapper checkout-component'>
                        <span className='heading'>preferred delivery time</span>
                        <div className='d-flex p-3' style={{ flexWrap: "wrap" }}>
                            {timeslots === null
                                ? <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                : (
                                    <>
                                        {timeslots.time_slots.map((timeslot, index) => (
                                            <div key={index} className='time-slot-container'>
                                                <div>
                                                    <input type="radio" name="TimeSlotRadio" id={`TimeSlotRadioId${index}`} defaultChecked={index === 0 ? true : false} onChange={() => {
                                                        setexpectedTime(timeslot);
                                                    }} />
                                                </div>
                                                <div>
                                                    {timeslot.title}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )
                            }
                        </div>
                    </div>


                </div>

                <div className='order-container'>
                    <div className='payment-wrapper checkout-component'>
                        <span className='heading'>payment-method</span>
                        <div>
                            <label className="form-check-label" htmlFor='cod'>
                                <img src={cod} alt='cod' />
                                <span>Cash On Delivery</span>
                            </label>
                            <input type="radio" name="payment-method" id='cod' defaultChecked={true} onChange={() => {
                                setpaymentMethod("COD")
                            }} />
                        </div>
                        <div>
                            <label className="form-check-label" htmlFor='razorpay'>
                                <img src={rozerpay} alt='cod' />
                                <span>Razorpay</span>
                            </label>
                            <input type="radio" name="payment-method" id='razorpay' onChange={() => {
                                setpaymentMethod("Razorpay")
                            }} />
                        </div>

                        <div>
                            <label className="form-check-label" htmlFor='Stripe'>
                                <img src={Stripe} alt='stripe' />
                                <span>Stripe</span>
                            </label>
                            <input type="radio" name="payment-method" id='stripe' onChange={() => {
                                setpaymentMethod("Stripe")
                            }} />
                        </div>

                    </div>

                    <div className='order-summary-wrapper checkout-component'>
                        <span className='heading'>order summary</span>

                        <div className='order-details'>
                            {cart.checkout === null || user.user === null
                                ? (<div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>)
                                : (
                                    <div className='summary'>
                                        <div className='d-flex justify-content-between'>
                                            <span>Subtotal</span>
                                            <div className='d-flex align-items-center'>
                                                <FaRupeeSign />
                                                <span>{parseFloat(cart.checkout.sub_total)}</span>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <span>Delivery Charges</span>
                                            <div className='d-flex align-items-center'>
                                                <FaRupeeSign />
                                                <span>{parseFloat(cart.checkout.delivery_charge.total_delivery_charge)}</span>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-between total'>
                                            <span>Total</span>
                                            <div className='d-flex align-items-center total-amount'>
                                                <FaRupeeSign fill='var(--secondary-color)' />
                                                <span>{parseFloat(cart.checkout.total_amount)}</span>
                                            </div>
                                        </div>


                                        <div className='button-container'>
                                            <button type='button' className='checkout' onClick={() => { handlePlaceOrder()}}>place order</button>
                                        </div>

                                    </div>)}
                        </div>

                    </div>
                </div>
            </div>


        </section>
    )
}

export default Checkout
