import React from 'react'
import { Helmet } from 'react-helmet-async'
import { BreadCrumbs, SearchPostsMainContent, SearchPostsSideContent } from '../../../components'

import './searchPosts.css'

const SearchPosts = () => {

  return (
    <>
      <Helmet><title>search posts</title></Helmet>
      <BreadCrumbs title="product title" category="product category" />
      <div className='container'>
        <div className='search-posts-side-content'>
          <SearchPostsSideContent />
        </div>
        <div className='search-posts-main-content'>
          <SearchPostsMainContent />
        </div>
      </div>
    </>
  )
}

export default SearchPosts