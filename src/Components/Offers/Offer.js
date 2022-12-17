import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Shimmer } from 'react-shimmer';


export const Offers = (props) => {

    return (
        <div className='p-3' >
            <div className='container'>
                <h2>Top Offers</h2>
            </div>
            {props.loading ? (
                <div className='d-inline-block'>
                    <Shimmer width={1470} height={340} />
                </div>) : (
                <Carousel>
                    {props.offers.map((ofr, index) => (
                        <Carousel.Item interval={3000} key={index}>
                            <img className='d-block m-auto' src={ofr.image_url} alt={ofr.type} height={400}/>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    )
}

