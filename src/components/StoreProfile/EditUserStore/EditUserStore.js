import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Button, FormField, Loader} from '../..'
import { postValidateDescription, postValidateName, postValidateTitle } from '../../validations/stores/editStore'

import './editUserStore.css'

const EditUserStore = () => {
  const authData                                  = JSON.parse(localStorage.getItem('authData'))
  const userUniqueId                              = authData?.result?._id
  const { getAllStores, singleStore }               = useSelector((state) => state.storeList);
  const dispatch                                  = useDispatch();
  const [savingInfo, setSavingInfo]               = useState(false);
  const [isButtonDisabled, setIsButtonDisabled]   = useState(true);
  const [nameErrors, setNameErrors]               = useState(null);
  const [titleErrors, setTitleErrors]             = useState(null);
  const [descriptionErrors, setDescriptionErrors] = useState(null);
  const [errorMessage, setErrorMessage]           = useState(null);
  
  const [postData, setPostData]                   = useState({userId: userUniqueId, name: '', title: '', description: ''})
  const [isLoadingBtn, setIsLoadingBtn]           = useState({name: false, title: false, description: false})
  const [isValid, setIsValid ]                    = useState({name: false, title: false, description: false})

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
    const validateName = () => {
      const { isValid, errors } = postValidateName(debouncedPostData.name);
      setIsValid((prevState) => ({
        ...prevState,
        name: isValid,
      }));
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        name: false,
      }));
      return errors;
    };

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

    const nameErrors          = validateName();
    const titleErrors         = validateTitle();
    const descriptionErrors   = validateDescription();

    setNameErrors(nameErrors)
    setTitleErrors(titleErrors)
    setDescriptionErrors(descriptionErrors)

    const hasErrors = () => {
      // Check if any error exists in the form data
      if ( nameErrors.length > 0 || titleErrors.length > 0 || descriptionErrors.length > 0) {
        return true;
      } else{
        return false;
      }
    };
    const hasFormErrors = hasErrors();
    setIsButtonDisabled(hasFormErrors);

  }, [debouncedPostData, getAllStores, singleStore])

  useEffect(() => {
    setPostData({name: singleStore?.name || '', title: singleStore?.title || '', description: singleStore?.description || ''});
  }, [singleStore]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const returnConfirm = window.confirm('Are you sure you want to edit store?')
    if(returnConfirm){
      setSavingInfo(true);
      console.log(postData)
      // const response = await dispatch(actionCreatePost(postData))
      // try{
      //   if (response.success === true) {
      //     toast.success("post created successfully")
      //     setErrorMessage(null);
      //     setPostData({selectedFile: '', selectedFileImages: '', title: '', category: '', tag: '', price: '', description: ''})
      //     setSavingInfo(false)
      //   } else if (response.status === 401) {
      //     setErrorMessage(response.data.message);
      //     setSavingInfo(false)
      //   } else if(response.status === 400){
      //     setErrorMessage(response.data.message);
      //     setSavingInfo(false)
      //   }
      // }catch(error){
      //   setErrorMessage(error.response.status)
      //   setErrorMessage("unable to upload data, please check your internet and try again")
      //   setSavingInfo(false)
      // }
    }
  }

  return (
    <>
      <div className='edit-user-profile-wrapper'>
        <h1>{singleStore?.name}</h1>
        <form className='edit-user-profile-form' onSubmit={handleSubmit} autoComplete="off">
          <FormField inputType type="text" labelName="store name" name="name" value={postData.name} handleChange={handleChange} isLoadingBtn={isLoadingBtn.name} isValid={isValid.name} errors={nameErrors || []} />

          <FormField inputType type="text" labelName="Store Description" name="title" value={postData.title} handleChange={handleChange} isLoadingBtn={isLoadingBtn.title} isValid={isValid.title} errors={titleErrors || []} />

          <FormField textareaType labelName="store Description" name="description" value={postData.description} handleChange={handleChange} isLoadingBtn={isLoadingBtn.description} isValid={isValid.description} errors={descriptionErrors || []} />

          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserStore