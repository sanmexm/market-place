import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { PhotoRoundedIcon } from '../../../utils/constants'
import {Button, FormField, Loader, SubmitPopUp} from '../..'
import { actionUpdateStore } from '../../../actions/stores'
import { postValidateSelectedFile } from '../../validations/stores/editStore'
import { stores } from '../../../assets'

import './editUserStoreImage.css'

const EditUserStoreImage = ({id, getStoreItemsById}) => {
    const dispatch                                          = useDispatch();
    const [savingInfo, setSavingInfo]                       = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]           = useState(true);
    const [onOpen, setOnOpen]                               = useState(false);
    const [productImg, setProductImg]                       = useState(getStoreItemsById?.result?.selectedFile);
    const [selectedFileErrors, setSelectedFileErrors]       = useState(null);
    const [errorMessage, setErrorMessage]                   = useState(null);
    
    const [ postData, setPostData ]                         = useState({selectedFile: getStoreItemsById?.result?.selectedFile || ''})
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
              toast.success("Store image updated successfully")
              setErrorMessage(null);
              setPostData({name: getStoreItemsById.result?.selectedFile || ''})
              setProductImg({selectedFile: getStoreItemsById?.result?.selectedFile})
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
          <div className='reg-image-group'>
            <div onChange={handleProductImageUpload}>
              <FormField fileInputType name="selectedFile" handleChange={handleFileChange} isLoadingBtn={isLoadingBtn.selectedFile} isValid={isValid.selectedFile} errors={selectedFileErrors || []} />
            </div>
            <div className='reg-image-preview-wrapper'>
              {productImg ? <img src={productImg} alt={productImg} />  : <span><PhotoRoundedIcon /></span>}
            </div>
          </div>

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={stores} prompt="Are you sure you want  to update store details?" />
          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserStoreImage