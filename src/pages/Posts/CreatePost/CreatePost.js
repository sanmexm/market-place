import React from 'react'
import { Helmet } from 'react-helmet-async'
import { CreatePostMainContent, CreatePostSideContent } from '../../../components'

import './createPost.css'

const CreatePost = () => {
  return (
    <>
      <Helmet><title>create -post</title></Helmet>
      <div className='container'>
        <div className='create-post-main-content'>
            <CreatePostMainContent />
        </div>
        <div className='create-post-side-content'>
            <CreatePostSideContent />
        </div>
      </div>
    </>
  )
}

export default CreatePost
