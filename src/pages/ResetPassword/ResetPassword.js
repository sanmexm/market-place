import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { KeyboardBackspaceRoundedIcon, PasswordRoundedIcon, VisibilityIcon, VisibilityOffIcon } from '../../utils/constants'
import { Button, FormField, Loader, SubmitPopUp } from '../../components'
import { userValidatePassword, userValidateConfirmPassword } from '../../components/validations/users/forgotUserValidateAccount'
import { actionUpdatePassword } from '../../actions/users'
import './resetPassword.css'
import { padlock } from '../../assets'

const ResetPassword = () => {
    const { id, emailAddress }                                = useParams()
    const dispatch                                            = useDispatch();
    const [hideShow, setHideShow]                             = useState(false);
    const [savingInfo, setSavingInfo]                         = useState(false);
    const [onOpen, setOnOpen]                                 = useState(false)
    const [passwordErrors, setPasswordErrors]                 = useState(null);
    const [confirmPasswordErrors, setConfirmPasswordErrors]   = useState(null);
    const [isButtonDisabled, setIsButtonDisabled]             = useState(true);
    const [successMessage, setSuccessMessage]                 = useState(false);
    const [errorMessage, setErrorMessage]                     = useState(false);
    
    const [postData, setPostData]          = useState({password: '', confirmPassword: ''})
    const [isLoadingBtn, setIsLoadingBtn]  = useState({password: false, confirmPassword: false})
    const [isValid, setIsValid]            = useState({password: false, confirmPassword: false})

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
        const validatePassword = () => {
          const { isValid, errors } = userValidatePassword(debouncedPostData.password);
          setIsValid((prevState) => ({
            ...prevState,
            password: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            password: false,
          }));
          return errors;
        };
  
        // the confirm password function should connect from the postData since you're comparing two fields
        const validateConfirmPassword = () => {
          const { isValid, errors } = userValidateConfirmPassword(debouncedPostData);
          setIsValid((prevState) => ({
            ...prevState,
            confirmPassword: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            confirmPassword: false,
          }));
          return errors;
        };

        const passwordErrors         = validatePassword();
        const confirmPasswordErrors  = validateConfirmPassword();

        setPasswordErrors(passwordErrors);
        setConfirmPasswordErrors(confirmPasswordErrors);
  
        const hasErrors = () => {
          // Check if any error exists in the form data
          if (passwordErrors.length > 0 || confirmPasswordErrors.length > 0 ) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData]); 
      
    const handleModalSubmit = () => {
      setOnOpen(true)
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      handleModalSubmit()
    }

    const cancelPostCreation = () => {
      setOnOpen(false); // Close the modal
      setSavingInfo(false);
    };

    const confirmPostCreation = async() => {
      setSavingInfo(true);
      const response = await dispatch(actionUpdatePassword(id, postData));
      try {
        if (response.status === 200) {
          // Password reset successful, show success message from response
          setSuccessMessage(response.data.successMessage);
          setErrorMessage(null); // Clear any previous error message
        } else if (response.status === 400) {
          // Display appropriate error message based on the response
          setSuccessMessage(null);
          setErrorMessage(response.data.data.message);
        }
      } catch (error) {
          // console.log("Axios error:", error);
          setErrorMessage("An unexpected error occurred.");
          setSavingInfo(false);
          // Handle any other error that might occur during the API call
      }
      setOnOpen(false); // Close the modal after confirmation
    };

  return (
    <>
        <Helmet><title>Reset Password</title></Helmet>
        <div className='reset-password-wrapper'>
        <div className='reset-password-form-container'>
          <div className='reset-password-detail'>
            <div className="reset-password-svg-wrapper"><PasswordRoundedIcon /></div>
              <h3>Set new Password</h3>
              <span>Your new password must be different from the previously used password.</span>
              <div>password update for <span>{emailAddress}</span> </div>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            {(successMessage) ? (
              <>
                {successMessage && (
                  <div className="form-response-message">
                    <p className="success-msg">{successMessage}</p>
                  </div>
                )}
              </>
            ) : (
              <div className='account-login-group-wrapper'>
                <div className='account-login-group-wrapper'>
                  <FormField inputType type={hideShow ? 'text' : 'password'} labelName="Password" name="password" value={postData.password} handleChange={handleChange} isLoadingBtn={isLoadingBtn.password} isValid={isValid.password} errors={passwordErrors || []} />
                  <div className='account-login-show-hide-pass-container'>
                      <span className={ postData.password.length > 0 ? 'show-hide-password unlock' : 'show-hide-password' } onClick={() => setHideShow((prev) => !prev)}>{hideShow ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                  </div>
                </div>
                <FormField inputType type={hideShow ? 'text' : 'password'} labelName="Confirm Password" name="confirmPassword" value={postData.confirmPassword} handleChange={handleChange} isLoadingBtn={isLoadingBtn.confirmPassword} isValid={isValid.confirmPassword} errors={confirmPasswordErrors || []} />

                <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={padlock} prompt="Are you sure you want to reset password" />
                <Button
                  onClickButton
                  buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`}
                  onClickName={savingInfo ? <>{<Loader />} Updating password...</> : "Reset Password"}
                  isButtonDisabled={isButtonDisabled}
                  buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo}
                />
                <div className='forgot-password-have-account-wrapper'>
                  <Link className='forgot-password-account-reg-log' to="/login">
                    <KeyboardBackspaceRoundedIcon /> Back to log in
                  </Link>
                </div>
                {errorMessage && (
                  <div className="form-response-message">
                    <p className="error-msg">{errorMessage}</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword