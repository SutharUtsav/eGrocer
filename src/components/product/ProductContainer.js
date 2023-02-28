import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api/api'
import Slider from 'react-slick'
import './product.css'
import { AiOutlineEye } from 'react-icons/ai'
import { FaRupeeSign } from "react-icons/fa";
import { BsHeart, BsShare, BsPlus } from "react-icons/bs";
import { BiMinus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { ActionTypes } from '../../model/action-type';

// import { motion } from 'framer-motion'
// import { Shimmer } from 'react-shimmer'
// import { ActionTypes } from '../../model/action-type'
// import ProductDetails from './ProductDetails'
import QuickViewModal from './QuickViewModal'



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

const ProductContainer = () => {

    //initialize cookies
    const cookies = new Cookies();
    const dispatch = useDispatch()

    const city = useSelector(state => state.city);

    // const shop = useSelector(state=>state.shop);

    useEffect(() => {
        if (city.status === 'fulfill') {
            fetchSection(city.city.id, city.city.latitude, city.city.longitude)
        }
    }, [city])


    const [products, setproducts] = useState(null)
    const [selectedProduct, setselectedProduct] = useState({})

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

    //Add to Cart
    const addtoCart = async (product_id, product_variant_id, qty) => {
        await api.addToCart(cookies.get('jwt_token'), product_id, product_variant_id, qty)
            .then(response => response.json())
            .then(async (result) => {
                if (result.status === 1) {
                    toast.success(result.message)
                    await api.getCart(cookies.get('jwt_token'), city.city.latitude, city.city.longitude)
                        .then(resp => resp.json())
                        .then(res => {
                            if (res.status === 1)
                                dispatch({ type: ActionTypes.SET_CART, payload: res })
                        })
                }
                else {
                    toast.error(result.message)
                }
            })
    }

    //remove from Cart
    const removefromCart = async (product_id, product_variant_id) => {
        await api.removeFromCart(cookies.get('jwt_token'), product_id, product_variant_id)
            .then(response => response.json())
            .then(async (result) => {
                if (result.status === 1) {
                    toast.success(result.message)
                    await api.getCart(cookies.get('jwt_token'), city.city.latitude, city.city.longitude)
                        .then(resp => resp.json())
                        .then(res => {
                            if (res.status === 1)
                                dispatch({ type: ActionTypes.SET_CART, payload: res })
                            else
                                dispatch({ type: ActionTypes.SET_CART, payload: null })
                        })
                }
                else {
                    toast.error(result.message)
                }
            })
    }

    //Add to favorite
    const addToFavorite = async (product_id) => {
        await api.addToFavotite(cookies.get('jwt_token'), product_id)
            .then(response => response.json())
            .then(async (result) => {
                if (result.status === 1) {
                    toast.success(result.message)
                    await api.getFavorite(cookies.get('jwt_token'), city.city.latitude, city.city.longitude)
                        .then(resp => resp.json())
                        .then(res => {
                            if (res.status === 1)
                                dispatch({ type: ActionTypes.SET_FAVORITE, payload: res })
                        })
                }
                else {
                    toast.error(result.message)
                }
            })
    }

    const settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
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
                                <div key={index} className='d-flex border flex-column product-card ms-0'>

                                    <div className='image-container' onClick={() => {
                                        // var prod = {
                                        //     ...product,
                                        //     selectedVariant: JSON.parse(document.getElementById(`select-product${index}-variant-section`).value)
                                        // };

                                        setselectedProduct(product)

                                    }} data-bs-toggle="modal" data-bs-target="#quickviewModal">

                                        <Link to='/'><AiOutlineEye /></Link>
                                        <img src={product.image_url} alt={product.slug} className='card-img-top' />
                                    </div>

                                    <div className="card-body product-card-body p-3">
                                        <span>{product.name}</span>
                                        <div className='d-flex flex-row justify-content-between'>
                                            <select id={`select-product${index}-variant-section`} onChange={(e) => {
                                                document.getElementById(`price${index}-section`).innerHTML = parseFloat(JSON.parse(e.target.value).price);

                                                if (document.getElementById(`input-cart-section${index}`).classList.contains('active')) {
                                                    document.getElementById(`input-cart-section${index}`).classList.remove('active')
                                                    document.getElementById(`Add-to-cart-section${index}`).classList.add('active')

                                                }

                                            }} defaultValue={JSON.stringify(product.variants[0])} >

                                                {product.variants.map((x, ind) => (
                                                    <option key={ind} value={JSON.stringify(x)} >{x.stock_unit_id} {x.stock_unit_name} Rs.{x.price}</option>
                                                ))}

                                            </select>

                                            <div className='price d-flex flex-row align-items-center'>
                                                <FaRupeeSign fill='var(--secondary-color)' />
                                                <span id={`price${index}-section`}>{parseFloat(product.price)}</span>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='d-flex flex-row border-top product-card-footer'>
                                        <div className='border-end '>
                                            <button type="button" className='w-100 h-100' onClick={() => addToFavorite(product.id)}><BsHeart /></button>
                                        </div>

                                        <div className='border-end' style={{ flexGrow: "1" }} >
                                            <button type="button" id={`Add-to-cart-section${index}`} className='w-100 h-100 add-to-cart active' onClick={() => {
                                                if (cookies.get('jwt_token') !== undefined) {
                                                    document.getElementById(`Add-to-cart-section${index}`).classList.remove('active')
                                                    document.getElementById(`input-cart-section${index}`).classList.add('active')
                                                    document.getElementById(`input-section${index}`).innerHTML = 1
                                                    addtoCart(product.id, JSON.parse(document.getElementById(`select-product${index}-variant-section`).value).id, document.getElementById(`input-section${index}`).innerHTML)
                                                }
                                                else {
                                                    toast.error("OOps! You need to login first to access the cart!")
                                                }

                                            }} >add to cart</button>

                                            <div id={`input-cart-section${index}`} className="w-100 h-100 input-to-cart" >
                                                <button type='button' onClick={() => {

                                                    var val = parseInt(document.getElementById(`input-section${index}`).innerHTML);
                                                    if (val === 1) {
                                                        document.getElementById(`input-section${index}`).innerHTML = 0;
                                                        document.getElementById(`input-cart-section${index}`).classList.remove('active')
                                                        document.getElementById(`Add-to-cart-section${index}`).classList.add('active')
                                                        removefromCart(product.id, JSON.parse(document.getElementById(`select-product${index}-variant-section`).value).id)

                                                    }
                                                    else {
                                                        document.getElementById(`input-section${index}`).innerHTML = val - 1;
                                                        addtoCart(product.id, JSON.parse(document.getElementById(`select-product${index}-variant-section`).value).id, document.getElementById(`input-section${index}`).innerHTML)
                                                    }


                                                }}><BiMinus /></button>
                                                <span id={`input-section${index}`} ></span>
                                                <button type='button' onClick={() => {

                                                    var val = document.getElementById(`input-section${index}`).innerHTML;
                                                    if (val < product.total_allowed_quantity) {
                                                        document.getElementById(`input-section${index}`).innerHTML = parseInt(val) + 1;
                                                        addtoCart(product.id, JSON.parse(document.getElementById(`select-product${index}-variant-section`).value).id, document.getElementById(`input-section${index}`).innerHTML)
                                                    }


                                                }}><BsPlus /> </button>


                                            </div>

                                        </div>

                                        <div className=''>
                                            <button type="button" className='w-100 h-100'><BsShare /></button>
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </Slider>

                        <QuickViewModal selectedProduct={selectedProduct} setselectedProduct={setselectedProduct} />

                    </div>


                )}
        </section>
    )
}

export default ProductContainer
