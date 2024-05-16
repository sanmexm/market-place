import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Country, State } from "country-state-city"
import { LocalShippingRoundedIcon } from '../../../utils/constants'
import toast from 'react-hot-toast'
import {Button, FormField, Loader, SubmitPopUp} from '../..'
import { checkoutValidateAddress, checkoutValidateCity, checkoutValidateCountry, checkoutValidateCountryState, checkoutValidateEmailAddress, checkoutValidateFirstName, checkoutValidateLastName, checkoutValidatePhoneNumber } from '../../validations/checkout/checkout'
import { stores } from '../../../assets'

import './checkoutMainContent.css'

const CheckoutMainContent = () => {
  const authData                                    = JSON.parse(localStorage.getItem('authData'))
  const userId                                      = authData?.result?._id
  const dispatch                                    = useDispatch();
  const [countryData]                            = useState([{ name: "Nigeria", isoCode: "NG" }, ...Country.getAllCountries()]);
  // const [countryData]                               = useState([{ name: "", isoCode: "" }, ...Country.getAllCountries()]);
  const [countryStatesData, setCountryStatesData]   = useState([{ name: "", code: "" }]);
  const [country, setCountry]                       = useState(countryData[0]);
  const [savingInfo, setSavingInfo]                 = useState(false);
  const [isButtonDisabled, setIsButtonDisabled]     = useState(true);
  const [firstNameErrors, setFirstNameErrors]       = useState(null);
  const [lastNameErrors, setLastNameErrors]         = useState(null);
  const [emailAddressErrors, setEmailAddressErrors] = useState(null);
  const [phoneNumberErrors, setPhoneNumberErrors]   = useState(null);
  const [addressErrors, setAddressErrors]           = useState(null);
  const [cityErrors, setCityErrors]                 = useState(null);
  const [countryErrors, setCountryErrors]           = useState(null);
  const [countryStateErrors, setCountryStateErrors] = useState(null);
  const [onOpen, setOnOpen]                         = useState(false);
  const [errorMessage, setErrorMessage]             = useState(null);
  
  const [postData, setPostData]                     = useState({userId: userId, orderId: '', firstName: '', lastName: '', emailAddress: '', phoneNumber: '', address: '', city: '', state: '', country: ''})
  const [isLoadingBtn, setIsLoadingBtn]             = useState({firstName: false, lastName: false, emailAddress: false, phoneNumber: false, address: false, city: false, state: false, country: false, pinCode: false})
  const [isValid, setIsValid ]                      = useState({firstName: false, lastName: false, emailAddress: false, phoneNumber: false, address: false, city: false, state: false, country: false, pinCode: false})

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
      const { isValid, errors } = checkoutValidateFirstName(debouncedPostData.firstName);
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

    const validateLastName = () => {
      const { isValid, errors } = checkoutValidateLastName(debouncedPostData.lastName);
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
  
    const validateEmailAddress = () => {
      const { isValid, errors } = checkoutValidateEmailAddress(debouncedPostData.emailAddress);
      setIsValid((prevState) => ({
        ...prevState,
        emailAddress: isValid,
      }));
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        emailAddress: false,
      }));
      return errors;
    };

    const validatePhoneNumber = () => {
      const { isValid, errors } = checkoutValidatePhoneNumber(debouncedPostData.phoneNumber);
      setIsValid((prevState) => ({
        ...prevState,
        phoneNumber: isValid,
      }));
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        phoneNumber: false,
      }));
      return errors;
    };

    const validateAddress = () => {
      const { isValid, errors } = checkoutValidateAddress(debouncedPostData.address);
      setIsValid((prevState) => ({
        ...prevState,
        address: isValid,
      }));
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        address: false,
      }));
      return errors;
    };

    const validateCity = () => {
      const { isValid, errors } = checkoutValidateCity(debouncedPostData.city);
      setIsValid((prevState) => ({
        ...prevState,
        city: isValid,
      }));
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        city: false,
      }));
      return errors;
    };

    const validateCountryState = () => {
      const { isValid, errors } = checkoutValidateCountryState(debouncedPostData.countryState);
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

    const validateCountry = () => {
      const { isValid, errors } = checkoutValidateCountry(debouncedPostData.country);
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

    const firstNameErrors    = validateFirstName()
    const lastNameErrors     = validateLastName()
    const emailAddressErrors = validateEmailAddress()
    const phoneNumberErrors  = validatePhoneNumber()
    const addressErrors      = validateAddress()
    const cityErrors         = validateCity()
    const countryErrors      = validateCountryState()
    const countryStateErrors = validateCountry()

    setFirstNameErrors(firstNameErrors)
    setLastNameErrors(lastNameErrors)
    setEmailAddressErrors(emailAddressErrors)
    setPhoneNumberErrors(phoneNumberErrors)
    setAddressErrors(addressErrors)
    setCityErrors(cityErrors)
    setCountryErrors(countryErrors)
    setCountryStateErrors  (countryStateErrors)

    const hasErrors = () => {
      // Check if any error exists in the form data
      if ( firstNameErrors.length > 0 || lastNameErrors.length > 0 || emailAddressErrors.length > 0 || phoneNumberErrors.length > 0 || addressErrors.length > 0 || cityErrors.length > 0 || countryErrors.length > 0 || countryStateErrors.length > 0 ) {
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
    console.log(postData)
      // const response = await dispatch(actionCreateProfile(postData))
      // try{
      //   if (response.success === true) {
      //     toast.success("Profile created successfully")
      //     setErrorMessage(null);
      //     setSavingInfo(false)
      //   } else if (response.status === 400) {
      //     setErrorMessage(response.data.message);
      //   }
      // }catch(error){
      //   setErrorMessage(error.response.status)
      //   setErrorMessage("unable to upload data, please check your internet and try again")
      //   setSavingInfo(false)
      // }
    setOnOpen(false); // Close the modal after confirmation
  };

  return (
    <>
      <div className='check-out-main-bar-wrapper'>
        <div className='check-out-main-bar-item-details'>
          <div className='check-out-main-bar-sub-icon'>
            <LocalShippingRoundedIcon />
            <span>Shipping details</span>
          </div>

          {/* const hasFormErrors = hasErrors();
    setIsButtonDisabled(hasFormErrors); */}

          <form onSubmit={handleSubmit} autoComplete="off">
            <FormField inputType type="text" labelName="First Name" name="firstName" value={postData.firstName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.firstName} isValid={isValid.firstName} errors={firstNameErrors || []} />

            <FormField inputType type="text" labelName="Last Name" name="lastName" value={postData.lastName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.lastName} isValid={isValid.lastName} errors={lastNameErrors || []} />

            <FormField inputType type="text" labelName="Email Address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoadingBtn={isLoadingBtn.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

            <FormField inputType type="text" labelName="Phone Number" name="phoneNumber" value={postData.phoneNumber} handleChange={handleChange} isLoadingBtn={isLoadingBtn.phoneNumber} isValid={isValid.phoneNumber} errors={phoneNumberErrors || []} />

            <FormField selectType labelName="Country" name="country" value={postData.country} handleChange={handleChange} options={countryData} isLoadingBtn={isLoadingBtn.country} isValid={isValid.country} errors={countryErrors || []} />

            {postData.country && (
              <FormField selectType labelName="State" name="countryState" value={postData.countryState} handleChange={handleChange} options={countryStatesData} isLoadingBtn={isLoadingBtn.countryState} isValid={isValid.countryState} errors={countryStateErrors || []}/>
            )}

            {postData.countryState && (
              <FormField inputType type="text" labelName="City" name="city" value={postData.city} handleChange={handleChange} isLoadingBtn={isLoadingBtn.city} isValid={isValid.city} errors={cityErrors || []}/>
            )}

            {postData.city && (
              <FormField inputType type="text" labelName="address" name="address" value={postData.address} handleChange={handleChange} isLoadingBtn={isLoadingBtn.address} isValid={isValid.address} errors={addressErrors || []}/>
            )}

            <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={stores} prompt="Are you sure you want to create profile" />
            <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} creating...</> : "create"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
          </form>
        </div>
      </div>

      {/* buttonDisabled={isButtonDisabled} */}
    </>
  )
}

export default CheckoutMainContent