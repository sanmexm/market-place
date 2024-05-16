import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {Button, FormField, Loader, SubmitPopUp} from '../../..'
import { PhotoRoundedIcon, postCategoryOption, postTagOption, postTypeOption } from '../../../../utils/constants'
import { postValidateCategory, postValidateDescription, postValidatePostType, postValidatePrice, postValidateSelectedFile, postValidateStoreName, postValidateTag, postValidateTitle } from '../../../validations/posts/createPost'
import { actionCreatePost } from '../../../../actions/posts'
import { create } from '../../../../assets'
import { actionFetchStoresByUser } from '../../../../actions/stores'

import './createPostMainItem.css'

const CreatePostMainItem = () => {
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
    const [productImg, setProductImg]                   = useState(null);
    const [selectedFileErrors, setSelectedFileErrors]   = useState(null);
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
        setStoreMenuOptions([{_id: '', name: ''}, ...getStoresByUser]);
      }
    }, [getStoresByUser]);
    
    const [postData, setPostData]             = useState({userId: userId, storeName: '', postType: '', selectedFile: '', selectedFileImages: '', title: '', category: '', tag: '', price: '', description: ''})
    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({postType: false, storeName: false, selectedFile: false, selectedFileImages: false, title: false, category: false, tag: false, price: false, description: false})
    const [ isValid, setIsValid ]             = useState({postType: false, storeName: false, selectedFile: false, selectedFileImages: false, title: false, category: false, tag: false, price: false, description: false})

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

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageBase64 = reader.result.split(",")[1]; // remove the data URI scheme prefix
        const extension = file.name.split(".").pop(); // get the image extension
        const dataURI = `data:image/${extension};base64,${imageBase64}`; // add the data URI scheme prefix with the image extension
        setPostData({...postData, selectedFile: dataURI});
      };
    };

    const handleMultipleFileChange = (event) => {
      const files = event.target.files;
      const fileArray = [];
    
      // Check if the number of selected files exceeds the maximum allowed (10 in your case)
      if (files.length > 10) {
        alert('You can only select a maximum of 10 files.');
        event.target.value = ''; // Clear the input to remove the excess files.
        return;
      }
    
      // Loop through the selected files and process them
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
    
        reader.onload = () => {
          const imageBase64 = reader.result.split(',')[1]; // remove the data URI scheme prefix
          const extension = file.name.split('.').pop(); // get the image extension
          const dataURI = `data:image/${extension};base64,${imageBase64}`; // add the data URI scheme prefix with the image extension
          fileArray.push(dataURI);
    
          // If all files have been processed, update the state
          if (fileArray.length === files.length) {
            setPostData({ ...postData, selectedFileImages: fileArray });
          }
        };
    
        reader.readAsDataURL(file);
      }
    };    
  
    const handleProductImageUpload = (e) => {
      const file = e.target.files[0]
  
      transformFile(file)
    }
  
    const transformFile = (file) => {
      const reader = new FileReader()
  
      if(file){
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setProductImg(reader.result)
        }
      }else{
        setProductImg("")
      }
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

      const validateSelectedFile = () => {
        const { isValid, errors } = postValidateSelectedFile(debouncedPostData.selectedFile);
        setIsValid((prevState) => ({
          ...prevState,
          selectedFile: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          selectedFile: false,
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
      
      const storeNameErrors     = validateStoreName()
      const postTypeErrors      = validatePostType();
      const selectedFileErrors  = validateSelectedFile();
      const titleErrors         = validateTitle();
      const categoryErrors      = validateCategory();
      const tagErrors           = validateTag()
      const priceErrors         = validatePrice();
      const descriptionErrors   = validateDescription();

      setStoreNameErrors(storeNameErrors)
      setPostTypeErrors(postTypeErrors)
      setSelectedFileErrors(selectedFileErrors)
      setTitleErrors(titleErrors)
      setCategoryErrors(categoryErrors)
      setTagErrors(tagErrors)
      setPriceErrors(priceErrors)
      setDescriptionErrors(descriptionErrors)

      const hasErrors = () => {
        // Check if any error exists in the form data
        if (storeNameErrors.length > 0 || postTypeErrors.length > 0 || selectedFileErrors.length > 0 || titleErrors.length > 0 || categoryErrors.length > 0 || tagErrors.length > 0 || priceErrors.length > 0 || descriptionErrors.length > 0) {
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
        const response = await dispatch(actionCreatePost(postData));
        try{
          if (response.success === true) {
            toast.success("post created successfully")
            setErrorMessage(null);
            setPostData({selectedFile: '', selectedFileImages: '', title: '', category: '', tag: '', price: '', description: ''})
            setProductImg(null)
            setSelectedFileErrors(null)
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

          <div className='reg-image-group'>
            <div onChange={handleProductImageUpload}>
              <FormField fileInputType name="selectedFile" handleChange={handleFileChange} isLoadingBtn={isLoadingBtn.selectedFile} isValid={isValid.selectedFile} errors={selectedFileErrors || []} />
            </div>
            <div className='reg-image-preview-wrapper'>
              {productImg ? <img src={productImg} alt={productImg} />  : <span><PhotoRoundedIcon /></span>}
            </div>
          </div>

          {postData.selectedFileImages && postData.selectedFileImages.length > 0 && (
            <small className='count-selected-images'>{`${postData.selectedFileImages.length} image(s) selected`}</small>
          )}
          <FormField multipleFileInputType name="selectedFileImages" handleChange={handleMultipleFileChange} isLoadingBtn={isLoadingBtn.selectedFileImages} isValid={isValid.selectedFileImages} errors={selectedFileErrors || []} />

          <FormField inputType type="text" labelName="Title" name="title" value={postData.title} handleChange={handleChange} isLoadingBtn={isLoadingBtn.title} isValid={isValid.title} errors={titleErrors || []} />

          <FormField selectType labelName="Category" name="category" value={postData.category} handleChange={handleChange} options={postCategoryOption} isLoadingBtn={isLoadingBtn.category} isValid={isValid.category} errors={categoryErrors || []} />

          <FormField selectType labelName="Tags" name="tag" value={postData.tag} handleChange={handleChange} options={postTagOption} isLoadingBtn={isLoadingBtn.tag} isValid={isValid.tag} errors={tagErrors || []} />

          <FormField inputType type="text" labelName="Price" name="price" value={postData.price} handleChange={handleChange} isLoadingBtn={isLoadingBtn.price} isValid={isValid.price} errors={priceErrors || []} />

          <FormField textareaType labelName="Description" name="description" value={postData.description} handleChange={handleChange} isLoadingBtn={isLoadingBtn.description} isValid={isValid.description} errors={descriptionErrors || []} />

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={create} prompt="Are you sure you want to create post" />
          <Button onClickButton onClick={handleModalSubmit} buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Posting...</> : "Create"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
      </form>
    </>
  )
}

export default CreatePostMainItem