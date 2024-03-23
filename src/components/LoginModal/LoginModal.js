import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {Button, FormField, Loader} from '../'
import { actionModalSignin } from '../../actions/auth'
import { userValidatePassword, userValidateUsername } from '../validations/users/usersLogin'
import { VisibilityIcon, VisibilityOffIcon } from '../../utils/constants'

import './loginModal.css'

const LoginModal = ({onSuccessLogin}) => {
    const dispatch                                 = useDispatch();
    // const [authData, setAuthData]                  = useState(JSON.parse(localStorage.getItem('authData')));
    const modalNavRef                              = useRef()
    const [hideShow, setHideShow]                  = useState(false);
    const [savingInfo, setSavingInfo]              = useState(false);
    const [usernameErrors, setUsernameErrors]      = useState(null);
    const [passwordErrors, setPasswordErrors]      = useState(null);
    const [isButtonDisabled, setIsButtonDisabled]  = useState(true);
    const [errorMessage, setErrorMessage]          = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(true)

    const [postData, setPostData]                  = useState({ username: '', password: '' })
    const [isLoadingBtn, setIsLoadingBtn]          = useState({ username: false, password: false })
    const [isValid, setIsValid]                    = useState({ username: false, password: false })

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

    const closeNavModal = e => {
      if(modalNavRef.current === e.target){
        setLoginModalIsOpen(false)
      }
    }

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
      try {
        const response = await dispatch(actionModalSignin(postData));
        if (response?.status === 400 || response?.status === 404) {
          setErrorMessage(response.data.message);
        } else {
          setLoginModalIsOpen(false);
          onSuccessLogin()
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrorMessage('An error occurred during login');
      } finally {
        setSavingInfo(false);
      }
    }

  return (
    <>
      <div className={loginModalIsOpen ? "modal-container active" : "modal-container"} onClick={closeNavModal} ref={modalNavRef}>
        <div className="modal-account-container">
          <form className='account-modal-login-container' onSubmit={handleSubmit} autoComplete="off">
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
            </div>

            <div className='have-account-wrapper'>
              <span>Don't have an account?</span>
              <Link className='account-reg-log' to="/register">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginModal