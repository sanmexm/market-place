import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FavoriteBorderRoundedIcon, FavoriteRoundedIcon } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { actionAddWishList, actionRemoveWishList } from '../../actions/wishlist'

import './wishlistToggle.css'

const WishlistToggle = ({product}) => {
    const dispatch                = useDispatch();
    const { getWishlistItems }    = useSelector((state) => state?.wishlistList);
    const isProductInWishlist     = getWishlistItems.some(item => item?._id === product._id);

    const handleWishList = async () => {
        if (isProductInWishlist) {
          await dispatch(actionRemoveWishList(product));
          toast.success('Item has been removed from wishlist');
        } else {
          await dispatch(actionAddWishList(product));
          toast.success('Item has been added to wishlist');
        }
    };

  return (
    <>
        <div className="wish-favorite-btn" onClick={handleWishList}>
            <div className={`wish-favorite-btn-wrap ${isProductInWishlist ? 'liked' : 'unlike'}`}>
                <div className="wish-activity-svg">
                    <span>{isProductInWishlist ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default WishlistToggle