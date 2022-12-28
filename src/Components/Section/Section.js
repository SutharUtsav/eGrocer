import React from 'react'
import { Shimmer } from 'react-shimmer';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useSelector } from 'react-redux';


const Section = () => {
  // const Option = {
  //   items: 4,
  //   // autoplay: true,
  //   autoplayHoverPause: true,
  //   autoplayTimeout: 2000,
  //   dots: true,
  //   nav: true,
  //   navText: [`<div style=position:absolute;top:50%;font-size:xx-large;right:103%><i class="fa fa-angle-left" aria-hidden="true"></i></div>
  //       `, `<div style=position:absolute;top:50%;font-size:xx-large;left:103%><i class="fa fa-angle-right" aria-hidden="true"></i></div>`]
  // }

  const sections = useSelector((state) => state.shop.sections)

  console.log(sections)
  return (
    <div className='container' id='products'>
      {sections === undefined ? (
        <div className='d-inline-block'>
          <Shimmer width={1300} height={50} />
          <div className='m-3'></div>
          <Shimmer width={1300} height={350} />
        </div>
      ) : (
        <section className='product'>
          {sections.map(sct => (
            <div key={sct.id}>
              <h1 className='heading'>latest <span>{sct.product_type}</span></h1>

              <div className='box-container'>
                {sct.products.map(prod => (
                  <div className='box' key={prod.id}>
                    {/* <span></span> */}

                    <div className='icons'>
                      <button type="button"><i className="bi bi-heart"></i></button>
                      <button type="button"><i className="bi bi-cart-plus"></i></button>
                      <button type="button"><i className="bi bi-eye"></i></button>
                    </div>
                    <img src={prod.image_url} alt="product" height={200} width={200} />
                    <h3>{prod.name}</h3>
                    {/* <div className='price'>30.00</div> */}
                    <div className='quantity'>
                      <span>quantity : </span>
                      <input type="number" min={1} max={prod.total_allowed_quantity} />
                    </div>
                    <button type='button' className='btn'> add to cart</button>
                  </div>
                ))}
              </div>

              {/* <div className='container m-3'>
                <div className='row'>
                  <OwlCarousel {...Option}>
                    {sct.products.map(prod => (
                      <div className='col' key={prod.id}>
                        <div className='card m-3'>
                          <img src={prod.image_url} className="card-img-top" alt="product" height={200} width={300} />
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
              </div> */}
            </div>
          ))}
        </section>
      )}

    </div>
  )
}

export default Section
