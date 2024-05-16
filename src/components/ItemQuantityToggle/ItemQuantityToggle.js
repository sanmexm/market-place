import React, { useEffect } from 'react'
import { AddRoundedIcon, RemoveRoundedIcon } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { actionDecrementCartItem, actionIncrementCartItem } from '../../actions/cart'

import './itemQuantityToggle.css'

const ItemQuantityToggle = ({item, quantity, setQuantity, minValue = 1, maxValue = 100}) => {
  const dispatch  = useDispatch()

    const decrement = () => {
      if (quantity > minValue) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        // setQuantity(quantity - 1);
        dispatch(actionDecrementCartItem(item));
      }
    };
    
    const increment = () => {
      if (quantity < maxValue) {
        setQuantity((prevQuantity) => prevQuantity + 1);
        // setQuantity(quantity + 1);
        dispatch(actionIncrementCartItem(item));
      }
    };

    useEffect(() => {
      const storedCartItems     = JSON.parse(localStorage.getItem('cartItems')) || [];
      const cartItemFromStorage = storedCartItems.find((result) => result.item?._id === item?._id);
      if(cartItemFromStorage) {
        setQuantity(cartItemFromStorage.quantity);
      }
    }, [item?._id, setQuantity]);

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