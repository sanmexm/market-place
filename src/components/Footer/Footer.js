import React from 'react'
import { Link } from 'react-router-dom'
import { Name, BackToTop } from '../'
import { CallRoundedIcon, FacebookRoundedIcon, InstagramIcon, MailIcon, TelegramIcon, TwitterIcon } from '../../utils/constants'

import './footer.css'
import { logo } from '../../assets'

const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <div className="footer__container">
            <div className='footer__container-left'>
                <div className='footer__container-content'>
                    <p>Subscribe to our news letter and get exclusive offers in your Email.</p>
                    <div className="footer__subscribe">
                        <input type="email" placeholder="Enter email" required />
                        <button className='footer__subscribe-button' type="button"><TelegramIcon /></button>
                    </div>
                </div>
            </div>
            <div className='footer__container-right'>
                <div className='footer-shop-logo-container'>
                    <div className='footer-shop-logo'>
                        <div className='footer-shop-logo-wrapper'>
                            <img src={logo} alt='' />
                        </div>
                        <Link to="/" className="footer__logo"><h3><Name /></h3></Link>
                    </div>
                    <span className='footer-shop-text'>
                        Simply the best.
                    </span>
                </div>
                <div className="footer-content">
                    <h4>Resources</h4>
                    <ul className="permalinks">
                        <li><Link className='footer-link' to="/about">About</Link></li>
                        <li><Link className='footer-link' to="/terms">Terms & Conditions</Link></li>
                        <li><Link className='footer-link' to="/privacy">Privacy</Link></li>
                        <li><Link className='footer-link' to="/contact">Contact Us</Link></li>
                        <li><Link className='footer-link' to="/frequently-asked-questions">faq</Link></li>
                    </ul>
                </div>
                <div className="footer-content">
                    <h4>Get started</h4>
                    <ul className="permalinks">
                        <li><Link className='footer-link' to="/">Introduction</Link></li>
                        <li><Link className='footer-link' to="/">documentation</Link></li>
                        <li><Link className='footer-link' to="/">how to use</Link></li>
                    </ul>
                </div>
                <div className="footer-content">
                    <h4>Contact us</h4>
                    <div className='footer-contact'>
                        <span className='footer-contact-icon'><CallRoundedIcon /> +1 234 546 4567</span>
                        <span className='footer-contact-icon'><MailIcon /> sample@email</span>
                        <ul className="footer__socials">
                            <li><a className='footer__socials_link' href={`https://facebook.com/adducer`} target='_blank' rel="noreferrer"><span><FacebookRoundedIcon /></span></a></li>
                            <li><a className='footer__socials_link' href={`https://instagram.com/adducer`} target='_blank' rel="noreferrer"><span><InstagramIcon /></span></a></li>
                            <li><a className='footer__socials_link' href={`https://twitter.com/adducer`} target='_blank' rel="noreferrer"><span><TwitterIcon /></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright"><small>&copy; { new Date().getFullYear() } <Name /> | All rights reserved.</small></div>
      </footer>
      <BackToTop />
    </>
  )
}

export default Footer