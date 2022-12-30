import React, { useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Shimmer } from 'react-shimmer';
import { useSelector } from 'react-redux';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel, Autoplay } from "swiper";
import "swiper/css";


export const Sliders = () => {

    const [imagesNavSlider, setImagesNavSlider] = useState(null);

    const sliders = useSelector((state) => state.shop.sliders)

    return (
        <section id="home" className="slider">
            {sliders === undefined ? (
                <Shimmer width={2200} height={340} />
            ) : (
                <div className="slider__flex">
                    <div className="slider__images">
                        <div class="trans-layer" id="layer-1"></div>
                        <Swiper
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            centeredSlides={true}
                            thumbs={{ swiper: imagesNavSlider }}
                            direction="horizontal"
                            slidesPerView={1}
                            spaceBetween={32}
                            mousewheel={true}
                            navigation={{
                                clickable:true,
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
                            modules={[Navigation, Thumbs, Mousewheel, Autoplay]}
                        >
                            {sliders.map((slider, index) => {
                                return (
                                    <SwiperSlide key={index}>

                                        <div className="slider__image">
                                            <img src={slider.image_url} alt={slider.type} />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
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
                                    768: {
                                        direction: "vertical"
                                    }
                                }}
                                modules={[Navigation, Thumbs]}
                            >
                                {sliders.map((slider, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className="slider__image">
                                                <img src={slider.image_url} alt="" />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )


};

