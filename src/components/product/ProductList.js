import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsPlusCircle, BsGrid, BsListUl } from "react-icons/bs";
import { AiOutlineEye } from 'react-icons/ai'
import { FaRupeeSign } from "react-icons/fa";
import { BsHeart, BsShare } from "react-icons/bs";
import { Link } from 'react-router-dom'
import api from '../../api/api';
const ProductList = () => {

    const category = useSelector(state => state.category);
    const city = useSelector(state => state.city);

    const getBrandsApi = () => {
        api.getBrands()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setbrands(result.data)
                }
                else {
                    console.log(result.message)
                }
            })
    }

    const getProductfromApi = () => {
        api.getProductbyCategory(city.city.id, city.city.latitude, city.city.longitude)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setproductSizes(result.sizes)
                    setproductresult(result.data)
                }
            })
    }

    useEffect(() => {
        getBrandsApi();
        if (city.city !== null) {
            getProductfromApi()
        }
    }, [city])

    const [brands, setbrands] = useState(null)
    const [productresult, setproductresult] = useState(null)
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
        return product.variants.map((variant, index) => (
            <option key={index} value={JSON.stringify(variant)} >
                {getProductSizeUnit(variant)} {variant.stock_unit_name} Rs.{variant.price}
            </option>
        ))
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
                                        <div className='d-flex justify-content-between' key={index}>
                                            <div className='d-flex gap-3'>
                                                <div className='image-container'>
                                                    <img src={ctg.image_url} alt="category"></img>
                                                </div>
                                                <p>{ctg.name}</p>
                                            </div>
                                            <BsPlusCircle />

                                        </div>
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
                                        <div className='d-flex justify-content-between' key={index}>
                                            <div className='d-flex gap-3'>
                                                <div className='image-container'>
                                                    <img src={brand.image_url} alt="category"></img>
                                                </div>
                                                <p>{brand.name}</p>
                                            </div>
                                            <BsPlusCircle />
                                        </div>
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
                        )}
                </div>
            </div>

        </section>
    )
}

export default ProductList
