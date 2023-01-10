import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import { motion } from 'framer-motion'

const CategoryChild = (props) => {

    const fetchCategory = (id) => {
        api.getCategory(id)
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setcategory(result.data)
                }
            })
            .catch(error => console.log("error ", error))
    }

    useEffect(() => {
        fetchCategory(props.ctg_id);
    }, [])

    const [category, setcategory] = useState(null)

    return (
        <div id={props.id} className='collapse'>
            {/* <button type='button'>xyz</button>
            <button type='button'>abc</button> */}
            {category === null
                ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
                : (
                    <>
                        {category.map((ctg, index) => (

                            <motion.button type='button' className='p-3 border-bottom' key={index}>
                                <img src={ctg.image_url} alt={ctg.subtitle} className='mx-3' />
                                {ctg.name}
                            </motion.button>
                        ))}
                    </>
                )}
        </div>
    )
}

export default CategoryChild
