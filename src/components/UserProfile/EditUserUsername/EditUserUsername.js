import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { usersValidateUsername } from '../../validations/users/usersProfile';
import { actionFetchUsers, actionUpdateUser } from '../../../actions/users';
import { profile } from '../../../assets';
import {FormField, Button, Loader} from '../..';
import SubmitPopUp from '../../ModalPopUps/SubmitPopUp/SubmitPopUp';

import './editUserUsername.css'

const EditUserUsername = ({id, userData}) => {
    const dispatch                                    = useDispatch();
    const { getAllUsers, singleUser, currentPage }    = useSelector((state) => state.userList);
    const [onOpen, setOnOpen]                         = useState(false);
    const [savingInfo, setSavingInfo]                 = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]     = useState(true);
    const [usernameErrors, setUsernameErrors]         = useState(null);
    const [errorMessage, setErrorMessage]             = useState(null);
    
    const [ postData, setPostData ]           = useState({username: userData?.username || ''})
    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({username: false})
    const [ isValid, setIsValid ]             = useState({username: false})

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

        setUsernameErrors(usernameErrors)

        const hasErrors = () => {
          // Check if any error exists in the form data
          if (usernameErrors.length > 0) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, getAllUsers, singleUser]);

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
              setErrorMessage(response.data.message);
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
          <FormField inputType type="text" labelName="username" name="username" value={postData.username} handleChange={handleChange} isLoadingBtn={isLoadingBtn.username} isValid={isValid.username} errors={usernameErrors || []} />

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={profile} prompt="Are you sure you want to update account" />
          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserUsername