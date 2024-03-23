import React from 'react'
import { Button } from '../../components'

import './pageNotFound.css'

const PageNotFound = () => {
  return (
    <>
      <div className='page-not-found-container'>
        <div className="page-not-found-wrapper">
          <h2>Oops! Page not found.</h2>
          <h1>404</h1>
          <p>We can't find the page you're looking for.</p>
          <Button buttonWrapper="button-wrapper" linkButton linkTo="/" linkClass="link-wrapper" linkName="Home" />
        </div>
      </div>
    </>
  )
}

export default PageNotFound