import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Country, State } from "country-state-city"
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import { Button, CheckoutSideContent, FormField } from '../../components'
import { checkoutValidateAddress, checkoutValidateCity, checkoutValidateCountry, checkoutValidateCountryState, checkoutValidateEmailAddress, checkoutValidateFirstName, checkoutValidateLastName, checkoutValidatePhoneNumber } from '../../components/validations/checkout/checkout'
import { KeyboardBackspaceRoundedIcon, LocalShippingRoundedIcon } from '../../utils/constants'
import { actionCreateOrder } from '../../actions/orders'
import { actionCreateOrderPayment } from '../../actions/payments'

import './checkout.css'

const Checkout = () => {
  // const authData                                    = JSON.parse(localStorage.getItem('authData'))
  // const userId                                      = authData?.result?._id
  const dispatch                                    = useDispatch();
  const navigate                                    = useNavigate();
  const {getCartTotal, getCartItems}                = useSelector((state) => state?.cartList)
  // const {paymentUrl}                                = useSelector((state) => state?.paymentList)
  // const [paymentState, setPaymentState]             = useState(paymentUrl)
  const shippingCost                                = 2000
  const cartTotal                                   = getCartTotal + shippingCost
  // const [countryData]                            = useState([{ name: "Nigeria", isoCode: "NG" }, ...Country.getAllCountries()]);
  const [countryData]                               = useState([{ name: "", isoCode: "" }, ...Country.getAllCountries()]);
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
  const [errorMessage, setErrorMessage]             = useState(null);
  
  const [postData, setPostData]                     = useState({firstName: '', lastName: '', emailAddress: '', phoneNumber: '', address: '', city: '', countryState: '', country: ''})

  const [isLoadingBtn, setIsLoadingBtn]             = useState({firstName: false, lastName: false, emailAddress: false, phoneNumber: false, address: false, city: false, countryState: false, country: false, pinCode: false})

  const [isValid, setIsValid ]                      = useState({firstName: false, lastName: false, emailAddress: false, phoneNumber: false, address: false, city: false, countryState: false, country: false, pinCode: false})

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSavingInfo(true);
    setIsButtonDisabled(true)
    const response      = await dispatch(actionCreateOrder(postData, getCartItems, cartTotal))
    try{
      if (response.success === true) {
        toast.success("Order saved successfully")
          const paySession = await dispatch(actionCreateOrderPayment(response.result))
          try {
            if (paySession && paySession.success === true) {
              // "the window url is the alternative" window.location.href = paySession.session.url
              const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
              const stripe        = await stripePromise;
              await stripe.redirectToCheckout({ sessionId: paySession.session.id });
            } else {
                console.error('Invalid paymentResponse:', paySession);
                // Handle the case where paymentResponse or paymentUrl is missing
            }
          } catch (err) {
              console.error('Error redirecting to Stripe:', err);
          }
        //----------------------------------------------------------------
        setErrorMessage(null);
      } else if (response.status === 400) {
        setSavingInfo(false)
        setErrorMessage(response.data.message);
      }
    }catch(error){
      // setErrorMessage(error.response.status)
      setErrorMessage("unable to upload data, please check your internet and try again")
      setSavingInfo(false)
    }
  }

  const navigateToCart = () => {
    navigate('/cart');
  }
  const navigateToProducts = () => {
    navigate('/posts');
  }

  return (
    <>
      <Helmet><title>checkout</title></Helmet>
      <div className='container'>
        <div className='checkout-main-content'>
          {/* <CheckoutMainContent /> */}
          <>
            <div className='check-out-main-bar-wrapper'>
              <div className='check-out-main-bar-item-details'>
                <div className='check-out-main-bar-sub-icon'>
                  <LocalShippingRoundedIcon />
                  <span>Shipping details</span>
                </div>
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
                  {errorMessage && <p className='error-msg'>{errorMessage}</p>}
                </form>

                <div className='check-main-bar-link-button'>
                  <Button buttonClickWrap="transparent-link-wrapper" buttonIcon={<KeyboardBackspaceRoundedIcon />} onClickButton onClickNavigate={navigateToCart} onClickName="Return to cart"/>
                  <Button buttonClickWrap="link-wrapper" onClickButton onClickNavigate={navigateToProducts} onClickName="Continue shopping"/>
                </div>
              </div>
            </div>
          </>
        </div>
        <div className='checkout-side-content'>
          <CheckoutSideContent isButtonDisabled={isButtonDisabled} savingInfo={savingInfo} handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

export default Checkout