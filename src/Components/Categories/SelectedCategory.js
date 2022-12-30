import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom'
import { setCategoryfromAPI } from '../../Model/action/categoryAction';
import { clearProducts, fetchProductbyCategory } from '../../Model/action/productAction';

export const SelectedCategory = () => {

  
  const searchparams = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCategoryfromAPI())

    if (localStorage.getItem('location') === null) {
      navigate("/")
    }
    else {
      if (Object.keys(JSON.parse(localStorage.getItem('location')).location).length === 0 && Object.keys(JSON.parse(localStorage.getItem('location')).city).length === 0) {
        navigate("/")
      }
      else {
        const city = JSON.parse(localStorage.getItem('location')).city
        dispatch(fetchProductbyCategory(city.id, city.latitude, city.longitude, searchparams.cid));
      }
    }

    return () => {
      dispatch(clearProducts());
    };

  }, [dispatch, searchparams.cid])

  const ctgs = useSelector((state) => state.category)
  const products = useSelector((state) => state.products)



  return (
    <div id='page-wrapper' className='container'>

      <button id='category-bar' onClick={() => {
        document.getElementById('box').classList.toggle('active');
        document.getElementById('close-categorybar').classList.toggle('active');
        document.getElementById('category-bar').classList.add('active')
      }}><i className="fa fa-bars" aria-hidden="true"></i></button>


      <div id="box">
        {Object.keys(ctgs).length === 0 ? "" : (
          <div id="items">

            <button id='close-categorybar' type='button' onClick={() => {
              document.getElementById('close-categorybar').classList.remove('active')
              document.getElementById('box').classList.remove('active');
              document.getElementById('category-bar').classList.remove('active')
            }}><i className="bi bi-x-circle"></i></button>
            {
              ctgs.category.map(ctg => (
                <div key={ctg.id}>
                  {parseInt(ctg.id) === parseInt(searchparams.cid) ? (
                    <div className="item-active" key={ctg.id}> {ctg.name}</div>
                  ) : (
                    <div className="item" key={ctg.id} onClick={() => {
                      navigate('/cn/'+ctg.name+'/cid/' + ctg.id);
                    }}> {ctg.name}</div>
                  )}
                </div>
              ))
            }
          </div>
        )}
      </div>
      {Object.keys(products).length === 0 ? (
        <div className="loader">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      ) : (
        <div className='product'>
          {products.error ? <p className='no-product-found'>{products.error}</p> : (
            <div className='box-container'>

              {products.products.map(product => (

                <div className='box' key={product.id}>
                  {/* <span></span> */}
                  <div className='icons'>
                    <button type="button"><i className="bi bi-heart"></i></button>
                    <button type="button"><i className="bi bi-eye"></i></button>
                  </div>
                  <img src={product.image_url} alt="product" height={200} width={200} />
                  <h3>{product.name}</h3>
                  <div className='price'><i className="fa fa-inr p-2" aria-hidden="true"></i>{product.variants[0].price}</div>
                  <div className='quantity'>

                    <button type="button" onClick={() => {
                      var dom = document.getElementById("input-" + product.id);
                      if (parseInt(dom.value) === 0) {
                        dom.value = 0;
                      }
                      else {
                        dom.value = parseInt(dom.value) - 1;
                      }


                    }}>&ndash;</button>

                    <input id={"input-" + product.id} type='text' defaultValue={0} disabled={true}/>

                    <button type='button' onClick={() => {
                      var dom = document.getElementById("input-" + product.id);

                      if (parseInt(dom.value) === product.total_allowed_quantity) {
                        dom.value = product.total_allowed_quantity;
                      }
                      else {
                        dom.value = parseInt(dom.value) + 1;
                      }



                    }}>+</button>
                  </div>
                  <button type='button' className='btn' onClick={()=>{
                    var dom = document.getElementById("input-" + product.id);
                    console.log(parseInt(dom.value));

                    dom.value =0;

                  }}> add to cart</button>
                </div>
              ))}

            </div>
          )}
        </div>
      )}
    </div>
  )
}


