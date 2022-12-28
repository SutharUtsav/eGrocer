import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Shimmer  } from 'react-shimmer';
import { useSelector } from 'react-redux';


export const Sliders = () => {

    const sliders = useSelector((state) => state.shop.sliders)

    return (
        <section id="home">
            {sliders===undefined ? (
                    <Shimmer width={2200} height={340}/>
            ) : (
                <Carousel className='home-slider'>
                    {sliders.map((sld, index) => (
                        <Carousel.Item interval={3000} key={index}>
                            <img className='slider-image' src={sld.image_url} alt={sld.type} height={300}/>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </section>
    );

};

