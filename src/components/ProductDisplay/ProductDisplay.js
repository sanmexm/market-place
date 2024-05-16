import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AddShoppingCartRoundedIcon } from '../../utils/constants';
import {Button, EmptyCard, ItemQuantityToggle, Loader, PostRatings, PostReviews, RatePost, VendorToolTip, WishlistToggle} from '../';
import { actionAddToCart } from '../../actions/cart';
import { actionFetchUserProfile } from '../../actions/profiles';
import { actionFetchUser } from '../../actions/users';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './productDisplay.css'

const ProductDisplay = ({ userId, postId, product, isLoading }) => {
    const dispatch                                    = useDispatch();
    const {getCartItems }                             = useSelector((state) => state?.cartList)
    const {getUsersPostRatings}                       = useSelector((state) => state.postRatingList)
    const { singleUser }                              = useSelector((state) => state.userList)
    const { singleUserProfile }                       = useSelector((state) => state.profileList)
    const [selectedImage, setSelectedImage]           = useState("");
    const [dynamicMainBullets, setDynamicMainBullets] = useState(4);
    const [rating, setRating]                         = useState(0);
    const lineRef                                     = useRef(null);
    const [activeTab, setActiveTab]                   = useState(0);
    const [quantity, setQuantity]                     = useState(getCartItems.length > 0 ? getCartItems.map((item) => item?.quantity) : 1);

    const tabButtons                                  = ['Description', 'Reviews', `Verified Ratings (${getUsersPostRatings.length})`];
    const [percentageDifference, setPercentageDifference] = useState(null);
    const [isOpen, setIsOpen]                         = useState(false);
    
    useEffect(() => {
      dispatch(actionFetchUserProfile(userId))
      dispatch(actionFetchUser(userId))
    }, [userId, dispatch]);

    useEffect(() => {
      
    }, [singleUser, singleUserProfile])
    
    useEffect(() => {
      if (product && product.oldPrice !== undefined && product.price !== undefined) {
        if (product.oldPrice !== 0) {
          const difference = ((product.price - product.oldPrice) / product.oldPrice) * 100;
          setPercentageDifference(difference);
        } else {
          setPercentageDifference(null);
        }
      } else {
        setPercentageDifference(null); // Reset to null if product or necessary properties are not defined
      }
    }, [product]);

    // Listen for window resize to update dynamic main bullets

    useEffect(() => {
      updateDynamicMainBullets();
      window.addEventListener('resize', updateDynamicMainBullets);
      return () => {
        window.removeEventListener('resize', updateDynamicMainBullets);
      };
    }, []);

    useEffect(() => {
      if (lineRef.current) {
        const activeButton = lineRef.current.parentNode.querySelector('.active');
        if (activeButton) {
          lineRef.current.style.width = `${activeButton.offsetWidth}px`;
          lineRef.current.style.left = `${activeButton.offsetLeft}px`;
        }
      }
    }, [activeTab]);
    
    const handleTabClick = (index) => {
      setActiveTab(index);
    };
  
    const handleContactClick = () => {
      setIsOpen((prev) => !prev)
    }
    
    const handleAddToCart = async(item) => {
      //cart products coming from products
      await dispatch(actionAddToCart({item, quantity: Number(quantity)}))
      //you can decide to navigate to cart page if you want
      toast.success('Item has been added to cart')
    }
    
    const swiperSubImageSettings = {
        modules: [Navigation, Pagination],
        spaceBetween: 0,
        slidesPerView: 4,
        grabCursor: true,
        pagination: {
          dynamicBullets: true,
          dynamicMainBullets: dynamicMainBullets,
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          0:{
            slidesPerView: 2,
            dynamicMainBullets: 2,
          },
          430:{
            slidesPerView: 3,
            dynamicMainBullets: 3,
          },
          768:{
            slidesPerView: 3,
            dynamicMainBullets: 3,
          },
          1024:{
            slidesPerView: 4,
            dynamicMainBullets: 4,
          }
        }
    }

    const handleSubImageClick = (imageUrl) => {
      setSelectedImage(imageUrl);
    };
    
    const updateDynamicMainBullets = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1024) {
          setDynamicMainBullets(4);
      } else if (windowWidth >= 768) {
          setDynamicMainBullets(3);
      } else if (windowWidth >= 430) {
        setDynamicMainBullets(3);
      } else {
        setDynamicMainBullets(2);
      }
    };

  return (
    <>
      {product ? (
        <>
          <div className='post-display-main-wrapper'>
            <div className='post-display-left'>
              <div className='preview-post-main-body-image-wrapper'>
                <div className='preview-post-main-body-main-image'>
                    <img src={selectedImage || product?.selectedFile} alt='product main img' />
                </div>
                
                <div className='preview-sub-image-swiper-container'>
                  <Swiper {...swiperSubImageSettings} className="preview-post-main-body-sub-image-wrap">
                      <div className='preview-post-swiper-sub-image-main-content' onClick={() => handleSubImageClick(product?.selectedFile)}>
                        <img src={product?.selectedFile} alt='main img' />
                      </div>
                      {product?.selectedFileImages.map((imageX, index) => (
                      <SwiperSlide key={index} className='preview-post-swiper-sub-image-settings'>
                        <div className='preview-post-swiper-sub-image-main-content' onClick={() => handleSubImageClick(imageX)}>
                          <img src={imageX} alt='main img' />
                        </div>
                      </SwiperSlide>
                      ))}

                      <div className="preview-post-swiper-button swiper-button-prev"></div>
                      <div className="preview-post-swiper-button swiper-button-next"></div>
                  </Swiper>
                </div>
              </div>
            </div>

            <div className='post-display-right'>
              <div className='post-display-title-wrapper'>
                <h2 className='post-display-title'>{product?.title}</h2>
                <WishlistToggle product={product} />
              </div>
              <div className='post-display-price'>
                <span className='post-new-price'>&#8358;{product?.price}</span>
                
                {product.oldPrice !== 0 ? (
                  <span className='post-old-price'>&#8358;{product?.oldPrice}</span>
                ): null}

                {percentageDifference !== null && (
                  <small className='post-price-item-discount'>{percentageDifference}%</small>
                )}
              </div>
              <RatePost rating={rating} postId={postId} onRating={(rate) => setRating(rate)} />
              <div className='post-display-description'>{product?.description}</div>

              {product.postType === 'item' ? ( 
                isLoading ? (
                  <Loader />
                  ) : (
                    <>
                      {getCartItems && getCartItems.length > 0 ? (
                        getCartItems.some((result) => result.item?._id === product._id) ? (
                          // If any item in getCartItems matches the current product ID, display ItemQuantityToggle
                          getCartItems.map((result) => {
                            if (result.item?._id === product._id) {
                              return (
                                <ItemQuantityToggle key={result?.item?._id} quantity={result?.quantity} setQuantity={setQuantity} item={result.item} />
                              );
                            }
                            return null;
                          })
                        ) : (
                          // If no item in getCartItems matches the current product ID, display the Add to Cart button
                          <Button
                            onClickButton
                            buttonClickWrap="wide-cart-button-click"
                            buttonIcon={<AddShoppingCartRoundedIcon />}
                            onClickNavigate={() => handleAddToCart(product)}
                            onClickName="Add To Cart"
                          />
                        )
                      ) : (
                        // If getCartItems is empty or null, display the Add to Cart button
                        <Button
                          onClickButton
                          buttonClickWrap="wide-cart-button-click"
                          buttonIcon={<AddShoppingCartRoundedIcon />}
                          onClickNavigate={() => handleAddToCart(product)}
                          onClickName="Add To Cart"
                        />
                      )}
                    </>
                  )
                ) : (
                  <div className="contact-seller-message">
                    <Button buttonWrapper="button-wrapper" onClickButton buttonClickWrap="button-click-wrap" onClickNavigate={handleContactClick} onClickName="contact service provider" />

                    <div className={isOpen ? 'contact-seller-menu-option active' : 'contact-seller-menu-option'}>
                      <Link to="/login" className='contact-seller-menu-detail contact-seller-menu-detail-bottom-divider' onClick={handleContactClick}>
                        <span>Whatsapp</span>
                      </Link>
                      <Link to="/register" className='contact-seller-menu-detail contact-seller-menu-detail-bottom-divider' onClick={handleContactClick}>
                        <span>Email Address</span>
                      </Link>
                      <Link to="/register" className='contact-seller-menu-detail' onClick={handleContactClick}>
                        <span>Phone number:</span>
                      </Link>
                    </div>
                  </div>
              )}

              <div className='post-display-category'>
                <span>Category: {product?.category}</span>
                <span>Tags: {product?.tag}</span>
              </div>
              <VendorToolTip isLoading={isLoading} vendorProfile={singleUserProfile} vendorUser={singleUser} />
            </div>
          </div>

          <div className='post-navigator-body'>
            <div className='navigator-tab'>
              <div className='navigator-tab-box'>
                {tabButtons.map((tab, index) => (
                  <button key={index} className={`navigator-tab-btn ${activeTab === index ? 'active' : ''}`} onClick={() => handleTabClick(index)}>
                    {tab}
                  </button>
                ))}
                <div className='navigator-btn-line' ref={lineRef}></div>
              </div>

              <div className='navigator-content-box'>
                <div className={`navigator-content ${activeTab === 0 && 'active'}`}>
                  {product?.description}
                </div>
                <div className={`navigator-content ${activeTab === 1 && 'active'}`}>
                  <PostReviews postId={postId} />
                </div>
                <div className={`navigator-content ${activeTab === 2 && 'active'}`}>
                  <PostRatings postId={postId} getUsersPostRatings={getUsersPostRatings} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyCard title="Posts" linkName="Post" link="/posts/create-post" />
      )}
    </>
  )
}

export default ProductDisplay