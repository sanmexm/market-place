import React from 'react'
import { AboutUs, Category, Features, Hero } from '../../components'

import './home.css'

const Home = () => {
  return (
    <>
      <div className='home-wrapper'>
        <Hero />

        <AboutUs />

        <Features />

        <Category />
      </div>
    </>
  )
}

export default Home