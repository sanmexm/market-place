import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreateUser, actionFetchUsers } from '../../actions/users';
import { userValidateUsername, userValidatePassword, userValidateConfirmPassword, userValidateEmailAddress, userValidateLastName, userValidateMiddleName, userValidateFirstName } from '../../components/validations/users/usersRegistration';
import { Button, FormField, Loader, SubmitPopUp } from '../../components';
import { VisibilityIcon, VisibilityOffIcon } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { userImg } from '../../assets';

import './account.css'

const Register = () => {
  // firstName, middleName, lastName, emailAddress, username, password
  const pageName                                            = "create user"
    const dispatch                                          = useDispatch();
    const [savingInfo, setSavingInfo]                       = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]           = useState(true);
    const [hideShow, setHideShow]                           = useState(false);
    const [onOpen, setOnOpen]                               = useState(false)
    const [firstNameErrors, setFirstNameErrors]             = useState(null);
    const [middleNameErrors, setMiddleNameErrors]           = useState(null);
    const [lastNameErrors, setLastNameErrors]               = useState(null);
    const [emailAddressErrors, setEmailAddressErrors]       = useState(null);
    const [usernameErrors, setUsernameErrors]               = useState(null);
    const [passwordErrors, setPasswordErrors]               = useState(null);
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState(null);
    const [errorMessage, setErrorMessage]                   = useState(null);
    const { getAllUsers, currentPage }                      = useSelector((state) => state.userList);

    const [ postData, setPostData ]           = useState({firstName: '', middleName: '', lastName: '', emailAddress: '', username: '', password: '', confirmPassword: ''})

    const [ isLoadingBtn, setIsLoadingBtn ]   = useState({firstName: false, middleName: false, lastName: false, emailAddress: false, username: false, password: false, confirmPassword: false })

    const [ isValid, setIsValid ]             = useState({firstName: false, middleName: false, lastName: false, emailAddress: false, username: false, password: false, confirmPassword: false })

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
      dispatch(actionFetchUsers(currentPage)); // You can pass the page number as needed
    }, [dispatch, currentPage]);

    useEffect(() => {
      const validateFirstName = () => {
        const { isValid, errors } = userValidateFirstName(debouncedPostData.firstName);
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
        const { isValid, errors } = userValidateMiddleName(debouncedPostData.middleName);
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
        const { isValid, errors } = userValidateLastName(debouncedPostData.lastName);
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
        const { isValid, errors } = userValidateEmailAddress(debouncedPostData.emailAddress, getAllUsers);
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

      const validateUsername = () => {
        const { isValid, errors } = userValidateUsername(debouncedPostData.username, getAllUsers);
        setIsValid((prevState) => ({
          ...prevState,
          username: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          username: false,
        }));
        return errors;
      };

      const validatePassword = () => {
        const { isValid, errors } = userValidatePassword(debouncedPostData.password);
        setIsValid((prevState) => ({
          ...prevState,
          password: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          password: false,
        }));
        return errors;
      };

      // the confirm password function should connect from the postData since you're comparing two fields
      const validateConfirmPassword = () => {
        const { isValid, errors } = userValidateConfirmPassword(debouncedPostData);
        setIsValid((prevState) => ({
          ...prevState,
          confirmPassword: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          confirmPassword: false,
        }));
        return errors;
      };
    
      const firstNameErrors        = validateFirstName();
      const middleNameErrors       = validateMiddleName();
      const lastNameErrors         = validateLastName();
      const emailAddressErrors     = validateEmailAddress();
      const usernameErrors         = validateUsername();
      const passwordErrors         = validatePassword();
      const confirmPasswordErrors  = validateConfirmPassword();
      
      setFirstNameErrors(firstNameErrors);
      setMiddleNameErrors(middleNameErrors);
      setLastNameErrors(lastNameErrors);
      setEmailAddressErrors(emailAddressErrors);
      setUsernameErrors(usernameErrors);
      setPasswordErrors(passwordErrors);
      setConfirmPasswordErrors(confirmPasswordErrors);
      
      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( firstNameErrors.length > 0 || middleNameErrors.length > 0 || lastNameErrors.length > 0 || emailAddressErrors.length > 0 || usernameErrors.length > 0 || passwordErrors.length > 0 || confirmPasswordErrors.length > 0 ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, getAllUsers]);

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
        setOnOpen(false);
        setIsButtonDisabled(true)
        const response = await dispatch(actionCreateUser(postData));
        try{
          if (response.success === true) {
            setErrorMessage(null);
            setSavingInfo(false)
          } else if (response.status === 403) {
            setErrorMessage(response.data.message);
            setSavingInfo(false)
          }
        }catch(error){
          // setErrorMessage(error.response.status)
          setErrorMessage("unable to upload data, please check your internet and try again")
          setSavingInfo(false)
        }
      setOnOpen(false); // Close the modal after confirmation
    };

  return (
    <>
      <Helmet><title>{pageName}</title></Helmet>
      <div className='account-container'>
        <form className='account-reg-container' onSubmit={handleSubmit} autoComplete="off">
          <div className='account-login-container-title'>
            <h3>Sign Up</h3>
          </div>

          <div className='account-login-input-btn-pass-container'>
            <FormField inputType type="text" labelName="First Name" name="firstName" value={postData.firstName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.firstName} isValid={isValid.firstName} errors={firstNameErrors || []} />
            
            <FormField inputType type="text" labelName="Middle Name" name="middleName" value={postData.middleName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.middleName} isValid={isValid.middleName} errors={middleNameErrors || []} />

            <FormField inputType type="text" labelName="Last Name" name="lastName" value={postData.lastName} handleChange={handleChange} isLoadingBtn={isLoadingBtn.lastName} isValid={isValid.lastName} errors={lastNameErrors || []} />

            <FormField inputType type="text" labelName="Email Address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoadingBtn={isLoadingBtn.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

            <FormField inputType type="text" labelName="Username" name="username" value={postData.username} handleChange={handleChange} isLoadingBtn={isLoadingBtn.username} isValid={isValid.username} errors={usernameErrors || []} />

            <div className='account-login-group-wrapper'>
              <FormField inputType type={hideShow ? 'text' : 'password'} labelName="Password" name="password" value={postData.password} handleChange={handleChange} isLoadingBtn={isLoadingBtn.password} isValid={isValid.password} errors={passwordErrors || []} />
              <div className='account-login-show-hide-pass-container'>
                <span className={ postData.password.length > 0 ? 'show-hide-password unlock' : 'show-hide-password' } onClick={() => setHideShow((prev) => !prev)}>{hideShow ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
              </div>
            </div>
            <FormField inputType type={hideShow ? 'text' : 'password'} labelName="Confirm Password" name="confirmPassword" value={postData.confirmPassword} handleChange={handleChange} isLoadingBtn={isLoadingBtn.confirmPassword} isValid={isValid.confirmPassword} errors={confirmPasswordErrors || []} />

            <SubmitPopUp onOpen={onOpen} onClose={cancelPostCreation} onConfirm={confirmPostCreation} popUpImage={userImg} prompt="Are you sure you want to create account" />
            {/* collapse the SubmitPopUp after submitting */}
            <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Creating...</> : "Sign Up"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
          </div>
          <div className='have-account-wrapper'>
            <span>Have an account?</span>
            <Link className='account-reg-log' to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register