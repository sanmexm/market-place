import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { StarRateRoundedIcon } from '../../../utils/constants'
import { actionFetchPostRating, actionFetchUserPostRatings } from '../../../actions/postRatings'
import { actionFetchUserProfile } from '../../../actions/profiles'
import { actionFetchUser } from '../../../actions/users'
import { userImg } from '../../../assets'

import './postRatings.css'

const PostRatings = ({postId, getUsersPostRatings, isLoading}) => {
  const dispatch                                = useDispatch()
  // const {actualRate, ratingSum}                 = useSelector((state) => state.postRatingList)
  const [singlePostRating, setSinglePostRating] = useState(getUsersPostRatings);
  const sumOfStars = getUsersPostRatings.reduce((acc, curr) => acc + curr.star, 0);
  
  useEffect(() => {
    dispatch(actionFetchPostRating(postId))
    dispatch(actionFetchUserPostRatings(postId))
  }, [dispatch, postId])

  useEffect(() => {
    async function fetchData() {
      if (!isLoading && getUsersPostRatings.length > 0) {
        const updatedRatings = await Promise.all(
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
        setSinglePostRating(updatedRatings);
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
      <div className='verified-ratings-wrapper'>
        <div className='verified-ratings-header'>
          <span>Verified Rating({getUsersPostRatings.length})</span>
          <Link to={`/ratings/post-ratings/${postId}`} className="link-to-ratings">view all ratings</Link>
        </div>

        <div className='verified-ratings-body-wrapper'>
          <div className='verified-ratings-level'>
            <h4 className='verified-ratings-level-title'>Ratings</h4>
            <div className='verified-ratings-level-body'>
              <span>Average Ratings({getUsersPostRatings.length})</span>

              <div className='verified-ratings-level-star-body'>
                <StarRateRoundedIcon />
              </div>
              <small>{sumOfStars} total ratings</small>
            </div>

            <div className='verified-ratings-count-level-star'>
              {[5, 4, 3, 2, 1].map(star => (
                <span key={star}>
                  {star} {renderStars(star)} ({countStars(singlePostRating, star)})
                </span>
              ))}
            </div>
          </div>

          <div className='verified-ratings-users'>
            <h4 className='verified-ratings-users-title'>Users Ratings</h4>
            {singlePostRating.length > 0 && singlePostRating.map((result, index) => (
            <div className='verified-ratings-users-body' key={index}>
              <div className='verified-ratings-users-imgBx'>
                <img src={result?.userProfileData?.selectedFile || userImg} alt="user img" />
              </div>

              <div className='verified-ratings-users-stars'>
                {[...Array(result?.star)].map((_, starIndex) => (
                  <span key={starIndex}><StarRateRoundedIcon /></span>
                ))}
              </div>
              <span className='verified-ratings-user-detail'>by {`${result?.userData?.firstName} ${result?.userData?.lastName}`} <small>{moment.utc(result?.createdAt).local().fromNow()} </small></span>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PostRatings