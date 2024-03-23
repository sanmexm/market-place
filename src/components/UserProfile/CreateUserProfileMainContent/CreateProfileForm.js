import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import {Button, FormField, Loader, SubmitPopUp} from '../..'
import { PhotoRoundedIcon, genderOptions, locationOptions, profileCategoryOption } from '../../../utils/constants'
import { actionCreateProfile } from '../../../actions/profiles'
import { profile } from '../../../assets'
import { profileValidateCategory, profileValidateDateOfBirth, profileValidateLocation, profileValidatePrimaryPhone, profileValidateSelectedFile, profileValidateSex } from '../../validations/profiles/createProfile'

import './createUserProfileMainContent.css'

const CreateProfileForm = ({userId}) => {
    const dispatch                                      = useDispatch();
    const [savingInfo, setSavingInfo]                   = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]       = useState(true);
    const [onOpen, setOnOpen]                           = useState(false);
    const [productImg, setProductImg]                   = useState(null);
    const [selectedFileErrors, setSelectedFileErrors]   = useState(null);
    const [primaryPhoneErrors, setPrimaryPhoneErrors]   = useState(null);
    const [dateOfBirthErrors, setDateOfBirthErrors]     = useState(null);
    const [sexErrors, setSexErrors]                     = useState(null);
    const [categoryErrors, setCategoryErrors]           = useState(null);
    const [locationErrors, setLocationErrors]           = useState(null);
    const [errorMessage, setErrorMessage]               = useState(null);

    const [postData, setPostData]             = useState({userId, selectedFile: '', primaryPhone: '', dateOfBirth: '', sex: '', category: '', location: ''})
    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({selectedFile: false, primaryPhone: false, dateOfBirth: false, sex: false, category: false, location: false})
    const [ isValid, setIsValid ]             = useState({selectedFile: false, primaryPhone: false, dateOfBirth: false, sex: false, category: false, location: false})

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
        const { isValid, errors } = profileValidateSelectedFile(debouncedPostData.selectedFile);
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

      const validatePrimaryPhone = () => {
          const { isValid, errors } = profileValidatePrimaryPhone(debouncedPostData.primaryPhone);
          setIsValid((prevState) => ({
            ...prevState,
            primaryPhone: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            primaryPhone: false,
          }));
          return errors;
        };

        const validateDateOfBirth = () => {
          const { isValid, errors } = profileValidateDateOfBirth(debouncedPostData.dateOfBirth);
          setIsValid((prevState) => ({
            ...prevState,
            dateOfBirth: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            dateOfBirth: false,
          }));
          return errors;
      };
      
      const validateSex = () => {
          const { isValid, errors } = profileValidateSex(debouncedPostData.sex);
          setIsValid((prevState) => ({
            ...prevState,
            sex: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            sex: false,
          }));
          return errors;
      };

      const validateCategory = () => {
          const { isValid, errors } = profileValidateCategory(debouncedPostData.category);
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

      const validateLocation = () => {
          const { isValid, errors } = profileValidateLocation(debouncedPostData.location);
          setIsValid((prevState) => ({
            ...prevState,
            location: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            location: false,
          }));
          return errors;
      };

      const selectedFileErrors  = validateSelectedFile();
      const primaryPhoneErrors  = validatePrimaryPhone()
      const dateOfBirthErrors   = validateDateOfBirth()
      const sexErrors           = validateSex()
      const categoryErrors      = validateCategory();
      const locationErrors      = validateLocation()

      setSelectedFileErrors(selectedFileErrors)
      setPrimaryPhoneErrors(primaryPhoneErrors)
      setDateOfBirthErrors(dateOfBirthErrors)
      setCategoryErrors(categoryErrors)
      setSexErrors(sexErrors)
      setLocationErrors(locationErrors)

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( selectedFileErrors.length > 0 || primaryPhoneErrors.length > 0 || dateOfBirthErrors.length > 0 || sexErrors.length > 0 || categoryErrors.length > 0 || locationErrors.length > 0 ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
  
    }, [debouncedPostData])

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
        const response = await dispatch(actionCreateProfile(postData))
          try{
            if (response.success === true) {
              toast.success("Patient created successfully")
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
        <form className='dashboard-post-body-posts' onSubmit={handleSubmit} autoComplete="off">
            <div className='reg-image-group'>
                <div onChange={handleProductImageUpload}>
                    <FormField fileInputType name="selectedFile" handleChange={handleFileChange} isLoadingBtn={isLoadingBtn.selectedFile} isValid={isValid.selectedFile} errors={selectedFileErrors || []} />
                </div>
                <div className='reg-image-preview-wrapper'>
                    {productImg ? <img src={productImg} alt={productImg} />  : <span><PhotoRoundedIcon /></span>}
                </div>
            </div>

            <input type='hidden' name='userId' value={userId} />

            <FormField inputType type="text" labelName="primary phone" name="primaryPhone" value={postData.primaryPhone} handleChange={handleChange} isLoadingBtn={isLoadingBtn.primaryPhone} isValid={isValid.primaryPhone} errors={primaryPhoneErrors || []} />

            <FormField inputType type="date" labelName="date of birth" name="dateOfBirth" value={postData.dateOfBirth} handleChange={handleChange} isLoadingBtn={isLoadingBtn.dateOfBirth} isValid={isValid.dateOfBirth} errors={dateOfBirthErrors || []} />

            <FormField selectType labelName="sex" name="sex" value={postData.sex} handleChange={handleChange} options={genderOptions} isLoadingBtn={isLoadingBtn.sex} isValid={isValid.sex} errors={sexErrors || []} />

            <FormField selectType labelName="category" name="category" value={postData.category} handleChange={handleChange} options={profileCategoryOption} isLoadingBtn={isLoadingBtn.category} isValid={isValid.category} errors={categoryErrors || []} />

            <FormField selectType labelName="location" name="location" value={postData.location} handleChange={handleChange} options={locationOptions} isLoadingBtn={isLoadingBtn.location} isValid={isValid.location} errors={locationErrors || []} />


            <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={profile} prompt="Are you sure you want to create profile" />
            <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} creating...</> : "create"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
    </>
  )
}

export default CreateProfileForm