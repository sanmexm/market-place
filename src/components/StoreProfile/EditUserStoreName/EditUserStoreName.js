import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { actionUpdateStore } from '../../../actions/stores'
import {Button, FormField, Loader, SubmitPopUp} from '../..'
import { postValidateName } from '../../validations/stores/editStore'
import { stores } from '../../../assets'

import './editUserStoreName.css'

const EditUserStoreName = ({id, getAllStores, getStoreItemsById}) => {
    const authData                                  = JSON.parse(localStorage.getItem('authData'))
    const userUniqueId                              = authData?.result?._id
    const dispatch                                  = useDispatch();
    const [savingInfo, setSavingInfo]               = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]   = useState(true);
    const [nameErrors, setNameErrors]               = useState(null);
    const [errorMessage, setErrorMessage]           = useState(null);
    const [onOpen, setOnOpen]                       = useState(false);
    
    const [postData, setPostData]                   = useState({userId: userUniqueId, name: getStoreItemsById.result?.name || ''})
    const [isLoadingBtn, setIsLoadingBtn]           = useState({name: false})
    const [isValid, setIsValid ]                    = useState({name: false})

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

        const nameErrors          = validateName();

        setNameErrors(nameErrors)

        const hasErrors = () => {
        // Check if any error exists in the form data
        if ( nameErrors.length > 0) {
            return true;
        } else{
            return false;
        }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);

    }, [debouncedPostData, getAllStores, getStoreItemsById])

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
                setPostData({name: getStoreItemsById.result?.name || ''})
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
      <div className='edit-user-store-name-wrapper'>
        <form className='edit-user-store-name-form' onSubmit={handleSubmit} autoComplete="off">
          <FormField inputType type="text" labelName="store name" name="name" value={postData.name} handleChange={handleChange} isLoadingBtn={isLoadingBtn.name} isValid={isValid.name} errors={nameErrors || []} />

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={stores} prompt="Are you sure you want  to update store name?" />
          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />
        </form>
        {errorMessage && <p className='error-msg'>{errorMessage}</p>}
      </div>
    </>
  )
}

export default EditUserStoreName