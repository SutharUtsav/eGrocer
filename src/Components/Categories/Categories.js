import React, { useState, useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Shimmer } from 'react-shimmer';
// import { useNavigate } from "react-router-dom";
import api from '../../api';
import GeoLocation from '../GeoLocation/GeoLocation';
import { Spinner } from 'react-bootstrap';

export const Categories = (props) => {
    // const navigate = useNavigate();
    const deliveryRef = useRef();
    const Option = {
        items: (window.innerWidth >= 1024) ? 5 : 3,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 2000,
        dots: true,
        nav: true,
        navText: [`<div style=position:absolute;top:30%;font-size:xx-large;right:97%><i class="fa fa-angle-left" aria-hidden="true"></i></div>
        `, `<div style=position:absolute;top:30%;font-size:xx-large;left:97%><i class="fa fa-angle-right" aria-hidden="true"></i></div>`]
    }


    const [categorybyid, setcategorybyid] = useState([])
    const [isloadingCategory, setisloadingCategory] = useState(true)
    // const [location, setlocation] = useState({
    //     formatted_address: "",
    //     loaded: false,
    //     coordinates: {
    //         latitude: "",
    //         longitude: "",
    //     }
    // })

    const getbyCategory = (id) => {
        api.getCategory(id).then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setcategorybyid(result.data)
                    setisloadingCategory(false)
                }
                else {
                    console.log(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            {/*Category Navbar on Top*/}
            {props.category_nav ?
                (<>
                    {props.loading ? (
                        <div className='d-inline-flex'>
                            <Shimmer width={200} height={50} />
                            <Shimmer width={200} height={50} />
                            <Shimmer width={200} height={50} />
                            <Shimmer width={200} height={50} />
                            <Shimmer width={200} height={50} />
                            <Shimmer width={200} height={50} />
                            <Shimmer width={200} height={50} />

                        </div>
                    ) : (
                        <div className="container-fluid bg-light">
                            <div className="d-flex justify-content-evenly m-3">
                                <div className='dropdown'>
                                    <button className="btn btn-outline-dark dropdown-toggle border-0 rounded-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ref={deliveryRef} style={{ maxWidth: "300px", overflowX: "clip" }} >
                                        <i className="fa fa-map-marker" aria-hidden="true"></i> Deliver to {props.location.formatted_address}
                                    </button>
                                    <GeoLocation labelby="dropdownMenuButton" setlocation={props.setlocation} location={props.location} deliveryRef={deliveryRef}/>
                                </div>
                                {props.category.map(ctg => (
                                    <div key={ctg.id}>
                                        {ctg.has_child ? (
                                            <div className='dropdown'>
                                                <button className="btn btn-outline-dark dropdown-toggle border-0 rounded-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { getbyCategory(ctg.id) }}>
                                                    {ctg.name}
                                                </button>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    {isloadingCategory ? (
                                                    <div className='text-center'>
                                                        <Spinner />
                                                    </div>) : (
                                                        <>{
                                                            categorybyid.map(ctg_by_id => (
                                                                <span key={ctg_by_id.id} className="dropdown-item" >{ctg_by_id.name}</span>
                                                            ))
                                                        }</>
                                                    )}
                                                </div>

                                            </div>
                                        ) : (
                                            <button className='btn btn-outline-dark border-0 rounded-0' >{ctg.name}</button>
                                        )}

                                    </div>
                                ))}

                            </div>
                        </div>)}
                </>) : (
                    <div className='p-3'>
                        <div className='container'>
                            <h2>Categories</h2>
                        </div>

                        {props.loading ? (
                            <div className='d-inline-flex'>
                                <Shimmer width={248} height={200} />
                                <Shimmer width={248} height={200} />
                                <Shimmer width={248} height={200} />
                                <Shimmer width={248} height={200} />

                            </div>
                        ) : (
                            <OwlCarousel {...Option}>
                                {props.category.map(ctg => (
                                    <div key={ctg.id}>
                                        <button className='me-3 p-2 border-0 ' style={{ height: "9pc", width: "9pc", background: "none" }} onClick={() => {
                                            window.alert(ctg.name)
                                        }}>
                                            <img src={ctg.image_url} className='img-thumbnail d-block' alt='' style={{ width: '100%', height: '100%' }} />
                                            <p>{ctg.name}</p>
                                        </button>
                                    </div>
                                ))}
                            </OwlCarousel>
                        )}
                    </div>
                )}
        </>
    );
};