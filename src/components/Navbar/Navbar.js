import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { useScrollPosition } from '../../utils/scrollPosition'
import { setAuthLogout } from '../../reducers/authSlice'
import { Button, Name, ToggleModeButton } from '../'
import { cart, logo } from '../../assets'
import { MenuRoundedIcon, CloseRoundedIcon, navLinks, navSubLinks } from '../../utils/constants'

import './navbar.css'

const Navbar = ({theme}) => {
  const dispatch                                = useDispatch()
  // const authData                                = JSON.parse(localStorage.getItem('authData'))
  const [authData, setAuthData]                 = useState(JSON.parse(localStorage.getItem('authData')));
  // const [userData, setUserData]                 = useState(authData)
  const [user, setUser]                         = useState(authData)
  const nameSet                                 = authData?.result?.firstName
  const { getCartItems}                         = useSelector((state) => state?.cartList)
  const { getWishlistItems }                    = useSelector((state) => state?.wishlistList)
  const scrollPosition                          = useScrollPosition();
  const modalNavRef                             = useRef()
  const [selectedCategory, setSelectedCategory] = useState("home")
  const [toggleNav, setToggleNav]               = useState(false)
  const [isOpen, setIsOpen]                     = useState(false)
  const [extrasIsOpen, setExtrasIsOpen]         = useState(false)

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem('authData'));
    setAuthData(storedAuthData);
    setUser(storedAuthData); // Update userData when authData changes
  }, []);

  useEffect(() => {
    setUser(authData);
  }, [authData]);

  const handleAccountClick = () => {
    setIsOpen((prev) => !prev)
  }

  const handleExtrasIsOpen = () => {
    setExtrasIsOpen((prev) => !prev) 
  }

  const closeNavModal = e => {
    if(modalNavRef.current === e.target){
      setToggleNav(false)
    }
  }

  const logoutUser = () => {
    dispatch(setAuthLogout())
    localStorage.clear()
    setUser(null)
    window.location.reload()
    handleAccountClick()
  }

  useEffect(() => {
    let tokenExpirationTimeout;
    let inactivityTimeout;
  
    const resetTokenExpirationTimer = () => {
      clearTimeout(tokenExpirationTimeout);
  
      const token = user?.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          logoutUser();
        } else {
          const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000;
          tokenExpirationTimeout = setTimeout(logoutUser, timeUntilExpiration);
        }
      }
    };
  
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logoutUser, 15 * 60 * 1000);
    };
  
    const clearTimers = () => {
      clearTimeout(tokenExpirationTimeout);
      clearTimeout(inactivityTimeout);
    };
  
    const events = ["load", "mousemove", "mousedown", "touchstart", "click", "keypress", "scroll", "resize", "contextmenu", "wheel", "keydown", "keyup", "focus", "blur"];
  
    events.forEach((event) => {
      window.addEventListener(event, () => {
        resetTokenExpirationTimer();
        resetInactivityTimer();
      });
    });
  
    const clearTimersOnUnload = () => {
      clearTimers();
      events.forEach((event) => {
        window.removeEventListener(event, resetTokenExpirationTimer);
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  
    window.addEventListener("beforeunload", clearTimersOnUnload);
  
    return () => {
      clearTimersOnUnload();
      window.removeEventListener("beforeunload", clearTimersOnUnload);
    };
  }, [user?.token]);

  return (
    <>
      <nav className={scrollPosition > 50 ? 'navbar active-scroll' : 'navbar'}>
        <Link to="/" className='nav-logo-wrapper'>
          <div className='nav-logo'>
            <img src={logo} alt='site logo' />
          </div>
          <span><Name /></span>
        </Link>
        
        <div className='navbar-show-btn navbar-open-close' onClick={() => setToggleNav((prev) => !prev)}><MenuRoundedIcon /></div>

        <div className={toggleNav ? 'navbar-collapse navbar-show' : 'navbar-collapse'} ref={modalNavRef} onClick={closeNavModal}>
          <div className='navbar-collapse-inner'>
            <div className='navbar-hide-btn navbar-open-close'  onClick={() => setToggleNav((prev) => !prev)}><CloseRoundedIcon /></div>
            <ul className='navbar-nav'>
              {navLinks.map((navlink, index) => (
                <li key={index} className='nav-item'><Link onClick={() => setSelectedCategory(navlink.name)} className={selectedCategory === navlink.name ? 'nav-link active' : 'nav-link' } to={navlink.link}><span>{navlink.name}</span></Link>
                  {/* you can still make this ul a map func */}
                </li>
              ))}
              <li className='nav-item' onClick={handleExtrasIsOpen}><Link onClick={() => setSelectedCategory("extras")} className='nav-link'><span>extras</span></Link>
                <ul className={extrasIsOpen ? 'nav-sub-menu active' : 'nav-sub-menu'}>
                  {navSubLinks.map((link, index) => (
                    <li key={index}><Link to={link.link}>{link.name}</Link></li>
                  ))}
                </ul>
              </li>
              <li>
                <div className='nav-menu-login-cart'>
                  <Link to="cart" className='cart-container'>
                    <div className='cart-image-container'>
                      <img src={cart} alt='cart logo'/>
                    </div>
                    <small className='nav-cart-count'>{getCartItems?.length}</small>
                  </Link>
                  {user ? (
                    <div className='nav-account-btn-container'>
                      <Button buttonWrapper="button-wrapper" onClickButton buttonClickWrap="button-click-wrap" onClickNavigate={handleAccountClick} onClickName={<small>Hi, {nameSet}</small>} />

                      <div className={isOpen ? 'nav-account-menu-option active' : 'nav-account-menu-option'}>
                        <Link to="/posts/my-posts" className='nav-account-menu-detail nav-account-menu-detail-bottom-divider' onClick={handleAccountClick}>
                          <span>Dashboard</span>
                        </Link>
                        <Link to={`/users/user-profile`} className='nav-account-menu-detail nav-account-menu-detail-bottom-divider' onClick={handleAccountClick}>
                          <span>Profile</span>
                        </Link>
                        <Link to="/wishlist" className='nav-account-menu-detail nav-account-menu-detail-bottom-divider' onClick={handleAccountClick}>
                          <span>Wishlist({getWishlistItems?.length})</span>
                        </Link>
                        <Link className='nav-account-menu-detail' onClick={logoutUser}>
                          <span>Logout</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='nav-account-btn-container'>
                      <Button buttonWrapper="button-wrapper" onClickButton buttonClickWrap="button-click-wrap" onClickNavigate={handleAccountClick} onClickName="Account" />

                      <div className={isOpen ? 'nav-account-menu-option active' : 'nav-account-menu-option'}>
                        <Link to="/login" className='nav-account-menu-detail nav-account-menu-detail-bottom-divider' onClick={handleAccountClick}>
                          <span>Login</span>
                        </Link>
                        <Link to="/register" className='nav-account-menu-detail nav-account-menu-detail-bottom-divider' onClick={handleAccountClick}>
                          <span>Signup</span>
                        </Link>
                        <Link to="/wishlist" className='nav-account-menu-detail' onClick={handleAccountClick}>
                          <span>Wishlist({getWishlistItems?.length})</span>
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className='switch-wrapper'>
                    <div className="switch">
                      <ToggleModeButton theme={theme} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar