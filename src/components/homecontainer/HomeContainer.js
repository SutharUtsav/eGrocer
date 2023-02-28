import React from 'react'
import Category from '../category/Category'
import Slider from '../sliders/Slider'
import './homecontainer.css'

const HomeContainer = () => {
    return (

        // elementor-section-height-min-height elementor-section-items-stretch elementor-section-boxed elementor-section-height-default
        <section id="home" className='home-section home-element section'>
            {/* Slider & Category */}
            <div className='home-container container-fluid'>
                <div className='category-wrapper hide-mobile dropdown'>
                    <Category />
                </div>
                <Slider />
            </div>
        </section>

    )
}

export default HomeContainer
