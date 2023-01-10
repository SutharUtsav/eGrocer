export const getLocation = ()=>{
    if(localStorage.getItem('location')===null){
        return null;
    }
    return JSON.parse(localStorage.getItem('location'));
}


export const setLocation = (location) =>{
    localStorage.setItem('location', JSON.stringify(location))
}

export const setToken = (token) =>{
    localStorage.setItem('token',token);
}

export const getToken = () =>{
    return localStorage.getItem('token');
}