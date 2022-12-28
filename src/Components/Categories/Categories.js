import React from 'react';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Shimmer } from 'react-shimmer';
import {  useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export const Categories = (props) => {
    const navigate = useNavigate();
    // const deliveryRef = useRef();
    // const Option = {
    //     items: (window.innerWidth >= 1024) ? 5 : 3,
    //     loop: true,
    //     autoplay: true,
    //     autoplayHoverPause: true,
    //     autoplayTimeout: 2000,
    //     dots: true,
    //     nav: true,
    //     navText: [`<div style=position:absolute;top:30%;font-size:xx-large;right:97%><i class="fa fa-angle-left" aria-hidden="true"></i></div>
    //     `, `<div style=position:absolute;top:30%;font-size:xx-large;left:97%><i class="fa fa-angle-right" aria-hidden="true"></i></div>`]
    // }

    const categories = useSelector((state) => state.shop.categories);

    // const [location, setlocation] = useState({
    //     formatted_address: "",
    //     loaded: false,
    //     coordinates: {
    //         latitude: "",
    //         longitude: "",
    //     }
    // })

    // const getbyCategory = (id) => {
    //     api.getCategory(id).then(response => response.json())
    //         .then(result => {
    //             if (result.status === 1) {
    //                 setcategorybyid(result.data)
    //                 setisloadingCategory(false)
    //             }
    //             else {
    //                 console.log(result.message)
    //             }
    //         })
    //         .catch(error => console.log('error', error));
    // }

    return (


        <section className='category' id="category">
            {categories === undefined ? (
                <div className='d-inline-flex'>
                    <Shimmer width={2200} height={200} />
                    {/* <Shimmer width={248} height={200} />
                    <Shimmer width={248} height={200} />
                    <Shimmer width={248} height={200} /> */}
                </div>
            ) : (
                <>
                    <h1 className='heading'>shop by <span>category</span></h1>

                    <div className='box-container'>
                        {categories.map(ctg => (
                            <div key={ctg.id} className='box'>
                                <div>
                                    <h3>{ctg.name}</h3>
                                    <img src={ctg.image_url} alt='' width={100} height={100}></img>
                                    <button type='button' onClick={() => {
                                        navigate('/cid/' + ctg.id);
                                        // navigate({
                                        //     pathname: "/category",
                                        //     search: createSearchParams({
                                        //         cid: ctg.id
                                        //     }).toString()
                                        // })
                                    }}>shop now</button>
                                </div>
                            </div>
                        ))}
                    </div>

                </>
            )}

            {/* <OwlCarousel {...Option}>
                {categories.map(ctg => (
                    <div key={ctg.id}>
                        <button className='' style={{ height: "9pc", width: "9pc", background: "none" }} onClick={() => {
                            window.alert(ctg.name)
                        }}>
                            <img src={ctg.image_url} className='' alt='' style={{ width: '100%', height: '100%' }} />
                            <p>{ctg.name}</p>
                        </button>
                    </div>
                ))}
            </OwlCarousel> */}
        </section>


    );
};