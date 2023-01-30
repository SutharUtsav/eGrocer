import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api/api'
import Slider from 'react-slick'
import './product.css'
import { AiOutlineEye } from 'react-icons/ai'
import { FaRupeeSign } from "react-icons/fa";
import { BsHeart, BsShare } from "react-icons/bs";
import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
import { Shimmer } from 'react-shimmer'

// import product4 from '../../utils/products/product4.jpg'
// import product5 from '../../utils/products/products5.webp'
// import product6 from '../../utils/products/products6.webp'
// import product7 from '../../utils/products/products7.webp'


function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={window.innerWidth > "30rem" ? { ...style, display:"flex",alignItems:"center",justifyContent:"center", background: "var(--secondary-color)", borderRadius: "50%", width: "30px", height: "30px" }:{display:"none"}}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={window.innerWidth > "30rem" ? { ...style, display:"flex",alignItems:"center",justifyContent:"center", background: "var(--secondary-color)", borderRadius: "50%", width: "30px", height: "30px" }:{display:"none"}}
            onClick={onClick}
        />
    );
}

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
    // const [selectedVariant, setselectedVariant] = useState(null)

    const settings = {
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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
        <section id="products" className='container'>
            {products === null
                ? (
                    <></>
                    // <div className='d-flex flex-column p-4 gap-3'>
                    //     <Shimmer width={"90%"} height={60}></Shimmer>
                    //     <div className='d-flex flex-row justify-content-center gap-4'>
                    //         <Shimmer width={150} height={200}></Shimmer>
                    //         <Shimmer width={150} height={200}></Shimmer>
                    //         <Shimmer width={150} height={200}></Shimmer>
                    //     </div>
                    // </div>

                )
                : (
                    <div className='d-flex flex-column' style={{ gap: "30px" }}>
                        <div className='d-flex flex-row justify-content-between align-items-center product-heading-container'>
                            <div className='d-flex flex-column'>
                                <span>eat healthy</span>
                                <p>top picks today</p>
                            </div>
                            <Link to='/products'>see all</Link>
                        </div>
                        <Slider {...settings}>
                            {products.map((product, index) => (
                                <div key={index} className='d-flex border flex-column product-card'>
                                    <div className='image-container'>
                                        <Link to='/'><AiOutlineEye /></Link>
                                        <img src={product.image_url} alt={product.slug} className='card-img-top' />
                                    </div>
                                    <div className="card-body product-card-body p-3">
                                        <span>{product.name}</span>
                                        <div className='d-flex flex-row justify-content-between'>
                                            <select onChange={(e) => {
                                                document.getElementById(`price${product.id}`).innerHTML = JSON.parse(e.target.value).price;
                                            }} defaultValue={JSON.stringify(product.variants[0])} >
                                                {product.variants.map((x, index) => (
                                                    <option key={index} value={JSON.stringify(x)} >{x.stock_unit_id} {x.stock_unit_name} Rs.{x.price}</option>
                                                ))}
                                            </select>

                                            <div className='price d-flex flex-row align-items-center'>
                                                <FaRupeeSign fill='var(--secondary-color)' />
                                                <span id={`price${product.id}`}>{product.price}</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='d-flex flex-row border-top product-card-footer'>
                                        <div className='border-end col col-lg-3'>
                                            <button type="button" className='w-100 h-100'><BsHeart /></button>
                                        </div>
                                        <div className='border-end col col-lg-6'>
                                            <button type="button" className='w-100 h-100 add-to-cart'>add to cart</button>
                                        </div>
                                        <div className='col col-lg-3'>
                                            <button type="button" className='w-100 h-100'><BsShare /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}



                            {/* dummy products */}

                            {/* <div className='d-flex border flex-column product-card'>
                                <div className='d-flex flex-row image-container'>
                                    <Link to='/'><AiOutlineEye /></Link>
                                    <img src={product4} alt="souce" className='card-img-top' />
                                </div>
                                <div className="card-body product-card-body p-3">
                                    <span>Souces</span>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <select  >

                                            <option value={300} >3 KG Rs.300</option>

                                        </select>

                                        <span className='price'><FaRupeeSign fill='var(--secondary-color)' />500</span>
                                    </div>
                                </div>
                                <div className='d-flex flex-row border-top product-card-footer'>
                                    <div className='border-end col col-lg-3'>
                                        <button type="button" className='w-100'><BsHeart /></button>
                                    </div>
                                    <div className='border-end col col-lg-6'>
                                        <button type="button" className='w-100 h-100 add-to-cart'>add to cart</button>
                                    </div>
                                    <div className='col col-lg-3'>
                                        <button type="button" className='w-100'><BsShare /></button>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex border flex-column product-card'>
                                <div className='d-flex flex-row image-container'>
                                    <Link to='/'><AiOutlineEye /></Link>
                                    <img src={product5} alt="souce" className='card-img-top' />
                                </div>
                                <div className="card-body product-card-body p-3">
                                    <span>Souces</span>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <select  >

                                            <option value={300} >3 KG Rs.300</option>

                                        </select>

                                        <span className='price'><FaRupeeSign fill='var(--secondary-color)' />500</span>
                                    </div>
                                </div>
                                <div className='d-flex flex-row border-top product-card-footer'>
                                    <div className='border-end col col-lg-3'>
                                        <button type="button" className='w-100'><BsHeart /></button>
                                    </div>
                                    <div className='border-end col col-lg-6'>
                                        <button type="button" className='w-100 h-100 add-to-cart'>add to cart</button>
                                    </div>
                                    <div className='col col-lg-3'>
                                        <button type="button" className='w-100'><BsShare /></button>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex border flex-column product-card'>
                                <div className='d-flex flex-row image-container'>
                                    <Link to='/'><AiOutlineEye /></Link>
                                    <img src={product6} alt="souce" className='card-img-top' />
                                </div>
                                <div className="card-body product-card-body p-3">
                                    <span>Souces</span>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <select  >

                                            <option value={300} >3 KG Rs.300</option>

                                        </select>

                                        <span className='price'><FaRupeeSign fill='var(--secondary-color)' />500</span>
                                    </div>
                                </div>
                                <div className='d-flex flex-row border-top product-card-footer'>
                                    <div className='border-end col col-lg-3'>
                                        <button type="button" className='w-100'><BsHeart /></button>
                                    </div>
                                    <div className='border-end col col-lg-6'>
                                        <button type="button" className='w-100 h-100 add-to-cart'>add to cart</button>
                                    </div>
                                    <div className='col col-lg-3'>
                                        <button type="button" className='w-100'><BsShare /></button>
                                    </div>
                                </div>
                            </div>


                            <div className='d-flex border flex-column product-card'>
                                <div className='d-flex flex-row image-container'>
                                    <Link to='/'><AiOutlineEye /></Link>
                                    <img src={product7} alt="souce" className='card-img-top' />
                                </div>
                                <div className="card-body product-card-body p-3">
                                    <span>Souces</span>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <select  >

                                            <option value={300} >3 KG Rs.300</option>

                                        </select>

                                        <span className='price'><FaRupeeSign fill='var(--secondary-color)' />500</span>
                                    </div>
                                </div>
                                <div className='d-flex flex-row border-top product-card-footer'>
                                    <div className='border-end col col-lg-3'>
                                        <button type="button" className='w-100'><BsHeart /></button>
                                    </div>
                                    <div className='border-end col col-lg-6'>
                                        <button type="button" className='w-100 h-100 add-to-cart'>add to cart</button>
                                    </div>
                                    <div className='col col-lg-3'>
                                        <button type="button" className='w-100'><BsShare /></button>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex border flex-column product-card'>
                                <div className='d-flex flex-row image-container'>
                                    <Link to='/'><AiOutlineEye /></Link>
                                    <img src={product4} alt="souce" className='card-img-top' />
                                </div>
                                <div className="card-body product-card-body p-3">
                                    <span>Souces</span>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <select  >

                                            <option value={300} >3 KG Rs.300</option>

                                        </select>

                                        <span className='price'><FaRupeeSign fill='var(--secondary-color)' />500</span>
                                    </div>
                                </div>
                                <div className='d-flex flex-row border-top product-card-footer'>
                                    <div className='border-end col col-lg-3'>
                                        <button type="button" className='w-100'><BsHeart /></button>
                                    </div>
                                    <div className='border-end col col-lg-6'>
                                        <button type="button" className='w-100 h-100 add-to-cart'>add to cart</button>
                                    </div>
                                    <div className='col col-lg-3'>
                                        <button type="button" className='w-100'><BsShare /></button>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex border flex-column product-card'>
                                <div className='d-flex flex-row image-container'>
                                    <Link to='/'><AiOutlineEye /></Link>
                                    <img src={product4} alt="souce" className='card-img-top' />
                                </div>
                                <div className="card-body product-card-body p-3">
                                    <span>Souces</span>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <select  >

                                            <option value={300} >3 KG Rs.300</option>

                                        </select>

                                        <span className='price'><FaRupeeSign fill='var(--secondary-color)' />500</span>
                                    </div>
                                </div>
                                <div className='d-flex flex-row border-top product-card-footer'>
                                    <div className='border-end col col-lg-3'>
                                        <button type="button" className='w-100'><BsHeart /></button>
                                    </div>
                                    <div className='border-end col col-lg-6'>
                                        <button type="button" className='w-100 h-100 add-to-cart'>add to cart</button>
                                    </div>
                                    <div className='col col-lg-3'>
                                        <button type="button" className='w-100'><BsShare /></button>
                                    </div>
                                </div>
                            </div> */}




                        </Slider>
                    </div>

                )}
        </section>
    )
}

export default ProductContainer
