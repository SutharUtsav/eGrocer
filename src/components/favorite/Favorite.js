import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../cart/cart.css'
import './favorite.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import EmptyCart from '../../utils/zero-state-screens/Empty_Cart.svg'
import { useNavigate, Link } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from 'react-icons/bi'
import api from '../../api/api';
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { ActionTypes } from '../../model/action-type';


const Favorite = () => {
    const closeCanvas = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookies = new Cookies();

    const favorite = useSelector(state => (state.favorite))
    const city = useSelector(state => (state.city))

    const [isfavoriteEmpty, setisfavoriteEmpty] = useState(false)

    useEffect(() => {
        if (favorite.favorite === null && favorite.status === 'fulfill') {
            setisfavoriteEmpty(true)
        }
        else {
            setisfavoriteEmpty(false)
        }

    }, [favorite])


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
                        .catch(error => console.log(error))
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch(error => console.log(error))
    }

    //remove from favorite
    const removefromFavorite = async (product_id) => {
        await api.removeFromFavorite(cookies.get('jwt_token'), product_id)
            .then(response => response.json())
            .then(async (result) => {
                if (result.status === 1) {
                    toast.success(result.message)
                    await api.getFavorite(cookies.get('jwt_token'), city.city.latitude, city.city.longitude)
                        .then(resp => resp.json())
                        .then(res => {
                            if (res.status === 1)
                                dispatch({ type: ActionTypes.SET_FAVORITE, payload: res })
                            else
                                dispatch({ type: ActionTypes.SET_FAVORITE, payload: null })
                        })
                }
                else {
                    toast.error(result.message)
                }
            })

    }
    return (
        <div tabIndex="-1" className={`cart-sidebar-container offcanvas offcanvas-end`} id="favoriteoffcanvasExample" aria-labelledby="favoriteoffcanvasExampleLabel">
            <div className='cart-sidebar-header'>
                <h5>saved</h5>
                <button type="button" className="close-canvas" data-bs-dismiss="offcanvas" aria-label="Close" ref={closeCanvas}><AiOutlineCloseCircle /></button>
            </div>

            {isfavoriteEmpty
                ? (
                    <div className='empty-cart'>
                        <img src={EmptyCart} alt='empty-cart'></img>
                        <p>Your Cart is empty</p>
                        <span>You have no items in your shopping cart.</span>
                        <span>Let's go buy something!</span>
                        <button type='button' className="close-canvas" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => {
                            navigate('/products')
                        }}>start shopping</button>
                    </div>)
                : (
                    <>
                        {favorite.favorite === null
                            ? (<div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>

                            ) : (
                                <>
                                    <div className='cart-sidebar-product'>
                                        <div className='products-header'>
                                            <span>Product</span>
                                            <span>Price</span>
                                        </div>

                                        <div className='products-container'>
                                            {favorite.favorite.data.map((product, index) => (
                                                <div key={index} className='cart-card'>
                                                    <div className='left-wrapper'>
                                                        <div className='image-container'>
                                                            <img src={product.image_url} alt='product'></img>
                                                        </div>

                                                        <div className='product-details'>

                                                            <span>{product.name}</span>

                                                            <button type='button' id={`Add-to-cart-favoritesidebar${index}`} className='add-to-cart active'
                                                                onClick={() => {
                                                                    if (cookies.get('jwt_token') !== undefined) {
                                                                        document.getElementById(`Add-to-cart-favoritesidebar${index}`).classList.remove('active')
                                                                        document.getElementById(`input-cart-favoritesidebar${index}`).classList.add('active')
                                                                        document.getElementById(`input-favoritesidebar${index}`).innerHTML = 1
                                                                        addtoCart(product.id, product.variants[0].id, document.getElementById(`input-favoritesidebar${index}`).innerHTML)
                                                                    }
                                                                    else {
                                                                        toast.error("OOps! You need to login first to access the cart!")
                                                                    }

                                                                }}
                                                            >add to cart</button>

                                                            <div className='counter' id={`input-cart-favoritesidebar${index}`}>
                                                                <button type='button' onClick={() => {
                                                                    var val = parseInt(document.getElementById(`input-favoritesidebar${index}`).innerHTML);
                                                                    if (val === 1) {
                                                                        document.getElementById(`input-favoritesidebar${index}`).innerHTML = 0;
                                                                        document.getElementById(`input-cart-favoritesidebar${index}`).classList.remove('active')
                                                                        document.getElementById(`Add-to-cart-favoritesidebar${index}`).classList.add('active')
                                                                        removefromCart(product.id, product.variants[0].id)

                                                                    }
                                                                    else {
                                                                        document.getElementById(`input-favoritesidebar${index}`).innerHTML = val - 1;
                                                                        addtoCart(product.id, product.variants[0].id, document.getElementById(`input-favoritesidebar${index}`).innerHTML)
                                                                    }

                                                                }}><BiMinus fill='#fff' /></button>
                                                                <span id={`input-favoritesidebar${index}`} ></span>
                                                                <button type='button' onClick={() => {
                                                                    var val = document.getElementById(`input-favoritesidebar${index}`).innerHTML;
                                                                    if (val < product.total_allowed_quantity) {
                                                                        document.getElementById(`input-favoritesidebar${index}`).innerHTML = parseInt(val) + 1;
                                                                        addtoCart(product.id, product.variants[0].id, document.getElementById(`input-favoritesidebar${index}`).innerHTML)
                                                                    }
                                                                }}><BsPlus fill='#fff' /></button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='cart-card-end'>
                                                        <div className='d-flex align-items-center' style={{ fontSize: "1.855rem" }}>
                                                            <FaRupeeSign fill='var(--secondary-color)' /> <span id={`price${index}-cart-sidebar`}> {parseFloat(product.variants[0].price)}</span>
                                                        </div>

                                                        <button type='button' className='remove-product' onClick={() => removefromFavorite(product.id)}>delete</button>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='cart-sidebar-footer'>
                                            <div className='button-container'>
                                                <Link to='/wishlist' className='view-cart'>view saved</Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                    </>

                )}
        </div>
    )
}

export default Favorite
