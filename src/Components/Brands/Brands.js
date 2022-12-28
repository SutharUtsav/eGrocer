import React, { useEffect } from 'react'
import { Shimmer } from 'react-shimmer';
import { useDispatch, useSelector } from 'react-redux';
import { setBrands } from '../../Model/action/brandAction';

const Brands = () => {

    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brands)

    useEffect(() => {
        dispatch(setBrands());
    }, [dispatch])


    return (
        <section className='category' id="brands">
            {Object.keys(brands).length === 0 ? (
                <div className='d-inline-flex'>
                    <Shimmer width={248} height={200} />
                    <Shimmer width={248} height={200} />
                    <Shimmer width={248} height={200} />
                    <Shimmer width={248} height={200} />
                </div>
            ) : (
                <>
                    <h1 className='heading'>top <span>brands</span></h1>

                    <div className='box-container'>
                        {brands.brands.map(brnd => (
                            <div key={brnd.id} className='box'>
                                <div>
                                    <h3>{brnd.name}</h3>
                                    <img src={brnd.image_url} alt='' width={100} height={100}></img>
                                    <button type='button' onClick={() => {
                                        window.alert(brnd.name)
                                    }}>see more</button>
                                </div>
                            </div>
                        ))}
                    </div>

                </>
            )}
        </section>
    )
}

export default Brands
