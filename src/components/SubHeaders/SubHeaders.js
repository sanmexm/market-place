import React from 'react'
import { Link } from 'react-router-dom'

import './subHeaders.css'

const SubHeaders = ({pageTitle, headerText}) => {
  return (
    <>
        <div className='sub-header-section-header-wrapper'>
            <div className='sub-header-section-title'>
                <h2>{pageTitle}</h2>
                <div className='sub-header-section-small'>{headerText}</div>
            </div>

            <div className='sub-header-section-contact'>
              <a href='tel:+23470355555' className='contact-text'>Questions: +23470355555</a>
              <Link className='contact-link' to="/contact">Contact Us</Link>
            </div>
        </div>
    </>
  )
}

export default SubHeaders