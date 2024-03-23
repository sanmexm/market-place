import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionVerifyUserRegEmail } from '../../actions/users'
import { BlockRoundedIcon, CheckCircleOutlineRoundedIcon } from '../../utils/constants'
import { Button, Loader } from '../../components'
import './verifyEmail.css'

const VerifyEmail = () => {
  const { id, emailToken }                   = useParams();
  const [savingInfo, setSavingInfo]          = useState(false);
  const [successMessage, setSuccessMessage]  = useState(false);
  const [errorMessage, setErrorMessage]      = useState(false);
  const dispatch                             = useDispatch();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        setSavingInfo(true);
        const response = await dispatch(actionVerifyUserRegEmail(id, emailToken));
        if (response.status === 200) {
          // Password reset successful, show success message from response
          setSuccessMessage(response.data.successMessage);
          setErrorMessage(null); // Clear any previous error message
        } else if (response.status === 400) {
          // Display appropriate error message based on the response
          setSuccessMessage(null);
          setErrorMessage(response.data.data.message);
          console.log(response);
        }
      } catch (error) {
        // console.log("Axios error:", error);
        setErrorMessage("Your Account has already been verified");
      } finally{
        setSavingInfo(false);
      }
    };
    verifyEmailUrl();
  }, [id, emailToken, dispatch]);

  return (
    <>
      {(successMessage) ? (
        <div className='verify-wrapper'>
          <div className='verify-form-container'>
            <div className='verify-detail'>
              <div className="verify-svg-wrapper verified"><CheckCircleOutlineRoundedIcon /></div>
              <h3>Verified status</h3>
              <span>Your account is successfully verified</span>
            </div>
            <Button linkButton linkTo="/login" linkClass="link-wrapper" linkName="Login" />
          </div>
        </div>
      ) : (errorMessage) ? (
        <div className='verify-wrapper'>
          <div className='verify-form-container'>
            <div className='verify-detail'>
              <div className="verify-svg-wrapper unverified"><BlockRoundedIcon /></div>
              <h3>Verified status</h3>
              <span>{errorMessage}</span>
            </div>
            <Button linkButton linkTo={`/resend-verification?verification=false`} linkClass="link-wrapper" linkName="Resend Verification" />
          </div>
        </div>
      ) : (
        <>
          {savingInfo && (
            <div className='verify-wrapper'>
              <div className='verify-form-container'>
                <Loader />
                <h1>Verifying your email...</h1>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default VerifyEmail