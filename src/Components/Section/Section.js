import React from 'react'
import { Shimmer } from 'react-shimmer';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Section = (props) => {
  const Option = {
    items: 4,
    // autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    dots: true,
    nav: true,
    navText: [`<div style=position:absolute;top:50%;font-size:xx-large;right:103%><i class="fa fa-angle-left" aria-hidden="true"></i></div>
        `, `<div style=position:absolute;top:50%;font-size:xx-large;left:103%><i class="fa fa-angle-right" aria-hidden="true"></i></div>`]
  }
  return (
    <div className='container'>
      {props.loading ? (
        <div className='d-inline-block'>
          <Shimmer width={1300} height={50} />
          <div className='m-3'></div>
          <Shimmer width={1300} height={350} />
        </div>
      ) : (
        <>
          {props.section.map(sct => (
            <div key={sct.id}>
              <div className='bg-secondary p-2 rounded-1 text-light'>
                <h3>{sct.product_type}</h3>
              </div>
              <div className='container m-3'>
                <div className='row'>
                  <OwlCarousel {...Option}>
                    {sct.products.map(prod => (
                      <div className='col' key={prod.id}>
                        <div className='card m-3'>
                          <img src={prod.image_url} className="card-img-top" alt="product" height={300} width={300} />
                          <div className='card-body'>
                            <h5 >{prod.name}</h5>
                            <p >{prod.slug}</p>
                            <button className="btn btn-primary">ADD</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

    </div>
  )
}

export default Section
