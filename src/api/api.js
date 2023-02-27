const access_key_param = 'x-access-key';
const access_key = "903361";
const token_prefix = "Bearer "


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

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/settings", requestOptions)
    },
    getCity(city_name, latitude, longitude) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var params = {
            name: city_name,
            latitude: latitude,
            longitude: longitude,
        }
        var url = new URL(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/city");
        for (let k in params) {
            url.searchParams.append(k, params[k])
        };

        return fetch(url, requestOptions)

    },
    getShop(city_id, latitiude, longitude) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        // myHeaders.append("Cookie", "egrocer_session=BTDzyPAhuCjTcpOo4I7qTgW9ZM5PzUtUey4rnmlC");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        var params = { city_id: city_id, latitude: latitiude, longitude: longitude };
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
    getSection(city_id, latitiude, longitude) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var params = { city_id: city_id, latitude: latitiude, longitude: longitude };
        var url = new URL(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/sections");
        for (let k in params) {
            url.searchParams.append(k, params[k])
        };

        return fetch(url, requestOptions)
    },
    getUser(token) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);
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
    editProfile(uname, email, selectedFile, token) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);
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
    },
    getProductbyFilter(city_id, latitude, longitude, filters) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);

        var formdata = new FormData();
        formdata.append("city_id", city_id);
        formdata.append("latitude", latitude);
        formdata.append("longitude", longitude);

        if (filters !== undefined) {
            for (const filter in filters) {
                if (filter !== null || filter !== undefined)
                    formdata.append(filter, filters[filter])
            }
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/products", requestOptions)
    },
    getProductbyId(city_id, latitude, longitude, id) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);

        var formdata = new FormData();
        formdata.append("id", id);
        formdata.append("city_id", city_id);
        formdata.append("latitude", latitude);
        formdata.append("longitude", longitude);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/product_by_id", requestOptions)

    },
    getCart(token, latitude, longitude, checkout = 0) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var params = { latitude: latitude, longitude: longitude, is_checkout: checkout };
        var url = new URL(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/cart");
        for (let k in params) {
            url.searchParams.append(k, params[k])
        };
        return fetch(url, requestOptions)

    },
    addToCart(token, product_id, product_variant_id, qty) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var formdata = new FormData();
        formdata.append("product_id", product_id);
        formdata.append("product_variant_id", product_variant_id);
        formdata.append("qty", qty);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/cart/add", requestOptions)
    },
    removeFromCart(token, product_id, product_variant_id) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var formdata = new FormData();
        formdata.append("product_id", product_id);
        formdata.append("product_variant_id", product_variant_id);
        // formdata.append("is_remove_all", is_all_remove);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/cart/remove", requestOptions)
    },
    getFavorite(token, latitude, longitude) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var params = { latitude: latitude, longitude: longitude };
        var url = new URL(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/favorites");
        for (let k in params) {
            url.searchParams.append(k, params[k])
        };
        return fetch(url, requestOptions)

    },
    addToFavotite(token, product_id) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var formdata = new FormData();
        formdata.append("product_id", product_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/favorites/add", requestOptions)
    },
    removeFromFavorite(token, product_id) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var formdata = new FormData();
        formdata.append("product_id", product_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/favorites/remove", requestOptions)
    },
    getAddress(token) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/address", requestOptions)
    },
    addAddress(token, name, mobile, type, address, landmark, area, pincode, city, state, country, alternate_mobile, latitiude, longitude, is_default) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("mobile", mobile);
        formdata.append("type", type);
        formdata.append("address", address);
        formdata.append("landmark", landmark);
        formdata.append("area", area);
        formdata.append("pincode", pincode);
        formdata.append("city", city);
        formdata.append("state", state);
        formdata.append("country", country);
        formdata.append("alternate_mobile", alternate_mobile);
        formdata.append("latitude", latitiude);
        formdata.append("longitude", longitude);
        formdata.append("is_default", is_default ? 1 : 0);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/address/add", requestOptions)
    },
    deleteAddress(token, address_id) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var formdata = new FormData();
        formdata.append("id", address_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/address/delete", requestOptions)

    },
    updateAddress(token, address_id, name, mobile, type, address, landmark, area, pincode, city, state, country, alternate_mobile, latitiude, longitude, is_default) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var formdata = new FormData();
        formdata.append("id", address_id);
        formdata.append("name", name);
        formdata.append("mobile", mobile);
        formdata.append("type", type);
        formdata.append("address", address);
        formdata.append("landmark", landmark);
        formdata.append("area", area);
        formdata.append("pincode", pincode);
        formdata.append("city", city);
        formdata.append("state", state);
        formdata.append("country", country);
        formdata.append("alternate_mobile", alternate_mobile);
        formdata.append("latitude", latitiude);
        formdata.append("longitude", longitude);
        formdata.append("is_default", is_default ? 1 : 0);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/address/update", requestOptions)
    },
    fetchTimeSlot() {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/settings/time_slots", requestOptions)
    },
    placeOrder(token, product_variant_id, quantity, total, delivery_charge, final_total, payment_method, address_id, delivery_time, status = 2) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var formdata = new FormData();
        formdata.append("product_variant_id", product_variant_id);
        formdata.append("quantity", quantity);
        formdata.append("total", total);
        formdata.append("delivery_charge", delivery_charge);
        formdata.append("final_total", final_total);
        formdata.append("payment_method", payment_method);
        formdata.append("address_id", address_id);
        formdata.append("delivery_time", delivery_time);
        formdata.append("status", status);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/place_order", requestOptions)
    },
    getOrders(token) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/orders", requestOptions)
    },
    getTransactions(token) {
        var myHeaders = new Headers();
        myHeaders.append(access_key_param, access_key);
        myHeaders.append("Authorization", token_prefix + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_URL + process.env.REACT_APP_SUBURL + "/get_user_transactions", requestOptions)
    },
}
export default api;