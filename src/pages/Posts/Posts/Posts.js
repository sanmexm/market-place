import React, { useEffect, useState } from 'react'
import { BreadCrumbs, Items, SearchHeader } from '../../../components'
import { useSelector } from 'react-redux'
import { actionFetchFilteredPosts } from '../../../actions/posts'

import './posts.css'

const Posts = () => {
  const { isLoading, getAllFilteredPosts }      = useSelector((state) => state.postList)
  const page                                    = 1
  const [allFilteredPosts, setAllFilteredPosts] = useState([]);
  const allPosts = "All Products & Services"
  const products = "Products"
  const services = "Services"
  const men      = "Men"
  const women    = "Women"
  const kids     = "Kids"

  useEffect(() => {
    if (getAllFilteredPosts) {
      setAllFilteredPosts(getAllFilteredPosts);
    }
  }, [getAllFilteredPosts]);

  return (
    <>
      <SearchHeader />
      <BreadCrumbs />
      <div className='posts-main-wrapper'>
        <Items title="All Products & Services" isLoading={isLoading} allPosts={allFilteredPosts} page={page} postType="" category="" tag="" actionGet={actionFetchFilteredPosts} linkTo={`/post-items/${allPosts}/filtered`} />

        <Items title="products" isLoading={isLoading} allPosts={allFilteredPosts} page={page} postType="item" category="" tag="" actionGet={actionFetchFilteredPosts} linkTo={`/post-items/${products}/filtered?postType=item`} />

        <Items title="services" isLoading={isLoading} allPosts={allFilteredPosts} page={page} postType="service" category="" tag="" actionGet={actionFetchFilteredPosts} linkTo={`/post-items/${services}/filtered?postType=service`} />

        <Items title="men" isLoading={isLoading} allPosts={allFilteredPosts} page={page} postType="item" category="men" tag="" actionGet={actionFetchFilteredPosts} linkTo={`/post-items/${men}/filtered?postType=item&category=men`} />

        <Items title="women" isLoading={isLoading} allPosts={allFilteredPosts} page={page} postType="service" category="women" tag="women" actionGet={actionFetchFilteredPosts} linkTo={`/post-items/${women}/filtered?postType=service&category=women&tag=women`} />

        <Items title="kids" isLoading={isLoading} allPosts={allFilteredPosts} page={page} postType="item" category="kids" tag="" actionGet={actionFetchFilteredPosts} linkTo={`/post-items/${kids}/filtered?postType=item&category=kids`} />
      </div>
    </>
  )
}

export default Posts