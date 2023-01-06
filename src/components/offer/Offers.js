import React, { useState, useEffect } from 'react'
import api from '../../api/api'
import './offer.css'
import Slider from 'react-slick'
import { Shimmer } from 'react-shimmer'

const Offers = () => {

    const fetchOffer = () => {
        api.getOffer()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setoffers(result.data);
                }
                else {
                    console.log(result.message)
                }
            })
            .catch(error => console.log("error ", error))
    }


    useEffect(() => {
        fetchOffer();
    }, [])

    const [offers, setoffers] = useState(null)


    const settings = {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section id="offers" className='p-3'>
            {offers === null
                ? (
                    <div className='d-flex container flex-column p-4 gap-3'>
                        <Shimmer width={1100} height={60}></Shimmer>
                        <div className='d-flex flex-row justify-content-center gap-4'>
                            <Shimmer width={250} height={200}></Shimmer>
                            <Shimmer width={250} height={200}></Shimmer>
                            <Shimmer width={250} height={200}></Shimmer>
                        </div>
                    </div>
                )
                : (
                    <>
                        <div className='d-flex flex-column offer-container'>
                            <div className='container d-flex flex-column offer-container-heading'>
                                <span>choose your offer</span>
                                <p>one more offer for you!</p>
                            </div>
                            <Slider {...settings} className='p-2'>
                                {offers.map((offer, index) => (
                                    <div key={index} className='offer-container-body'>
                                        <img src={offer.image_url} alt="offers" />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                    </>
                )}

        </section>
    )
}

export default Offers
