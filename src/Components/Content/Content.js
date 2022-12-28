import React, { useEffect } from 'react';
import { Categories } from '../Categories/Categories';
import { Sliders } from '../Slider/Slider';
import { Offers } from '../Offers/Offer';
import Brands from '../Brands/Brands';
import Section from '../Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop } from '../../Model/action/shopAction';
import { Spinner } from 'react-bootstrap';


export const Content = (props) => {

    const shop = useSelector((state) => state.shop)
    const dispatch = useDispatch();
    
    const city = useSelector((state) => state.location.city)

    console.log(city)

    useEffect(() => {

        if(localStorage.getItem('location') === null){
            dispatch(fetchShop())
        }
        else{

            if(Object.keys(city).length===0){
                dispatch(fetchShop());
            }
            else{
                dispatch(fetchShop(city.id,city.latitude,city.longitude))
            }
        }
    }, [dispatch,city])

    return (
        <>
            {Object.keys(shop).length === 0 ? (
                <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                    <Spinner animation="grow p-1" variant="danger" />
                    <Spinner animation="grow p-1" variant="warning" />
                    <Spinner animation="grow p-1" variant="info" />
                    <Spinner animation="grow p-1" variant="success" />
                </div>
            ) : (
                <>
                    <Sliders />
                    <Offers />
                    <Categories />
                    <Brands />

                    {props.islocation ? <Section/> : ""}
                    
                </>
            )}

        </>
    );
};