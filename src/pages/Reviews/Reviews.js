import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { userImg } from '../../assets'
import { useLocation, useParams } from 'react-router-dom'
import { actionFetchUser } from '../../actions/users'
import { actionFetchUserProfile } from '../../actions/profiles'
import { actionFetchSinglePostReviews } from '../../actions/postReviews'
import { Loader, Pagination } from '../../components'

import './reviews.css'

const Reviews = () => {
  const dispatch                                = useDispatch();
  const location                                = useLocation();
  const { id }                                  = useParams();
  const searchParams                            = new URLSearchParams(location.search);
  const page                                    = searchParams.get("page") || 1
  const { isLoading, getAllSinglePostReview, totalNumber, numberOfPages } = useSelector((state) => state.postReviewList)
  const [reviews, setReviews]                   = useState(getAllSinglePostReview)

  useEffect(() => {
    async function fetchData() {
      if (!isLoading && getAllSinglePostReview.length > 0) {
        const updatedResults = await Promise.all(
          getAllSinglePostReview.map(async (post) => {
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
        setReviews(updatedResults);
      }
    }

    fetchData();
  }, [dispatch, isLoading, getAllSinglePostReview]);

  useEffect(() => {
    dispatch(actionFetchSinglePostReviews(id, page))
  }, [id, page, dispatch]);

  return (
    <>
      <div className='users-reviews-main-wrapper'>
        <div className='users-reviews-main-header'>
          <span>Reviews({getAllSinglePostReview.length})</span>
        </div>

        <div className='users-reviews-content-container'>
          <div className='users-reviews-content-details-wrapper'>
            {isLoading ? (
                <Loader />
            ) : getAllSinglePostReview?.length > 0 ? (
              <>
                <h4 className='users-reviews-users-title'>Users Reviews</h4>
                {reviews.length > 0 && reviews.map((result, index) => (
                  <div className='post-reviews-content-details' key={index}>
                    <div className='post-reviews-content-details-imgBx'>
                      <img src={result?.userProfileData?.selectedFile || userImg} alt="user img" />
                    </div>
                    <div className='post-reviews-content-details-review'>
                      <div>
                        <h3>{`${result?.userData?.firstName} ${result?.userData?.lastName}`}</h3>
                        <small>{moment.utc(result?.createdAt).local().fromNow()}</small>
                      </div>
                      <div className='post-reviews-content-details-review-text'>
                        {result?.review}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <span className='empty-users-reviews'>No reviews available</span>
            )}
            <Pagination pageName={`reviews/post-reviews/${id}`} page={page} actionGet={actionFetchUser} id={id} numberOfPages={numberOfPages} totalNumber={totalNumber} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Reviews