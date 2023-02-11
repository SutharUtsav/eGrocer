import React, { useState, useEffect } from 'react'
import api from '../../api/api'
import './offer.css'
import Slider from 'react-slick'
import { Shimmer } from 'react-shimmer'
import { AiOutlineArrowRight } from 'react-icons/ai'
// import offer3 from '../../utils/offers/offer3.jpg'
// import offer4 from '../../utils/offers/offer4.jpg'
// import offer5 from '../../utils/offers/offer5.jpg'


function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={window.innerWidth > 450 ? { ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--secondary-color)", borderRadius: "50%", width: "30px", height: "30px" } : { display: "none" }}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={window.innerWidth > 450 ? { ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--secondary-color)", borderRadius: "50%", width: "30px", height: "30px" } : { display: "none" }}
            onClick={onClick}
        />
    );
}


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
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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
        <section id="offers">
            {offers === null
                ? (
                    <></>
                    // <div className='d-flex container flex-column p-4 gap-3'>
                    //     <Shimmer width={1100} height={60}></Shimmer>
                    //     <div className='d-flex flex-row justify-content-center gap-4'>
                    //         <Shimmer width={250} height={200}></Shimmer>
                    //         <Shimmer width={250} height={200}></Shimmer>
                    //         <Shimmer width={250} height={200}></Shimmer>
                    //     </div>
                    // </div>
                )
                : (
                    <>
                        <div className='d-flex flex-column offer-container'>
                            <div className='container d-flex flex-column offer-container-heading'>
                                <span>choose your offer</span>
                                <p>one more offer for you!</p>
                            </div>
                            <Slider {...settings} className='p-2 container'>
                                {offers.map((offer, index) => (
                                    <div key={index} className='offer-container-body'>
                                        <img src={offer.image_url} alt="offers" />
                                        <button type='button'>shop now <AiOutlineArrowRight fill="#fff" /></button>
                                    </div>
                                ))}
                                {/* <div className='offer-container-body'>
                                    <img src={offer4} alt="offers" />
                                    <button type='button'>shop now <AiOutlineArrowRight fill="#fff" /></button>
                                </div>
                                <div className='offer-container-body'>
                                    <img src={offer3} alt="offers" />
                                    <button type='button'>shop now <AiOutlineArrowRight fill="#fff" /></button>
                                </div>
                                <div className='offer-container-body'>
                                    <img src={offer5} alt="offers" />
                                    <button type='button'>shop now <AiOutlineArrowRight fill="#fff" /></button>
                                </div> */}
                            </Slider>
                        </div>

                    </>
                )}

        </section>
    )
}

export default Offers
