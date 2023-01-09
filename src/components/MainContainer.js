import React from 'react'
import HomeContainer from './homecontainer/HomeContainer'
import Offers from './offer/Offers'
import ProductContainer from './product/ProductContainer'


const MainContainer = () => {
    return (
        <>
            <HomeContainer />
            <ProductContainer />
            <Offers />
        </>
    )
}

export default MainContainer
