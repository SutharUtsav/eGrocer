import React from 'react'
import Category from './category/Category'
import Offers from './offer/Offers'
import ProductContainer from './product/ProductContainer'
import Slider from './sliders/Slider'

const MainContainer = () => {
    return (
        <>
            <section id="home" className='container'>
                {/* Slider & Category */}
                <div className='d-flex flex-row gap-4 p-3'>
                    <div className='col w-100 h-auto'>
                        <Category />
                    </div>
                    <div className='col w-100 h-auto'>
                        <Slider />
                    </div>
                </div>

            </section>
            <ProductContainer />
            <Offers/>
        </>
    )
}

export default MainContainer
