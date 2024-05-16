import React from 'react'
import {Button} from '../..'
import { logo } from '../../../assets'

import './aboutUs.css'

const AboutUs = () => {
  return (
    <>
      <section className='about-us-wrapper'>
        <div className='about-us-header'>
          <h3>About Us</h3>
          <div className='about-us-header-list'>
            <h4>learn more about us</h4>
            <span>know more about your products</span>
          </div>
        </div>

        <div className='about-us-body-wrapper'>
          <div className='about-us-body-image'>
            <img src={logo} alt="about" />
          </div>
          <div className='about-us-body-text-wrapper'>
            <div className='about-us-body-text-content'>
              Connecting, helping and engaging people to find great and verified online businesses. <br />
              <small>Showcase and share your online business easily</small>
            </div>
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/about" linkClass="link-wrapper" linkName="See More..." />
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs