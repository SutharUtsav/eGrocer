import React from 'react'
import { Shimmer } from 'react-shimmer';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

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

                      {/* to add product in wishlist */}
                      <button type="button"><i className="bi bi-heart"  ></i></button>


                      {/* to view product */}
                      <button type="button" onClick={() => {

                        navigate('/prn/' + prod.name + '/pid/' + prod.id)

                      }}><i className="bi bi-eye"></i></button>
                    </div>
                    <img src={prod.image_url} alt="product" height={200} width={200} />
                    <h3>{prod.name}</h3>
                    <div className='price'><i className="fa fa-inr p-2" aria-hidden="true"></i>{prod.variants[0].price} / {prod.variants[0].stock_unit_name}</div>
                    <div className='quantity'>

                      <button type="button" onClick={() => {
                        var dom = document.getElementById("input-" + prod.id);
                        if (parseInt(dom.value) === 0) {
                          dom.value = 0;
                        }
                        else {
                          dom.value = parseInt(dom.value) - 1;
                        }

                      }}>&ndash;</button>

                      <input id={"input-" + prod.id} type='text' defaultValue={0} />

                      <button type='button' onClick={() => {
                        var dom = document.getElementById("input-" + prod.id);

                        if (parseInt(dom.value) === prod.total_allowed_quantity) {
                          dom.value = prod.total_allowed_quantity;
                        }
                        else {
                          dom.value = parseInt(dom.value) + 1;
                        }


                      }}>+</button>
                    </div>
                    <button type='button' className='btn' onClick={() => {
                      var dom = document.getElementById("input-" + prod.id);
                      console.log(parseInt(dom.value));

                      dom.value = 0;

                    }}> add to cart</button>
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
