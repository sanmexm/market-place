import React from 'react'
import { Helmet } from 'react-helmet-async'
import { UserProfileMainContent, UserProfileSideContent } from '../../../components'

import './userProfile.css'

const UserProfile = () => {
  return (
    <>
      <Helmet><title>user profile</title></Helmet>
      <div className='container'>
        <div className='user-profile-main-content'>
          <UserProfileMainContent />
        </div>
        <div className='user-profile-side-content'>
          <UserProfileSideContent />
        </div>
      </div>
    </>
  )
}

export default UserProfile