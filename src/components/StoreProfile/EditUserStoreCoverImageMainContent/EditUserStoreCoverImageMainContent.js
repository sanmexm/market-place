import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionUpdateStore } from '../../../actions/stores';
import { postValidateCoverFile } from '../../validations/stores/editStore';
import {Button, EmptyCard, FormField, Loader, SubmitPopUp, UserHeader} from '../..';
import { AddBoxRoundedIcon, PhotoRoundedIcon } from '../../../utils/constants';
import { stores } from '../../../assets';

import './editUserStoreCoverImageMainContent.css'

const EditUserStoreCoverImageMainContent = () => {
    const authData                                 = JSON.parse(localStorage.getItem('authData'))
    const userId                                   = authData?.result?._id
    const { id }                                   = useParams();
    const dispatch                                 = useDispatch();
    const {getStoreItemsById}                      = useSelector((state) => state.storeList)
    const { isLoading, singleUserProfile }         = useSelector((state) => state.profileList)
    const [savingInfo, setSavingInfo]              = useState(false);
    const [onePost, setOnePost]                    = useState(null);
    const [isButtonDisabled, setIsButtonDisabled]  = useState(true);
    const [onOpen, setOnOpen]                      = useState(false);
    const [productImg, setProductImg]              = useState(getStoreItemsById?.result?.coverFile);
    const [coverFileErrors, setCoverFileErrors]    = useState(null);
    const [errorMessage, setErrorMessage]          = useState(null);
    
    const [ postData, setPostData ]                = useState({coverFile: getStoreItemsById?.result?.coverFile || ''})
    const [ isLoadingBtn, setIsLoadingBtn ]        = useState({coverFile: false})
    const [ isValid, setIsValid ]                  = useState({coverFile: false })

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

    // if profile account doesn't have an Id, navigate to create profile
    useEffect(() => {
      if (singleUserProfile && singleUserProfile.userId === userId) {
        setOnePost(singleUserProfile);
      }
    }, [userId, singleUserProfile]);

    const debouncedPostData = useDebounce(postData, 500)

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageBase64 = reader.result.split(",")[1]; // remove the data URI scheme prefix
        const extension = file.name.split(".").pop(); // get the image extension
        const dataURI = `data:image/${extension};base64,${imageBase64}`; // add the data URI scheme prefix with the image extension
        setPostData({...postData, coverFile: dataURI});
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
      const validateCoverFile = () => {
        const { isValid, errors } = postValidateCoverFile(debouncedPostData.coverFile);
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

      const coverFileErrors     = validateCoverFile()

      setCoverFileErrors(coverFileErrors)

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( coverFileErrors.length > 0 ) {
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
              toast.success("Store cover image updated successfully")
              setErrorMessage(null);
              setPostData({name: getStoreItemsById.result?.coverFile || ''})
              setProductImg({coverFile: getStoreItemsById?.result?.coverFile})
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
      <div className='user-profile-wrapper'>
        <div className='user-profile-header'>
          <div className='user-profile-header-left'>
            <UserHeader userProfile={onePost} />
          </div>

          <div className='user-profile-header-right'>
            {/* <SearchProfileHeader /> */}
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/my-posts" linkClass="link-wrapper" linkName="view posts" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        {isLoading ? (
            <Loader />
          ) : onePost ? (
            <>
              <div className='user-profile-body'>
                <h2>Change store cover</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className='reg-image-group'>
                    <div onChange={handleProductImageUpload}>
                    <FormField fileInputType name="coverFile" handleChange={handleFileChange} isLoadingBtn={isLoadingBtn.coverFile} isValid={isValid.coverFile} errors={coverFileErrors || []} />
                    </div>
                    <div className='reg-image-cover-preview-wrapper'>
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
           : (
            <EmptyCard title="profile" linkName="Profile" link="/users/create-profile" />
        )}
      </div>
    </>
  )
}

export default EditUserStoreCoverImageMainContent