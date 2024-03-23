import React from 'react'
import {Button} from '../..'
import { featuresList } from '../../../utils/constants'

import './features.css'

const Features = () => {
  return (
    <>
      <section className='features-wrapper'>
        <div className='features-header'>
          <h3>Our features</h3>
          <div className='features-header-list'>
            <h4>Enrich your plan with more features</h4>
            <span>keep an eye on your listings</span>
          </div>
        </div>
        <div className='features-grid'>
          {featuresList.map((feature) => (
            <div key={feature.id} className='features-grid-box'>
              <div className='features-grid-icon' title={feature.title}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <span>{feature.detail}</span>
            </div>
          ))}
        </div>
        {/* <Button title='Learn More' className="top-nav-btn" linkTo="/" linkClass="top-nav-btn-link" /> */}
        <Button buttonWrapper="button-wrapper" linkButton linkTo="/" linkClass="link-wrapper" linkName="Learn More" />
      </section>
    </>
  )
}

export default Features