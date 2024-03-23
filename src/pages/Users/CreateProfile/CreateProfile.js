import React from 'react'
import { Helmet } from 'react-helmet-async'
import { CreateUserProfileMainContent, CreateUserProfileSideContent } from '../../../components'

import './createProfile.css'

const CreateProfile = () => {
  return (
    <>
      <Helmet><title>create profile</title></Helmet>
      <div className='container'>
        <div className='user-profile-main-content'>
          <CreateUserProfileMainContent />
        </div>
        <div className='user-profile-side-content'>
          <CreateUserProfileSideContent />
        </div>
      </div>
    </>
  )
}

export default CreateProfile