import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ItemQuantityToggle, Loader, Name } from '../../components'
import { AddShoppingCartRoundedIcon, RemoveRoundedIcon } from '../../utils/constants'
import { actionAddToCart } from '../../actions/cart'
import { Link } from 'react-router-dom'
import { actionRemoveWishList } from '../../actions/wishlist'
import { heart } from '../../assets'

import './wishlist.css'

const Wishlist = () => {
    const dispatch                       = useDispatch();
    const {isLoading, getCartItems }     = useSelector((state) => state?.cartList)
    const { getWishlistItems }           = useSelector((state) => state?.wishlistList)
    const [quantity, setQuantity]        = useState(getCartItems.length > 0 ? getCartItems.map((item) => item?.product?.quantity) : 1);  

    const handleAddToCart = async(product) => {
        //cart items coming from products
        // console.log(quantity)
        const response = await dispatch(actionAddToCart({product, quantity: Number(quantity)}))
        //you can decide to navigate to cart page if you want
        toast.success('Item has been added to cart')
    }

    const handleRemoveWishList = async(wishlist) => {
        const response = await dispatch(actionRemoveWishList(wishlist))
        toast.success('Item has been removed')
    }

  return (
    <>
        <div className='wishlist-wrapper'>
            {(getWishlistItems?.length > 0) ? (
                getWishlistItems.map((item, index) => (
                    <div  key={index} className='wishlist-details-wrapper'>
                        <div className='wishlist-details'>
                            <Link to={`../posts/post/${item._id}`} className='wishlist-details-image'>
                                <img src={item?.selectedFile} alt='item logo' />
                            </Link>
                            <div className='wishlist-details-title-price'>
                                <span>{item.title}</span>
                                <small>&#8358;{item.price}</small>
                            </div>
                        </div>
                        <div className='wishlist-details-btn'>
                            <Button onClickButton buttonClickWrap="wide-cart-button-click" buttonIcon={<RemoveRoundedIcon />} onClickNavigate={() => handleRemoveWishList(item)} onClickName="Remove from wishlist" />
    
                            {getCartItems?.length > 0 ? 
                                (<ItemQuantityToggle quantity={quantity} setQuantity={setQuantity} />) 
                                :
                                <Button onClickButton buttonClickWrap="wide-cart-button-click" buttonIcon={<AddShoppingCartRoundedIcon />} onClickNavigate={() => handleAddToCart(item)} onClickName="Add To Cart" />
                            }
                        </div>
                    </div>
                ))
            ) : (getWishlistItems) ? (
                <div className='wishlist-empty-wrapper'>
                    <div className='wishlist-empty'>
                        <div className='empty-wishlist-nav-logo-wrapper'>
                            <div className='empty-wishlist-nav-logo'>
                                <img src={heart} alt='site logo' />
                            </div>
                            <span><Name /></span>
                        </div>
                        <h1 className=''>No item was saved</h1>
                        <span>Tap on the heart shaped icon next to the item to add it to your wishlist! All your saved items will appear here.</span>
                        <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts" linkClass="link-wrapper" linkName="Start Shopping" />
                    </div>
                </div>
            ) : (
                <>
                    <div className='wishlist-loading-wrapper'>
                        <h2>Loading...</h2>
                        <Loader />
                    </div>
                </>
            )}
        </div>
    </>
  )
}

export default Wishlist