import React, { useEffect, useState } from 'react'
import './order.css'
import api from '../../api/api'
import Cookies from 'universal-cookie';
import { FaRupeeSign } from "react-icons/fa";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Order = () => {

    const [orderId, setOrderId] = useState();
    //initialize Cookies
    const cookies = new Cookies();

    const fetchOrders = () => {
        api.getOrders(cookies.get('jwt_token'))
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    // console.log(result.data)
                    setorders(result.data);
                }
            })
    }

    useEffect(() => {
        fetchOrders()
    }, [])
    const getInvoice = async (e, value) => {

        // var order_id = document.getElementById('invoice').value;
        api.getInvoices(cookies.get('jwt_token'), e).then(response => response.json()).then(result => {
            let invoicePage = result.data;
            console.log(result.data)
            document.getElementById('mainContent').innerHTML = invoicePage;


        })
    }

    const getOrderStatus = (e) => {
        console.log(orders);

        for (let i = 0; i < orders.length; i++) {
            const element = orders[i];
            // console.log(element)
            if (element.id == e) {
                console.log(element.active_status)
                let html = `<html>
        <head>
            <title>Tracking Order - eGrocer</title>
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://egrocer.wrteam.in/assets/css/bootstrap.css">
            <link rel="stylesheet" href="https://egrocer.wrteam.in/assets/css/custom/common.css">
            <style>
                body {
                    font-family: 'Nunito', sans-serif;
                }
            </style>
        </head>
        <body>
    <style>
        
    </style>
    <section class="track" id="printMe">
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="page-header">eGrocer</h5>
            <h5 class="page-header">Mo. +${element.mobile}</h5>
        </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <div class="col-sm-4 track-col">
                <span> Accepted</span>
            </div>
            <div class="col-sm-4 track-col">
                <span> shipped</span>
            </div>
            <div class="col-sm-4 track-col">
                <span> Out For Delivery</span>
            </div>
            <div class="col-sm-4 track-col">
                <span> Delivered</span>
            </div>
            <div class="col-sm-3 invoice-col">
                Retail Invoice
                <address>
                    <b>No : </b>#244
                </address>
                <address>
                    <b>Date: </b>2023-02-15 13:54:18
                </address>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <div class="well">
                    <div class="row"><strong>Item : 2</strong></div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <p>Sold By</p>
                            <strong>WRTeam</strong>
                            <p>Email: seller@gmail.com</p>
                            <p> Customer Care : +91 9558192001</p>
                        </div>
                        <div class="col-md-3">
                            <strong>
                                <p>Pan Number : PAN123</p>
                                <p>TAX : TAX123</p>
                            </strong>
                                                        <p>Delivery By : Delivery Boy</p>
                                                </div>
                    </div>
                    <hr>
                    <div class="row">
                        <p class="h6 ">Product Details:</p>
                        <div class="row">
                            <div class="col-xs-12 table-responsive">
                                <table class="table">
                                    <thead class="text-center">
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Name</th>
                                        <th>Unit</th>
                                        <th>Price</th>
                                        <th>Tax $ (%)</th>
                                        <th>Qty</th>
                                        <th>SubTotal ( $ )</th>
                                    </tr>
                                    </thead>
                                    <tbody class="text-center">
                                                                                                        <tr>
                                            <td>1<br></td>
                                            <td>Kiwi Juice<br></td>
                                            <td>100<br></td>
                                            <td>100</td>
                                            <td>10.5  (13.12%)<br></td>
                                            <td>1<br></td>
                                            <td>90.5<br></td>
                                                                                </tr>
                                                                        <tr>
                                            <td>2<br></td>
                                            <td>Coconut Mulk<br></td>
                                            <td>1<br></td>
                                            <td>1000</td>
                                            <td>-144  (-18%)<br></td>
                                            <td>1<br></td>
                                            <td>656<br></td>
                                                                                </tr>
                                                                    </tbody>
                                    <tfoot class="text-center">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Total</th>
                                        <td>-133.5<br></td>
                                        <td>2<br></td>
                                        <td>746.5<br></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <p><b>Payment Method : </b> COD</p>
            <!--accepted payments column
            <div class="col-xs-6 col-xs-offset-6">
            <p class="lead">Payment Date: </p>-->
            <div class="table-responsive">
                <table>
                    <tbody>
                        <tr>
                            <th>Total Order Price ($)</th>
                            <td>746.5</td>
                        </tr>
                        <tr>
                            <th>Delivery Charge ($)</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th>Discount $ (%)</th>
                                                    <td>- 0 (0%)</td>
                        </tr>
                        <tr>
                            <th>Promo () Discount ($)</th>
                            <td>- 0</td>
                        </tr>
                        <tr>
                            <th>Wallet Used ($)</th>
                            <td>- 0</td>
                        </tr>
                        <tr>
                            <th>Final Total ($)</th>
                            <td>= 847</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
        </body>
    </html>`
            }
        }
    }
    const [orders, setorders] = useState(null)

    return (
        <div className='order-list'>
            <div className='heading'>
                All Orders
            </div>

            {orders === null
                ? <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                : <table className='order-list-table'>
                    <thead>
                        <tr>
                            <th>order</th>
                            <th>product name</th>
                            <th>date</th>
                            <th>total</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0
                            ? <div className='d-flex align-items-center p-4'>No Transactions Found</div>
                            : <>
                                {orders.map((order, index) => (
                                    <tr key={index} className={index === orders.length - 1 ? 'last-column' : ''}>
                                        <th>{`#${order.order_id}`}</th>
                                        <th className='product-name d-flex flex-column justify-content-center'>{order.items.map((item, ind) => (
                                            <span key={ind}>{item.product_name},</span>
                                        ))}
                                        </th>
                                        <th>
                                            {order.created_at.substring(0, 10)}
                                        </th>
                                        <th className='total'>
                                            <FaRupeeSign fontSize={'1.7rem'} /> {order.total}
                                        </th>
                                        <th className='button-container'>
                                            <button type='button' id={`track-${order.order_id}`} data-bs-toggle="modal" data-bs-target="#trackModal" className='track' value={order.order_id} onClick={(e) => { getOrderStatus(e.target.value) }}>track order</button>
                                            <button type='button' id={`invoice-${order.order_id}`} data-bs-toggle="modal" data-bs-target="#invoiceModal" className='Invoice' value={order.order_id} onClick={(e) => { getInvoice(e.target.value) }}>Get Invoice</button>
                                        </th>
                                    </tr>
                                ))}
                            </>}


                    </tbody>
                </table>}
            <div id="invoice">
                <div className="modal fade new-invoice" id="invoiceModal" aria-labelledby="InvoiceModalLabel" aria-hidden="true">
                    <div className='modal-dialog'>
                        <div className="modal-content" style={{ borderRadius: "10px", maxWidth: "100%", padding: "30px 15px" }}>
                            <div id="mainContent">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="track">
                <div className="modal fade new-track" id="trackModal" aria-labelledby="TrackModalLabel" aria-hidden="true">
                    <div className='modal-dialog'>
                        <div className="modal-content" style={{ borderRadius: "10px", maxWidth: "100%", padding: "30px 15px" }}>
                            <div id="mainContent">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
