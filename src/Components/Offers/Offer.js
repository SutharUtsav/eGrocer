import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';
import { Shimmer } from 'react-shimmer';


export const Offers = () => {

    const offers = useSelector((state) => state.shop.offers)
    return (

        <section className='offer-container' id="offers" >
            {offers === undefined ? (
                <div className='d-inline-block'>
                    <Shimmer width={2200} height={340} />
                </div>
            ) : (
                <>
                    <p>Top Offers</p>
                    <div className='offer-image-container'>
                        <Carousel>
                            {offers.map((ofr, index) => (
                                <Carousel.Item interval={3000} key={index}>
                                    <img className='offer-image' src={ofr.image_url} alt={ofr.type} width={900} height={250} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </>
            )}

        </section>
    )
}

