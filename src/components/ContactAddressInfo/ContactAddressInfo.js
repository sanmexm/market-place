import React from 'react'

import './contactAddressInfo.css'
import { FacebookRoundedIcon, InstagramIcon, LocationOnIcon, SupportAgentRoundedIcon, ShareRoundedIcon, TwitterIcon } from '../../utils/constants'

const ContactAddressInfo = () => {

  return (
    <>
        <div className='contact-address-info'>
          <div className='contact-main-info-container'>
            <div className='contact-main-info-contact-details-wrapper'>
              <div className='contact-main-info-details'>
                <h3 className='contact-main-info-title'><LocationOnIcon /> Address</h3>
                <div className='contact-main-info-details-block'>
                    <div className='contact-main-info-text'>12, dublin road, Ikeja Lagos</div>
                </div>
              </div>
              <div className='contact-main-info-details'>
                <h3 className='contact-main-info-title'><SupportAgentRoundedIcon /> Support</h3>
                <div className='contact-main-info-text'>+234 111 1111 <br/> sample@email</div>
              </div>
              <div className='contact-main-info-details'>
                <h3 className='contact-main-info-title'><ShareRoundedIcon />Social Media</h3>
                <ul className="contact-us__socials">
                    <li><a className='contact-us__socials_link' href={`https://facebook.com/fanzlink`} target='_blank' rel="noreferrer"><span><FacebookRoundedIcon /></span></a></li>
                    <li><a className='contact-us__socials_link' href={`https://instagram.com/fanzlink`} target='_blank' rel="noreferrer"><span><InstagramIcon /></span></a></li>
                    <li><a className='contact-us__socials_link' href={`https://twitter.com/fanzlink`} target='_blank' rel="noreferrer"><span><TwitterIcon /></span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ContactAddressInfo