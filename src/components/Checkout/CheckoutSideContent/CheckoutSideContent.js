import React, { useEffect, useState } from 'react'
import { DeleteOutlineRoundedIcon, PaymentsRoundedIcon, ShoppingBasketRoundedIcon } from '../../../utils/constants'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actionCalculateTotalAmount, actionRemoveItemFromCart } from '../../../actions/cart'
import { Button, DeletePopUp, ItemQuantityToggle, Loader } from '../..'
import { trash } from '../../../assets'

import './checkoutSideContent.css'

const CheckoutSideContent = ({isButtonDisabled, savingInfo, handleSubmit}) => {
  const dispatch                       = useDispatch()
  const navigate                       = useNavigate()
  const {getCartItems, getCartTotal}   = useSelector((state) => state?.cartList)
  const [quantity, setQuantity]        = useState(getCartItems.length > 0 ? getCartItems.map((item) => item?.quantity) : 1);
  const [onOpen, setOnOpen]            = useState({});
  const shippingCost                   = 2000
  const cartTotal                      = getCartTotal + shippingCost

  useEffect(() => {

  }, [quantity])

  useEffect(() => {
    if (getCartItems.length === 0) {
      navigate('/cart'); // Navigate to the cart page if cart is empty
    }
  }, [getCartItems, navigate]);

  useEffect(() => {
    setQuantity(getCartItems.map((result) => result?.quantity));
  }, [getCartItems]);

  useEffect(() => {
    dispatch(actionCalculateTotalAmount())
  }, [dispatch, getCartItems])

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const removeCartItemHandler = async(index) => {
    setOnOpen((prevIndex) => (prevIndex === index ? null : index));
  }

  const cancelPostDeletion = () => {
    setOnOpen(null);
  };

  const confirmPostDeletion = (item) => {
    dispatch(actionRemoveItemFromCart(item))
    toast.success('Item has been removed from cart')
    setOnOpen(null);
  };

  return (
    <>
      <div className='check-out-side-bar-wrapper'>
        <div className='check-out-side-bar-item-details'>
          <div className='check-out-side-bar-sub-icon'>
            <ShoppingBasketRoundedIcon />
            <span>Order Summary</span>
          </div>

          <div className='check-out-side-bar-link-wrapper'>
            {getCartItems.map((result, index) => (
              <div key={result?.item?._id} className='check-out-side-item-wrapper'>
                <div className='check-out-side-item-img'>
                  <img src={result?.item?.selectedFile} alt={result?.item?.title} />
                </div>
                <div className='check-out-side-item-title-quantity'>
                  <small>{result?.item?.title}</small>
                  <ItemQuantityToggle key={result?.item?._id} quantity={result?.quantity} setQuantity={setQuantity} item={result.item} />
                </div>
                <div className='check-out-side-item-price'>&#8358;{result?.item?.price}</div>

                <div className='check-out-side-cart-item-remove' onClick={() => removeCartItemHandler(index)}><DeleteOutlineRoundedIcon /></div>
                <div className=''>
                  <DeletePopUp onOpen={onOpen === index} onClose={cancelPostDeletion} onConfirm={() => confirmPostDeletion(result)} popUpImage={trash} prompt={`Are you sure you want to remove item`} />
                </div>
              </div>
            ))}

          </div>

          <div className='check-out-side-bar-total'>
            <div className='check-out-side-bar-sub-total'><span>Subtotal:</span> {getCartTotal}</div>
            <div className='check-out-side-bar-shipping'><span>Shipping:</span> {shippingCost}</div>

            <div className='check-out-side-bar-grand-total'><span>Total:</span> &#8358;{formatNumber(cartTotal)}</div>
          </div>

          <div className='check-out-side-bar-pay-button'>
            <form onSubmit={handleSubmit}>
              <Button onClickButton onClick={handleSubmit} buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} buttonIcon={<PaymentsRoundedIcon />} onClickName={savingInfo ? <>{<Loader />} Processing payment...</> : `Pay Now ₦${formatNumber(cartTotal)}`} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutSideContent