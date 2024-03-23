import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { userValidatePassword, userValidateUsername } from '../../components/validations/users/usersLogin';
import { actionSignin } from '../../actions/auth';
import { Helmet } from 'react-helmet-async';
import { Button, FormField, Loader } from '../../components';
import { VisibilityIcon, VisibilityOffIcon } from '../../utils/constants';

import './account.css'

const Login = () => {
    const pageName                                 = "Login"
    const dispatch                                 = useDispatch();
    const location                                 = useLocation();
    const [hideShow, setHideShow]                  = useState(false);
    const [savingInfo, setSavingInfo]              = useState(false);
    const [usernameErrors, setUsernameErrors]      = useState(null);
    const [passwordErrors, setPasswordErrors]      = useState(null);
    const [isButtonDisabled, setIsButtonDisabled]  = useState(true);
    const [errorMessage, setErrorMessage]          = useState(false);

    const [postData, setPostData]                  = useState({ username: '', password: '' })
    const [isLoadingBtn, setIsLoadingBtn]          = useState({ username: false, password: false })
    const [isValid, setIsValid]                    = useState({ username: false, password: false })

    // State to track whether the user is redirected from the registration page
    const [isRegistered, setIsRegistered]          = useState(false);

    useEffect(() => {
      //this is coming from the action method to ensure that the user gets the registration message 
      const queryParams = new URLSearchParams(location.search);
      if (queryParams.get("verification") === "true") {
        setIsRegistered(true);
      }
    }, [location.search]);

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

    const debouncedPostData          = useDebounce(postData, 500)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setIsLoadingBtn((prevState) => ({ ...prevState, [name]: true }));
      setPostData((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
      const validateUsername = () => {
        const { isValid, errors } = userValidateUsername(debouncedPostData.username);
        setIsValid((prevState) => ({
          ...prevState,
          username: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          username: false,
        }));
        return errors;
      };

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

      const usernameErrors = validateUsername();
      const passwordErrors = validatePassword();

      setUsernameErrors(usernameErrors);
      setPasswordErrors(passwordErrors);

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( usernameErrors.length > 0 || passwordErrors.length > 0 ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData]);

    const handleSubmit = async(e) => {
    e.preventDefault();
      setSavingInfo(true);
      const response = await dispatch(actionSignin(postData, location))
      if(response?.status === 400 || response?.status === 404){
        setErrorMessage(response.data.message)
        setSavingInfo(false);
      }else{
        setSavingInfo(true);
        setErrorMessage(false)
      }
    }

  return (
    <>
      <Helmet><title>{pageName}</title></Helmet>
      <div className='account-container'>
        <form className='account-login-container' onSubmit={handleSubmit} autoComplete="off" >
          <div className='account-login-container-title'>
            <h3>Login</h3>
          </div>

          <div className='account-login-input-btn-pass-container'>
            <FormField inputType type="text" labelName="Username" name="username" value={postData.username} handleChange={handleChange} isLoadingBtn={isLoadingBtn.username} isValid={isValid.username} errors={usernameErrors || []} />

            <div className='account-login-group-wrapper'>
              <FormField inputType type={hideShow ? 'text' : 'password'} labelName="Password" name="password" value={postData.password} handleChange={handleChange} isLoadingBtn={isLoadingBtn.password} isValid={isValid.password} errors={passwordErrors || []} />
              <div className='account-login-show-hide-pass-container'>
                  <span className={ postData.password.length > 0 ? 'show-hide-password unlock' : 'show-hide-password' } onClick={() => setHideShow((prev) => !prev)}>{hideShow ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
              </div>
            </div>

            <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Signing in...</> : "Sign in"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />
            
            {errorMessage && (
              <div className="form-response-message">
                <p className="error-msg">{errorMessage}</p>
              </div>
            )}
            {isRegistered && (
              <div className="registration-success-message">
                <p className="success-msg">Your registration was successful. Please check your email to verify your account.</p>
              </div>
            )}
          </div>
          <Link className='forgot-password' to="/forgot-password">forgot password?</Link>
          <div className='have-account-wrapper'>
              <span>Don't have an account?</span>
              <Link className='account-reg-log' to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login