import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Shimmer  } from 'react-shimmer';

export const Sliders = (props) => {

    return (
        <>
            {props.loading ? (
                    <Shimmer width={1499} height={340}/>
            ) : (
                <Carousel>
                    {props.slider.map((sld, index) => (
                        <Carousel.Item interval={3000} key={index}>
                            <img className='d-block m-auto' src={sld.image_url} alt={sld.type} height={450}/>
                        </Carousel.Item>
                    ))}

                </Carousel>
            )}
        </>
    );

};

