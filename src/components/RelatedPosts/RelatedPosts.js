import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {Button, EmptyCard, Loader, PostTitle, TruncatedText} from '../';
import { KeyboardArrowRightRoundedIcon } from '../../utils/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import './relatedPosts.css'

const RelatedPosts = ({id, actionGet, postType, category, tag,  page}) => {
  const dispatch                                          = useDispatch();
  const [isLoading, setIsLoading]                         = useState(true);
  const [allPosts, setAllPosts]                           = useState([]);
  const [percentageDifferences, setPercentageDifferences] = useState([]);
  const relatedProducts                                   = "Related Products"
  const linkTo                                            = `/post-items/${relatedProducts}/filtered?postType=${postType}&category=${category}&tag=${tag}`

  useEffect(() => {
    setIsLoading(true);
    if (typeof actionGet === 'function') {
      dispatch(actionGet(id, postType, category, page))
        .then((response) => {
          setAllPosts(response?.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, postType, category, page, actionGet, dispatch]);
  

  useEffect(() => {
    if (allPosts && allPosts.length > 0) {
      const differences = allPosts.map((item) => {
        if (item.oldPrice !== 0) {
          return ((item.price - item.oldPrice) / item.oldPrice) * 100;
        } else {
          return null;
        }
      });
      setPercentageDifferences(differences);
    }
  }, [allPosts]);

  const swiperSubImageSettings = {
      modules: [Navigation],
      spaceBetween: 0,
      slidesPerView: 5,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0:{
          slidesPerView: 1,
        },
        430:{
          slidesPerView: 3,
        },
        768:{
          slidesPerView: 4,
        },
        1024:{
          slidesPerView: 5,
        }
      }
  }
  
  
  return (
    <>
      <section className='items-wrapper'>
        <div className='items-header'>
          <span className='item-title'><PostTitle title={relatedProducts} /></span>
          <Button buttonWrapper="button-wrapper" linkButton linkTo={linkTo} linkClass="transparent-link-wrapper" linkName="See More" linkIcon={<KeyboardArrowRightRoundedIcon />} />
        </div>
        {/* swiper */}
        <Swiper {...swiperSubImageSettings} className='items-body-container'>
          {isLoading ? (
            <Loader />
          ) : allPosts && allPosts.length > 0 ? (
            allPosts.map((item, index) => {
            const result = percentageDifferences[index];
            return (
              <SwiperSlide key={index} className='items-container'>
                <div className='items-body'>
                  <Link to={`/posts/post/${item._id}`} className='item-image-body'>
                    <div className='item-image'>
                      <img src={item.selectedFile} alt='post' />
                    </div>
                    {item.oldPrice !== 0 ? (
                      <small className='item-discount'>{result}%</small>
                    ): null}
                  </Link>

                  <div className='item-details'>
                    <TruncatedText text={item.title} maxLength={20} />
                    <div className='item-price-detail'>
                      <span className='current-price'>&#8358;{item.price}</span>
                      {item.oldPrice !== 0 ? (
                        <span className='old-price'>&#8358;{item.oldPrice}</span>
                      ): null}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )})
            ) : (
              <EmptyCard title="Posts" linkName="Post" link="/posts/create-post" />
          )}
          <div className="preview-post-swiper-button swiper-button-prev"></div>
          <div className="preview-post-swiper-button swiper-button-next"></div>
        </Swiper>
        {/* swiper */}
      </section>
    </>
  )
}

export default RelatedPosts