import React, { useEffect, useState } from 'react'
import './product.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsHeart, BsShare, BsPlus } from "react-icons/bs";
import { BiMinus } from 'react-icons/bi'
import { toast } from 'react-toastify'
import api from '../../api/api';
import Cookies from 'universal-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../model/action-type';

const QuickViewModal = (props) => {

    const cookies = new Cookies()
    const dispatch = useDispatch()

    const city = useSelector(state => state.city);
    const sizes = useSelector(state => state.productSizes);


    useEffect(() => {
        return () => {
            props.setselectedProduct({})
            setproductcategory({})
            setproductbrand({})
            setproduct({})
        };
    }, [])


    const fetchProduct = async (product_id) => {
        await api.getProductbyId(city.city.id, city.city.latitude, city.city.longitude, product_id)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setproduct(result.data)
                    setmainimage(result.data.image_url)
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {

        if (Object.keys(props.selectedProduct).length > 0 && city.city !== null) {
            fetchProduct(props.selectedProduct.id);

            getCategoryDetails()
            getBrandDetails()
        }
    }, [props.selectedProduct, city])

    useEffect(() => {
        if (sizes.sizes === null || sizes.status === 'loading') {
            if (city.city !== null) {
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
    }, [city, sizes])

    const [mainimage, setmainimage] = useState("")
    const [productcategory, setproductcategory] = useState({})
    const [productbrand, setproductbrand] = useState({})
    const [product, setproduct] = useState({})
    const [productSizes, setproductSizes] = useState(null)


    //for product variants dropdown in product card
    const getProductSizeUnit = (variant) => {
        return productSizes.map(psize => {
            if (parseInt(psize.size) === parseInt(variant.measurement) && psize.short_code === variant.stock_unit_name) {
                return psize.unit_id;
            }
        });

    }


    const getProductVariants = (product) => {
        return product.variants.map((variant, ind) => (
            <option key={ind} value={JSON.stringify(variant)} >
                {getProductSizeUnit(variant)} {variant.stock_unit_name} Rs.{variant.price}
            </option>
        ))
    }


    const getCategoryDetails = () => {
        api.getCategory()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    result.data.forEach(ctg => {
                        if (ctg.id === props.selectedProduct.category_id) {
                            setproductcategory(ctg);
                        }
                    });
                }
            })
            .catch((error) => console.log(error))
    }

    const getBrandDetails = () => {
        api.getBrands()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    result.data.forEach(brnd => {
                        if (brnd.id === props.selectedProduct.brand_id) {
                            setproductbrand(brnd);
                        }
                    });
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

    return (
        <div className='product-details-view'>
            <div className="modal fade" id="quickviewModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="loginLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ borderRadius: "10px", minWidth: "80vw" }}>

                        <div className="d-flex flex-row justify-content-end header">
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                props.setselectedProduct({})
                                setproductcategory({})
                                setproductbrand({})
                                setproduct({})
                            }}><AiOutlineCloseCircle /></button>
                        </div>

                        <div className="modal-body">
                            {Object.keys(product).length === 0 || productSizes===null
                                ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )
                                : (

                                    <div className='body-wrapper'>
                                        <div className='image-wrapper'>
                                            <div className='main-image'>
                                                <img src={mainimage} alt='main-product' />
                                            </div>

                                            <div className='sub-images-container'>
                                                <div className={`sub-image ${mainimage === product.image_url ? 'active' : ''}`}>
                                                    <img src={product.image_url} alt="product" onClick={() => {
                                                        setmainimage(product.image_url)
                                                    }} />
                                                </div>
                                                {product.images.map((image, index) => (
                                                    <div key={index} className={`sub-image ${mainimage === image ? 'active' : ''}`}>
                                                        <img src={image} alt="product" onClick={() => {
                                                            setmainimage(image)
                                                        }} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='detail-wrapper'>
                                            <div className='top-section'>
                                                <h5>{product.name}</h5>
                                                <div className='d-flex flex-row gap-2 align-items-center my-1'>
                                                    <span className='price green-text' id={`price-quickview`}>{parseFloat(product.variants[0].price)} </span>


                                                </div>
                                                <div className='product-overview my-1'>
                                                    <div className='product-seller'>
                                                        <span className=''>Sold By:</span>
                                                        <span className='green-text'>{product.seller_name} </span>
                                                    </div>

                                                    {product.tags !== "" ? (

                                                        <div className='product-tags'>
                                                            <span className=''>Product Tags:</span>
                                                            <span className='green-text'>{product.tags} </span>
                                                        </div>
                                                    ) : ""}


                                                    {Object.keys(productcategory).length === 0
                                                        ? ""
                                                        : (
                                                            <div className='product-category'>
                                                                <span className=''>Category:</span>
                                                                <span className='green-text'>
                                                                    {productcategory.name}
                                                                </span>
                                                            </div>
                                                        )}



                                                    {Object.keys(productbrand).length === 0
                                                        ? null
                                                        : (
                                                            <div className='product-brand'>
                                                                <span className=''>Brand:</span>
                                                                <span className='green-text'>
                                                                    {productbrand.name}
                                                                </span>
                                                            </div>
                                                        )}

                                                </div>
                                            </div>

                                            <div className='key-feature'>
                                                <p>Key Features</p>
                                            </div>

                                            <div className='bottom-section'>
                                                <p>Product Variants</p>

                                                <div className='d-flex gap-3'>
                                                    <select id={`select-product-variant-quickview`} onChange={(e) => {
                                                        document.getElementById(`price-quickview`).innerHTML = parseFloat(JSON.parse(e.target.value).price);

                                                        if (document.getElementById(`input-cart-quickview`).classList.contains('active')) {
                                                            document.getElementById(`input-cart-quickview`).classList.remove('active')
                                                            document.getElementById(`Add-to-cart-quickview`).classList.add('active')

                                                        }


                                                    }} defaultValue={JSON.stringify(product.variants[0])} >
                                                        {getProductVariants(product)}
                                                    </select>

                                                    <button type='button' id={`Add-to-cart-quickview`} className='add-to-cart active'
                                                        onClick={() => {
                                                            if (cookies.get('jwt_token') !== undefined) {
                                                                document.getElementById(`Add-to-cart-quickview`).classList.remove('active')
                                                                document.getElementById(`input-cart-quickview`).classList.add('active')
                                                                document.getElementById(`input-quickview`).innerHTML = 1
                                                                addtoCart(product.id, JSON.parse(document.getElementById(`select-product-variant-quickview`).value).id, document.getElementById(`input-quickview`).innerHTML)
                                                            }
                                                            else {
                                                                toast.error("OOps! You need to login first to access the cart!")
                                                            }
                                                        }}>Add to Cart</button>

                                                    <div id={`input-cart-quickview`} className="input-to-cart">
                                                        <button type='button' onClick={() => {

                                                            var val = parseInt(document.getElementById(`input-quickview`).innerHTML);
                                                            if (val === 1) {
                                                                document.getElementById(`input-quickview`).innerHTML = 0;
                                                                document.getElementById(`input-cart-quickview`).classList.remove('active')
                                                                document.getElementById(`Add-to-cart-quickview`).classList.add('active')
                                                                removefromCart(product.id, JSON.parse(document.getElementById(`select-product-variant-quickview`).value).id)
                                                            }
                                                            else {
                                                                document.getElementById(`input-quickview`).innerHTML = val - 1;
                                                                addtoCart(product.id, JSON.parse(document.getElementById(`select-product-variant-quickview`).value).id, document.getElementById(`input-quickview`).innerHTML)
                                                            }

                                                        }}><BiMinus fill='#fff' /></button>
                                                        <span id={`input-quickview`} ></span>
                                                        <button type='button' onClick={() => {
                                                            var val = document.getElementById(`input-quickview`).innerHTML;
                                                            if (val < product.total_allowed_quantity) {
                                                                document.getElementById(`input-quickview`).innerHTML = parseInt(val) + 1;
                                                                addtoCart(product.id, JSON.parse(document.getElementById(`select-product-variant-quickview`).value).id, document.getElementById(`input-quickview`).innerHTML)
                                                            }
                                                        }}><BsPlus fill='#fff' /> </button>


                                                    </div>

                                                    <button type='button' className='wishlist-product' onClick={() => addToFavorite(product.id)}><BsHeart /></button>
                                                    <button type='button' className='share-product' ><BsShare /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickViewModal
