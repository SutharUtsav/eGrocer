import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api/api'
import { ActionTypes } from '../model/action-type'
import HomeContainer from './homecontainer/HomeContainer'
import ProductContainer from './product/ProductContainer'


const MainContainer = () => {

    const dispatch = useDispatch()

    const city = useSelector(state => (state.city))
    const shop = useSelector(state => (state.shop))
    
    const fetchShop = (city_id,latitude,longitude)=>{
        api.getShop(city_id,latitude,longitude)
        .then(response=>response.json())
        .then(result=>{
            if(result.status === 1){
                dispatch({type:ActionTypes.SET_SHOP,payload:result.data})
            }
        })

    }
    useEffect(() => {
        if(city.city !== null && shop.shop===null){
            fetchShop(city.city.id,city.city.latitude, city.city.longitude);
        }
    }, [city])

    return (
        <div className='home-page mx-140 content'>
            <HomeContainer />
            <ProductContainer />
        </div>
    )
}

export default MainContainer
