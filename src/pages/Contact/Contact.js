import React from 'react'
import { ContactAddressInfo, ContactForm, SubHeaders } from '../../components'
import { Helmet } from 'react-helmet-async'

import './contact.css'

const Contact = () => {
  
  return (
    <>
      <Helmet><title>Contact Us</title></Helmet>
      <div className='contact-section-wrapper'>
        <SubHeaders pageTitle="Contact" headerText="Find answers to commonly asked questions, and your submit requests to us and get a feedback in 24 hours" />

        <div className='contact-container'>
          <div className='contact-form-container'>
            <ContactForm />
          </div>

          <div className='contact-address-container'>
            <ContactAddressInfo />
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact