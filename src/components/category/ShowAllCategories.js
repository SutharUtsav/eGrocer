import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api/api'
import coverImg from '../../utils/cover-img.jpg'
import './category.css'

const ShowAllCategories = () => {

  const category = useSelector(state => (state.category));
  const city = useSelector(state => (state.city))


  const getProductfromApi = async (ctg) => {
    await api.getProductbyCategory(city.city.id, city.city.latitude, city.city.longitude, ctg.id)
      .then(response => response.json())
      .then(result => {
        if (result.status === 1) {
          setMap(new Map(map.set(`category${ctg.id}`,result.total)))
        }
      })
  }

  useEffect(() => {
    if (category.status !== 'loading' || city.city !== null) {
      category.category.forEach(ctg => {
        getProductfromApi(ctg)
      });
    }

    console.log(map)
    
  }, [category])


  //categories and their product count map
  const [map, setMap] = useState(new Map())

  return (
    <section id='allcategories'  >
      <div className='cover'>
        <img src={coverImg} className='img-fluid' alt="cover"></img>
        <div className='page-heading'>
          <h5>Categories</h5>
          <p>home / <span>Categories</span></p>
        </div>
      </div>

      <div className='container' style={{ padding: "30px 0" }}>
        {category.status === 'loading'
          ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )
          : (
            <div className='content'>
              {category.category.map((ctg, index) => (
                <div className='card' key={index}>
                  <img className='card-img-top' src={ctg.image_url} alt='' />
                  <div className='card-body'>
                    <p>{ctg.name} (
                      {map.get(`category${ctg.id}`) !== undefined
                        ?  map.get(`category${ctg.id}`)  
                        : 0}
                    )</p>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </section>
  )
}

export default ShowAllCategories
