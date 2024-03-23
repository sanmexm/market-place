import React, { useEffect, useState } from 'react'

import './loginPopUp.css'

const LoginPopUp = ({ isOpen, onCancel, handleModalLoginAccount }) => {
  const [authData, setAuthData]                 = useState(JSON.parse(localStorage.getItem('authData')));
  // const [loginModalPopUp, setLoginModalPopUp]   = useState(authData)

    useEffect(() => {
      setAuthData(JSON.parse(localStorage.getItem('authData'))); // Update authData in local state when it changes in localStorage
    }, [isOpen]);
    
    // useEffect(() => {
    //   setLoginModalPopUp(authData)
    // }, [authData])
  
  return (
    <>
      <div className="login-popup-display-wrapper">
        <div className={isOpen ? 'login-popup-card-tooltip active' : 'login-popup-card-tooltip'}>
          <div className='login-popup-card-content'>
            <small>Please login to continue.</small>
            <div className='login-popup-card-button'>
              <span className='login-popup-link-wrapper' onClick={handleModalLoginAccount}>Login</span>
              <span className='login-popup-transparent-link-wrapper' onClick={onCancel}>Cancel</span>
            </div>
          </div>
        </div>
      </div>
      {/* {!authData && loginModalPopUp && <LoginModal onSuccessLogin={handleSuccessLogin} />} */}
    </>
  )
}

export default LoginPopUp