import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchStore, actionUpdateStore } from '../../../actions/stores';
import { postValidateCoverFile } from '../../validations/stores/editStore';
import {Button, FormField, Loader} from '../..';
import { PhotoRoundedIcon } from '../../../utils/constants';

import './editUserStoreCoverImage.css'

const EditUserStoreCoverImage = () => {
    const dispatch                                          = useDispatch();
    const { id }                                            = useParams();
    const { singleStore }                                   = useSelector((state) => state.storeList);
    const [savingInfo, setSavingInfo]                       = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]           = useState(true);
    const [fetchError, setFetchError]                       = useState(false);
    const [productImg, setProductImg]                       = useState(singleStore?.coverFile);
    const [selectedFileErrors, setSelectedFileErrors]       = useState(null);
    const [errorMessage, setErrorMessage]                   = useState(null);
    
    const [ postData, setPostData ]                         = useState({selectedFile: singleStore?.coverFile || ''})

    const [ isLoadingBtn, setIsLoadingBtn ]                 = useState({selectedFile: false})

    const [ isValid, setIsValid ]                           = useState({selectedFile: false })

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
      const validateSelectedFile = () => {
        const { isValid, errors } = postValidateCoverFile(debouncedPostData.selectedFile);
        setIsValid((prevState) => ({
          ...prevState,
          coverFile: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          coverFile: false,
        }));
        return errors;
      };

      const selectedFileErrors     = validateSelectedFile()

      setSelectedFileErrors(selectedFileErrors)

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( selectedFileErrors.length > 0 ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, singleStore]);

    useEffect(() => {
      setPostData({selectedFile: singleStore?.selectedFile || ''});
    }, [singleStore]);

  useEffect(() => {
    dispatch(actionFetchStore(id))
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
      const response = await dispatch(actionUpdateStore(id, postData))
      try{
        if (response.status === 200) {
          toast.success(response.successMessage)
          setErrorMessage(null);
          setProductImg(null)
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
          <div className='reg-image-group'>
            <div onChange={handleProductImageUpload}>
            <FormField fileInputType name="selectedFile" handleChange={handleFileChange} isLoadingBtn={isLoadingBtn.selectedFile} isValid={isValid.selectedFile} errors={selectedFileErrors || []} />
            </div>
            <div className='reg-image-preview-wrapper'>
              {productImg ? <img src={productImg} alt={productImg} />  : <span><PhotoRoundedIcon /></span>}
            </div>
          </div>

          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserStoreCoverImage