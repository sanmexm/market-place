import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { KeyboardBackspaceRoundedIcon, LockRoundedIcon } from '../../utils/constants'
import { userValidateEmailAddress } from '../../components/validations/users/forgotUserValidateAccount'
import { Button, FormField, Loader } from '../../components'
import { actionFetchUsers, actionVerifyEmailPassword } from '../../actions/users'
import './forgotPassword.css'

const ForgotPassword = () => {
  const dispatch                                     = useDispatch();
  const [savingInfo, setSavingInfo]                  = useState(false);
  const [emailAddressErrors, setEmailAddressErrors]  = useState(null);
  const [isButtonDisabled, setIsButtonDisabled]      = useState(true);
  const [postData, setPostData]                      = useState({emailAddress: ''})
  const [isLoadingBtn, setIsLoadingBtn]              = useState({emailAddress: false})
  const [isValid, setIsValid]                        = useState({emailAddress: false})
  const [message, setMessage]                        = useState(false);
  const {getAllUsers, currentPage}                   = useSelector((state) => state.userList);

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
    setSavingInfo(true); // Set loading to true to show loading state
    setMessage(false);
    setIsButtonDisabled(true)
  
    try {
      const response = await dispatch(actionVerifyEmailPassword(postData.emailAddress));
      if (response && response.status === 200) {
        setMessage("Email sent, please check your email to reset your password.");
      } else if (response && response.status === 400) {
        setMessage("Admin needs to be verified before changing password");
      } else if(response && response.status === 403) {
        setMessage("Email not sent");
      }
    } catch (error) {
      setMessage("Internal server error");
    } finally {
      setSavingInfo(false); // Set loading to false when the action is complete
    }
  };
    
  return (
    <>
      <Helmet><title>Forgot Password</title></Helmet>
      <div className='forgot-password-wrapper'>
        <div className='forgot-password-form-container'>
          <div className='forgot-password-detail'>
            <div className="forgot-password-svg-wrapper"><LockRoundedIcon /></div>
              <h3>Forgot Password ?</h3>
              <span>No worries, we'll send you reset instructions.</span>
          </div>
          {!message ? (
            <form onSubmit={handleSubmit} autoComplete="off">
              <FormField inputType type="text" labelName="Email Address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoadingBtn={isLoadingBtn.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

              <Button
                onClickButton
                buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`}
                onClickName={savingInfo ? <>{<Loader />} Verifying Email...</> : "Verify Email"}
                isButtonDisabled={isButtonDisabled}
                buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} 
                disabled={savingInfo}
              />

              <div className='forgot-password-have-account-wrapper'>
                <Link className='forgot-password-account-reg-log' to="/login"><KeyboardBackspaceRoundedIcon /> Back to log in</Link>
                <Link to="/resend-verification">Resend Verification</Link>
              </div>
            </form>
          ) : (
            <div className="registration-success-message">
              <p className="success-msg">{message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ForgotPassword