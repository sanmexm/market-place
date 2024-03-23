import React from 'react'
import { BreadCrumbs, PostItemsMainContent, PostItemsSideContent } from '../../components'
import { Helmet } from 'react-helmet-async'

import './postItems.css'

const PostItems = () => {

  return (
    <>
      <Helmet><title>posts items</title></Helmet>
        <BreadCrumbs />
        <div className='container'>
            <div className='post-item-side-content'>
              <PostItemsSideContent />
            </div>
            <div className='post-item-main-content'>
              <PostItemsMainContent  />
            </div>
        </div>
    </>
  )
}

export default PostItems