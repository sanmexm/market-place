import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { VisibilityIcon, VisibilityOffIcon } from '../../../utils/constants'
import {Button, FormField, Loader, SubmitPopUp} from '../..'
import { actionFetchUsers, actionUpdateUser } from '../../../actions/users'
import { usersValidateConfirmPassword, usersValidatePassword } from '../../validations/users/usersProfile'
import { profile } from '../../../assets'

import './editUserPassword.css'

const EditUserPassword = ({id}) => {
    const dispatch                                          = useDispatch();
    const { singleUser, currentPage  }                      = useSelector((state) => state.userList);
    const [onOpen, setOnOpen]                               = useState(false);
    const [hideShow, setHideShow]                           = useState(false);
    const [savingInfo, setSavingInfo]                       = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]           = useState(true);
    const [passwordErrors, setPasswordErrors]               = useState(null);
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState(null);
    const [errorMessage, setErrorMessage]                   = useState(null);
    
    const [ postData, setPostData ]           = useState({password: '', confirmPassword: ''})
    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({password: false, confirmPassword: false})
    const [ isValid, setIsValid ]             = useState({password: false, confirmPassword: false})

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

    const debouncedPostData = useDebounce(postData, 500)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setIsLoadingBtn((prevState) => ({ ...prevState, [name]: true }));
      setPostData((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
      dispatch(actionFetchUsers(currentPage)); // You can pass the page number as needed
    }, [dispatch, currentPage]);

    useEffect(() => {
        const validatePassword = () => {
          const { isValid, errors } = usersValidatePassword(debouncedPostData.password);
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
          const { isValid, errors } = usersValidateConfirmPassword(debouncedPostData);
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

        const passwordErrors         = validatePassword()
        const confirmPasswordErrors  = validateConfirmPassword()

        setPasswordErrors(passwordErrors)
        setConfirmPasswordErrors(confirmPasswordErrors)

        const hasErrors = () => {
          // Check if any error exists in the form data
          if (passwordErrors.length > 0 || confirmPasswordErrors.length > 0) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, singleUser]);

    useEffect(() => {
      setPostData({password: '', confirmPassword: '',});
    }, [singleUser]);

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
        const response = await dispatch(actionUpdateUser(id, postData))
          try{
            if (response.success === true) {
              toast.success("Account updated successfully")
              setErrorMessage(null);
              setSavingInfo(false)
            } else if (response.status === 400) {
              setErrorMessage(response.errorMessage);
            }
          }catch(error){
            setErrorMessage(error.response.status)
            setErrorMessage("unable to upload data, please check your internet and try again")
            setSavingInfo(false)
          }
      setOnOpen(false); // Close the modal after confirmation
    };

  return (
    <>
      <div className='edit-user-profile-wrapper'>
        <form className='edit-user-profile-form' onSubmit={handleSubmit} autoComplete="off">
          <div className='account-login-group-wrapper'>
            <FormField inputType type={hideShow ? 'text' : 'password'} labelName="password" name="password" value={postData.password} handleChange={handleChange} isLoadingBtn={isLoadingBtn.password} isValid={isValid.password} errors={passwordErrors || []} />
            <div className='account-login-show-hide-pass-container'>
                <span className={ postData.password.length > 0 ? 'show-hide-password unlock' : 'show-hide-password' } onClick={() => setHideShow((prev) => !prev)}>{hideShow ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
            </div>
          </div>

          <FormField inputType type={hideShow ? 'text' : 'password'} labelName="confirm password" name="confirmPassword" value={postData.confirmPassword} handleChange={handleChange} isLoadingBtn={isLoadingBtn.confirmPassword} isValid={isValid.confirmPassword} errors={confirmPasswordErrors || []} />

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={profile} prompt="Are you sure you want to update account" />
          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />
          {errorMessage && (
            <div className="form-response-message">
              <p className="error-msg">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default EditUserPassword