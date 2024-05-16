import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ViewPostMainContent, ViewPostSideContent } from '../../../components'

import './viewUserPost.css'

const ViewUserPost = () => {
  return (
    <>
      <Helmet><title>View user post</title></Helmet>
      <div className='container'>
        <div className='view-user-post-main-content'>
          <ViewPostMainContent />
        </div>
        <div className='view-user-post-side-content'>
          <ViewPostSideContent />
        </div>
      </div>
    </>
  )
}

export default ViewUserPost