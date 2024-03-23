import React, { useEffect } from 'react'
import { AddRoundedIcon, RemoveRoundedIcon } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { actionDecrementCartItem, actionIncrementCartItem } from '../../actions/cart'

import './itemQuantityToggle.css'

const ItemQuantityToggle = ({cartItem, quantity, setQuantity, minValue = 1, maxValue = 100}) => {
  const dispatch  = useDispatch()

    const decrement = () => {
      if (quantity > minValue) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        dispatch(actionDecrementCartItem(cartItem));
      }
    };
    
    const increment = () => {
      if (quantity < maxValue) {
        setQuantity((prevQuantity) => prevQuantity + 1);
        dispatch(actionIncrementCartItem(cartItem));
      }
    };

    useEffect(() => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const cartItemFromStorage = storedCartItems.find((item) => item.product._id === cartItem?._id);
    
      if(cartItemFromStorage) {
        setQuantity(cartItemFromStorage.quantity);
      }
    }, [cartItem?._id, setQuantity]);

  return (
    <>
      <div className='item-quantity-wrapper'>
        <div className='item-quantity-btn' onClick={decrement}><RemoveRoundedIcon /></div>
        <input type='text' readOnly min={minValue} max={maxValue} value={quantity} onChange={(e) => setQuantity(e.target.value)} className='item-quantity-value' />
        <div className='item-quantity-btn' onClick={increment}><AddRoundedIcon /></div>
      </div>
    </>
  )
}

export default ItemQuantityToggle