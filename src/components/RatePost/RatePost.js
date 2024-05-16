import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StarRateRoundedIcon } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { actionUpdatePostRating } from '../../actions/postRatings'
import { Button, Loader, LoginModal, LoginPopUp, RatePostDataResponse } from '../'
import { actionFetchProfiles } from '../../actions/profiles'
import { useLocation } from 'react-router-dom'

import './ratePost.css'
import toast from 'react-hot-toast'

const RatePost = ({ postId, count, rating, onRating }) => {
    const [authData, setAuthData]                 = useState(JSON.parse(localStorage.getItem('authData')));
    const [userId, setUserId]                     = useState(authData?.result?._id);
    const [loginModalPopUp, setLoginModalPopUp]   = useState(authData)
    const dispatch                                = useDispatch();
    const location                                = useLocation();
    const searchParams                            = new URLSearchParams(location.search);
    const page                                    = searchParams.get("page") || 1
    const { getAllProfiles }                      = useSelector((state) => state.profileList)
    const [postData, setPostData]                 = useState({star: 0})
    const [savingInfo, setSavingInfo]             = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [hoveredRating, setHoveredRating]       = useState(0);
    const [responseData, setResponseData]         = useState(null);
    const [errorMessage, setErrorMessage]         = useState(null);
    const [loginPopUpOpen, setLoginPopUpOpen]     = useState(false);
    
    const handleLoginAccountCancel = () => {
      setLoginPopUpOpen(false);
    };

    useEffect(() => {
      dispatch(actionFetchProfiles(page))
    }, [page, dispatch])

    const handleModalLoginAccount = () => {
      setLoginModalPopUp((prev) => !prev)
    }

    useEffect(() => {
      const newAuthData = JSON.parse(localStorage.getItem('authData'));
      if (newAuthData) {
        setAuthData(newAuthData);
        setUserId(newAuthData?.result?._id);
      }
    }, [loginPopUpOpen]);

    const handleSuccessLogin = () => {
      const storedAuthData = JSON.parse(localStorage.getItem('authData'));
      if (storedAuthData) {
        setLoginPopUpOpen(false);
      }
    };

    useEffect(() => {
      handleSuccessLogin();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(Array.isArray(getAllProfiles) && getAllProfiles.find(profile => profile.userId === userId)){
        setSavingInfo(true);
        setIsButtonDisabled(true);
        try {
          const response = await dispatch(actionUpdatePostRating(postId, userId, postData));
          setResponseData(response);
          toast.success("Rating submitted successfully")
          setSavingInfo(false);
          setIsButtonDisabled(false); // Enable button after successful submission
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        } catch (error) {
          console.error(error);
          setSavingInfo(false);
          setIsButtonDisabled(false); // Enable button if submission fails
        }
      }else{
        setErrorMessage("Please set up your profile before posting a review")
        setLoginPopUpOpen(false);
      }
    };

  return (
    <>
      <div className='rating-wrapper'>
        <h3>Rate this product</h3>
        <form onSubmit={handleSubmit}>
          {Array(count)
            .fill(0)
            .map((_, index) => index + 1)
            .map((index) => (
            <label
              key={index} 
              className={index <= (hoveredRating || rating) ? 'rating-label filled' : 'rating-label unfilled'}
              onMouseEnter={() => setHoveredRating(index)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => {
                if (!authData) {
                  setLoginPopUpOpen(true); // Open login popup if not logged in
                } else {
                  onRating(index);
                  setPostData({ star: index });
                }
              }}
            >
              <StarRateRoundedIcon />
            </label>
          ))}

          {postData.star > 0 && (
            userId && (
              <Button 
                onClickButton
                buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} 
                onClickName={savingInfo ? <>{<Loader />} Submitting...</> : "Submit"} 
                isButtonDisabled={isButtonDisabled} 
                buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} 
                disabled={savingInfo} 
              />
            )
          )}
        </form>
        {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        <LoginPopUp isOpen={loginPopUpOpen} onCancel={handleLoginAccountCancel} onSuccessLogin={handleSuccessLogin} handleModalLoginAccount={handleModalLoginAccount}  />
        {/* <RatePostDataResponse responseData={responseData} postId={postId} /> */}
      </div>
      {!authData && loginModalPopUp && <LoginModal onSuccessLogin={handleSuccessLogin} />}
    </>
  )
}

RatePost.propTypes = {
    count: PropTypes.number,
    star: PropTypes.number,
    onRating: PropTypes.func,
  };
  
RatePost.defaultProps = {
  count: 5,
  star: 0,
};

export default RatePost