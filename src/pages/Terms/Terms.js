import React from 'react'

import './terms.css'
import { Helmet } from 'react-helmet-async'
import { SubHeaders } from '../../components'

const Terms = () => {
  return (
    <>
        <Helmet><title>Terms & Conditions</title></Helmet>
        <div className="terms-section-wrapper">
            <SubHeaders pageTitle="Terms & Conditions" headerText="Find answers to commonly asked questions, and your submit requests to us and get a feedback in 24 hours" />

            <div className='terms-section-container'>

            </div>
        </div>
    </>
  )
}

export default Terms