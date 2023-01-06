import React, { useState, useEffect } from 'react'
import './category.css'
import api from '../../api/api'
import { motion } from 'framer-motion'
import { BsPlusCircle,BsGrid3X3GapFill } from "react-icons/bs";
import { Shimmer } from 'react-shimmer';

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
    const [isExpandCategory, setisExpandCategory] = useState(true)
    return (
        <>
            {category === null
                ? (
                    <Shimmer height={360} width={400}></Shimmer>
                )
                : (
                    <div className='d-flex flex-column category-wrapper m-2' >
                        <motion.button whileTap={{ scale: 0.9 }} type='button' className='p-3 expand-category' onClick={() => { setisExpandCategory(!isExpandCategory) }}>
                            <BsGrid3X3GapFill fill='white' fontSize={"3rem"} className='mx-2' />
                            browse all categories
                        </motion.button>
                        {isExpandCategory
                            ? (
                                <motion.div className='d-flex flex-column categoties' initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "100%" }}>
                                    {
                                        category.map((ctg, index) => (
                                            <motion.button type='button' className='p-3 border-bottom' key={index}>
                                                <img src={ctg.image_url} alt={ctg.subtitle} className='mx-3' />
                                                {ctg.name}
                                            </motion.button>
                                        ))
                                    }
                                    <motion.button whileTap={{ scale: 0.9 }} type='button' className='p-3 show-more-button'>
                                        <BsPlusCircle fill='white' fontSize={"2.4rem"} /> show more
                                    </motion.button>
                                </motion.div>
                            )
                            : ""}
                    </div>
                )}
        </>
    )
}

export default Category
