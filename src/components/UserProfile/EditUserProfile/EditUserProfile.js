import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { Country, State } from "country-state-city"
import toast from 'react-hot-toast';
import { usersValidateDateOfBirth, usersValidateFirstName, usersValidateLastName, usersValidateMiddleName, usersValidatePrimaryPhone, usersValidateSex, usersValidateCategory, usersValidateCountry, usersValidateCountryState } from '../../validations/users/usersProfile';
import {Button, FormField, Loader, SubmitPopUp} from '../..'
import { actionUpdateProfile } from '../../../actions/profiles';
import { genderOptions, profileCategoryOption } from '../../../utils/constants';
import { profile } from '../../../assets';

import './editUserProfile.css'

const EditUserProfile = ({id, userData, userProfileData}) => {
    const dispatch                                     = useDispatch();
    const [countryData]                                = useState([{ name: "", isoCode: "" }, ...Country.getAllCountries()]);
    const [countryStatesData, setCountryStatesData]    = useState([{ name: "", code: "" }]);
    const [country, setCountry]                        = useState(countryData[0]);
    const { getAllUsers, singleUser }                  = useSelector((state) => state.userList);
    const [onOpen, setOnOpen]                          = useState(false);
    const [savingInfo, setSavingInfo]                  = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]      = useState(true);
    const [firstNameErrors, setFirstNameErrors]        = useState(null);
    const [middleNameErrors, setMiddleNameErrors]      = useState(null);
    const [lastNameErrors, setLastNameErrors]          = useState(null);
    const [dateOfBirthErrors, setDateOfBirthErrors]    = useState(null);
    const [sexErrors, setSexErrors]                    = useState(null);
    const [primaryPhoneErrors, setPrimaryPhoneErrors]  = useState(null);
    const [categoryErrors, setCategoryErrors]          = useState(null);
    const [countryErrors, setCountryErrors]            = useState(null);
    const [countryStateErrors, setCountryStateErrors]  = useState(null);
    const [errorMessage, setErrorMessage]              = useState(null);
    
    const [ postData, setPostData ]           = useState({firstName: userData?.firstName || '', middleName: userData?.middleName || '', lastName: userData?.lastName || '', dateOfBirth: userProfileData?.dateOfBirth || '',  sex: userProfileData?.sex || '', primaryPhone: userProfileData?.primaryPhone || '', category: userProfileData?.category || '', country: userProfileData?.country || '', countryState: userProfileData?.countryState || ''})

    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({firstName: false, middleName: false, lastName: false, dateOfBirth: false,  sex: false, primaryPhone: false, category: false, country: false, countryState: false})

    const [ isValid, setIsValid ]             = useState({firstName: false, middleName: false, lastName: false, dateOfBirth: false,  sex: false, primaryPhone: false, category: false, country: false, countryState: false})

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

      if (name === 'country') {
        const selectedCountry = countryData.find(c => c.name === value);
        // change the value to "Nigeria" if you want states within Nigeria
        setCountry(selectedCountry);
        setPostData(prevState => ({ ...prevState, country: selectedCountry.name, countryState: '' }));
      }
    }

    useEffect(() => {
      if (country && country.isoCode) {
        const states = State.getStatesOfCountry(country.isoCode);
        setCountryStatesData([{ name: "", code: "" }, ...states]);
      }
    }, [country]);

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
        
      const validateCategory = () => {
        const { isValid, errors } = usersValidateCategory(debouncedPostData.category);
        setIsValid((prevState) => ({
          ...prevState,
          category: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          category: false,
        }));
        return errors;
      };

      const validateCountry = () => {
        const { isValid, errors } = usersValidateCountry(debouncedPostData.country);
        setIsValid((prevState) => ({
          ...prevState,
          country: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          country: false,
        }));
        return errors;
      };

      const validateCountryState = () => {
        const { isValid, errors } = usersValidateCountryState(debouncedPostData.countryState);
        setIsValid((prevState) => ({
          ...prevState,
          countryState: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          countryState: false,
        }));
        return errors;
      };

        const firstNameErrors        = validateFirstName()
        const middleNameErrors       = validateMiddleName()
        const lastNameErrors         = validateLastName()
        const dateOfBirthErrors      = validateDateOfBirth()
        const sexErrors              = validateSex()
        const primaryPhoneErrors     = validatePrimaryPhone()
        const categoryErrors         = validateCategory()
        const countryErrors          = validateCountry()
        const countryStateErrors     = validateCountryState()

        setFirstNameErrors(firstNameErrors)
        setMiddleNameErrors(middleNameErrors)
        setLastNameErrors(lastNameErrors)
        setDateOfBirthErrors(dateOfBirthErrors)
        setSexErrors(sexErrors)
        setPrimaryPhoneErrors(primaryPhoneErrors)
        setCategoryErrors(categoryErrors)
        setCountryErrors(countryErrors)
        setCountryStateErrors(countryStateErrors)

        const hasErrors = () => {
          // Check if any error exists in the form data
          if ( firstNameErrors.length > 0 || middleNameErrors.length > 0 || lastNameErrors.length > 0 || dateOfBirthErrors.length > 0 || sexErrors.length > 0 || primaryPhoneErrors.length > 0 || categoryErrors.length > 0 || countryErrors.length > 0 || countryStateErrors.length > 0 ) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, getAllUsers, singleUser]);

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
        const response = await dispatch(actionUpdateProfile(id, postData))
          try{
            if (response.success === true) {
              toast.success("Profile updated successfully")
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

    // this can also be used for appointment
    // const dateTimeLocalNow = new Date(
    //   new Date().getTime() - new Date().getTimezoneOffset() * 60_000
    // ).toISOString().slice(0, 16)
    // <input type='datetime-local' defaultValue={dateTimeLocalNow} min={dateTimeLocalNow}

  return (
    <>
      <div className='edit-user-profile-wrapper'>
        <form className='edit-user-profile-form' onSubmit={handleSubmit} autoComplete="off">
          <FormField inputType type="text" labelName="first name" name="firstName" value={postData.firstName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.firstName} isValid={isValid.firstName} errors={firstNameErrors || []} />

          <FormField inputType type="text" labelName="middle name" name="middleName" value={postData.middleName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.middleName} isValid={isValid.middleName} errors={middleNameErrors || []} />

          <FormField inputType type="text" labelName="last name" name="lastName" value={postData.lastName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.lastName} isValid={isValid.lastName} errors={lastNameErrors || []} />

          {/* for appointment, use datetime-local */}
          <FormField inputType type="date" labelName="date of birth" name="dateOfBirth" value={postData.dateOfBirth} handleChange={handleChange} isLoadingBtn={isLoadingBtn.dateOfBirth} isValid={isValid.dateOfBirth} errors={dateOfBirthErrors || []} />

          <FormField selectType labelName="sex" name="sex" value={postData.sex} handleChange={handleChange} options={genderOptions} isLoadingBtn={isLoadingBtn.sex} isValid={isValid.sex} errors={sexErrors || []} />

          <FormField inputType type="text" labelName="primary phone" name="primaryPhone" value={postData.primaryPhone} handleChange={handleChange} isLoadingBtn={isLoadingBtn.primaryPhone} isValid={isValid.primaryPhone} errors={primaryPhoneErrors || []} />

          <FormField selectType labelName="category" name="category" value={postData.category} handleChange={handleChange} options={profileCategoryOption} isLoadingBtn={isLoadingBtn.category} isValid={isValid.category} errors={categoryErrors || []} />

          <FormField selectType labelName="Country" name="country" value={postData.country} handleChange={handleChange} options={countryData} isLoadingBtn={isLoadingBtn.country} isValid={isValid.country} errors={countryErrors || []} />

          {postData.country && (
            <FormField selectType labelName="State" name="countryState" value={postData.countryState} handleChange={handleChange} options={countryStatesData} isLoadingBtn={isLoadingBtn.countryState} isValid={isValid.countryState} errors={countryStateErrors || []}/>
          )}

          <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={profile} prompt="Are you sure you want  to update profile" />
          <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

          {errorMessage && <p className='error-msg'>{errorMessage}</p>}
        </form>
      </div>
    </>
  )
}

export default EditUserProfile