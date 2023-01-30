import React from 'react'
import HomeContainer from './homecontainer/HomeContainer'
import Offers from './offer/Offers'
import ProductContainer from './product/ProductContainer'


const MainContainer = () => {
    return (
        <div className='home-page content'>
            <HomeContainer />
            <ProductContainer />
            <Offers />
        </div>
    )
}

export default MainContainer
