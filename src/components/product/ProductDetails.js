import React, { useEffect, useState } from 'react'
import './product.css'
// import { FaRupeeSign } from "react-icons/fa";
import { BsHeart, BsShare, BsPlus } from "react-icons/bs";
import { BiMinus } from 'react-icons/bi'
import { toast } from 'react-toastify'
import api from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../model/action-type';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

const ProductDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookies = new Cookies() 



    const product = useSelector(state => state.selectedProduct);
    const city = useSelector(state => state.city);


    useEffect(() => {
        return () => {
            dispatch({ type: ActionTypes.CLEAR_SELECTED_PRODUCT, payload: null })
            setproductcategory({})
            setproductbrand({})
        };
    }, [])


    const [mainimage, setmainimage] = useState("")
    const [images, setimages] = useState([])
    const [productdata, setproductdata] = useState({})
    const [productSize, setproductSize] = useState({})
    const [productcategory, setproductcategory] = useState({})
    const [productbrand, setproductbrand] = useState({})


    const getCategoryDetails = (id) => {
        api.getCategory()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    result.data.forEach(ctg => {
                        if (ctg.id === id) {
                            setproductcategory(ctg);
                        }
                    });
                }
            })
            .catch((error) => console.log(error))
    }

    const getBrandDetails = (id) => {
        api.getBrands()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    result.data.forEach(brnd => {
                        if (brnd.id === id) {
                            setproductbrand(brnd);
                        }
                    });
                }
            })
            .catch((error) => console.log(error))
    }

    const getProductDatafromApi = () => {
        api.getProductbyFilter(city.city.id, city.city.latitude, city.city.longitude)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setproductSize(result.sizes)
                }
            })
            .catch(error => console.log(error))
        api.getProductbyId(city.city.id, city.city.latitude, city.city.longitude, product.selectedProduct_id)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setproductdata(result.data);
                    setmainimage(result.data.image_url)
                    setimages(result.data.images)
                    getCategoryDetails(result.data.category_id)
                    getBrandDetails(result.data.brand_id)
                }
            })
            .catch(error => console.log(error))


    }



    useEffect(() => {
        if (city.city !== null) {
            if (product.selectedProduct_id !== null && product.status !== "loading") {
                getProductDatafromApi()
            }
            else {

                navigate("/")
            }
        }
    }, [city, product])


    //for product variants
    const getProductSizeUnit = (variant) => {
        if (Object.keys(productSize).length > 0) {
            return productSize.map(psize => {
                if (parseInt(psize.size) === parseInt(variant.measurement) && psize.short_code === variant.stock_unit_name) {
                    return psize.unit_id;
                }
            });
        }
        return <></>


    }


    const getProductVariants = (product) => {
        return product.variants.map((variant, index) => (
            <option key={index} value={JSON.stringify(variant)} >
                {getProductSizeUnit(variant)} {variant.stock_unit_name} Rs.{variant.price}
            </option>
        ))
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

            <div className='d-flex flex-column container' style={{ gap: "20px" }}>
                <div className='top-wrapper'>

                    {product.selectedProduct_id === null || Object.keys(productdata).length === 0 ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )
                        : (

                            <div className='body-wrapper'>
                                <div className='image-wrapper' style={{ flexDirection: "row-reverse", gap: "20px", flexGrow: "0.5" }}>
                                    <div className='main-image'>
                                        <img src={mainimage} alt='main-product'></img>
                                    </div>

                                    <div className='sub-images-container' style={{ flexDirection: "column" }}>
                                        <div className={`sub-image ${mainimage === productdata.image_url ? 'active' : ''}`}>
                                            <img src={productdata.image_url} alt="product" onClick={() => {
                                                setmainimage(productdata.image_url)
                                            }}></img>
                                        </div>
                                        {images.length > 0 ? (
                                            <>
                                                {images.map((image, index) => (
                                                    <div key={index} className={`sub-image ${mainimage === image ? 'active' : ''}`}>
                                                        <img src={image} alt="product" onClick={() => {
                                                            setmainimage(image)
                                                        }}></img>
                                                    </div>
                                                ))}
                                            </>
                                        ) : null}

                                    </div>
                                </div>

                                <div className='detail-wrapper'>
                                    <div className='top-section'>
                                        <h5>{productdata.name}</h5>
                                        <div className='d-flex flex-row gap-2 align-items-center my-1'>
                                            <span className='price green-text' id={`price-productdetail`}>{parseFloat(productdata.variants[0].price)} </span>


                                            {/* <span className='not-price gray-text'><FaRupeeSign fill='var(--sub-text-color)' textDecoration='line-through' />{productdata.variants[0].price} </span> */}
                                        </div>
                                        <div className='product-overview my-1'>
                                            <div className='product-seller'>
                                                <span className=''>Sold By:</span>
                                                <span className='green-text'>{productdata.seller_name} </span>
                                            </div>

                                            {/* {productdata.tags !== "" ? (

                                            <div className='product-tags'>
                                                <span className=''>Product Tags:</span>
                                                <span className='green-text'>{productdata.tags} </span>
                                            </div>
                                        ) : ""} */}


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
                                            <select id={`select-product-variant-productdetail`} onChange={(e) => {
                                                document.getElementById(`price-productdetail`).innerHTML = parseFloat(JSON.parse(e.target.value).price);

                                                if (document.getElementById(`input-cart-productdetail`).classList.contains('active')) {
                                                    document.getElementById(`input-cart-productdetail`).classList.remove('active')
                                                    document.getElementById(`Add-to-cart-productdetail`).classList.add('active')

                                                }

                                            }} defaultValue={JSON.stringify(productdata.variants[0])} >
                                                {getProductVariants(productdata)}
                                            </select>

                                            <button type='button' id={`Add-to-cart-productdetail`} className='add-to-cart active'
                                                onClick={() => {
                                                    if (cookies.get('jwt_token') !== undefined) {
                                                        document.getElementById(`Add-to-cart-productdetail`).classList.remove('active')
                                                        document.getElementById(`input-cart-productdetail`).classList.add('active')
                                                        document.getElementById(`input-productdetail`).innerHTML = 1
                                                        addtoCart(productdata.id, JSON.parse(document.getElementById(`select-product-variant-productdetail`).value).id, document.getElementById(`input-productdetail`).innerHTML)
                                                            
                                                    }
                                                    else {
                                                        toast.error("OOps! You need to login first to access the cart!")
                                                    }
                                                }}>Add to Cart</button>

                                            <div id={`input-cart-productdetail`} className="input-to-cart">
                                                <button type='button' onClick={() => {

                                                    var val = parseInt(document.getElementById(`input-productdetail`).innerHTML);
                                                    if (val === 1) {
                                                        document.getElementById(`input-productdetail`).innerHTML = 0;
                                                        document.getElementById(`input-cart-productdetail`).classList.remove('active')
                                                        document.getElementById(`Add-to-cart-productdetail`).classList.add('active')
                                                        removefromCart(productdata.id,JSON.parse(document.getElementById(`select-product-variant-productdetail`).value).id)
                                                    }
                                                    else{
                                                        document.getElementById(`input-productdetail`).innerHTML = val - 1;
                                                        addtoCart(productdata.id, JSON.parse(document.getElementById(`select-product-variant-productdetail`).value).id, document.getElementById(`input-productdetail`).innerHTML)
                                                        
                                                    }

                                                }}><BiMinus fill='#fff' /></button>
                                                <span id={`input-productdetail`} ></span>
                                                <button type='button' onClick={() => {

                                                    var val = document.getElementById(`input-productdetail`).innerHTML;
                                                    if(val < productdata.total_allowed_quantity){
                                                        document.getElementById(`input-productdetail`).innerHTML = parseInt(val) + 1;
                                                        addtoCart(productdata.id, JSON.parse(document.getElementById(`select-product-variant-productdetail`).value).id, document.getElementById(`input-productdetail`).innerHTML)
                                                    }
                                                }}><BsPlus fill='#fff' /> </button>


                                            </div>


                                            <button type='button' className='wishlist-product' onClick={()=>addToFavorite(productdata.id)}><BsHeart /></button>
                                            <button type='button' className='share-product' ><BsShare /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                </div>

                <div className='description-wrapper'>
                    <h5 className='title'>Product Description</h5>

                    <div className='description' dangerouslySetInnerHTML={{ __html: productdata.description }}>
                    </div>
                </div>

                <div className='related-product-wrapper'>
                    <h5>related product</h5>
                    <div className='related-product-container'>
                        related product
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
