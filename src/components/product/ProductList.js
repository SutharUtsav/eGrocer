import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsPlusCircle, BsGrid, BsListUl } from "react-icons/bs";
import { AiOutlineEye, AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRupeeSign } from "react-icons/fa";
import { BsHeart, BsShare, BsPlus } from "react-icons/bs";
import { BiMinus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api';
import { motion } from 'framer-motion'
import { ActionTypes } from '../../model/action-type';
import ReactSlider from 'react-slider';
import logoPath from '../../utils/logo_egrocer.svg'
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'


const ProductList = () => {


    const total_products_per_page = 10;

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cookies = new Cookies() 

    // const navigate = useNavigate();
    // let query = new URLSearchParams(useLocation().search)

    const category = useSelector(state => state.category);
    const city = useSelector(state => state.city);
    const filter = useSelector(state => state.productFilter);


    const [brands, setbrands] = useState(null)
    const [productresult, setproductresult] = useState(null)
    const [productSizes, setproductSizes] = useState(null)
    const [minmaxTotalPrice, setminmaxTotalPrice] = useState({
        total_min_price: null,
        total_max_price: null,
        min_price: null,
        max_price: null,
    })
    const [offset, setoffset] = useState(0)
    const [totalProducts, settotalProducts] = useState(0)
    const [currPage, setcurrPage] = useState(1)
    const [pagination, setpagination] = useState(null)
    // const [minPrice, setminPrice] = useState(null)
    // const [maxPrice, setmaxPrice] = useState(null)


    const getBrandsApi = () => {
        api.getBrands()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {

                    result.data.forEach(brand => {

                        api.getProductbyFilter(city.city.id, city.city.latitude, city.city.longitude, { brand_ids: brand.id })
                            .then(resp => resp.json())
                            .then(res => {
                                if (res.status === 1) {
                                    setBrandproductcountmap(new Map(brandproductcountmap.set(`brand${brand.id}`, res.total)))
                                }
                                else {
                                    console.log(res.message)
                                }

                            })
                            .catch(error => console.log("error ", error))
                    });
                    setbrands(result.data)
                }
                else {
                    console.log(result.message)
                }
            })
            .catch(error => console.log("error ", error))
    }

    const getProductfromApi = () => {
        setproductresult(null)
        api.getProductbyFilter(city.city.id, city.city.latitude, city.city.longitude, {
            sort: filter.sort_filter,
            limit: total_products_per_page,
            offset: offset,
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setminmaxTotalPrice({
                        total_min_price: result.total_min_price,
                        total_max_price: result.total_max_price,
                        min_price: result.min_price,
                        max_price: result.max_price,
                    })
                    setproductSizes(result.sizes)
                    setproductresult(result.data)
                    settotalProducts(result.total)
                }
                else {
                    setproductresult([]);
                }
            })
    }

    useEffect(() => {
        if (city.city !== null) {
            getBrandsApi();

            if (filter.category_id === null && filter.brand_ids.length === 0 && filter.price_filter === null) {
                getProductfromApi()
            }
            else if (filter.brand_ids.length !== 0 && filter.category_id !== null && filter.price_filter !== null) {
                filterProductsFromApi({
                    category_id: filter.category_id,
                    brand_ids: filter.brand_ids.toString(),
                    min_price: filter.price_filter.min_price,
                    max_price: filter.price_filter.max_price,
                    sort: filter.sort_filter,
                    limit: total_products_per_page,
                    offset: offset,
                })
            }
            else if (filter.brand_ids.length !== 0) {
                filterProductsFromApi({
                    brand_ids: filter.brand_ids.toString(),
                    sort: filter.sort_filter,
                    limit: total_products_per_page,
                    offset: offset,
                })
            }
            else if (filter.category_id !== null) {
                filterProductsFromApi({
                    category_id: filter.category_id,
                    sort: filter.sort_filter,
                    limit: total_products_per_page,
                    offset: offset,
                })
            }
            else {
                filterProductsFromApi({
                    min_price: filter.price_filter.min_price,
                    max_price: filter.price_filter.max_price,
                    sort: filter.sort_filter,
                    limit: total_products_per_page,
                    offset: offset,
                })
            }
        }
    }, [city, filter, offset])


    useEffect(() => {
        return () => {
            dispatch({ type: ActionTypes.SET_FILTER_CATEGORY, payload: null })
            dispatch({ type: ActionTypes.SET_FILTER_BRANDS, payload: [] })
            dispatch({ type: ActionTypes.SET_FILTER_VIEW, payload: true })
            dispatch({ type: ActionTypes.SET_FILTER_MIN_MAX_PRICE, payload: null })
            dispatch({ type: ActionTypes.SET_FILTER_SORT, payload: 'new' })
        }
    }, [])


    //brands and their product count map
    const [brandproductcountmap, setBrandproductcountmap] = useState(new Map())



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



    //filters
    const filterProductsFromApi = async (filter) => {
        setproductresult(null);
        await api.getProductbyFilter(city.city.id, city.city.latitude, city.city.longitude, filter)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    console.log(result.total_min_price)
                    console.log(result.total_max_price)
                    setminmaxTotalPrice({
                        total_min_price: result.total_min_price,
                        total_max_price: result.total_max_price,
                        min_price: result.min_price,
                        max_price: result.max_price,
                    })
                    const filtered_data = result.data;
                    setproductresult(filtered_data)
                    setproductSizes(result.sizes)
                    settotalProducts(result.total)
                }
                else {
                    setproductresult([]);
                }
            })
            .catch(error => console.log("error ", error))
    }

    //filter by brands
    const sort_unique_brand_ids = (int_brand_ids) => {
        if (int_brand_ids.length === 0) return int_brand_ids;
        int_brand_ids = int_brand_ids.sort(function (a, b) { return a * 1 - b * 1; });
        var ret = [int_brand_ids[0]];
        for (var i = 1; i < int_brand_ids.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
            if (int_brand_ids[i - 1] !== int_brand_ids[i]) {
                ret.push(int_brand_ids[i]);
            }
        }
        return ret;
    }

    //onClick event of brands
    const filterbyBrands = (brand) => {

        var brand_ids = [...filter.brand_ids];

        if (brand_ids.includes(brand.id)) {
            brand_ids.splice(brand_ids.indexOf(brand.id), 1)
        }
        else {
            brand_ids.push(parseInt(brand.id));
        }

        const sorted_brand_ids = sort_unique_brand_ids(brand_ids);

        dispatch({ type: ActionTypes.SET_FILTER_BRANDS, payload: sorted_brand_ids })

        // if (filter.brand_ids === null) {
        //     navigate(`?brand_ids=${parseInt(brand.id)}`)
        // }
        // else {
        //     const brand_ids = query.get('brand_ids').split(',');

        //     var int_brand_ids = [];

        //     brand_ids.forEach(ids => {
        //         int_brand_ids.push(parseInt(ids))
        //     });


        //     if (int_brand_ids.includes(brand.id)) {
        //         int_brand_ids.splice(int_brand_ids.indexOf(brand.id), 1)
        //     }
        //     else {
        //         int_brand_ids.push(parseInt(brand.id))
        //     }

        //     if (int_brand_ids.length > 0) {
        //         var next_url = '?brand_ids=';

        //         const sorted_brand_ids = sort_unique_brand_ids(int_brand_ids);

        //         for (const ids in sorted_brand_ids) {
        //             if (parseInt(ids) + 1 === (sorted_brand_ids.length)) {
        //                 next_url += parseInt(sorted_brand_ids[ids])
        //             }
        //             else {
        //                 next_url += parseInt(sorted_brand_ids[ids]) + ','
        //             }
        //         }

        //         navigate(next_url)
        //     }
        //     else {
        //         navigate('/products')
        //     }

        // }
    }


    //filter by category

    //onLClick event of category
    const filterbyCategory = (category) => {

        if (filter.category_id === category.id) {
            dispatch({ type: ActionTypes.SET_FILTER_CATEGORY, payload: null })
        }
        else {
            dispatch({ type: ActionTypes.SET_FILTER_CATEGORY, payload: category.id })
        }
    }


    const Filter = () => {
        return (
            <>
                {/* filter section */}

                <div className='filter-wrapper'>
                    <h5>Product category</h5>
                    {category.status === 'loading'
                        ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                        : (
                            <>
                                {category.category.map((ctg, index) => (
                                    <motion.div whileTap={{ scale: 0.8 }} onClick={() => filterbyCategory(ctg)} className={`d-flex justify-content-between align-items-center filter-bar ${filter.category_id !== null ? filter.category_id === ctg.id ? 'active' : null : null}`} key={index}>
                                        <div className='d-flex gap-3'>
                                            <div className='image-container'>
                                                <img src={ctg.image_url} alt="category"></img>
                                            </div>
                                            <p>{ctg.name}</p>
                                        </div>

                                        <BsPlusCircle />
                                    </motion.div>
                                ))}
                            </>
                        )}
                </div>

                <div className='filter-wrapper'>
                    <h5>Filter by price</h5>

                    {minmaxTotalPrice.total_min_price === null || minmaxTotalPrice.total_max_price === null || minmaxTotalPrice.min_price === null || minmaxTotalPrice.max_price === null
                        ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>)
                        : (
                            <>
                                <ReactSlider
                                    className="slider"
                                    thumbClassName="thumb"
                                    trackClassName="track"
                                    min={minmaxTotalPrice.total_min_price}
                                    max={minmaxTotalPrice.total_max_price}
                                    defaultValue={[0, 10000]}
                                    ariaLabel={['Lower thumb', 'Upper thumb']}
                                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                    pearling={true}
                                    withTracks={true}
                                    minDistance={100}
                                    onAfterChange={([min, max]) => {
                                        // console.log(min, max)
                                        dispatch({ type: ActionTypes.SET_FILTER_MIN_MAX_PRICE, payload: { min_price: min, max_price: max } })
                                    }}
                                />
                            </>
                        )}

                </div>

                <div className='filter-wrapper'>
                    <h5>Brands</h5>
                    {brands === null
                        ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                        : (
                            <>
                                {brands.map((brand, index) => (
                                    <motion.div whileTap={{ scale: 0.8 }} onClick={() => filterbyBrands(brand)} className={`d-flex justify-content-between align-items-center filter-bar ${filter.brand_ids !== [] ? filter.brand_ids.includes(brand.id) ? 'active' : null : null}`} key={index} >
                                        <div className='d-flex gap-3 align-items-baseline'>
                                            <div className='image-container'>
                                                <img src={brand.image_url} alt="category"></img>
                                            </div>
                                            <p>{brand.name}</p>
                                        </div>
                                        <div className='d-flex align-items-baseline justify-content-center brand-count'>
                                            <p className='m-auto'>{brandproductcountmap.get(`brand${brand.id}`) !== undefined
                                                ? brandproductcountmap.get(`brand${brand.id}`)
                                                : 0}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </>
                        )}

                </div>

            </>
        )
    }



    //page change
    const handlePageChange = (pageNum) => {
        setcurrPage(pageNum);
        setoffset(pageNum * total_products_per_page - total_products_per_page)
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
        <>
            <section id="productlist" className='container' >
                <div className='wrapper'>

                    <div className="hide-desktop offcanvas offcanvas-start" tabIndex="-1" id="filteroffcanvasExample" aria-labelledby="filteroffcanvasExampleLabel" data-bs-backdrop="false">
                        <div className="canvas-header">
                            <div className='site-brand'>
                                <img src={logoPath} height="50px" alt="logo"></img>
                            </div>

                            <button type="button" className="close-canvas" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => {
                                document.getElementsByClassName('filter')[0].classList.remove('active')

                            }}><AiOutlineCloseCircle /></button>
                        </div>
                        {Filter()}
                    </div>


                    {/* filter section */}
                    <div className='flex-column col col-lg-3 col-md-auto filter-container hide-mobile-screen' style={{ gap: "20px" }}>
                        {Filter()}
                    </div>

                    {/* products according to applied filter */}
                    <div className='d-flex flex-column w-100 h-100' style={{ gap: "20px" }}>
                        <div className='d-flex flex-row justify-content-between align-items-center filter-view'>
                            <div className='d-flex gap-3'>
                                <div className={`icon ${!filter.grid_view ? 'active' : null}`} onClick={() => {
                                    dispatch({ type: ActionTypes.SET_FILTER_VIEW, payload: false });
                                }}>
                                    <BsListUl fontSize={"2rem"} />
                                </div>
                                <div className={`icon ${filter.grid_view ? 'active' : null}`} onClick={() => {
                                    dispatch({ type: ActionTypes.SET_FILTER_VIEW, payload: true });
                                }}>
                                    <BsGrid fontSize={"2rem"} />
                                </div>
                            </div>

                            <div className="select">
                                <select className="form-select" aria-label="Default select example" onChange={(e) => {

                                    dispatch({ type: ActionTypes.SET_FILTER_SORT, payload: e.target.value })
                                }}>
                                    <option value="new">New Products</option>
                                    <option value="old">Old Products</option>
                                    <option value="high">High to Low Price</option>
                                    <option value="low">Low to High Price</option>
                                    <option value="discount">Discounted Products</option>
                                    <option value="popular">Popular Products</option>
                                </select>
                                {/* <button className="btn dropdown-toggle" type="button" id="dropdownPriceFilter1" data-bs-toggle="dropdown" aria-expanded="false">
                     Price(low to high)
                 </button>

                 
                 <ul className="dropdown-menu" aria-labelledby="dropdownPriceFilter1">
                     <li className="dropdown-item" >Price(low to high)</li>
                     <li className="dropdown-item" >Price(high to low)</li>
                 </ul> */}
                            </div>
                        </div>



                        {productresult === null
                            ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                            : (
                                <>
                                    {productresult.length > 0
                                        ? (
                                            <div className='d-flex flex-wrap justify-content-center h-100'>

                                                {productresult.map((product, index) => (
                                                    <div key={index} className={`border product-card ${!filter.grid_view ? 'list-view' : ''}`}>
                                                        <div className='image-container' onClick={() => {
                                                            dispatch({ type: ActionTypes.SET_SELECTED_PRODUCT, payload: product.id });
                                                            navigate('/product')
                                                        }}>
                                                            <Link to='/'><AiOutlineEye /></Link>
                                                            <img src={product.image_url} alt={product.slug} className='card-img-top' />
                                                        </div>

                                                        <div className='d-flex flex-column'>
                                                            <div className="card-body product-card-body p-3">
                                                                <span>{product.name}</span>
                                                                <div className='d-flex flex-row justify-content-between'>


                                                                    <select id={`selectedVariant${index}-productlist`} onChange={(e) => {
                                                                        document.getElementById(`price${index}-productlist`).innerHTML = parseFloat(JSON.parse(e.target.value).price);

                                                                        if(document.getElementById(`input-cart-productlist${index}`).classList.contains('active')){
                                                                            document.getElementById(`input-cart-productlist${index}`).classList.remove('active')
                                                                            document.getElementById(`Add-to-cart-productlist${index}`).classList.add('active')
                                                                        }

                                                                    }} defaultValue={JSON.stringify(product.variants[0])} >
                                                                        {getProductVariants(product)}
                                                                    </select>


                                                                    <div className='price d-flex flex-row align-items-center'>
                                                                        <FaRupeeSign fill='var(--secondary-color)' />
                                                                        <span id={`price${index}-productlist`}>{parseFloat(product.variants[0].price)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='d-flex flex-row border-top product-card-footer'>
                                                                <div className='border-end'>
                                                                    <button type="button" className='w-100 h-100' onClick={()=>addToFavorite(product.id)}><BsHeart /></button>
                                                                </div>
                                                                <div className='border-end' style={{ flexGrow: "1" }}>
                                                                    <button type="button" id={`Add-to-cart-productlist${index}`} className='w-100 h-100 add-to-cart active' style={{ fontSize: "1.6rem" }}
                                                                        onClick={() => {
                                                                            if (cookies.get('jwt_token') !== undefined) {
                                                                                document.getElementById(`Add-to-cart-productlist${index}`).classList.remove('active')
                                                                                document.getElementById(`input-cart-productlist${index}`).classList.add('active')
                                                                                document.getElementById(`input-productlist${index}`).innerHTML = 1
                                                                                addtoCart(product.id,JSON.parse(document.getElementById(`selectedVariant${index}-productlist`).value).id, document.getElementById(`input-productlist${index}`).innerHTML)
                                                                            }
                                                                            else {
                                                                                toast.error("OOps! You need to login first to access the cart!")
                                                                            }
                                                                        }}>add to cart
                                                                    </button>


                                                                    <div id={`input-cart-productlist${index}`} className="w-100 h-100 input-to-cart">
                                                                        <button type='button' onClick={() => {

                                                                            var val = parseInt(document.getElementById(`input-productlist${index}`).innerHTML);
                                                                            if (val === 1) {
                                                                                document.getElementById(`input-productlist${index}`).innerHTML = 0;
                                                                                document.getElementById(`input-cart-productlist${index}`).classList.remove('active')
                                                                                document.getElementById(`Add-to-cart-productlist${index}`).classList.add('active')
                                                                                removefromCart(product.id, JSON.parse(document.getElementById(`selectedVariant${index}-productlist`).value).id)
                                                                            }
                                                                            else{
                                                                                document.getElementById(`input-productlist${index}`).innerHTML = val - 1;
                                                                                addtoCart(product.id,JSON.parse(document.getElementById(`selectedVariant${index}-productlist`).value).id, document.getElementById(`input-productlist${index}`).innerHTML)
                                                                        
                                                                            }

                                                                        }}><BiMinus /></button>
                                                                        <span id={`input-productlist${index}`} ></span>
                                                                        <button type='button' onClick={() => {

                                                                            var val = document.getElementById(`input-productlist${index}`).innerHTML;
                                                                            if (val < product.total_allowed_quantity) {
                                                                                document.getElementById(`input-productlist${index}`).innerHTML = parseInt(val) + 1;
                                                                                addtoCart(product.id, JSON.parse(document.getElementById(`selectedVariant${index}-productlist`).value).id, document.getElementById(`input-productlist${index}`).innerHTML)
                                                                            }
                                                                        }}><BsPlus /> </button>


                                                                    </div>
                                                                </div>
                                                                <div className=''>
                                                                    <button type="button" className='w-100 h-100'><BsShare /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}


                                            </div>
                                        )
                                        : <h3>No Products Found</h3>}

                                    <div>
                                        <Pagination
                                            activePage={currPage}
                                            itemsCountPerPage={total_products_per_page}
                                            totalItemsCount={totalProducts}
                                            pageRangeDisplayed={5}
                                            onChange={handlePageChange.bind(this)}
                                        />
                                    </div>

                                </>

                            )}
                    </div>


                </div>

            </section >
        </>

    )
}

export default ProductList
