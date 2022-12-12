import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export const Sliders = (props) => {

    const [slider, setslider] = useState([]);
    const [offer, setoffer] = useState([]);

    const getSlider = () => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-key", "903361");
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGM3ZGQ5NTVmNjhlZTA0Nzg0YmViNjNhZDc5MjY5NWU3ZTFhMzVkNDhjODllMGZkMjM0OGI2YzY2NTA1NmFhNWEwZDU5MTExMmZiZjRkNzIiLCJpYXQiOjE2NzAyMjM1NjUuMzA2NTQyLCJuYmYiOjE2NzAyMjM1NjUuMzA2NTQ2LCJleHAiOjE3MDE3NTk1NjUuMzAzMDU3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.LZNn6N4E07ZQbmqDQ33pmK01jS09APpgAPYOArXkSk8zqSFzF258RthHs0VN3UWpK5J2di9-4RKREKDLcbQ7a4_T_ayrXPit-cH6uBQPEYqPqBL9b2W49ZSWbJjhoZdh2oZlUDJiIlu4kjxKJoZef7gtZKne7twoY0Um7rzl1bvFPoUn8Yq2ev_Jhnp0JkwRF3Bq1RMbimwIHKxyMFUsp0Gyvx3bnUbJTCYwhX7xZvfrPHuh0ZVTZiEbprDx8pUg0H-_smmmzbb1IW-aVt7ZOCMllb3mDJEkX0O_IpJ_FAam8e8eACbVIAVVfyrUjZCvBnTI9SIxVacoTR5i2fKb-60EN85hEtW_rKfCYfK31sH-wL-Xas3ML6x5ei9GQVr8agsPBngMV32M1P1LIOw0xIb0dVaZHHckCjHZcEKAb_8-qYHWVjJhlxnnjo61OknDbVmo8m5IA_mNerQsO5jr3L92XQOl4PdChtdLhl0mSMak19TBXPhveX2OxUxL1FgAfaJ2IpkG9EW3JVwwiU_c9MilyJc54Nhu2dMD0RdIVVPTDgNu-e1CZF9NYsvCLlkCqQTQdFOYLaWOrbeFFJkf2Tme8a3ujklURdGafRa4HSbPdviXe2VwdfDavThj_EsSSgs8TgW1zw2cQeKb0i6nWTDIMq0avTei29R1XVKmFWg");
        myHeaders.append("Cookie", "egrocer_session=GvRG0oXt9MI5fZds6A8PqCjO4ki9YK1Y7HhsNYpZ");

        //var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            //body: formdata,
            redirect: 'follow'
        };

        fetch("http://egrocer.netsofters.net/customer/sliders", requestOptions)
            .then(response => response.json())
            .then(result => {
                setslider(result.data);
            }
            )
            .catch(error => console.log('error', error));
    }

    const getOffers = () => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-key", "903361");
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGM3ZGQ5NTVmNjhlZTA0Nzg0YmViNjNhZDc5MjY5NWU3ZTFhMzVkNDhjODllMGZkMjM0OGI2YzY2NTA1NmFhNWEwZDU5MTExMmZiZjRkNzIiLCJpYXQiOjE2NzAyMjM1NjUuMzA2NTQyLCJuYmYiOjE2NzAyMjM1NjUuMzA2NTQ2LCJleHAiOjE3MDE3NTk1NjUuMzAzMDU3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.LZNn6N4E07ZQbmqDQ33pmK01jS09APpgAPYOArXkSk8zqSFzF258RthHs0VN3UWpK5J2di9-4RKREKDLcbQ7a4_T_ayrXPit-cH6uBQPEYqPqBL9b2W49ZSWbJjhoZdh2oZlUDJiIlu4kjxKJoZef7gtZKne7twoY0Um7rzl1bvFPoUn8Yq2ev_Jhnp0JkwRF3Bq1RMbimwIHKxyMFUsp0Gyvx3bnUbJTCYwhX7xZvfrPHuh0ZVTZiEbprDx8pUg0H-_smmmzbb1IW-aVt7ZOCMllb3mDJEkX0O_IpJ_FAam8e8eACbVIAVVfyrUjZCvBnTI9SIxVacoTR5i2fKb-60EN85hEtW_rKfCYfK31sH-wL-Xas3ML6x5ei9GQVr8agsPBngMV32M1P1LIOw0xIb0dVaZHHckCjHZcEKAb_8-qYHWVjJhlxnnjo61OknDbVmo8m5IA_mNerQsO5jr3L92XQOl4PdChtdLhl0mSMak19TBXPhveX2OxUxL1FgAfaJ2IpkG9EW3JVwwiU_c9MilyJc54Nhu2dMD0RdIVVPTDgNu-e1CZF9NYsvCLlkCqQTQdFOYLaWOrbeFFJkf2Tme8a3ujklURdGafRa4HSbPdviXe2VwdfDavThj_EsSSgs8TgW1zw2cQeKb0i6nWTDIMq0avTei29R1XVKmFWg");
        myHeaders.append("Cookie", "egrocer_session=VWx2trOpEJrXgOcGu1TF0SyN4lfQVRdieHDj5HND");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://egrocer.netsofters.net/customer/offers", requestOptions)
            .then(response => response.json())
            .then(result => setoffer(result.data))
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getOffers();
        getSlider();
    }, [])

    return (
        <div className='container '>
            <div className='p-2 d-flex' >
                <div className='mx-1 p-3' style={{backgroundColor:"midnightblue",display:"table"}}>
                    <p className='font-weight-bold' style={{color:"white",marginTop:"5pc", fontFamily:"cursive", display:"table-cell",verticalAlign:"middle"}} >TOP OFFERS</p>
                </div>
                <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                    {offer.map((ofr, index) => (
                        <div key={index} style={{ justifyContent: "center" }}>
                            <img src={ofr.image_url} alt='' />
                        </div>
                    ))
                    }
                </Carousel>
            </div>
            <Carousel className='p-2' autoPlay={true} infiniteLoop={true} showThumbs={false}>
                {slider.map((sld, index) => (
                    <div key={index}>
                        <img src={sld.image_url} alt={sld.type} />
                    </div>
                ))}

            </Carousel>

        </div>

    );
};