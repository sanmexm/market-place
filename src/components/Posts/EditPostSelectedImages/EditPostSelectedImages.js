import React, { useEffect, useState } from 'react'

import { Button, FormField, Loader, SubmitPopUp } from '../..'
import './editPostSelectedImages.css'
import toast from 'react-hot-toast'
import { actionUpdatePost } from '../../../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
import { create } from '../../../assets'

const EditPostSelectedImages = ({id, singlePost}) => {
    const authData                                      = JSON.parse(localStorage.getItem('authData'))
    const userId                                        = authData?.result?._id
    const {getStoresByUser}                             = useSelector((state) => state.storeList)
    const dispatch                                      = useDispatch();
    const [savingInfo, setSavingInfo]                   = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]       = useState(true);
    const [onOpen, setOnOpen]                           = useState(false);
    const [selectedFileErrors, setSelectedFileErrors]   = useState(null);
    const [errorMessage, setErrorMessage]               = useState(null);
    
    const [postData, setPostData]             = useState({userId: userId, selectedFileImages: ''})
    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({postType: false, selectedFileImages: false})
    const [ isValid, setIsValid ]             = useState({postType: false, selectedFileImages: false})

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
            setPostData({selectedFileImages: ''})
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
        {postData.selectedFileImages && postData.selectedFileImages.length > 0 && (
        <small className='count-selected-images'>{`${postData.selectedFileImages.length} image(s) selected`}</small>
        )}
        
        <FormField multipleFileInputType name="selectedFileImages" handleChange={handleMultipleFileChange} isLoadingBtn={isLoadingBtn.selectedFileImages} isValid={isValid.selectedFileImages} errors={selectedFileErrors || []} />

        <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={create} prompt="Are you sure you want to create post" />
        <Button onClickButton onClick={handleModalSubmit} buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Posting...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

        {errorMessage && <p className='error-msg'>{errorMessage}</p>}
      </form>
    </>
  )
}

export default EditPostSelectedImages