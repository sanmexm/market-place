import React from 'react'
import moment from 'moment'
import { posts } from '../../../assets'

import './viewUserPostProfile.css'

const ViewUserPostProfile = ({singlePost, storeProfileData}) => {
  return (
    <>
      <div className='view-post-profile-body-wrapper'>
        <div className='view-post-profile-body-head'>
          <h3>Post information</h3>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            store Name:
          </div>
          <div className='view-post-profile-details-main'>
            {storeProfileData?.result?.name}
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            Post Type:
          </div>
          <div className='view-post-profile-details-main'>
            {singlePost?.postType}
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            image:
          </div>
          <div className='view-post-profile-details-main-img'>
            <img src={singlePost?.selectedFile || posts} alt="img" />
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            selected images:
          </div>
          <div className='view-post-profile-details-selected-images-cover'>
              {singlePost?.selectedFileImages?.map((image, index) => (
                <div className='view-post-profile-details-selected-images' key={index}>
                  <img src={image || posts} alt={`img${index}`} />
                </div>
              ))}
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            title:
          </div>
          <div className='view-post-profile-details-main'>
            {singlePost?.title}
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            category:
          </div>
          <div className='view-post-profile-details-main'>
            {singlePost?.category}
          </div>
        </div>
        
        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            tag:
          </div>
          <div className='view-post-profile-details-main'>
            {singlePost?.tag}
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            price:
          </div>
          <div className='view-post-profile-details-main'>
            {singlePost?.price}
            
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            old price:
          </div>
          <div className='view-post-profile-details-main'>
            {singlePost?.oldPrice}
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            description:
          </div>
          <div className='view-post-profile-details-main'>
            {singlePost?.description}
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            promote:
          </div>
          <div className='view-post-profile-details-main'>
            {singlePost?.promote}
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            created:
          </div>
          <div className='view-post-profile-details-main'>
            {moment(singlePost?.createdAt).format('YYYY-MM-DD H:s:m')} 
          </div>
        </div>

        <div className='view-post-profile-body-details-wrapper'>
          <div className='view-post-profile-details-title'>
            updated:
          </div>
          <div className='view-post-profile-details-main'>
            {moment(singlePost?.updatedAt).format('YYYY-MM-DD H:s:m')} 
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewUserPostProfile