import React from 'react'
import { Helmet } from 'react-helmet-async'
import { SubHeaders } from '../../components'

import './privacy.css'

const Privacy = () => {

  return (
    <>
        <Helmet><title>Privacy Policy</title></Helmet>
        <div className='privacy-section-wrapper'>
            <SubHeaders pageTitle="Privacy Policy" headerText="Find answers to commonly asked questions, and your submit requests to us and get a feedback in 24 hours" />
            <div className='privacy-section-container'>

            </div>
        </div>
    </>
  )
}

export default Privacy