import React from 'react'
import { Helmet } from 'react-helmet-async'
import { EditUserStoreCoverImageMainContent, EditUserStoreCoverImageSideContent } from '../../../components'

import './editUserStoreImageCover.css'

const EditUserStoreImageCover = () => {
  return (
    <>
        <Helmet><title>Edit Store</title></Helmet>
        <div className='container'>
            <div className='edit-single-store-cover-image-main-content'>
                <EditUserStoreCoverImageMainContent />
            </div>
            <div className='edit-single-store-cover-image-side-content'>
                <EditUserStoreCoverImageSideContent />
            </div>
        </div>
    </>
  )
}

export default EditUserStoreImageCover