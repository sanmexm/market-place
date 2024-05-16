import React, { useEffect, useState } from 'react'
import { actionFetchUsers, actionUpdateUser, actionUpdateUserEmail } from '../../../actions/users';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { usersValidateEmailAddress } from '../../validations/users/usersProfile';
import SubmitPopUp from '../../ModalPopUps/SubmitPopUp/SubmitPopUp';
import {Button, FormField, Loader} from '../..';
import { profile } from '../../../assets';

import './editUserEmailAddress.css'
import { setAuthLogout } from '../../../reducers/authSlice';

const EditUserEmailAddress = ({id, userData}) => {
    const [authData]                                  = useState(JSON.parse(localStorage.getItem('authData')));
    const [user, setUser]                             = useState(authData)
    const dispatch                                    = useDispatch();
    const { getAllUsers, singleUser, currentPage }    = useSelector((state) => state.userList);
    const [onOpen, setOnOpen]                         = useState(false);
    const [savingInfo, setSavingInfo]                 = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]     = useState(true);
    const [emailAddressErrors, setEmailAddressErrors] = useState(null);
    const [errorMessage, setErrorMessage]             = useState(null);
    
    const [ postData, setPostData ]           = useState({emailAddress: userData?.emailAddress})
    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({emailAddress: false})
    const [ isValid, setIsValid ]             = useState({emailAddress: false})

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
        const emailAddressErrors     = validateEmailAddress()

        setEmailAddressErrors(emailAddressErrors)

        const hasErrors = () => {
          // Check if any error exists in the form data
          if (emailAddressErrors.length > 0) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, getAllUsers, singleUser]);

    const logoutUser = () => {
        dispatch(setAuthLogout())
        localStorage.clear()
        setUser(null)
        window.location.replace('/login?verification=true');
      }

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
        logoutUser();
        const response = await dispatch(actionUpdateUserEmail(id, postData))
          try{
            if (response.success === true) {
                toast.success("Account updated successfully")
                setErrorMessage(null);
                setSavingInfo(false);
                logoutUser();
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
          <FormField inputType type="text" labelName="email address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoadingBtn={isLoadingBtn.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={profile} prompt="Are you sure you want to update account" />
          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserEmailAddress