import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { DeleteOutlineRoundedIcon, ShoppingCartCheckoutRoundedIcon } from '../../utils/constants'
import { logo, trash } from '../../assets'
import {Button, DeletePopUp, FormField, ItemQuantityToggle, Loader, Name} from '../'
import { actionCalculateTotalAmount, actionRemoveItemFromCart, actionClearCartItems } from '../../actions/cart'

import './cartItems.css'

const CartItems = () => {
  const dispatch                       = useDispatch()
  const navigate                       = useNavigate()
  const {getCartItems, getCartTotal}   = useSelector((state) => state?.cartList)
  const [onOpen, setOnOpen]            = useState({});
  const [quantity, setQuantity]        = useState(getCartItems.length > 0 ? getCartItems.map((item) => item?.quantity) : 1);
  const shippingCost                   =  2000
  const cartTotal                      = getCartTotal + shippingCost

  useEffect(() => {

  }, [quantity])

  useEffect(() => {
    setQuantity(getCartItems.map((result) => result?.quantity));
  }, [getCartItems]);

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

  const handleCheckoutClick = () => {
    navigate(`/checkout`)
  }

  const handleClearCart = () => {
    const returnConfirm = window.confirm('Are you sure you want to clear entire cart?')
    if(returnConfirm){
      dispatch(actionClearCartItems())
      toast.success('Entire cart has been cleared')
    }
  }

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    dispatch(actionCalculateTotalAmount())
  }, [dispatch, getCartItems])
  
  return (
    <>
      <div className='cart-items-wrapper'>
        {(getCartItems?.length > 0) ? (
          <div className='cart-items-main-cart'>
            <div className='cart-items-main'>
              {/* products is coming from post page, reason you can't add more than one product */}
              <span>Products</span>
              <span>Title</span>
              <span>Cate</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {/* productArray */}
            {getCartItems.map((result, index) => (
              <div key={result?.item?._id} className='cart-items-detail'>
                <div className='cart-item-img'>
                  <img src={result?.item?.selectedFile} alt='cart product img' />
                </div>
                <div className=''>{result?.item?.title}</div>
                <div className=''>{result?.item?.category}</div>
                <div className=''>&#8358;{result?.item?.price}</div>
                <ItemQuantityToggle key={result?.item?._id} quantity={result?.quantity} setQuantity={setQuantity} item={result.item} />
                <div className=''>&#8358;{result?.item?.price * Number(result?.quantity)}</div>
                <div className='cart-item-remove' onClick={() => removeCartItemHandler(index)}><DeleteOutlineRoundedIcon /></div>
                <div className=''>
                  <DeletePopUp onOpen={onOpen === index} onClose={cancelPostDeletion} onConfirm={() => confirmPostDeletion(result)} popUpImage={trash} prompt={`Are you sure you want to remove item`} />
                </div>
              </div>
            ))}

            <div className='cart-item-total-wrapper'>
              <div className='cart-item-total'>
                <h2>Cart Total</h2>
                <div className=''>
                  <div className='cart-single-total'>
                    <span>Subtotal</span>
                    <span>&#8358;{getCartTotal}</span>
                  </div>
                  <div className='cart-shipping-total'>
                    <span>Shipping</span>
                    <span>&#8358;{shippingCost}</span>
                  </div>
                  <div className='cart-total'>
                    <h3>Total</h3>
                    <span>&#8358;{formatNumber(cartTotal)}</span>
                  </div>
                </div>
                <Button onClickButton buttonClickWrap="wide-cart-button-click" buttonIcon={<ShoppingCartCheckoutRoundedIcon />} onClickNavigate={handleCheckoutClick} onClickName="Checkout" />
                <Button onClickButton buttonClickWrap="transparent-button-click-wrap" buttonIcon={<DeleteOutlineRoundedIcon />} onClickNavigate={handleClearCart} onClickName="Clear Cart" />
              </div>
              <div className='cart-item-coupon-wrapper'>
                <p>enter your promo code below</p>
                <div className='cart-item-coupon'>
                  <form>
                    <FormField inputType type="text" labelBoolean name="coupon" placeholder="Add coupon code here" />
                  </form>
                  <Button onClickButton buttonClickWrap={`button-login-submit`} onClickName={"Apply"} />
                </div>
              </div>
            </div>
          </div>

          ) : (getCartItems) ? (<div className='cart-items-empty-cart-wrapper'>
            <div className='cart-items-empty-cart'>
              <div className='empty-cart-nav-logo-wrapper'>
                <div className='empty-cart-nav-logo'>
                  <img src={logo} alt='site logo' />
                </div>
                <span><Name /></span>
              </div>
              <h1 className=''>Your Cart is Empty</h1>
              <span>Browse our categories and discover our best deals</span>
              <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts" linkClass="link-wrapper" linkName="Start Shopping" />
            </div>
          </div>
          ) : (
            <>
              <div className='cart-loading-wrapper'>
                <h2>Loading...</h2>
                <Loader />
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default CartItems