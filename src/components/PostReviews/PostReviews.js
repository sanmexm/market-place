import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {Button, FormField, Loader, LoginModal} from '../'
import { userImg } from '../../assets';
import { userValidateReview } from '../validations/PostReviews/PostReviews';
import { actionCreatePostReview, actionFetchSinglePostReviews } from '../../actions/postReviews';
import { actionFetchUserProfile } from '../../actions/profiles';
import { actionFetchUser } from '../../actions/users';
import { Link } from 'react-router-dom';

import './postReviews.css'

const PostReviews = ({postId}) => {
    const [authData, setAuthData]                 = useState(JSON.parse(localStorage.getItem('authData')));
    const [userData, setUserData]                 = useState(authData)
    const userId                                  = authData?.result?._id
    const dispatch                                = useDispatch();
    const { singleUser }                          = useSelector((state) => state.userList)
    const { singleUserProfile }                   = useSelector((state) => state.profileList)
    const { getAllSinglePostReview, currentPage } = useSelector((state) => state.postReviewList)
    const reviewsRef                              = useRef();
    const [reviews, setReviews]                   = useState(getAllSinglePostReview)
    const [savingInfo, setSavingInfo]             = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [reviewErrors, setReviewErrors]         = useState(null);
    const [postData, setPostData]                 = useState({review: ''})
    const [isLoadingBtn, setIsLoadingBtn]         = useState({review: false })
    const [isValid, setIsValid]                   = useState({review: false })
    const [errorMessage, setErrorMessage]         = useState(null);
    const [loginModalPopUp, setLoginModalPopUp]   = useState(false)

    const handleModalLoginAccount = () => {
      setLoginModalPopUp((prev) => !prev)
    }

    const useDebounce = (value, delay ) => {
      const [debounced, setDebounced] = useState(value)
  
      useEffect(() =>{
        const handler = setTimeout(() => {
          setDebounced(value)
        }, delay);
        return () => clearTimeout(handler)
      }, [value, delay])
  
      return debounced
    }

    const debouncedPostData                       = useDebounce(postData, 500)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setIsLoadingBtn((prevState) => ({ ...prevState, [name]: true }));
      setPostData((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
      const storedAuthData = JSON.parse(localStorage.getItem('authData'));
      if (storedAuthData) {
        setAuthData(storedAuthData);
        setUserData(storedAuthData); // Update userData when authData changes
      }
    }, []);

    const handleSuccessLogin = () => {
      const storedAuthData = JSON.parse(localStorage.getItem('authData'));
      if (storedAuthData) {
        setAuthData(storedAuthData);
        setUserData(storedAuthData); // Update userData when authData changes
        setLoginModalPopUp(false);
      }
    };

    useEffect(() => {
      handleSuccessLogin();
    }, []);

    useEffect(() => {
        const validateReview = () => {
          const { isValid, errors } = userValidateReview(debouncedPostData.review);
          setIsValid((prevState) => ({
            ...prevState,
            review: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            review: false,
          }));
          return errors;
        };
      
        const reviewErrors        = validateReview()
    
        setReviewErrors(reviewErrors);
  
        const hasErrors = () => {
          // Check if any error exists in the form data
          if ( reviewErrors.length > 0 ) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData]);
  
    useEffect(() => {
      dispatch(actionFetchSinglePostReviews(postId, currentPage))
    }, [postId, currentPage, dispatch]);

    useEffect(() => {
      setReviews(getAllSinglePostReview); // Update reviews state when getAllSinglePostReview changes
    }, [getAllSinglePostReview]);

    useEffect(() => {
      if (!reviews || !Array.isArray(reviews)) {
        // Handle the case when reviews is null, undefined, or not an array
        return;
      }
      
      const userIdsToFetch = reviews
      .filter(review => review && review.userId && (!singleUserProfile || !singleUserProfile[review.userId]))
      .map(review => review.userId);
      if (userIdsToFetch.length > 0) {
        userIdsToFetch.forEach(userId => {
          dispatch(actionFetchUserProfile(userId));
          dispatch(actionFetchUser(userId));
        });
      }
    }, [reviews, dispatch]);

    const handleSubmit = async(e) => {
      e.preventDefault();
      const returnConfirm = window.confirm('Are you sure you want to submit a review?')
      if(returnConfirm){
        setSavingInfo(true);
        const response = await dispatch(actionCreatePostReview(postId, userId, postData.review))
        try{
          if (response.success === true) {
            toast.success("Review submitted successfully")
            setReviews([...reviews, response?.review]);
            setErrorMessage(null);
            setPostData({review: ""})
            reviewsRef.current.scrollIntoView({ behavior: "smooth", block: 'start', inline: 'nearest' })
            setSavingInfo(false)
          } else if (response.status === 401) {
            setErrorMessage(response.data.message);
          }
        }catch(error){
          setErrorMessage(error.response.status)
          setErrorMessage("unable to upload data, please check your internet and try again")
          setSavingInfo(false)
        }
      }
    }

  return (
    <>
        <div className=''>
          <div ref={reviewsRef} />
          <div className='post-reviews-main-header'>
            <span>Reviews</span>
            <Link to={`/reviews/post-review/${postId}`} className='link-to-reviews'>view all reviews</Link>
          </div>
          <div className='post-reviews-content-container'>
            <div className='post-reviews-content-details-wrapper'>
              {reviews.length > 0 && reviews.map((result, index) => (
                <div className='post-reviews-content-details' key={index}>
                  <div className='post-reviews-content-details-imgBx'>
                    <img src={singleUserProfile?.selectedFile || userImg} alt='user img' />
                  </div>
                  <div className='post-reviews-content-details-review'>
                    <div>
                      <h3>{singleUser?.firstName} {singleUser?.lastName}</h3>
                      <small>{moment.utc(result?.createdAt).local().fromNow()}</small>
                    </div>
                    <div className='post-reviews-content-details-review-text'>
                      {result?.review}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {userData && authData?.result?.username ? (
              <div className='post-reviews-content-form'>
                <form className='post-review-form-container' onSubmit={handleSubmit} autoComplete="off">
                  <div className='post-review-form-container-title'>
                    <h3>write a review</h3>
                  </div>
                  <FormField textareaType maxLength={1000} labelName="Review" name="review" value={postData.review} handleChange={handleChange} isLoadingBtn={isLoadingBtn.review} isValid={isValid.review} errors={reviewErrors || []} />

                  <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Sending...</> : "Submit"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />
                  {errorMessage && <p className='error-msg'>{errorMessage}</p>}
                </form>
              </div>
            ): (
              <div className='post-reviews-login-wrapper'>
                <Button buttonClickWrap="link-wrapper" onClickButton onClickNavigate={handleModalLoginAccount} onClickName="Login to write a review"/>
                {!authData && loginModalPopUp && <LoginModal onSuccessLogin={handleSuccessLogin} />}
              </div>
            )}
          </div>
        </div>
    </>
  )
}

export default PostReviews