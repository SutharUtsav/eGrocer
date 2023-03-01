import React, { useEffect, useState } from 'react'
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

//payment methods
// import Razorpay from 'razorpay'

const Checkout = () => {

    const cart = useSelector(state => (state.cart))
    const cookies = new Cookies();
    const navigate = useNavigate()

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

    const [paymentSettings, setpaymentSettings] = useState(null)


    const handlePlaceOrder = async () => {
        console.log(selectedAddress)
        console.log(expectedDate)
        console.log(expectedTime)
        console.log(paymentMethod)
        
        var delivery_time = `${expectedDate.getDate()}-${expectedDate.getMonth() + 1}-${expectedDate.getFullYear()} ${expectedTime.title}`
        console.log(delivery_time)
        api.placeOrder(cookies.get('jwt_token'), cart.checkout.product_variant_id, cart.checkout.quantity, cart.checkout.sub_total, cart.checkout.delivery_charge.total_delivery_charge, cart.checkout.total_amount, paymentMethod, delivery_time)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log(error))

        await api.getPaymentSettings(cookies.get('jwt_token'))
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setpaymentSettings(result.data)
                }
            })
            .catch(error => console.log(error))

        if (paymentMethod === 'COD') {

        }
        else if (paymentMethod === 'razorpay') {
            // const razorpay = new Razorpay({
            //     key_id: process.env.REACT_APP_RAZORPAY_KEY,
            //     key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
            // });

            // const options = {
            //     amount: 1000,
            //     currency: 'INR',
            //     name: 'My Company Name',
            //     description: 'Payment for Order #123',
            //     handler: function (response) {
            //         console.log(response)
            //     },
            //     prefill: {
            //         name: 'John Doe',
            //         email: 'john.doe@example.com',
            //         contact: '9999999999',
            //     },
            //     notes: {
            //         address: '123 Main St',
            //     },
            // };
            // razorpay.orders.create(options, function (err, order) {
            //     razorpay.createPayment(order, function (err, payment) {
            //         razorpay.open();
            //     });
            // });
        }
        else if (paymentMethod === 'paystack') {

        }
        else if (paymentMethod === 'Stripe') {

        }
        else if (paymentMethod === 'Paytm') {

        }
    }

    return (
        <section id='checkout'>
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
                            <label className="form-check-label" htmlFor='paystack'>
                                <img src={paystack} alt='cod' />
                                <span>Paystack</span>
                            </label>
                            <input type="radio" name="payment-method" id='paystack' onChange={() => {
                                setpaymentMethod("Paystack")
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
                        <div>
                            <label className="form-check-label" htmlFor='Paytm'>
                                <img src={Paytm} alt='Paytm' />
                                <span>Paytm</span>
                            </label>
                            <input type="radio" name="payment-method" id='Paytm' onChange={() => {
                                setpaymentMethod("Paytm")
                            }} />
                        </div>
                    </div>

                    <div className='order-summary-wrapper checkout-component'>
                        <span className='heading'>order summary</span>

                        <div className='order-details'>
                            {cart.checkout === null
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
                                            <button type='button' className='checkout' onClick={() => handlePlaceOrder()}>place order</button>
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
