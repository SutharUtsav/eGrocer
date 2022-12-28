import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setCategoryfromAPI } from '../../Model/action/categoryAction';
import { useNavigate } from "react-router-dom";
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


  const addCartLocalStorage = (product)=>{
    const cart = localStorage.getItem("cart");

    if(cart===null){
      const parse = [];
      parse.push({
        id:product.id,
        count:1,
        name:product.name,
        price:product.variants[0].price
      }) 

      localStorage.setItem('cart',JSON.stringify(parse))
    }

    else{
      const array = JSON.parse(localStorage.getItem('cart'));
      let found=false;

      array.forEach(ele => {
        if(ele.id===product.id && !found){
          ele.count +=1;
          found=true;
        }
      });

      if(!found){
        array.push({
          id:product.id,
        count:1,
        name:product.name,
        price:product.variants[0].price
        })
      }
      localStorage.setItem('cart',JSON.stringify(array))

    }
  }


  const removeCartLocalStorage = (product)=>{

  }


  return (
    <div id='page-wrapper'>
      <div id="box">

        {Object.keys(ctgs).length === 0 ? "" : (
          <div id="items">
            {
              ctgs.category.map(ctg => (
                <div key={ctg.id}>
                  {parseInt(ctg.id) === parseInt(searchparams.cid) ? (
                    <div className="item-active" key={ctg.id}> {ctg.name}</div>
                  ) : (
                    <div className="item" key={ctg.id} onClick={() => {
                      navigate('/cid/' + ctg.id);
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
          {products.error ? <p className='text-danger text-size-lg'>{products.error}</p> : (
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
                    <div className='ctrl'>
                      <button className='ctrl__button' type="button" onClick = {removeCartLocalStorage(product)}>&ndash;</button>
                      <div className='ctrl__counter'>
                        <input className='ctrl__counter-input' type='number' min={0} max={product.total_allowed_quantity}  />
                        <div className='ctrl__counter-num'>
                          {localStorage.getItem('cart')===null ? 0 : JSON.parse(localStorage.getItem('cart'))[0].count}
                        </div>
                      </div>
                      <div className='ctrl__button ctrl__button--increment' onClick = {addCartLocalStorage(product)}>+</div>
                    </div>
                  </div>
                  <button type='button' className='btn'> add to cart</button>
                </div>
              ))}

            </div>
          )}
        </div>
      )}
    </div>
  )
}


