import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StarRateRoundedIcon } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { actionUpdatePostRating } from '../../actions/postRatings'
import { Button, Loader, LoginModal, LoginPopUp, RatePostDataResponse } from '../'
import './ratePost.css'

const RatePost = ({ postId, count, rating, onRating }) => {
    const [authData, setAuthData]                 = useState(JSON.parse(localStorage.getItem('authData')));
    const [userId, setUserId]                     = useState(authData?.result?._id);
    const [loginModalPopUp, setLoginModalPopUp]   = useState(authData)
    const dispatch                                = useDispatch();
    const [postData, setPostData]                 = useState({star: 0})
    const [rateMessage, setRateMessage]           = useState(false);
    const [savingInfo, setSavingInfo]             = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [hoveredRating, setHoveredRating]       = useState(0);
    const [responseData, setResponseData]         = useState(null);
    const [loginPopUpOpen, setLoginPopUpOpen]     = useState(false);
    
    const handleLoginAccountCancel = () => {
      setLoginPopUpOpen(false);
    };

    const handleModalLoginAccount = () => {
      setLoginModalPopUp(true)
      // onCancel()
    }

    // useEffect(() => {
    //   if (authData) {
    //     onSuccessLogin(); // Call onSuccessLogin when authData is updated
    //   }
    // }, [authData, onSuccessLogin]);

    useEffect(() => {
      const newAuthData = JSON.parse(localStorage.getItem('authData'));
      if (newAuthData) {
        setAuthData(newAuthData);
        setUserId(newAuthData?.result?._id);
      }
    }, [loginPopUpOpen]);

    // const handleSuccessLogin = () => {
    //   // Update authData state immediately after successful login
    //   setAuthData(JSON.parse(localStorage.getItem('authData')));
    //   // Close the login popup
    //   setLoginModalPopUp(false);
    // };

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
      setRateMessage(false);
      setSavingInfo(true);
      setIsButtonDisabled(true); // Disable button on submission
      // console.log(postId, userId, postData)
      setIsButtonDisabled(false);
      try {
        setRateMessage(true);
        const response = await dispatch(actionUpdatePostRating(postId, userId, postData));
        setResponseData(response);
        setTimeout(() => {
          setRateMessage(null);
        }, 10000);
        setSavingInfo(false);
        setIsButtonDisabled(false); // Enable button after successful submission
      } catch (error) {
        console.error(error);
        setSavingInfo(false);
        setIsButtonDisabled(false); // Enable button if submission fails
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
          {rateMessage && (<p>your rating has been submitted</p>)}
        </form>
        <LoginPopUp isOpen={loginPopUpOpen} onCancel={handleLoginAccountCancel} onSuccessLogin={handleSuccessLogin} handleModalLoginAccount={handleModalLoginAccount}  />
        <RatePostDataResponse responseData={responseData} postId={postId} />
      </div>
      {!authData && loginModalPopUp && <LoginModal onSuccessLogin={handleSuccessLogin} />}
      {/* <LoginPopUp /> */}
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