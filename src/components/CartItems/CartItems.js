import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { DeleteOutlineRoundedIcon, ShoppingCartCheckoutRoundedIcon } from '../../utils/constants'
import { logo } from '../../assets'
import {Button, FormField, ItemQuantityToggle, Loader, Name} from '../'
import { actionCalculateTotalAmount, actionRemoveItemFromCart, actionClearCartItems } from '../../actions/cart'

import './cartItems.css'

const CartItems = () => {
  const dispatch                                 = useDispatch()
  const {isLoading, getCartItems, getCartTotal } = useSelector((state) => state?.cartList)
  const [quantity, setQuantity] = useState(getCartItems.length > 0 ? getCartItems.map((item) => item?.product?.quantity) : 1); 

  const removeCartItemHandler = (product) => {
    const returnConfirm = window.confirm('Are you sure you want to remove item?')
    if(returnConfirm){
      console.log(product)
      dispatch(actionRemoveItemFromCart(product))
      toast.success('Item has been removed from cart')
    }
  }

  const handleCheckoutClick = () => {

  }

  const handleClearCart = () => {
    const returnConfirm = window.confirm('Are you sure you want to clear entire cart?')
    if(returnConfirm){
      dispatch(actionClearCartItems())
      toast.success('Entire cart has been cleared')
    }
  }

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
              <span>Remove</span>
            </div>

            {/* productArray */}
            {getCartItems.map((item, index) => (
              <div key={index} className='cart-items-detail'>
                <div className='cart-item-img'>
                  <img src={item?.product?.product?.selectedFile} alt='cart product img' />
                </div>
                <div className=''>{item?.product?.product?.title}</div>
                <div className=''>{item?.product?.product?.category}</div>
                <div className=''>&#8358;{item?.product?.product?.price}</div>

                <ItemQuantityToggle quantity={quantity} setQuantity={setQuantity} cartItem={item?.product} />
                
                <div className=''>&#8358;{getCartTotal}</div>
                <div className='cart-item-remove' onClick={() => removeCartItemHandler(item?.product?.product)}><DeleteOutlineRoundedIcon /></div>
              </div>
            ))}

            <div className='cart-item-total-wrapper'>
              <div className='cart-item-total'>
                <h2>Cart Total</h2>
                <div className=''>
                  <div className='cart-single-total'>
                    <span>Subtotal</span>
                    <span>&#8358;{0}</span>
                  </div>
                  <div className='cart-shipping-total'>
                    <span>Shipping</span>
                    <span>&#8358;{0}</span>
                  </div>
                  <div className='cart-total'>
                    <h3>Total</h3>
                    <span>&#8358;{getCartTotal}</span>
                  </div>
                </div>
                <Button onClickButton buttonClickWrap="wide-cart-button-click" buttonIcon={<ShoppingCartCheckoutRoundedIcon />} onClickNavigate={() => handleCheckoutClick()} onClickName="Checkout" />
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