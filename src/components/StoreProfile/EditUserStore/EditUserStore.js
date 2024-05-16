import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import {Button, FormField, Loader, SubmitPopUp} from '../..'
import { postValidateDescription, postValidateTitle } from '../../validations/stores/editStore'
import { actionUpdateStore } from '../../../actions/stores'
import { stores } from '../../../assets'

import './editUserStore.css'

const EditUserStore = ({id, getStoreItemsById}) => {
  const authData                                  = JSON.parse(localStorage.getItem('authData'))
  const userUniqueId                              = authData?.result?._id
  const dispatch                                  = useDispatch();
  const [savingInfo, setSavingInfo]               = useState(false);
  const [isButtonDisabled, setIsButtonDisabled]   = useState(true);
  const [titleErrors, setTitleErrors]             = useState(null);
  const [descriptionErrors, setDescriptionErrors] = useState(null);
  const [errorMessage, setErrorMessage]           = useState(null);
  const [onOpen, setOnOpen]                       = useState(false);
  
  const [postData, setPostData]                   = useState({userId: userUniqueId, title: getStoreItemsById.result?.title || '', description: getStoreItemsById.result?.description || ''})
  const [isLoadingBtn, setIsLoadingBtn]           = useState({title: false, description: false})
  const [isValid, setIsValid ]                    = useState({title: false, description: false})

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
    const validateTitle = () => {
      const { isValid, errors } = postValidateTitle(debouncedPostData.title);
      setIsValid((prevState) => ({
        ...prevState,
        title: isValid,
      }));
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        title: false,
      }));
      return errors;
    }

    const validateDescription = () => {
      const { isValid, errors } = postValidateDescription(debouncedPostData.description);
      setIsValid((prevState) => ({
        ...prevState,
        description: isValid,
      }));
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        description: false,
      }));
      return errors;
    }

    const titleErrors         = validateTitle();
    const descriptionErrors   = validateDescription();

    setTitleErrors(titleErrors)
    setDescriptionErrors(descriptionErrors)

    const hasErrors = () => {
      // Check if any error exists in the form data
      if (titleErrors.length > 0 || descriptionErrors.length > 0) {
        return true;
      } else{
        return false;
      }
    };
    const hasFormErrors = hasErrors();
    setIsButtonDisabled(hasFormErrors);

  }, [debouncedPostData, getStoreItemsById]);

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
      const response = await dispatch(actionUpdateStore(id, postData))
        try{
          if (response.success === true) {
            toast.success("Store updated successfully")
            setErrorMessage(null);
            setPostData({name: getStoreItemsById.result?.name || '', title: getStoreItemsById.result?.title || '', description: getStoreItemsById.result?.description || ''})
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
      <div className='edit-user-store-wrapper'>
        <form className='edit-user-store-form' onSubmit={handleSubmit} autoComplete="off">
          <FormField inputType type="text" labelName="Store Description" name="title" value={postData.title} handleChange={handleChange} isLoadingBtn={isLoadingBtn.title} isValid={isValid.title} errors={titleErrors || []} />

          <FormField textareaType labelName="store title" name="description" value={postData.description} handleChange={handleChange} isLoadingBtn={isLoadingBtn.description} isValid={isValid.description} errors={descriptionErrors || []} />

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={stores} prompt="Are you sure you want  to update store details?" />
          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserStore