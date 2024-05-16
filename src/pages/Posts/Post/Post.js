import React, { useEffect, useState } from 'react'
import { BreadCrumbs, OtherSupplierPosts, ProductDisplay, RelatedPosts } from '../../../components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actionFetchFilteredMoreSupplierPosts, actionFetchFilteredRelatedPosts, actionFetchPost } from '../../../actions/posts'
import { actionFetchPostRating } from '../../../actions/postRatings'

import './post.css'

const Post = () => {
  const dispatch              = useDispatch()
  const { id }                = useParams()
  const {singlePost}          = useSelector((state) => state.postList)
  const [onePost, setOnePost] = useState(null);
  const page                  = 1

  useEffect(() => {
    if (singlePost && singlePost._id === id) {
      setOnePost(singlePost);
    } else {
      setOnePost(null);
    }
  }, [id, singlePost]);

  useEffect(() => {
    dispatch(actionFetchPost(id))
    dispatch(actionFetchPostRating(id))
    // once a rating is submitted, it should refresh the actionFetchPostRating
  }, [id, dispatch]);

  return (
    <>
      <div className='post-main-wrapper'>
        <BreadCrumbs />

        <ProductDisplay product={onePost} onePost={onePost} postId={id} userId={singlePost?.userId} />

        <RelatedPosts id={id} actionGet={actionFetchFilteredRelatedPosts} page={page} postType={singlePost?.postType} category={singlePost?.category} tag={singlePost?.tag} />

        <OtherSupplierPosts userId={singlePost?.userId} id={id} actionGet={actionFetchFilteredMoreSupplierPosts} page={page} postType={singlePost?.postType} category={singlePost?.category} tag={singlePost?.tag} />
      </div>
    </>
  )
}

export default Post