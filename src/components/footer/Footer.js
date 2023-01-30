import React, { useState, useEffect } from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import googleplay from '../../utils/google-play.jpg'
import appstore from '../../utils/app-store.png'
import rozerpay from '../../utils/payments/rozerpay.png'
import mastercard from '../../utils/payments/master-card.jpg'
import upi from '../../utils/payments/upi.png'
import { useDispatch } from 'react-redux';
import api from '../../api/api'
import { ActionTypes } from '../../model/action-type';

export const Footer = () => {

    const dispatch = useDispatch();

    //fetch Category
    const fetchCategory = () => {
        api.getCategory()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setcategory(result.data)
                    dispatch({ type: ActionTypes.SET_CATEGORY, payload: result.data });
                }
            })
            .catch(error => console.log("error ", error))
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    const [category, setcategory] = useState(null);

    return (
        <section id="footer">
            <div className="container">
                <div className="row ">
                    <div className="col-xs-3 col-sm-3 col-md-3" >
                        <h5>categories</h5>

                        {category === null
                            ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                            : (
                                <ul className='category-list'>
                                    {category.map((ctg, index) => (
                                        <li key={index}><Link to='/'>{ctg.name}</Link></li>
                                    ))}
                                </ul>
                            )}

                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3">
                        <h5>useful links</h5>
                        <ul className="">
                            <li><Link to={'/about'}><i className="fa fa-angle-double-right"></i>About us</Link></li>
                            <li><Link to={'/faq'}><i className="fa fa-angle-double-right"></i>Faq</Link></li>
                            <li><Link to={'/contact'}><i className="fa fa-angle-double-right"></i>Contact us</Link></li>
                            <li><Link to={'/policy'}><i className="fa fa-angle-double-right"></i>Privacy & policy</Link></li>
                            <li><Link to={'/terms'}><i className="fa fa-angle-double-right"></i>terms & condition</Link></li>
                        </ul>
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3">
                        <h5>top cities</h5>
                        <ul className='cities'>
                            <li><a href="/">Gurugram</a></li>
                            <li><a href="/">new delhi</a></li>
                            <li><a href="/">bengaluru</a></li>
                            <li><a href="/">mumbai</a></li>
                            <li><a href="/">hydrabad</a></li>
                            <li><a href="/">kolkata</a></li>

                            <li><a href="/">Gurugram</a></li>
                            <li><a href="/">new delhi</a></li>
                            <li><a href="/">bengaluru</a></li>
                            <li><a href="/">mumbai</a></li>
                            <li><a href="/">hydrabad</a></li>
                            <li><a href="/">kolkata</a></li>

                        </ul>
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3">
                        <div className='d-flex flex-column gap-3'>
                            <div>
                                <h5>Download apps</h5>
                                <div className='d-flex flex-row gap-3 justify-content-evenly'>
                                    <button type='button' className='download-button'>
                                        <img src={googleplay} alt='google-play'></img>
                                    </button>
                                    <button type='button' className='download-button'>
                                        <img src={appstore} alt='app-store' ></img>
                                    </button>

                                </div>
                            </div>
                            <div>
                                <h5>payment method</h5>
                                <div className='d-flex flex-row gap-3 payment justify-content-evenly' >
                                    <button type='button' className='download-button'>
                                        <img src={rozerpay} alt='rozerpay' ></img>
                                    </button>
                                    <button type='button' className='download-button'>
                                        <img src={mastercard} alt='master-card' ></img>
                                    </button>
                                    <button type='button'>
                                        <img src={upi} alt='upi' className='download-button'></img>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                    <p className="h6">Copyright © 2022.All right Reversed By eGrocer.</p>
                </div>
                <hr />
            </div>
        </section>
    );
};