import React, { useEffect, useState } from 'react'
import { Shimmer } from 'react-shimmer'
import './slider.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel, Autoplay } from "swiper";
import "swiper/css";
import api from '../../api/api';


import slider3 from '../../utils/sliders/slider3.jpg'
import slider4 from '../../utils/sliders/slider4.jpg'
import slider5 from '../../utils/sliders/slider5.jpg'


const Slider = () => {

    //useselect
    const [imagesNavSlider, setImagesNavSlider] = useState(null);
    const [slider, setslider] = useState(null)

    //fetch Slider
    const fetchSlider = () => {
        api.getSlider()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setslider(result.data);
                }
            })
            .catch(error => console.log("error ", error))
    }



    //useEffect

    //get sliders from api on page load 
    useEffect(() => {
        fetchSlider();
    }, [])

    return (
        <div className='slider'>
            {
                slider === null
                    ? (
                        // <div className="d-flex justify-content-center">
                        //     <div className="spinner-border" role="status">
                        //         <span className="visually-hidden">Loading...</span>
                        //     </div>
                        // </div>
                        <div className='d-flex flex-row gap-3'>
                            <Shimmer height={360} width={700} />
                            <div className='d-flex flex-column justify-content-center gap-3'>
                                <Shimmer height={50} width={50}></Shimmer>
                                <Shimmer height={50} width={50}></Shimmer>
                                <Shimmer height={50} width={50}></Shimmer>
                            </div>
                        </div>
                    )
                    : (
                        <div className="slider__flex ">
                            <div className="slider__images">
                                <Swiper
                                    loop={true}
                                    // autoplay={{
                                    //     delay: 3000,
                                    //     disableOnInteraction: false,
                                    // }}
                                    centeredSlides={true}
                                    thumbs={{ swiper: imagesNavSlider && !imagesNavSlider.destroyed ? imagesNavSlider : null }}
                                    direction="horizontal"
                                    slidesPerView={1}
                                    // spaceBetween={32}
                                    mousewheel={true}
                                    navigation={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        0: {
                                            direction: "horizontal"
                                        },
                                        768: {
                                            direction: "horizontal"
                                        }
                                    }}
                                    className="swiper-container2"
                                    modules={[Navigation, Thumbs, Mousewheel, Autoplay]} >

                                    {slider.map((sld, index) => {
                                        return (

                                            <SwiperSlide key={index}>
                                                <div className="slider__image">
                                                    <img src={sld.image_url} alt={sld.type} />
                                                </div>
                                            </SwiperSlide>

                                        );
                                    })}
                                    <SwiperSlide>
                                        <div className="slider__image">
                                            <img src={slider3} alt="xyz" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="slider__image">
                                            <img src={slider4} alt="xyz" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="slider__image">
                                            <img src={slider5} alt="xyz" />
                                        </div>
                                    </SwiperSlide>

                                </Swiper>
                            </div>


                            <div className="slider__col">
                                <div className="slider__thumbs">
                                    <Swiper
                                        onSwiper={setImagesNavSlider}
                                        direction="vertical"
                                        spaceBetween={24}
                                        slidesPerView={3}
                                        // navigation={{
                                        //     nextEl: ".slider__next",
                                        //     prevEl: ".slider__prev"
                                        // }}
                                        className="swiper-container1"
                                        breakpoints={{
                                            0: {
                                                direction: "horizontal"
                                            },
                                            770: {
                                                direction: "vertical"
                                            }
                                        }}
                                        modules={[Navigation, Thumbs]}
                                    >
                                        {slider.map((sld, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <div className="slider__image">
                                                        <img src={sld.image_url} alt="" />
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}

                                        <SwiperSlide>
                                            <div className="slider__image">
                                                <img src={slider3} alt="xyz" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider__image">
                                                <img src={slider4} alt="xyz" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider__image">
                                                <img src={slider5} alt="xyz" />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Slider
