import React from 'react'
import { Helmet } from 'react-helmet-async'
import { UserStoreMainContent, UserStoreSideContent } from '../../../components'

import './userStore.css'

const UserStore = () => {
  return (
    <>
      <Helmet><title>user store</title></Helmet>
      <div className='container'>
        <div className='user-store-main-content'>
          <UserStoreMainContent />
        </div>
        <div className='user-store-side-content'>
          <UserStoreSideContent />
        </div>
      </div>
    </>
  )
}

export default UserStore