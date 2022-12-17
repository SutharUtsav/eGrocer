import React, { useEffect, useState } from 'react'
import api from '../../api'
import { useNavigate } from "react-router-dom";

const ViewCart = () => {
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            api.getCartContent().then(response => response.text())
                .then(result => {
                    if (result.status === 0) {
                        setcartProd([])
                    }
                })
                .catch(error => console.log('error', error));
        };
    }, [])

    const [cartProd, setcartProd] = useState([]);

    const handleGoToShop = () => {
        navigate('/');
    }

    return (
        <div style={{ paddingBottom: "2pc" }}>
            {cartProd.length === 0 ? (
                <div style={{minHeight:"82.3vh",paddingTop:"40px"}}>
                    <div className="bg-primary p-4"> <h3 className='text-light'><i className="fa fa-shopping-cart m-2" aria-hidden="true" ></i>Your Cart is Empty</h3></div>
                    <button className='btn btn-dark my-2' onClick={handleGoToShop}>Go to Shop</button>
                </div>
            ) : ""}
        </div>
    )
}

export default ViewCart
