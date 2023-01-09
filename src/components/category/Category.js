import React, { useState, useEffect } from 'react'
import './category.css'
import api from '../../api/api'
import { motion } from 'framer-motion'
import { BsPlusCircle, BsGrid3X3GapFill } from "react-icons/bs";
import { Shimmer } from 'react-shimmer';
import category3 from '../../utils/categories/category3.jpg'
import category4 from '../../utils/categories/category4.jpg'
import category5 from '../../utils/categories/category5.jpg'

const Category = () => {

    //fetch Category
    const fetchCategory = () => {
        api.getCategory()
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setcategory(result.data)
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
                            onClick={() => {
                                document.getElementsByClassName('categoties')[0].classList.toggle('active')
                                if (document.getElementsByClassName('categoties')[0].classList.contains('active')) {

                                    document.getElementsByClassName('show-more-button')[0].classList.add('active')
                                }
                                else{
                                    document.getElementsByClassName('show-more-button')[0].classList.remove('active')
                                }
                            }}
                            >
                            <BsGrid3X3GapFill fill='white' fontSize={"3rem"} className='mx-2' />
                            <p>browse all categories</p>
                        </motion.button>



                        <motion.div className='categoties' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {
                                category.map((ctg, index) => (
                                    <div key={index} className='category-container'>
                                        {ctg.has_child
                                            ? (
                                                <div> 
                                                    <motion.button type='button' className='p-3 border-bottom'>
                                                        <img src={ctg.image_url} alt={ctg.subtitle} className='mx-3' />
                                                        {ctg.name}
                                                    </motion.button>
                                                    <div >
                                                        <button type='button' >xyz</button>
                                                        <button type='button' >abc</button>
                                                    </div>
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
                            <div className='category-container'>
                                <motion.button type='button' className='p-3 border-bottom' >
                                    <img src={category3} alt="dry fruit" className='mx-3' />
                                    dry fruit
                                </motion.button>
                            </div>
                            <div className='category-container'>
                                <motion.button type='button' className='p-3 border-bottom' >
                                    <img src={category4} alt="eggs" className='mx-3' />
                                    eggs
                                </motion.button>
                            </div>
                            <div className='category-container'>

                                <motion.button type='button' className='p-3 border-bottom'>
                                    <img src={category5} alt="meat" className='mx-3' />
                                    meat
                                </motion.button>
                            </div>
                        </motion.div>
                        
                        
                        <motion.button whileTap={{ scale: 0.9 }} type='button' className='p-3 show-more-button'>
                            <BsPlusCircle fill='white' fontSize={"2.4rem"} /> show more
                        </motion.button>

                    </div>
                )}
        </>
    )
}

export default Category
