import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreateStore } from '../../../actions/stores'
import { Button, FormField, Loader, SubmitPopUp } from '../..'
import { postValidateSelectedFile, postValidateDescription, postValidateName, postValidateTitle } from '../../validations/stores/editStore'

import './createUserStoreMainContent.css'
import { PhotoRoundedIcon } from '../../../utils/constants'
import { stores } from '../../../assets'
import toast from 'react-hot-toast'

const CreateStoreForm = () => {
    const authData                                    = JSON.parse(localStorage.getItem('authData'))
    const userId                                      = authData?.result?._id
    const { getAllStores, singleStore }               = useSelector((state) => state.storeList);
    const dispatch                                    = useDispatch();
    const [savingInfo, setSavingInfo]                 = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]     = useState(true);
    const [onOpen, setOnOpen]                         = useState(false);
    const [productImg, setProductImg]                 = useState(null);
    // const [coverImg, setCoverImg]                     = useState(null);
    const [selectedFileErrors, setSelectedFileErrors] = useState(null);
    // const [coverFileErrors, setCoverFileErrors]       = useState(null);
    const [nameErrors, setNameErrors]                 = useState(null);
    const [titleErrors, setTitleErrors]               = useState(null);
    const [descriptionErrors, setDescriptionErrors]   = useState(null);
    const [errorMessage, setErrorMessage]             = useState(null);
    
    const [postData, setPostData]                     = useState({userId: userId,  selectedFile: '', name: '', title: '', description: ''})
    const [isLoadingBtn, setIsLoadingBtn]             = useState({selectedFile: false, name: false, title: false, description: false})
    const [isValid, setIsValid ]                      = useState({selectedFile: false, name: false, title: false, description: false})

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

    // const handleCoverFileChange = (event) => {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onloadend = () => {
    //     const imageBase64 = reader.result.split(",")[1]; // remove the data URI scheme prefix
    //     const extension = file.name.split(".").pop(); // get the image extension
    //     const dataURI = `data:image/${extension};base64,${imageBase64}`; // add the data URI scheme prefix with the image extension
    //     setPostData({...postData, coverFile: dataURI});
    //   };
    // };   
  
    const handleProductImageUpload = (e) => {
      const file = e.target.files[0]
  
      transformFile(file)
    }

    // const handleCoverImageUpload = (e) => {
    //   const file = e.target.files[0]
  
    //   transformCoverFile(file)
    // }
  
    const transformFile = (file) => {
      const reader = new FileReader()
  
      if(file){
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setProductImg(reader.result)
        }
      }else{
        setProductImg(null)
      }
    }

    // const transformCoverFile = (file) => {
    //   const reader = new FileReader()
  
    //   if(file){
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //       setCoverImg(reader.result)
    //     }
    //   }else{
    //     setCoverImg(null)
    //   }
    // }

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

      // const validateCoverFile = () => {
      //   const { isValid, errors } = postValidateCoverFile(debouncedPostData.coverFile);
      //   setIsValid((prevState) => ({
      //     ...prevState,
      //     coverFile: isValid,
      //   }));
      //   setIsLoadingBtn((prevState) => ({
      //     ...prevState,
      //     coverFile: false,
      //   }));
      //   return errors;
      // };

    const validateName = () => {
      const { isValid, errors } = postValidateName(debouncedPostData.name, getAllStores);
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
    const selectedFileErrors  = validateSelectedFile();
    // const coverFileErrors     = validateCoverFile()
    const nameErrors          = validateName();
    const titleErrors         = validateTitle();
    const descriptionErrors   = validateDescription();

    setSelectedFileErrors(selectedFileErrors)
    // setCoverFileErrors(coverFileErrors)
    setNameErrors(nameErrors)
    setTitleErrors(titleErrors)
    setDescriptionErrors(descriptionErrors)

    const hasErrors = () => {
      // Check if any error exists in the form data
      if ( selectedFileErrors.length > 0 || nameErrors.length > 0 || titleErrors.length > 0 || descriptionErrors.length > 0) {
        return true;
      } else{
        return false;
      }
    };
    const hasFormErrors = hasErrors();
    setIsButtonDisabled(hasFormErrors);
    
    }, [debouncedPostData, getAllStores, singleStore])

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

    // Looking for an online bookstore in Nigeria? Cassie Books offers the best deals on a wide range of books online such as motivational, literature, and dictionaries...

    const confirmPostCreation = async() => {
      setSavingInfo(true);
      setIsButtonDisabled(true)
        const response = await dispatch(actionCreateStore(postData))
        try{
          if (response.status === 200) {
            toast.success("Store created successfully")
            setErrorMessage(null);
            setPostData({userId,  selectedFile: '', coverFile: '', name: '', title: '', description: ''})
            setProductImg(null)
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
      <div className='edit-user-profile-wrapper'>
        <form className='edit-user-profile-form' onSubmit={handleSubmit} autoComplete="off">
          <input type='hidden' name='userId' value={userId} />
          <div className='reg-image-group'>
            <div onChange={handleProductImageUpload}>
              <FormField fileInputType name="selectedFile" handleChange={handleFileChange} isLoadingBtn={isLoadingBtn.selectedFile} isValid={isValid.selectedFile} errors={selectedFileErrors || []} />
            </div>
            <div className='reg-image-preview-wrapper'>
              {productImg ? <img src={productImg} alt={productImg} />  : <span><PhotoRoundedIcon /></span>}
            </div>
          </div>

          <FormField inputType type="text" labelName="store name" name="name" value={postData.name} handleChange={handleChange} isLoadingBtn={isLoadingBtn.name} isValid={isValid.name} errors={nameErrors || []} />

          <FormField inputType type="text" labelName="Store Title" name="title" value={postData.title} handleChange={handleChange} isLoadingBtn={isLoadingBtn.title} isValid={isValid.title} errors={titleErrors || []} />

          <FormField textareaType labelName="store Description" name="description" value={postData.description} handleChange={handleChange} isLoadingBtn={isLoadingBtn.description} isValid={isValid.description} errors={descriptionErrors || []} />

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={stores} prompt="Are you sure you want to create store" />
          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Saving...</> : "Create"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default CreateStoreForm