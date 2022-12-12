import React, { useEffect, useState } from 'react';


export const Categories = (props) => {
    const [categories, setcategories] = useState([])

    const getCategory = () => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-key", "903361");
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGM3ZGQ5NTVmNjhlZTA0Nzg0YmViNjNhZDc5MjY5NWU3ZTFhMzVkNDhjODllMGZkMjM0OGI2YzY2NTA1NmFhNWEwZDU5MTExMmZiZjRkNzIiLCJpYXQiOjE2NzAyMjM1NjUuMzA2NTQyLCJuYmYiOjE2NzAyMjM1NjUuMzA2NTQ2LCJleHAiOjE3MDE3NTk1NjUuMzAzMDU3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.LZNn6N4E07ZQbmqDQ33pmK01jS09APpgAPYOArXkSk8zqSFzF258RthHs0VN3UWpK5J2di9-4RKREKDLcbQ7a4_T_ayrXPit-cH6uBQPEYqPqBL9b2W49ZSWbJjhoZdh2oZlUDJiIlu4kjxKJoZef7gtZKne7twoY0Um7rzl1bvFPoUn8Yq2ev_Jhnp0JkwRF3Bq1RMbimwIHKxyMFUsp0Gyvx3bnUbJTCYwhX7xZvfrPHuh0ZVTZiEbprDx8pUg0H-_smmmzbb1IW-aVt7ZOCMllb3mDJEkX0O_IpJ_FAam8e8eACbVIAVVfyrUjZCvBnTI9SIxVacoTR5i2fKb-60EN85hEtW_rKfCYfK31sH-wL-Xas3ML6x5ei9GQVr8agsPBngMV32M1P1LIOw0xIb0dVaZHHckCjHZcEKAb_8-qYHWVjJhlxnnjo61OknDbVmo8m5IA_mNerQsO5jr3L92XQOl4PdChtdLhl0mSMak19TBXPhveX2OxUxL1FgAfaJ2IpkG9EW3JVwwiU_c9MilyJc54Nhu2dMD0RdIVVPTDgNu-e1CZF9NYsvCLlkCqQTQdFOYLaWOrbeFFJkf2Tme8a3ujklURdGafRa4HSbPdviXe2VwdfDavThj_EsSSgs8TgW1zw2cQeKb0i6nWTDIMq0avTei29R1XVKmFWg");
        myHeaders.append("Cookie", "egrocer_session=VWx2trOpEJrXgOcGu1TF0SyN4lfQVRdieHDj5HND");

        // var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            //body: formdata,
            redirect: 'follow'
        };

        fetch("http://egrocer.netsofters.net/customer/categories", requestOptions)
            .then(response => response.json())
            .then(result => setcategories(result.data))
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getCategory();
    }, [])

    return (
        <div className='d-inline-flex m-5'>
            {categories.map(ctg => (
                <button key={ctg.id} className='me-3 p-2 border-0 '  style={{ height: "9pc", width: "9pc", background:"none" }} onClick={()=>{
                    window.alert(ctg.name)
                }}>
                    <img src={ctg.image_url} className='img-thumbnail d-block' alt='' style={{ width: '100%', height: '100%' }} />
                    <p>{ctg.name}</p>
                </button>
            ))}
        </div>
    );
};