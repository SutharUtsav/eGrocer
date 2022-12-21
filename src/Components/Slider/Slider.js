import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Shimmer  } from 'react-shimmer';
import { useSelector } from 'react-redux';


export const Sliders = (props) => {

    const sliders = useSelector((state) => state.shop.sliders)

    return (
        <div className='p-3'>
            {sliders===undefined ? (
                    <Shimmer width={1499} height={340}/>
            ) : (
                <Carousel>
                    {sliders.map((sld, index) => (
                        <Carousel.Item interval={3000} key={index}>
                            <img className='d-block m-auto' src={sld.image_url} alt={sld.type} height={450}/>
                        </Carousel.Item>
                    ))}

                </Carousel>
            )}
        </div>
    );

};

