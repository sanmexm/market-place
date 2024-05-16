import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { StarRateRoundedIcon } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { actionFetchPostRating, actionFetchUserPostRatings } from '../../actions/postRatings'
import { userImg } from '../../assets'
import { Loader, Pagination } from '../../components'
import { actionFetchUser } from '../../actions/users'
import { actionFetchUserProfile } from '../../actions/profiles'

import './ratings.css'

const Ratings = () => {
    const dispatch                                = useDispatch();
    const location                                = useLocation();
    const { id }                                  = useParams();
    const searchParams                            = new URLSearchParams(location.search);
    const page                                    = searchParams.get("page") || 1
    // actualRate
    const {isLoading, getUsersPostRatings, numberOfPages, totalNumber} = useSelector((state) => state.postRatingList)
    const [singlePostRating, setSinglePostRating] = useState(getUsersPostRatings);
    const sumOfStars = getUsersPostRatings.reduce((acc, curr) => acc + curr.star, 0);
    
    useEffect(() => {
        dispatch(actionFetchPostRating(id))
        dispatch(actionFetchUserPostRatings(id, page))
    }, [dispatch, id, page])

    useEffect(() => {
        async function fetchData() {
            if (!isLoading && getUsersPostRatings.length > 0) {
                const updatedResults = await Promise.all(
                getUsersPostRatings.map(async (post) => {
                    try {
                        const userData        = await dispatch(actionFetchUser(post.userId));
                        const userProfileData = await dispatch(actionFetchUserProfile(post.userId));
                    return { ...post, userData, userProfileData };
                    } catch (error) {
                    console.error(error);
                    return post;
                    }
                })
                );
                setSinglePostRating(updatedResults);
            }
        }
        fetchData();
    }, [dispatch, isLoading, getUsersPostRatings]);

    useEffect(() => {
        setSinglePostRating(getUsersPostRatings); // Update reviews state when getAllSinglePostReview changes
    }, [getUsersPostRatings]);

    const countStars = (singlePostRating, star) => {
        return singlePostRating.filter(rating => rating.star === star).length;
    };
    
    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<StarRateRoundedIcon key={i} />);
        }
        return stars;
    };

  return (
    <>
        <div className='users-ratings-main-wrapper'>
            <div className='users-ratings-wrapper'>
                <div className='users-ratings-header'>
                    <span>Verified post Ratings({getUsersPostRatings.length})</span>
                </div>

                <div className='users-ratings-body-wrapper'>
                    <div className='users-ratings-level'>
                        <h4 className='users-ratings-level-title'>Ratings</h4>
                        <div className='users-ratings-level-body'>
                            <span>Average Ratings({getUsersPostRatings.length})</span>

                            <div className='users-ratings-level-star-body'>
                                <StarRateRoundedIcon />
                            </div>
                            <small>{sumOfStars} total ratings</small>
                        </div>

                        <div className='users-ratings-count-level-star'>
                            {[5, 4, 3, 2, 1].map(star => (
                                <span key={star}>
                                {star} {renderStars(star)} ({countStars(singlePostRating, star)})
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className='users-ratings-users'>
                        {isLoading ? (
                            <Loader />
                        ) : singlePostRating?.length > 0 ? (
                            <>
                                <h4 className='users-ratings-users-title'>Users Ratings</h4>
                                {singlePostRating.length > 0 && singlePostRating.map((result, index) => (
                                    <div className='users-ratings-users-body' key={index}>
                                    <div className='users-ratings-users-imgBx'>
                                        <img src={result?.userProfileData?.selectedFile || userImg} alt="user img" />
                                    </div>
        
                                    <div className='users-ratings-users-stars'>
                                        {[...Array(result?.star)].map((_, starIndex) => (
                                            <span key={starIndex}><StarRateRoundedIcon /></span>
                                            ))}
                                    </div>
                                    <span className='users-ratings-user-detail'>by {`${result?.userData?.firstName} ${result?.userData?.lastName}`} <small>{moment.utc(result?.createdAt).local().fromNow()} </small></span>
                                </div>
                                ))}
                            </>
                        ) : (
                            <span className='empty-users-ratings'>No user rating</span>
                        )}
                        <Pagination pageName={`ratings/post-ratings/${id}`} page={page} actionGet={actionFetchUser} id={id} numberOfPages={numberOfPages} totalNumber={totalNumber} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Ratings