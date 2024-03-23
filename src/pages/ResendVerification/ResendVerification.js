import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { MarkEmailReadRoundedIcon } from '../../utils/constants'
import { Button, FormField, Loader } from '../../components'
import { userValidateEmailAddress } from '../../components/validations/users/resendVerification'
import { actionFetchUsers, actionResendVerification } from '../../actions/users'
import './resendVerification.css'

const ResendVerification = () => {
  const dispatch                                     = useDispatch();
  const location                                     = useLocation();
  const [savingInfo, setSavingInfo]                  = useState(false);
  const [emailAddressErrors, setEmailAddressErrors]  = useState(null);
  const [isButtonDisabled, setIsButtonDisabled]      = useState(true);
  const [postData, setPostData]                      = useState({emailAddress: ''})
  const [isLoadingBtn, setIsLoadingBtn]              = useState({emailAddress: false})
  const [isValid, setIsValid]                        = useState({emailAddress: false})
  const [successMessage, setSuccessMessage]          = useState(false);
  const [errorMessage, setErrorMessage]              = useState(false);
  const {getAllUsers, currentPage}                   = useSelector((state) => state.userList);

  // State to track whether the user is redirected from the registration page
  const [isVerification, setIsVerification]          = useState(false);
  useEffect(() => {
    //this is coming from the action method to ensure that the user gets the registration message 
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("verification") === "false") {
      setIsVerification(true);
    }
  }, [location.search]);

  useEffect(() => {
    // Fetch users data when the component mounts
    dispatch(actionFetchUsers(currentPage));
  }, [dispatch, currentPage]);

  //this will prevent the page from breaking
  useEffect(() => {
    // Wait for the users to be fetched before proceeding with validation
  }, [getAllUsers]);

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

  const debouncedPostData          = useDebounce(postData, 500) //postData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsLoadingBtn((prevState) => ({ ...prevState, [name]: true }));
    setPostData((prevState) => ({ ...prevState, [name]: value }));
  }

  useEffect(() => {
    const validateEmailAddress = () => {
      const { isValid, errors } = userValidateEmailAddress(debouncedPostData.emailAddress, getAllUsers);
      setIsValid((prevState) => ({
        ...prevState,
        emailAddress: isValid,
      }));
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        emailAddress: false,
      }));
      return errors;
    };

    const emailAddressErrors     = validateEmailAddress();
    setEmailAddressErrors(emailAddressErrors);

    const hasErrors = () => {
      // Check if any error exists in the form data
      if ( emailAddressErrors.length > 0 ) {
        return true;
      } else{
        return false;
      }
    };
    const hasFormErrors = hasErrors();
    setIsButtonDisabled(hasFormErrors);
  }, [debouncedPostData, getAllUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingInfo(true); // Set loading to true to show loading state
      const response = await dispatch(actionResendVerification(postData.emailAddress));
      if (response && response.status === 200) {
        setSuccessMessage(response.data.message)
        setErrorMessage(null)
      } else if (response && response.status === 400) {
        setSuccessMessage(null)
        setErrorMessage(response.data.message)
      }else {
        setSuccessMessage(null)
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      // console.error(error);
      setSuccessMessage(null)
      setErrorMessage("User is already verified");
    } finally {
      setSavingInfo(false); // Set loading to false when the action is complete
    }
  };

  return (
    <>
      <Helmet><title>Resend Verification</title></Helmet>
      <div className='forgot-password-wrapper'>
        <div className='forgot-password-form-container'>
          <div className='forgot-password-detail'>
            <div className="forgot-password-svg-wrapper"><MarkEmailReadRoundedIcon /></div>
              <h3>Resend Verification</h3>
               {isVerification && (
                  <span>Please Input your Email Address</span>
                )}
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <FormField inputType type="text" labelName="Email Address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoadingBtn={isLoadingBtn.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

            <Button
              onClickButton
              buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`}
              onClickName={savingInfo ? <>{<Loader />} Sending Verification...</> : "Send Verification"}
              isButtonDisabled={isButtonDisabled}
              buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo}
            />
          </form>
          {(successMessage) ? (
            <>
              <div className="form-response-message">
                <p className="success-msg">{successMessage}</p>
              </div>
            </>
          ) : (errorMessage) ? (
            <div className="form-response-message">
              <p className="error-msg">{errorMessage}.</p>
            </div>
          ): (
            <>
              {savingInfo && (
                <div className='resend-wrapper'>
                  <div className='resend-form-container'>
                    <Loader />
                    <h1>Sending verification...</h1>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ResendVerification