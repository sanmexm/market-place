import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FavoriteBorderRoundedIcon, FavoriteRoundedIcon } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { actionAddWishList, actionRemoveWishList } from '../../actions/wishlist'

import './wishlistToggle.css'

const WishlistToggle = ({product}) => {
    const dispatch                 = useDispatch();
    const { getWishlistItems }     = useSelector((state) => state?.wishlistList);
    const isProductInWishlist      = getWishlistItems.includes(product._id);
    
    const [like, setLike] = useState(() => {
        return isProductInWishlist;
    });

    const handleWishList = async () => {
        if (like) {
          await dispatch(actionRemoveWishList(product));
          toast.success('Item has been removed from wishlist');
        } else {
          await dispatch(actionAddWishList(product));
          toast.success('Item has been added to wishlist');
        }
        // setLike(!like);
    };

    useEffect(() => {
        // Update like state based on wishlist items
        setLike(getWishlistItems.length > 0);
        
        // Save the like state to localStorage
        localStorage.setItem(`wishlist_${product._id}`, JSON.stringify(like));
    }, [like, getWishlistItems.length, product._id]);

  return (
    <>
        <div className="wish-favorite-btn" onClick={handleWishList}>
            <div className={`wish-favorite-btn-wrap ${like ? 'liked' : 'unlike'}`}>
                <div className="wish-activity-svg">
                    {like ? 
                        <span><FavoriteRoundedIcon /></span>
                        : 
                        <span><FavoriteBorderRoundedIcon /></span>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default WishlistToggle