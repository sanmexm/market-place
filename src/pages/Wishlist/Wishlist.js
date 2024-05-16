import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Loader, Name } from '../../components'
import { RemoveRoundedIcon } from '../../utils/constants'
import { Link } from 'react-router-dom'
import { actionRemoveWishList } from '../../actions/wishlist'
import { heart } from '../../assets'

import './wishlist.css'

const Wishlist = () => {
    const dispatch                       = useDispatch();
    const { getWishlistItems }           = useSelector((state) => state?.wishlistList)

    const handleRemoveWishList = async(item) => {
        dispatch(actionRemoveWishList(item))
        toast.success('Item has been removed')
    }

  return (
    <>
        <div className='wishlist-wrapper'>
            {(getWishlistItems?.length > 0) ? (
                getWishlistItems.map((result) => (
                    <div key={result._id} className='wishlist-details-wrapper'>
                        <div className='wishlist-details'>
                            <Link to={`../posts/post/${result._id}`} className='wishlist-details-image'>
                                <img src={result?.selectedFile} alt='item logo' />
                            </Link>
                            <div className='wishlist-details-title-price'>
                                <span>{result.title}</span>
                                <small>&#8358;{result.price}</small>
                            </div>
                        </div>
                        <div className='wishlist-details-btn'>
                            <Button onClickButton buttonClickWrap="wide-cart-button-click" buttonIcon={<RemoveRoundedIcon />} onClickNavigate={() => handleRemoveWishList(result)} onClickName="Remove from wishlist" />

                            
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