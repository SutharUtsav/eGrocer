import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Shimmer } from 'react-shimmer';

const Brands = () => {

    useEffect(() => {
        api.getBrands().then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    setbrands(result.data)
                    setloading(false)
                }
                else {
                    console.log(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }, [])


    const [loading, setloading] = useState(true)
    const [brands, setbrands] = useState([])

    return (
        <div className='p-3'>
            <div className='container'>
                <h2>Top Brands</h2>
            </div>
            {loading ? (
                <div className='d-inline-flex'>
                    <Shimmer width={248} height={200} />
                    <Shimmer width={248} height={200} />
                    <Shimmer width={248} height={200} />
                    <Shimmer width={248} height={200} />

                </div>
            ) : (
                <div className='d-inline-flex'>
                    {brands.map(brnd => (

                        <button key={brnd.id} className='p-2 border-0' style={{ width: "200px", height: "200px", background: "none" }} onMouseOver={() => {
                            document.getElementById('span-' + brnd.id).style.display = ""
                            document.getElementById('span-' + brnd.id).style.background = "black"
                            document.getElementById('span-' + brnd.id).style.color = "white"
                            document.getElementById('span-' + brnd.id).style.opacity = ".5"
                            document.getElementById('span-' + brnd.id).style.position = "relative"
                            document.getElementById('span-' + brnd.id).style.bottom = "3pc"

                        }} onMouseOut={() => {
                            document.getElementById('span-' + brnd.id).style.display = "none"
                        }}>
                            <img src={brnd.image_url} className='img-thumbnail rounded d-block' alt='brands' style={{height:"90%", width:"100%"}} />
                            <div id={"span-" + brnd.id} style={{ display: "none" }}>
                                <span >{brnd.name}</span>
                            </div>
                        </button>

                    ))}
                </div>
            )}
        </div>
    )
}

export default Brands
