import React, { useEffect, useState } from 'react'
import './order.css'
import api from '../../api/api'
import Cookies from 'universal-cookie';
import { FaRupeeSign } from "react-icons/fa";

const Order = () => {

    const [orderId, setOrderId] = useState();
    //initialize Cookies
    const cookies = new Cookies();

    const fetchOrders = () => {
        api.getOrders(cookies.get('jwt_token'))
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    console.log(result.data)
                    setorders(result.data);
                }
            })
    }

    useEffect(() => {
        fetchOrders()
    }, [])
    const getInvoice = (e) => {
        console.log(orderId)
        // var order_id = document.getElementById('invoice').value;
        api.getInvoices(cookies.get('jwt_token'),orderId).then(response => response.json()).then(result => {
            console.log(result)
        })
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
                                            <button type='button' id={`track-${order.order_id}`} className='track' value={order.order_id}>track order</button>
                                            <button type='button' id={`invoice-${order.order_id}`} className='Invoice' value={order.order_id} onClick={(e)=>{setOrderId(e.target.value);  getInvoice()}}>Get Invoice</button>
                                        </th>
                                    </tr>
                                ))}
                            </>}


                    </tbody>
                </table>}
        </div>
    )
}

export default Order
