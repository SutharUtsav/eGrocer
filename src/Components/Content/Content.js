import React, { useEffect } from 'react';
import { Categories } from '../Categories/Categories';
import { Sliders } from '../Slider/Slider';
// import api from '../../api';
import { Offers } from '../Offers/Offer';
import Brands from '../Brands/Brands';
import Section from '../Section/Section';
import { useDispatch } from 'react-redux';
import { fetchShop } from '../../Model/action/shopAction';
import Navbar from './Navbar';

export const Content = (props) => {
    // const [slider, setslider] = useState([])
    // const [offers, setoffers] = useState([])
    // const [category, setcategory] = useState([])
    // const [section, setsection] = useState([])
    // const [loading, setloading] = useState(true)

    // const shop = useSelector((state) => state.shop)
    const dispatch = useDispatch();

    const city_id = 20;

    // const fetchShop = async () => {
    //     const response = await api.getShop(city_id)
    //     const result = response.json()
    //         .catch(error => console.log('error', error));

    //     dispatch(fetchShop(result.data));
    //     setslider(result.data.sliders)
    //     setoffers(result.data.offers)
    //     setcategory(result.data.category)
    //     setsection(result.data.sections)
    //     setloading(false)

    // }

    useEffect(() => {
        dispatch(fetchShop(city_id));
    })

    return (
        <div style={{ paddingBottom: "2pc", minHeight: "87.1vh" }}>
            {/* <Categories category={category} setcategory={setcategory} loading={loading} category_nav={true} location={props.location} setlocation={props.setlocation} />
            <Sliders slider={slider} setslider={setslider} loading={loading} />
            <Offers offers={offers} setoffers={setoffers} loading={loading} />
            <Categories category={category} setcategory={setcategory} loading={loading} category_nav={false} />
            <Brands />
            <Section section={section} setsection={setsection} loading={loading} /> */}
           
            <Categories category_nav={true} location={props.location} setlocation={props.setlocation} />
            {/* <Navbar location={props.location} setlocation={props.setlocation}/> */}
            <Sliders />
            <Offers />
            <Categories category_nav={false} />
            <Brands />
            <Section />

        </div>
    );
};