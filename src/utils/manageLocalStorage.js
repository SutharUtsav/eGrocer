export const getLocation = ()=>{
    if(localStorage.getItem('location')===null){
        return null;
    }
    return JSON.parse(localStorage.getItem('location'));
}


export const setLocation = (location) =>{
    localStorage.setItem('location', JSON.stringify(location))
}
