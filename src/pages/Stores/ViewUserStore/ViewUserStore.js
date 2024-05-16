import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ViewUserStoreMainContent, ViewUserStoreSideContent } from '../../../components'

import './viewUserStore.css'

const ViewUserStore = () => {

  return (
    <>
      <Helmet><title>View user store</title></Helmet>
      <div className='container'>
        <div className='view-user-store-main-content'>
          <ViewUserStoreMainContent />
        </div>
        <div className='view-user-store-side-content'>
          <ViewUserStoreSideContent />
        </div>
      </div>
    </>
  )
}

export default ViewUserStore