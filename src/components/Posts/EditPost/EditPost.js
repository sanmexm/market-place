import React, { useEffect, useState } from 'react'
import {Button, FormField, Loader, SubmitPopUp} from '../..'
import { actionUpdatePost } from '../../../actions/posts'
import toast from 'react-hot-toast'
import { actionFetchStoresByUser } from '../../../actions/stores'
import { useDispatch, useSelector } from 'react-redux'
import { postCategoryOption, postTagOption, postTypeOption } from '../../../utils/constants'
import { create } from '../../../assets'
import { postValidateCategory, postValidatePostType, postValidatePrice, postValidateStoreName, postValidateTag } from '../../validations/posts/createPost'
import { postValidateDescription, postValidateTitle } from '../../validations/stores/editStore'

import './editPost.css'

const EditPost = ({id, singlePost, storeProfileData}) => {
    const authData                                      = JSON.parse(localStorage.getItem('authData'))
    const userId                                        = authData?.result?._id
    const {getStoresByUser}                             = useSelector((state) => state.storeList)
    const dispatch                                      = useDispatch();
    const [savingInfo, setSavingInfo]                   = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]       = useState(true);
    const [onOpen, setOnOpen]                           = useState(false);
    const [storeMenuOptions, setStoreMenuOptions]       = useState(getStoresByUser);
    const [storeNameErrors, setStoreNameErrors]         = useState(null);
    const [postTypeErrors, setPostTypeErrors]           = useState(null);
    const [titleErrors, setTitleErrors]                 = useState(null);
    const [categoryErrors, setCategoryErrors]           = useState(null);
    const [tagErrors, setTagErrors]                     = useState(null);
    const [priceErrors, setPriceErrors]                 = useState(null);
    const [descriptionErrors, setDescriptionErrors]     = useState(null);
    const [errorMessage, setErrorMessage]               = useState(null);

    useEffect(() => {
      dispatch(actionFetchStoresByUser(userId, 1))
    }, [userId, dispatch])

    useEffect(() => {
      if (getStoresByUser) {
        setStoreMenuOptions(getStoresByUser);
      }
    }, [getStoresByUser]);
    
    const [postData, setPostData]             = useState({userId, storeName: storeProfileData?.result?.name || '', postType: singlePost?.postType || '', title: singlePost?.title || '', category: singlePost?.category || '', tag: singlePost?.tag || '', price: singlePost?.price || '', description: singlePost?.description || ''})
    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({postType: false, storeName: false, title: false, category: false, tag: false, price: false, description: false})
    const [ isValid, setIsValid ]             = useState({postType: false, storeName: false, title: false, category: false, tag: false, price: false, description: false})

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
      const validateStoreName = () => {
        const { isValid, errors } = postValidateStoreName(debouncedPostData.storeName, getStoresByUser);
        setIsValid((prevState) => ({
          ...prevState,
          storeName: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          storeName: false,
        }));
        return errors;
      }

      const validatePostType = () => {
        const { isValid, errors } = postValidatePostType(debouncedPostData.postType);
        setIsValid((prevState) => ({
          ...prevState,
          postType: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          postType: false,
        }));
        return errors;
      }

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

      const validateCategory = () => {
        const { isValid, errors } = postValidateCategory(debouncedPostData.category);
        setIsValid((prevState) => ({
          ...prevState,
          category: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          category: false,
        }));
        return errors;
      }
      
      const validateTag = () => {
        const { isValid, errors } = postValidateTag(debouncedPostData.tag);
        setIsValid((prevState) => ({
          ...prevState,
          tag: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          tag: false,
        }));
        return errors;
      }

      const validatePrice = () => {
        const { isValid, errors } = postValidatePrice(debouncedPostData.price);
        setIsValid((prevState) => ({
          ...prevState,
          price: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          price: false,
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
      
      const storeNameErrors     = validateStoreName();
      const postTypeErrors      = validatePostType();
      const titleErrors         = validateTitle();
      const categoryErrors      = validateCategory();
      const tagErrors           = validateTag()
      const priceErrors         = validatePrice();
      const descriptionErrors   = validateDescription();

      setStoreNameErrors(storeNameErrors)
      setPostTypeErrors(postTypeErrors)
      setTitleErrors(titleErrors)
      setCategoryErrors(categoryErrors)
      setTagErrors(tagErrors)
      setPriceErrors(priceErrors)
      setDescriptionErrors(descriptionErrors)

      const hasErrors = () => {
        // Check if any error exists in the form data
        if (storeNameErrors.length > 0 || postTypeErrors.length > 0 || titleErrors.length > 0 || categoryErrors.length > 0 || tagErrors.length > 0 || priceErrors.length > 0 || descriptionErrors.length > 0) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);

    }, [debouncedPostData, getStoresByUser])

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
      setIsButtonDisabled(true)
        const response = await dispatch(actionUpdatePost(id, postData));
        try{
          if (response.success === true) {
            toast.success("post created successfully")
            setErrorMessage(null);
            setPostData({title: '', category: '', tag: '', price: '', description: ''})
            setSavingInfo(false)
          } else if (response.status === 401) {
            setErrorMessage(response.data.message);
            setSavingInfo(false)
          } else if(response.status === 400){
            setErrorMessage(response.data.message);
            setSavingInfo(false)
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
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormField selectType fullNameOption labelName="Store Name" name="storeName" value={postData.storeName} handleChange={handleChange} options={storeMenuOptions} isLoadingBtn={isLoadingBtn.storeName} isValid={isValid.storeName} errors={storeNameErrors || []} />

        <FormField selectType labelName="Post Type" name="postType" value={postData.postType} handleChange={handleChange} options={postTypeOption} isLoadingBtn={isLoadingBtn.postType} isValid={isValid.postType} errors={postTypeErrors || []} />

        <FormField inputType type="text" labelName="Title" name="title" value={postData.title} handleChange={handleChange} isLoadingBtn={isLoadingBtn.title} isValid={isValid.title} errors={titleErrors || []} />

        <FormField selectType labelName="Category" name="category" value={postData.category} handleChange={handleChange} options={postCategoryOption} isLoadingBtn={isLoadingBtn.category} isValid={isValid.category} errors={categoryErrors || []} />

        <FormField selectType labelName="Tags" name="tag" value={postData.tag} handleChange={handleChange} options={postTagOption} isLoadingBtn={isLoadingBtn.tag} isValid={isValid.tag} errors={tagErrors || []} />

        <FormField inputType type="text" labelName="Price" name="price" value={postData.price} handleChange={handleChange} isLoadingBtn={isLoadingBtn.price} isValid={isValid.price} errors={priceErrors || []} />

        <FormField textareaType labelName="Description" name="description" value={postData.description} handleChange={handleChange} isLoadingBtn={isLoadingBtn.description} isValid={isValid.description} errors={descriptionErrors || []} />

        <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={create} prompt="Are you sure you want to update post" />
        <Button onClickButton onClick={handleModalSubmit} buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Posting...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

        {errorMessage && <p className='error-msg'>{errorMessage}</p>}
      </form>
    </>
  )
}

export default EditPost