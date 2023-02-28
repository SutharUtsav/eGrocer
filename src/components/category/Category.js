import React, { useState, useEffect } from 'react'
import './category.css'
import api from '../../api/api'
import { motion } from 'framer-motion'
import { BsPlusCircle, BsGrid3X3GapFill } from "react-icons/bs";
import CategoryChild from './CategoryChild';
import { AiOutlineDown } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../model/action-type';
import { Link, useNavigate } from 'react-router-dom';


const Category = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const shop = useSelector(state=>state.shop);

    const selectCategory = (category) => {
        dispatch({type:ActionTypes.SET_FILTER_CATEGORY,payload:category.id})
        navigate('/products')
      }

    return (
        <>
            {shop.shop === null
                ? (
                    <></>
                    // <Shimmer height={360} width={400}></Shimmer>
                )
                : (
                    <>
                        <motion.button whileTap={{ scale: 0.9 }} type='button' className='expand-category'
                            data-bs-toggle="collapse" data-bs-target="#expandCategory" aria-expanded="false" aria-controls="collapseExample"
                        >
                            <div>
                                <BsGrid3X3GapFill fill='white' fontSize={"3rem"} />
                            </div>
                            <span>browse all categories</span>
                        </motion.button>



                        <div className='collapse show categoties' id="expandCategory">
                            {
                                shop.shop.category.map((ctg, index) => (
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
                                                <motion.button type='button' className='p-3 border-bottom' onClick={()=>selectCategory(ctg)}>
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
                                <div>
                                    <BsPlusCircle fill='white' fontSize={"2.4rem"} />
                                </div>
                                <span>show more</span>
                            </Link>
                        </div>


                    </>
                )}
        </>
    )
}

export default Category
