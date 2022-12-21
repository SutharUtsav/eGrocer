import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import GeoLocation from '../GeoLocation/GeoLocation'
import { Shimmer } from 'react-shimmer';

const Navbar = (props) => {
    const deliveryRef = useRef();

    const shop = useSelector((state) => state.shop.shop)
    return (
        <>
            {shop === undefined ? (
                <div className='d-inline-flex'>
                    <Shimmer width={1499} height={30} />
                </div>
            ) : (
                <div className="container-fluid bg-warning">
                    <div className="d-flex justify-content-evenly">
                        <div className='dropdown'>
                            <button className="btn btn-warning dropdown-toggle border-0 rounded-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ref={deliveryRef} style={{ maxWidth: "300px", overflowX: "clip" }} >
                                <i className="fa fa-map-marker" aria-hidden="true"></i> Deliver to {props.location.formatted_address}
                            </button>
                            <GeoLocation labelby="dropdownMenuButton" setlocation={props.setlocation} location={props.location} deliveryRef={deliveryRef} />
                        </div>

                        <ul>
                            {
                                Object.keys(shop).map((key, index) => (
                                    <li key={index} >
                                        <a href={"#" + key}></a>
                                        <button className="btn btn-outline-dark border-0 rounded-0" type="button" >
                                            {key}
                                        </button>

                                    </li>))

                            }
                        </ul>

                    </div>
                </div>
            )}

        </>

    )
}

export default Navbar
