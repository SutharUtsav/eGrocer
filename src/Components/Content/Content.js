import React, { useEffect, useState } from 'react';
import { Categories } from '../Categories/Categories';
import { Sliders } from '../Slider/Slider';
import api from '../../api';
import { Offers } from '../Offers/Offer';
import Brands from '../Brands/Brands';
import Section from '../Section/Section';

export const Content = (props) => {
    const [slider, setslider] = useState([])
    const [offers, setoffers] = useState([])
    const [category, setcategory] = useState([])
    const [section, setsection] = useState([])
    const [loading, setloading] = useState(true)

    const city_id = 20;
    useEffect(() => {
        api.getShop(city_id).then(response => response.json())
            .then(result => {
                setslider(result.data.sliders)
                setoffers(result.data.offers)
                setcategory(result.data.category)
                setsection(result.data.sections)
                setloading(false)
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <div style={{ paddingBottom: "2pc", minHeight: "87.1vh" }}>
            <Categories category={category} setcategory={setcategory} loading={loading} category_nav={true} google_place_api_key={props.google_place_api_key}/>
            <Sliders slider={slider} setslider={setslider} loading={loading} />
            <Offers offers={offers} setoffers={setoffers} loading={loading} />
            <Categories category={category} setcategory={setcategory} loading={loading}  category_nav={false}/>
            <Brands />
            <Section section={section} setsection={setsection} loading={loading}/>
        </div>
    );
};