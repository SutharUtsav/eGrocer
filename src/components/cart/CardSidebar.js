import React, { useEffect, useState } from 'react'
import './cart.css'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRupeeSign } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from 'react-icons/bi'
import api from '../../api/api';
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { ActionTypes } from '../../model/action-type';
import EmptyCart from '../../utils/zero-state-screens/Empty_Cart.svg'
import { useNavigate } from 'react-router-dom';

const CardSidebar = () => {

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const cart = useSelector(state => (state.cart))
    const city = useSelector(state => (state.city))
    const sizes = useSelector(state => (state.productSizes))

    const [productSizes, setproductSizes] = useState(null)
    const [iscartEmpty, setiscartEmpty] = useState(false)

    useEffect(() => {
        if (sizes.sizes === null || sizes.status === 'loading') {
            if (city.city !== null && cart.cart !== null) {
                api.getProductbyFilter(city.city.id, city.city.latitude, city.city.longitude)
                    .then(response => response.json())
                    .then(result => {
                        if (result.status === 1) {
                            setproductSizes(result.sizes)
                            dispatch({ type: ActionTypes.SET_PRODUCT_SIZES, payload: result.sizes })
                        }
                    })
            }
        }
        else {
            setproductSizes(sizes.sizes)
        }

        if (cart.cart === null && cart.status === 'fulfill') {
            setiscartEmpty(true)
        }
        else {
            setiscartEmpty(false)
        }

    }, [cart])




    const getProductVariantsSelection = (product_id, product_variant_id, div_id, index) => {
        api.getProductbyId(city.city.id, city.city.latitude, city.city.longitude, product_id)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    var select = document.createElement("SELECT")

                    select.setAttribute("id", `selectedVariant${index}-cartsidebar`)
                    select.addEventListener('change', (e) => {
                        addtoCart(product_id, JSON.parse(e.target.value).id, document.getElementById(`input-cart-sidebar${index}`).innerHTML)
                    })

                    result.data.variants.forEach((variant, ind) => {
                        var opt = document.createElement('option')
                        opt.setAttribute('key', ind)
                        opt.value = JSON.stringify(variant)

                        //get unit_id
                        var unit_id = 0;
                        productSizes.forEach(psize => {
                            if (parseInt(psize.size) === parseInt(variant.measurement) && psize.short_code === variant.stock_unit_name) {
                                unit_id = psize.unit_id
                            }
                        })
                        opt.innerHTML = `${unit_id} ${variant.stock_unit_name} Rs.${variant.price}`
                        select.appendChild(opt)
                    })

                    // console.log(document.getElementById(div_id))
                    if (document.getElementById(div_id).childNodes.length === 0)
                        document.getElementById(div_id).appendChild(select)
                }
            })
            .catch((error) => console.log(error))


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
                        .catch(error => console.log(error))
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div tabIndex="-1" className='cart-sidebar-container offcanvas offcanvas-end' id="cartoffcanvasExample" aria-labelledby="cartoffcanvasExampleLabel">
            <div className='cart-sidebar-header'>
                <h5>your cart</h5>
                <button type="button" className="close-canvas" data-bs-dismiss="offcanvas" aria-label="Close"><AiOutlineCloseCircle /></button>
            </div>
            {iscartEmpty ? (
                <div className='empty-cart'>
                    <img src={EmptyCart} alt='empty-cart'></img>
                    <p>Your Cart is empty</p>
                    <span>You have no items in your shopping cart.</span>
                    <span>Let's go buy something!</span>
                    <button type='button' className="close-canvas" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => {
                        navigate('/products')
                    }}>start shopping</button>
                </div>) : (
                <>
                    {cart.cart === null || productSizes === null
                        ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                        : (
                            <>
                                <div className='cart-sidebar-product'>
                                    <div className='products-header'>
                                        <span>Product</span>
                                        <span>Price</span>
                                    </div>

                                    <div className='products-container'>


                                        {cart.cart.data.cart.map((product, index) => (
                                            <div key={index} className='cart-card'>
                                                <div className='left-wrapper'>
                                                    <div className='image-container'>
                                                        <img src={product.image_url} alt='product'></img>
                                                    </div>

                                                    <div className='product-details'>

                                                        <span>{product.name}</span>

                                                        <div id={`selectedVariant${index}-wrapper-cartsidebar`} ></div>
                                                        {getProductVariantsSelection(product.product_id, product.product_variant_id, `selectedVariant${index}-wrapper-cartsidebar`, index)}

                                                        <div className='counter'>
                                                            <button type='button' onClick={() => {
                                                                var val = parseInt(document.getElementById(`input-cart-sidebar${index}`).innerHTML);
                                                                if (val > 1) {
                                                                    document.getElementById(`input-cart-sidebar${index}`).innerHTML = val - 1;
                                                                    addtoCart(product.product_id, product.product_variant_id, document.getElementById(`input-cart-sidebar${index}`).innerHTML)

                                                                }

                                                            }}><BiMinus fill='#fff' /></button>
                                                            <span id={`input-cart-sidebar${index}`} >{product.qty}</span>
                                                            <button type='button' onClick={() => {
                                                                var val = parseInt(document.getElementById(`input-cart-sidebar${index}`).innerHTML);
                                                                if (val < product.total_allowed_quantity) {
                                                                    document.getElementById(`input-cart-sidebar${index}`).innerHTML = val + 1;
                                                                    addtoCart(product.product_id, product.product_variant_id, document.getElementById(`input-cart-sidebar${index}`).innerHTML)
                                                                }
                                                            }}><BsPlus fill='#fff' /></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='cart-card-end'>
                                                    <div className='d-flex align-items-center' style={{ fontSize: "1.855rem" }}>
                                                        <FaRupeeSign fill='var(--secondary-color)' /> <span id={`price${index}-cart-sidebar`}> {parseFloat(product.price)}</span>
                                                    </div>

                                                    <button type='button' className='remove-product' onClick={() => removefromCart(product.product_id, product.product_variant_id)}>delete</button>

                                                </div>
                                            </div>
                                        ))}


                                    </div>
                                </div>

                                <div className='cart-sidebar-footer'>
                                    <div className='heading'>
                                        <span >order summary</span>
                                    </div>

                                    <div className='summary'>
                                        <div className='d-flex justify-content-between'>
                                            <span>Subtotal</span>
                                            <div className='d-flex align-items-center'>
                                                <FaRupeeSign />
                                                <span>{parseFloat(cart.cart.data.sub_total)}</span>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <span>Delivery Charges</span>
                                            <div className='d-flex align-items-center'>
                                                <FaRupeeSign />
                                                <span>0</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <span>Total</span>
                                        <div className='d-flex align-items-center total-amount'>
                                            <FaRupeeSign fill='var(--secondary-color)' />
                                            <span>{parseFloat(cart.cart.data.sub_total)}</span>
                                        </div>
                                    </div>


                                    <div className='button-container'>
                                        <button type='button' className='view-cart'>view cart</button>
                                        <button type='button' className='checkout'>go to checkout</button>
                                    </div>
                                </div>
                            </>
                        )}
                </>
            )}




        </div>
    )
}

export default CardSidebar
