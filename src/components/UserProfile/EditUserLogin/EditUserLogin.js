import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Button, FormField, Loader} from '../..'
import toast from 'react-hot-toast';
import { actionFetchUser, actionUpdateUser } from '../../../actions/users';
import { usersValidateEmailAddress, usersValidateUsername } from '../../validations/users/usersProfile';

import './editUserLogin.css'

const EditUserLogin = () => {
    const dispatch                                    = useDispatch();
    const { id }                                      = useParams();
    const { getAllUsers, singleUser }                 = useSelector((state) => state.userList);
    const [savingInfo, setSavingInfo]                 = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]     = useState(true);
    const [fetchError, setFetchError]                 = useState(false);
    const [usernameErrors, setUsernameErrors]         = useState(null);
    const [emailAddressErrors, setEmailAddressErrors] = useState(null);
    const [errorMessage, setErrorMessage]             = useState(null);
    
    const [ postData, setPostData ]           = useState({username: singleUser?.username || '', emailAddress: singleUser?.emailAddress})

    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({username: false, emailAddress: false})

    const [ isValid, setIsValid ]             = useState({username: false, emailAddress: false})

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
        const validateEmailAddress = () => {
          const { isValid, errors } = usersValidateEmailAddress(debouncedPostData.emailAddress, getAllUsers);
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

        const validateUsername = () => {
          const { isValid, errors } = usersValidateUsername(debouncedPostData.username, getAllUsers);
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

        const usernameErrors         = validateUsername()
        const emailAddressErrors     = validateEmailAddress()

        setUsernameErrors(usernameErrors)
        setEmailAddressErrors(emailAddressErrors)

        const hasErrors = () => {
          // Check if any error exists in the form data
          if (usernameErrors.length > 0 || emailAddressErrors.length > 0) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, getAllUsers, singleUser]);

    useEffect(() => {
      setPostData({username: singleUser?.username || '', emailAddress: singleUser?.emailAddress || ''});
    }, [singleUser]);

    // dispatch(getDoctor(id))
    useEffect(() => {
      dispatch(actionFetchUser(id))
      .then((response) => {
        //this is getting payload and not payload.data in redux, reason for this method
        if(!response) {
          setFetchError(true)
        }
      })
    }, [id, dispatch])

    const handleSubmit = async(e) => {
      e.preventDefault();
      const returnConfirm = window.confirm('Are you sure you want to update profile?')
      if(returnConfirm){
        setSavingInfo(true);
        const response = await dispatch(actionUpdateUser(id, postData))
        try{
          if (response.status === 200) {
            toast.success(response.successMessage)
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
      }
    }

  return (
    <>
      <div className='edit-user-profile-wrapper'>
        <form className='edit-user-profile-form' onSubmit={handleSubmit} autoComplete="off">
          <FormField inputType type="text" labelName="username" name="username" value={postData.username} handleChange={handleChange} isLoadingBtn={isLoadingBtn.username} isValid={isValid.username} errors={usernameErrors || []} />

          <FormField inputType type="text" labelName="email address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoadingBtn={isLoadingBtn.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserLogin