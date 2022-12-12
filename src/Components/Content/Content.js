import React from 'react';
import { Categories } from '../Categories/Categories';
import { Sliders } from '../Slider/Slider';

export const Content = (props) => {
    // console.log(props.user)
    return (
        <div className="bg-light" style={{paddingBottom:"2pc"}}>
            <Categories />
            <Sliders />
        </div>
    );
};