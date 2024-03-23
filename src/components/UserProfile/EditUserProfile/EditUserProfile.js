import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { usersValidateDateOfBirth, usersValidateFirstName, usersValidateLastName, usersValidateMiddleName, usersValidatePrimaryPhone, usersValidateSex, usersValidateState } from '../../validations/users/usersProfile';
import {Button, FormField, Loader} from '../..'
import { actionFetchUserProfile, actionUpdateProfile } from '../../../actions/profiles';
import { actionFetchUser } from '../../../actions/users';
import { genderOptions } from '../../../utils/constants';

import './editUserProfile.css'

const EditUserProfile = ({id}) => {
    const dispatch                                          = useDispatch();
    // const { id }                                            = useParams();
    const { getAllUsers, singleUser }                       = useSelector((state) => state.userList);
    const [savingInfo, setSavingInfo]                       = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]           = useState(true);
    const [fetchError, setFetchError]                       = useState(false);
    const [firstNameErrors, setFirstNameErrors]             = useState(null);
    const [middleNameErrors, setMiddleNameErrors]           = useState(null);
    const [lastNameErrors, setLastNameErrors]               = useState(null);
    const [dateOfBirthErrors, setDateOfBirthErrors]         = useState(null);
    const [sexErrors, setSexErrors]                         = useState(null);
    const [primaryPhoneErrors, setPrimaryPhoneErrors]       = useState(null);
    const [stateErrors, setStateErrors]                     = useState(null);
    const [errorMessage, setErrorMessage]                   = useState(null);
    
    const [ postData, setPostData ]           = useState({firstName: singleUser?.firstName || '', middleName: singleUser?.middleName || '', lastName: singleUser?.lastName || '', dateOfBirth: singleUser?.dateOfBirth || '',  sex: singleUser?.sex || '', primaryPhone: singleUser?.primaryPhone || '', secondaryPhone: singleUser?.secondaryPhone || '', profession: singleUser?.profession || '', streetAddress: singleUser?.streetAddress || '', apartmentNumber: singleUser?.apartmentNumber || '', city: singleUser?.city || '', state: singleUser?.state || '', zipCode: singleUser?.zipCode || ''})

    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({firstName: false, middleName: false, lastName: false, dateOfBirth: false,  sex: false, primaryPhone: false, secondaryPhone: false, profession: false, streetAddress: false, apartmentNumber: false, city: false, state: false, zipCode: false })

    const [ isValid, setIsValid ]             = useState({firstName: false, middleName: false, lastName: false, dateOfBirth: false,  sex: false, primaryPhone: false, secondaryPhone: false, profession: false, streetAddress: false, apartmentNumber: false, city: false, state: false, zipCode: false })

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
        const validateFirstName = () => {
          const { isValid, errors } = usersValidateFirstName(debouncedPostData.firstName);
          setIsValid((prevState) => ({
            ...prevState,
            firstName: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            firstName: false,
          }));
          return errors;
        };

        const validateMiddleName = () => {
          const { isValid, errors } = usersValidateMiddleName(debouncedPostData.middleName);
          setIsValid((prevState) => ({
            ...prevState,
            middleName: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            middleName: false,
          }));
          return errors;
        };

        const validateLastName = () => {
          const { isValid, errors } = usersValidateLastName(debouncedPostData.lastName);
          setIsValid((prevState) => ({
            ...prevState,
            lastName: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            lastName: false,
          }));
          return errors;
        };
        
        const validateDateOfBirth = () => {
          const { isValid, errors } = usersValidateDateOfBirth(debouncedPostData.dateOfBirth);
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
            const { isValid, errors } = usersValidateSex(debouncedPostData.sex);
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

        const validatePrimaryPhone = () => {
            const { isValid, errors } = usersValidatePrimaryPhone(debouncedPostData.primaryPhone);
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
        
        const validateState = () => {
          const { isValid, errors } = usersValidateState(debouncedPostData.state);
          setIsValid((prevState) => ({
            ...prevState,
            state: isValid,
          }));
          setIsLoadingBtn((prevState) => ({
            ...prevState,
            state: false,
          }));
          return errors;
        };

        const firstNameErrors        = validateFirstName()
        const middleNameErrors       = validateMiddleName()
        const lastNameErrors         = validateLastName()
        const dateOfBirthErrors      = validateDateOfBirth()
        const sexErrors              = validateSex()
        const primaryPhoneErrors     = validatePrimaryPhone()
        const stateErrors            = validateState()

        setFirstNameErrors(firstNameErrors)
        setMiddleNameErrors(middleNameErrors)
        setLastNameErrors(lastNameErrors)
        setDateOfBirthErrors(dateOfBirthErrors)
        setSexErrors(sexErrors)
        setPrimaryPhoneErrors(primaryPhoneErrors)
        setStateErrors(stateErrors)

        const hasErrors = () => {
          // Check if any error exists in the form data
          if ( firstNameErrors.length > 0 || middleNameErrors.length > 0 || lastNameErrors.length > 0 || dateOfBirthErrors.length > 0 || sexErrors.length > 0 || primaryPhoneErrors.length > 0 || stateErrors.length > 0  ) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, getAllUsers, singleUser]);

    useEffect(() => {
      setPostData({firstName: singleUser?.firstName || '', middleName: singleUser?.middleName || '', lastName: singleUser?.lastName || '', dateOfBirth: singleUser?.dateOfBirth || '',  sex: singleUser?.sex || '', primaryPhone: singleUser?.primaryPhone || '',  state: singleUser?.state || ''});
    }, [singleUser]);

    useEffect(() => {
      dispatch(actionFetchUser(id))
      dispatch(actionFetchUserProfile(id))
      .then((response) => {
        if(!response) {
          setFetchError(true)
        }
      })
    }, [id, dispatch])

    const handleSubmit = async(e) => {
      e.preventDefault();
      const returnConfirm = window.confirm('Are you sure you want to update your profile?')
      if(returnConfirm){
        setSavingInfo(true);
        const response = await dispatch(actionUpdateProfile(id, postData))
        try{
          if (response.status === 200){
            toast.success(response.successMessage)
            setErrorMessage(null)
            setSavingInfo(false)
          } else if (response.status === 400) {
            setErrorMessage(response.errorMessage);
            setSavingInfo(false)
          }
        }catch(error){
          setErrorMessage("unable to upload data, please check your internet and try again")
          setSavingInfo(false)
        }
      }
    }

  return (
    <>
      <div className='edit-user-profile-wrapper'>
        <h1>{singleUser?.firstName}</h1>
        <form className='edit-user-profile-form' onSubmit={handleSubmit} autoComplete="off">
          <FormField inputType type="text" labelName="first name" name="firstName" value={postData.firstName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.firstName} isValid={isValid.firstName} errors={firstNameErrors || []} />

          <FormField inputType type="text" labelName="middle name" name="middleName" value={postData.middleName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.middleName} isValid={isValid.middleName} errors={middleNameErrors || []} />

          <FormField inputType type="text" labelName="last name" name="lastName" value={postData.lastName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.lastName} isValid={isValid.lastName} errors={lastNameErrors || []} />

          {/* for appointment, use datetime-local */}
          <FormField inputType type="date" labelName="date of birth" name="dateOfBirth" value={postData.dateOfBirth} handleChange={handleChange} isLoadingBtn={isLoadingBtn.dateOfBirth} isValid={isValid.dateOfBirth} errors={dateOfBirthErrors || []} />

          <FormField selectType labelName="sex" name="sex" value={postData.sex} handleChange={handleChange} options={genderOptions} isLoadingBtn={isLoadingBtn.sex} isValid={isValid.sex} errors={sexErrors || []} />

          <FormField inputType type="text" labelName="primary phone" name="primaryPhone" value={postData.primaryPhone} handleChange={handleChange} isLoadingBtn={isLoadingBtn.primaryPhone} isValid={isValid.primaryPhone} errors={primaryPhoneErrors || []} />

          <FormField selectType labelName="state" name="state" value={postData.state} handleChange={handleChange} options={genderOptions} isLoadingBtn={isLoadingBtn.state} isValid={isValid.state} errors={stateErrors || []} />

          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserProfile