import React from 'react'
import { Helmet } from 'react-helmet-async'
import { CreateUserStoreMainContent, CreateUserStoreSideContent } from '../../../components'

import './createStore.css'

const CreateStore = () => {
  return (
    <>
      <Helmet><title>create store</title></Helmet>
      <div className='container'>
        <div className='create-user-store-main-content'>
          <CreateUserStoreMainContent />
        </div>
        <div className='create-user-store-side-content'>
          <CreateUserStoreSideContent />
        </div>
      </div>
    </>
  )
}

export default CreateStore