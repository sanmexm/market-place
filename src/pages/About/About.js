import React from 'react'
import { Button, Name, SubHeaders } from '../../components'
import { featuresList } from '../../utils/constants'
import { Helmet } from 'react-helmet-async'
import { stores } from '../../assets'

import './about.css'

const About = () => {
    
  return (
    <>
        <Helmet><title>About Market Place</title></Helmet>
        <div className='about-section-wrapper'>
            <SubHeaders pageTitle="About" headerText="Find answers to commonly asked questions, and your submit requests to us and get a feedback in 24 hours" />

            <section className='about-section-container'>
                <div className='about-us-section-wrapper'>
                    <div className='about-us-section-header'>
                        <div className='about-us-section-header-list'>
                            <h4>learn more about us</h4>
                            <span>know more about your listings <Name /></span>
                        </div>
                    </div>

                    <div className='about-us-section-body-wrapper'>
                        <div className='about-us-section-body-image'>
                            <img src={stores} alt="about" />
                        </div>
                        <div className='about-us-section-body-text-wrapper'>
                            <div className='about-us-section-body-text-content'>
                            Connecting, helping and engaging people to find great and verified online businesses. <br />
                            <small>Showcase and share your online business easily</small>
                            </div>
                            <Button buttonWrapper="button-wrapper" linkButton linkTo="/contact" linkClass="link-wrapper" linkName="Get in Touch" />
                        </div>
                    </div>
                </div>
            </section>

            <section className='about-feature-container'>
                <div className='about-us-features-wrapper'>
                    <div className='about-us-features-header'>
                        <div className='about-us-features-header-list'>
                            <h4>Why choose us</h4>
                            <span>keep an eye on your listings</span>
                        </div>
                    </div>
                    <div className='about-us-features-grid'>
                        {featuresList.map((feature) => (
                            <div key={feature.id} className='about-us-features-grid-box'>
                            <div className='about-us-features-grid-icon' title={feature.title}>
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <span>{feature.detail}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='about-get-in-touch-container'>
                <div className='about-us-get-in-touch-wrapper'>
                    <div className='about-us-get-in-touch-header'>
                        <div className='about-us-get-in-touch-header-list'>
                            <h4>Feel free to connect with us</h4>
                            <span>we are excited about the opportunity to learn and know more about we can help you with a better service.</span>
                        </div>
                    </div>
                    <div className='about-us-get-in-touch-btn-connect'>
                        <Button buttonWrapper="button-wrapper" linkButton linkTo="/contact" linkClass="transparent-link-wrapper" linkName="Get in Touch" />
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}

export default About