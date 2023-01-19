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
import { Link } from 'react-router-dom';

// import category3 from '../../utils/categories/category3.jpg'
// import category4 from '../../utils/categories/category4.jpg'
// import category5 from '../../utils/categories/category5.jpg'

const Category = () => {

    const dispatch = useDispatch();

    //fetch Category
    const fetchCategory = () => {
        api.getCategory()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setcategory(result.data)
                    dispatch({ type: ActionTypes.SET_CATEGORY, payload: result.data });
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
                    <div className='d-flex flex-column category-wrapper border' >
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
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <img src={ctg.image_url} alt={ctg.subtitle} className='mx-3' />
                                                                {ctg.name}
                                                            </div>
                                                            <div>
                                                                <AiOutlineDown fontSize={"2rem"} />
                                                            </div>
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

                            {/* <div className='category-container'>

                                <div className='w-100 dropend'>
                                    <motion.button type='button' className='p-3 border-bottom dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <img src={category3} alt="" className='mx-3' />
                                                Dry fruit
                                            </div>
                                            <AiOutlineDown fontSize={"2rem"} />
                                        </div>
                                    </motion.button>

                                    <ul className='dropdown-menu'>
                                        <li><p className="dropdown-item" >Action</p></li>
                                        <li><p className="dropdown-item" >Another action</p></li>
                                        <li><p className="dropdown-item" >Something else here</p></li>
                                    </ul>
                                    
                                </div>
                            </div>
                            <div className='category-container'>

                                <motion.button type='button' className='p-3 border-bottom'>
                                    <img src={category4} alt="" className='mx-3' />
                                    eggs
                                </motion.button>
                            </div>
                            <div className='category-container'>

                                <motion.button type='button' className='p-3 border-bottom'>
                                    <img src={category5} alt="" className='mx-3' />
                                    meat
                                </motion.button>
                            </div> */}


                            <Link to='/categories' className='p-3' id="show-more-button">
                                <BsPlusCircle fill='white' fontSize={"2.4rem"} /> show more
                            </Link>
                        </motion.div>

                    </div>
                )}
        </>
    )
}

export default Category
