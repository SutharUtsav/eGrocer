const access_key_param = 'x-access-key';
const access_key = "903361";
const token_prefix = "Bearer "


const default_City = "Bhuj"
const default_latitude = 23.239616593244413
const default_longitude = 69.66953795403242

const api = {

    login(num, OTP, countrycode) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        // myHeaders.append("Authorization", token_prefix + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGM3ZGQ5NTVmNjhlZTA0Nzg0YmViNjNhZDc5MjY5NWU3ZTFhMzVkNDhjODllMGZkMjM0OGI2YzY2NTA1NmFhNWEwZDU5MTExMmZiZjRkNzIiLCJpYXQiOjE2NzAyMjM1NjUuMzA2NTQyLCJuYmYiOjE2NzAyMjM1NjUuMzA2NTQ2LCJleHAiOjE3MDE3NTk1NjUuMzAzMDU3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.LZNn6N4E07ZQbmqDQ33pmK01jS09APpgAPYOArXkSk8zqSFzF258RthHs0VN3UWpK5J2di9-4RKREKDLcbQ7a4_T_ayrXPit-cH6uBQPEYqPqBL9b2W49ZSWbJjhoZdh2oZlUDJiIlu4kjxKJoZef7gtZKne7twoY0Um7rzl1bvFPoUn8Yq2ev_Jhnp0JkwRF3Bq1RMbimwIHKxyMFUsp0Gyvx3bnUbJTCYwhX7xZvfrPHuh0ZVTZiEbprDx8pUg0H-_smmmzbb1IW-aVt7ZOCMllb3mDJEkX0O_IpJ_FAam8e8eACbVIAVVfyrUjZCvBnTI9SIxVacoTR5i2fKb-60EN85hEtW_rKfCYfK31sH-wL-Xas3ML6x5ei9GQVr8agsPBngMV32M1P1LIOw0xIb0dVaZHHckCjHZcEKAb_8-qYHWVjJhlxnnjo61OknDbVmo8m5IA_mNerQsO5jr3L92XQOl4PdChtdLhl0mSMak19TBXPhveX2OxUxL1FgAfaJ2IpkG9EW3JVwwiU_c9MilyJc54Nhu2dMD0RdIVVPTDgNu-e1CZF9NYsvCLlkCqQTQdFOYLaWOrbeFFJkf2Tme8a3ujklURdGafRa4HSbPdviXe2VwdfDavThj_EsSSgs8TgW1zw2cQeKb0i6nWTDIMq0avTei29R1XVKmFWg");
        // myHeaders.append("Cookie", "egrocer_session=m9jPWurA0M2mY06MAM2cdJcij9vbGEpYsvxR2Jz6");

        var formdata = new FormData();
        formdata.append("mobile", num);
        formdata.append("auth_uid", OTP);
        formdata.append("fcm_token", "murarisingh");
        formdata.append("country_code", countrycode);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/login", requestOptions)
    },

    logout() {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + localStorage.getItem('access_token'));
        // myHeaders.append("Cookie", "egrocer_session=OqYqjWnvp7vS6R80R2Kv9UdF2uG8kB6wii1myWmu");

        var formdata = new FormData();
        formdata.append("fcm_token", "sdasdasd");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/logout", requestOptions)
    },
    getSettings() {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL+"/settings", requestOptions)
    },
    getCity(city_name = default_City, latitude = default_latitude, longitude = default_longitude) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var params = {
            name:city_name,
            latitude:latitude,
            longitude:longitude,
        }
        var url = new URL(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/city");
        for (let k in params) {
            url.searchParams.append(k, params[k])
        };

        return fetch(url, requestOptions)

    },
    getShop(city_id) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        // myHeaders.append("Cookie", "egrocer_session=BTDzyPAhuCjTcpOo4I7qTgW9ZM5PzUtUey4rnmlC");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        var params = { city_id: city_id, latitude: '23.2419997', longitude: '69.6669324' };
        var url = new URL(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/shop");
        for (let k in params) {
            url.searchParams.append(k, params[k])
        };
        return fetch(url, requestOptions)
    },
    getBrands() {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        // myHeaders.append("Cookie", "egrocer_session=e0DnVi9p5AhGSWDtiOqPIGqIX85hg2BhsnTK7ICf");

        // var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/brands", requestOptions)

    },
    getCategory(id = 0) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        // myHeaders.append("Cookie", "egrocer_session=t6OYQynGEbA5Yq8lDU3QJdkcoOFLTKaX1UcPTRCN");

        // var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // body: formdata,
            redirect: 'follow'
        };
        var params = { category_id: id };
        var url = new URL(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/categories");
        for (let k in params) {
            url.searchParams.append(k, params[k])
        };
        return fetch(url, requestOptions)
    },
    getSlider() {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        // myHeaders.append("Cookie", "egrocer_session=GvRG0oXt9MI5fZds6A8PqCjO4ki9YK1Y7HhsNYpZ");

        //var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            //body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/sliders", requestOptions)
    },
    getOffer() {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        // myHeaders.append("Cookie", "egrocer_session=VWx2trOpEJrXgOcGu1TF0SyN4lfQVRdieHDj5HND");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/offers", requestOptions)
    },
    getCartContent() {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + localStorage.getItem('access_token'));
        // myHeaders.append("Cookie", "egrocer_session=foCThxobkUYocTq5V3QrKtK4JDu4En7D4Ph3mgkY");

        // var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            //body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/cart", requestOptions)
    },
    getUser() {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + localStorage.getItem('access_token'));
        // myHeaders.append("Cookie", "egrocer_session=ZGyZlEheLKDTFHnAsVnSpethgG5vROAwF2PeSUBz");

        //var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            //body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/user_details", requestOptions)
    },
    editProfile(uname, email, selectedFile) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + localStorage.getItem('access_token'));
        // myHeaders.append("Cookie", "egrocer_session=ZGyZlEheLKDTFHnAsVnSpethgG5vROAwF2PeSUBz");

        var formdata = new FormData();
        formdata.append("name", uname);
        formdata.append("email", email);
        if (selectedFile !== null) {
            formdata.append("profile", selectedFile);
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/edit_profile", requestOptions)
    }
}
export default api;