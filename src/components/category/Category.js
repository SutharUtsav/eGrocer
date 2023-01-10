import React, { useState, useEffect } from 'react'
import './category.css'
import api from '../../api/api'
import { motion } from 'framer-motion'
import { BsPlusCircle, BsGrid3X3GapFill } from "react-icons/bs";
import { Shimmer } from 'react-shimmer';
import CategoryChild from './CategoryChild';
import { AiOutlineDown } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../model/action-type';

const Category = () => {

    const dispatch = useDispatch();

    //fetch Category
    const fetchCategory = () => {
        api.getCategory()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setcategory(result.data)
                    dispatch({type:ActionTypes.SET_CATEGORY,payload:result.data});
                }
            })
            .catch(error => console.log("error ", error))
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    const [category, setcategory] = useState(null);


    return (
        <>
            {category === null
                ? (
                    <Shimmer height={360} width={400}></Shimmer>
                )
                : (
                    <div className='d-flex flex-column category-wrapper m-2' >
                        <motion.button whileTap={{ scale: 0.9 }} type='button' className='p-3 expand-category'
                            data-bs-toggle="collapse" data-bs-target="#expandCategory" aria-expanded="false" aria-controls="collapseExample"
                        >
                            <BsGrid3X3GapFill fill='white' fontSize={"3rem"} className='mx-2' />
                            <p>browse all categories</p>
                        </motion.button>



                        <motion.div className='collapse categoties' id="expandCategory" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {
                                category.map((ctg, index) => (
                                    <div key={index} className='category-container'>
                                        {ctg.has_child
                                            ? (
                                                <div className='w-100'>
                                                    <motion.button type='button' className='p-3 border-bottom' data-bs-toggle="collapse" data-bs-target={"#categoryOptions-ctg-" + ctg.id} aria-expanded="false" aria-controls="collapseExample" >
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <img src={ctg.image_url} alt={ctg.subtitle} className='mx-3' />
                                                                {ctg.name}
                                                            </div>
                                                            <AiOutlineDown fontSize={"2rem"}/>
                                                        </div>


                                                    </motion.button>

                                                    <CategoryChild ctg_id={ctg.id} id={"categoryOptions-ctg-" + ctg.id} />
                                                </div>

                                            )
                                            : (
                                                <motion.button type='button' className='p-3 border-bottom'>
                                                    <img src={ctg.image_url} alt={ctg.subtitle} className='mx-3' />
                                                    {ctg.name}
                                                </motion.button>
                                            )}

                                    </div>

                                ))
                            }

                            <motion.button whileTap={{ scale: 0.9 }} type='button' className='p-3 show-more-button '>
                                <BsPlusCircle fill='white' fontSize={"2.4rem"} /> show more
                            </motion.button>
                        </motion.div>

                    </div>
                )}
        </>
    )
}

export default Category
