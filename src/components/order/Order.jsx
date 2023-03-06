import React, { useEffect, useRef, useState } from 'react'
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

    const closeModalRef = useRef();
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
                                            font - family: 'Nunito', sans-serif;
                }
                                        .bi-x-octagon::marker{
                                            display:none !important;
                }
                                        .progress{
                                            z-index: -1;
                                            align-self: start;
                                            height: 100%;
                                            max-height:200px;
                                            margin: 14px 10px 10px 13.9px;
                                            width: 4px;
                                            border:1px solid green;
                                            position:fixed;
                                        }
                                        .progress .progress-bar{
                                            height: ${element.active_status == 2?"23%;":element.active_status == 5?"77%;":element.active_status == 4?"57;":element.active_status == 6?"100%;":""};
                                            
                                        }

                                    </style>
                                </head>
                                <body>
                                    <style>

                                    </style>
                                    <section class="track" id="printMe">
                                        <div class="d-flex justify-content-between align-items-center mx-5">
                                            <h5 class="page-header">eGrocer</h5>
                                            <h5 class="page-header">Mo. +${element.mobile}</h5>
                                            <button type="button" className="bg-white" data-bs-dismiss="modal" aria-label="Close" ref=+${closeModalRef} style= {width: 30px; }><i class="bi bi-x-octagon"></i></button>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div class="d-flex flex-column mx-5 justify-content-around">
                                            <div class="d-flex my-4">
                                                <div class="col-sm-4 bg-white track-col"> <span class="rounded-circle px-3 pt-2 fs-2 border-outline-success bg-subtle btn btn-outline-success"><i class="bi bi-cart "></i></span></div>
                                                <span class=""> Accepted</span>
                                            </div>
                                            <div class="progress flex-column col-sm-3" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                <div class="progress-bar bg-success"></div>
                                            </div>
                                            <div class="d-flex my-4">
                                                <div class="col-sm-4 bg-white track-col"> <span class="rounded-circle px-3 pt-2 fs-2 btn btn-outline-success"><i class="bi bi-truck "></i></span></div>
                                                <span> shipped</span>
                                            </div>
                                            <div class="d-flex my-4">
                                                <div class="col-sm-4 bg-white track-col"> <span class="rounded-circle px-3 pt-2 fs-2 btn btn-outline-success"><i class="bi bi-bus-front "></i></span></div>
                                                <span> Out For Delivery</span>
                                            </div>
                                            <div class="d-flex my-4">
                                                <div class="col-sm-4 bg-white track-col"> <span class="rounded-circle px-3 pt-2 fs-2 btn btn-outline-success"><i class="bi bi-check "></i></span></div>
                                                <span> Delivered</span>
                                            </div>
                                        </div>
                                    </div>
                                    


                            </section>
                        </body>
                </html>`
                        document.getElementById('mainContentTrack').innerHTML = html;

            }
            // closeModalRef.current.click()
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
                                                        <th>{`#${ order.order_id } `}</th>
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
                                                            <button type='button' id={`track - ${ order.order_id } `} data-bs-toggle="modal" data-bs-target="#trackModal" className='track' value={order.order_id} onClick={(e) => { getOrderStatus(e.target.value) }}>track order</button>
                                                            <button type='button' id={`invoice - ${ order.order_id } `} data-bs-toggle="modal" data-bs-target="#invoiceModal" className='Invoice' value={order.order_id} onClick={(e) => { getInvoice(e.target.value) }}>Get Invoice</button>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </>}


                                    </tbody>
                                </table>}
                            <div id="invoice">
                                <div className="modal fade new-invoice" id="invoiceModal" aria-labelledby="InvoiceModalLabel" aria-hidden="true">
                                    <div className='modal-dialog'>
                                        <div className="modal-content" style={{ borderRadius: "10px", maxWidth: "100%", padding: "30px 15px", zIndex:-2 }}>
                                            <div id="mainContent">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="track">
                                <div className="modal fade new-track" id="trackModal" aria-labelledby="TrackModalLabel" aria-hidden="true">
                                    <div className='modal-dialog'>
                                        <div className="modal-content" style={{ borderRadius: "10px", maxWidth: "100%", padding: "30px 15px", zIndex:-2 }}>
                                            <div id="mainContentTrack">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
}

                        export default Order
