import React from 'react'
import Category from '../category/Category'
import Slider from '../sliders/Slider'
import './homecontainer.css'

const HomeContainer = () => {
    return (

        <section id="home" className='container'>
            {/* Slider & Category */}
            <div className='homecontainer p-3 h-100'>
                <Category />
                <Slider />
            </div>
        </section>

    )
}

export default HomeContainer
