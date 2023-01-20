import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsPlusCircle, BsGrid, BsListUl } from "react-icons/bs";
import { AiOutlineEye } from 'react-icons/ai'
import { FaRupeeSign } from "react-icons/fa";
import { BsHeart, BsShare } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/api';
import { motion } from 'framer-motion'


const ProductList = () => {


    const navigate = useNavigate();

    let query = new URLSearchParams(useLocation().search)

    const category = useSelector(state => state.category);
    const city = useSelector(state => state.city);


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
        api.getProductbyFilter(city.city.id, city.city.latitude, city.city.longitude)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setproductSizes(result.sizes)
                    setproductresult(result.data)
                }
            })
    }



    const [brands, setbrands] = useState(null)
    const [productresult, setproductresult] = useState(null)
    const [productSizes, setproductSizes] = useState(null)


    useEffect(() => {
        getBrandsApi();
        if (city.city !== null) {

            if (query.get('brand_ids') === null && query.get('category_id') === null) {
                getProductfromApi()
            }
            else if (query.get('category_id') === null) {
                filterProductsFromApi({ brand_ids: query.get('brand_ids') })
            }
            else if (query.get('brand_ids') === null) {
                filterProductsFromApi({ category_id: query.get('category_id') })
            }
            else {
                filterProductsFromApi({
                    category_id: query.get('category_id'),
                    brand_ids: query.get('brand_ids')
                })
            }
        }
    }, [city, query.get('brand_ids'), query.get('category_id')])




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
        return product.variants.map((variant, index) => (
            <option key={index} value={JSON.stringify(variant)} >
                {getProductSizeUnit(variant)} {variant.stock_unit_name} Rs.{variant.price}
            </option>
        ))
    }



    //filters

    const filterProductsFromApi = (filter) => {
        setproductresult(null);

        api.getProductbyFilter(city.city.id, city.city.latitude, city.city.longitude, filter)
            .then(response => response.json())
            .then(result => {
                if(result.status ===1){
                    setproductresult(result.data)
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

        if (query.get('brand_ids') === null) {
            navigate(`?brand_ids=${parseInt(brand.id)}`)
        }
        else {
            const brand_ids = query.get('brand_ids').split(',');

            var int_brand_ids = [];

            brand_ids.forEach(ids => {
                int_brand_ids.push(parseInt(ids))
            });


            if (int_brand_ids.includes(brand.id)) {
                int_brand_ids.splice(int_brand_ids.indexOf(brand.id), 1)
            }
            else {
                int_brand_ids.push(parseInt(brand.id))
            }

            if (int_brand_ids.length > 0) {
                var next_url = '?brand_ids=';

                const sorted_brand_ids = sort_unique_brand_ids(int_brand_ids);

                for (const ids in sorted_brand_ids) {
                    if (parseInt(ids) + 1 === (sorted_brand_ids.length)) {
                        next_url += parseInt(sorted_brand_ids[ids])
                    }
                    else {
                        next_url += parseInt(sorted_brand_ids[ids]) + ','
                    }
                }

                navigate(next_url)
            }
            else {
                navigate('/products')
            }

        }
    }




    //filter by category

    //onLClick event of category
    const filterbyCategory = (category) => {

        var next_url = ""

        //if no query params available
        if (query.toString().length === 0) {
            next_url = `?category_id=${category.id}`;
        }
        else {
            console.log(query.toString())

            //brand ids are already present in url
            if (query.get('brand_ids') !== null) {
                next_url = '?brand_ids=' + query.get('brand_ids') + `&category_id=${category.id}`
            }
            else {
                next_url = `?category_id=${category.id}`
            }
        }

        navigate(next_url)
    }

    return (
        <section id="productlist" className='container' >
            <div className='wrapper'>

                {/* filter section */}
                <div className='d-flex flex-column col col-lg-3 col-md-auto' style={{ gap: "20px" }}>
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
                                        <motion.div whileTap={{ scale: 0.8 }} onClick={() => filterbyCategory(ctg)} className={`d-flex justify-content-between align-items-center filter-bar ${query.get('category_id') !== null ? query.get('category_ids') === ctg.id ? 'active' : null : null}`} key={index}>
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
                                        <motion.div whileTap={{ scale: 0.8 }} onClick={() => filterbyBrands(brand)} className={`d-flex justify-content-between align-items-center filter-bar ${query.get('brand_ids') !== null ? query.get('brand_ids').includes(brand.id) ? 'active' : null : null}`} key={index} >
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
                </div>


                {/* products according to applied filter */}
                <div className='d-flex flex-column w-100 h-100' style={{ gap: "20px" }}>
                    <div className='d-flex flex-row justify-content-between align-items-center filter-view'>
                        <div className='d-flex gap-3'>
                            <div className='icon'>
                                <BsListUl fontSize={"2rem"} />
                            </div>
                            <div className='icon '>
                                <BsGrid fontSize={"2rem"} />
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownPriceFilter1" data-bs-toggle="dropdown" aria-expanded="false">
                                Price(low to high)
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownPriceFilter1">
                                <li className="dropdown-item" >Price(low to high)</li>
                                <li className="dropdown-item" >Price(high to low)</li>
                            </ul>
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
                                        <div className='d-flex flex-wrap h-100' style={{ gap: "8px" }}>
                                            {productresult.map((product, index) => (
                                                <div key={index} className='d-flex border flex-column product-card'>
                                                    <div className='image-container'>
                                                        <Link to='/'><AiOutlineEye /></Link>
                                                        <img src={product.image_url} alt={product.slug} className='card-img-top' />
                                                    </div>
                                                    <div className="card-body product-card-body p-3">
                                                        <span>{product.name}</span>
                                                        <div className='d-flex flex-row justify-content-between'>


                                                            <select id={`selectedVariant${product.id}`} onChange={(e) => {
                                                                document.getElementById(`price${product.id}`).innerHTML = JSON.parse(e.target.value).price;
                                                            }} defaultValue={JSON.stringify(product.variants[0])} >
                                                                {getProductVariants(product)}
                                                            </select>


                                                            <div className='price d-flex flex-row align-items-center'>
                                                                <FaRupeeSign fill='var(--secondary-color)' />
                                                                <span id={`price${product.id}`}>{product.variants[0].price}</span>
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
                                        </div>
                                    )
                                    : ""}
                            </>

                        )}
                </div>
            </div>

        </section>
    )
}

export default ProductList
