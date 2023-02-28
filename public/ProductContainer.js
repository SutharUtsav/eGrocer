import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api/api'
import Slider from 'react-slick'
import './product.css'
import { AiOutlineEye } from 'react-icons/ai'
import { TbCurrencyRupee } from "react-icons/tb";
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'



const ProductContainer = () => {

    const fetchSection = (id, lat, lng) => {
        api.getSection(id, lat, lng)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setproducts(result.data);
                }
                else {
                    console.log(result.message)
                }
            })
            .catch(error => console.log("error ", error))
    }

    const city = useSelector(state => state.city);

    useEffect(() => {
        if (city.status === 'fulfill') {
            fetchSection(city.city.id, city.city.latitude, city.city.longitude)
        }
    }, [city])


    const [products, setproducts] = useState(null)
    const [selectedVariant, setselectedVariant] = useState(null)

    const settings = {
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section id="products" className='p-3 container'>
            {products === null
                ? (
                    <div className='d-flex flex-column p-4 gap-3'>
                        
                    </div>

                )
                : (
                    <div className='d-flex flex-column gap-3'>
                        <div className='d-flex flex-row justify-content-between align-items-center product-heading-container'>
                            <div className='d-flex flex-column'>
                                <span>eat healthy</span>
                                <p>top picks today</p>
                            </div>
                            <motion.button whileTap={{ scale: 0.7 }} type='button'>see all</motion.button>
                        </div>
                        <Slider {...settings}>
                            {products.map((product, index) => (
                                <div key={index} className='d-flex border flex-column product-card'>
                                    <div className='d-flex flex-row image-container'>
                                        <img src={product.image_url} alt={product.slug} className='card-img-top' />
                                        <Link to='/'><AiOutlineEye /></Link>
                                    </div>
                                    <div className="card-body product-card-body p-3">
                                        <span>{product.name}</span>
                                        <div className='d-flex flex-row justify-content-between'>
                                            <select onChange={(e) => {
                                                console.log(e.target.value)
                                            }}>
                                                {product.variants.map((x, index) => (
                                                    <option key={index} value={JSON.stringify(x)} >{x.stock_unit_id} {x.stock_unit_name} <span style={{textDecoration:"underline"}}>Rs.{x.price}</span></option>
                                                ))}
                                            </select>

                                            <span className='price'><TbCurrencyRupee/>{product.price}</span>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row border-top'>

                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                )}
        </section>
    )
}

export default ProductContainer
