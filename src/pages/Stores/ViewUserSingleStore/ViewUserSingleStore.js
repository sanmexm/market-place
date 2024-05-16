import React from 'react'
import { Helmet } from 'react-helmet-async'
import {EditUserSingleStoreMainContent, EditUserSingleStoreSideContent} from '../../../components'

import './viewUserSingleStore.css'

const ViewUserSingleStore = () => {
  return (
    <>
      <Helmet><title>View Store</title></Helmet>
      <div className='container'>
        <div className='view-single-store-main-content'>
          <EditUserSingleStoreMainContent />
        </div>
        <div className='view-single-store-side-content'>
          <EditUserSingleStoreSideContent />
        </div>
      </div>
    </>
  )
}

export default ViewUserSingleStore