import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
import { contactUsValidateEmailAddress, contactUsValidateFirstName, contactUsValidateLastName, contactUsValidateMessage } from '../validations/contact/contact';
import { Button, FormField, Loader } from '../';
import ReCAPTCHA from 'react-google-recaptcha';
import { actionCreateContactUsMessage } from '../../actions/contactUs';

import './contactForm.css'

const ContactForm = () => {
    const dispatch                                    = useDispatch();
    // const navigate                                    = useNavigate();
    // const location                                    = useLocation();
    const [savingInfo, setSavingInfo]                 = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]     = useState(true);
    const [errorMessage, setErrorMessage]             = useState(null);
    const [firstNameErrors, setFirstNameErrors]       = useState(null);
    const [lastNameErrors, setLastNameErrors]         = useState(null);
    const [emailAddressErrors, setEmailAddressErrors] = useState(null);
    const [messageErrors, setMessageErrors]           = useState(null);
    const [captchaValue, setCaptchaValue]             = useState(null);

    const [postData, setPostData]     = useState({firstName: '', lastName: '', emailAddress: '', message: ''})
    const [isLoading, setIsLoading]   = useState({firstName: false, lastName: false, emailAddress: false, message: false })
    const [isValid, setIsValid]       = useState({firstName: false, lastName: false, emailAddress: false, message: false })

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

    const debouncedPostData          = useDebounce(postData, 500) //postData

    const handleChangeCaptcha = (value) => {
      setCaptchaValue(value);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setIsLoading((prevState) => ({ ...prevState, [name]: true }));
      setPostData((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
      const validateFirstName = () => {
        const { isValid, errors } = contactUsValidateFirstName(debouncedPostData.firstName);
        setIsValid((prevState) => ({
          ...prevState,
          firstName: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          firstName: false,
        }));
        return errors;
      };

      const validateLastName = () => {
        const { isValid, errors } = contactUsValidateLastName(debouncedPostData.lastName);
        setIsValid((prevState) => ({
          ...prevState,
          lastName: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          lastName: false,
        }));
        return errors;
      };
    
      const validateEmailAddress = () => {
        const { isValid, errors } = contactUsValidateEmailAddress(debouncedPostData.emailAddress);
        setIsValid((prevState) => ({
          ...prevState,
          emailAddress: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          emailAddress: false,
        }));
        return errors;
      };

      const validateMessage = () => {
        const { isValid, errors } = contactUsValidateMessage(debouncedPostData.message);
        setIsValid((prevState) => ({
          ...prevState,
          message: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          message: false,
        }));
        return errors;
      };
    
      const firstNameErrors      = validateFirstName();
      const lastNameErrors       = validateLastName();
      const emailAddressErrors   = validateEmailAddress();
      const messageErrors        = validateMessage()
      
      setFirstNameErrors(firstNameErrors);
      setLastNameErrors(lastNameErrors);
      setEmailAddressErrors(emailAddressErrors);
      setMessageErrors(messageErrors);

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( firstNameErrors.length > 0 || lastNameErrors.length > 0 || emailAddressErrors.length > 0 || messageErrors.length > 0 || !captchaValue ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, captchaValue]);

    const handleSubmit = async(e) => {
      e.preventDefault();
      setIsButtonDisabled(true)
      setSavingInfo(true);
      setErrorMessage(null)
      const response = await dispatch(actionCreateContactUsMessage(postData))
      if(response.success === true) {
          toast.success("post created successfully")
          setIsButtonDisabled(false)
          setSavingInfo(false);
          setPostData({firstName: '', lastName: '', emailAddress: '', message: ''})
      } else if (response.status === 401) {
        setErrorMessage(response.data.message);
        setSavingInfo(false)
      }
    }

  return (
    <>
      <form className='contact-reg-container' onSubmit={handleSubmit} autoComplete="off">
        <div className='contact-login-container-title'>
            <h3>Send a message</h3>
            <small>We'd love help</small>
        </div>

        <div className=''>
        <FormField inputType type="text" labelName="First Name" name="firstName" value={postData.firstName} handleChange={handleChange} isLoading={isLoading.firstName} isValid={isValid.firstName} errors={firstNameErrors || []} />
            
        <FormField inputType type="text" labelName="Last Name" name="lastName" value={postData.lastName} handleChange={handleChange} isLoading={isLoading.lastName} isValid={isValid.lastName} errors={lastNameErrors || []} />

        <FormField inputType type="text" labelName="Email Address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoading={isLoading.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

        <FormField textareaType maxLength={1000} labelName="Message" name="message" value={postData.message} handleChange={handleChange} isLoading={isLoading.message} isValid={isValid.message} errors={messageErrors || []} />

        <div className='contact-captcha'><ReCAPTCHA sitekey="6LdOKzwnAAAAAFbP4KMhcR-XyF8IFEKYkJ6g-IM-" onChange={handleChangeCaptcha}/></div>

        <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Sending...</> : "Send"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

        </div>
        {errorMessage && <p className='error-msg'>{errorMessage}</p>}
      </form>
    </>
  )
}

export default ContactForm