import React from 'react'
import moment from 'moment'

import './viewUserProfile.css'

const ViewUserProfile = ({userData, userProfileData}) => {

  return (
    <>
      <div className='view-profile-body-wrapper'>
        <div className='view-profile-body-head'>
          <h3>Profile information</h3>
        </div>
        
        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            first name:
          </div>
          <div className='view-profile-details-main'>
            {userData?.firstName}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            middle name:
          </div>
          <div className='view-profile-details-main'>
            {userData?.middleName}
          </div>
        </div>
        
        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            last name:
          </div>
          <div className='view-profile-details-main'>
            {userData?.lastName}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            date of birth:
          </div>
          <div className='view-profile-details-main'>
            {userProfileData?.dateOfBirth}
            
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            sex:
          </div>
          <div className='view-profile-details-main'>
            {userProfileData?.sex}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            primary Phone:
          </div>
          <div className='view-profile-details-main'>
            {userProfileData?.primaryPhone}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            Email Address:
          </div>
          <div className='view-profile-details-main'>
            {userData?.emailAddress}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            Username:
          </div>
          <div className='view-profile-details-main'>
            {userData?.username}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            category:
          </div>
          <div className='view-profile-details-main'>
            {userProfileData?.category}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            location:
          </div>
          <div className='view-profile-details-main'>
            {userProfileData?.location}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            verification status:
          </div>
          <div className='view-profile-details-main'>
            {userProfileData?.verification === true ? 'verified' : 'unverified'}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            created:
          </div>
          <div className='view-profile-details-main'>
            {moment(userProfileData.createdAt).format('YYYY-MM-DD H:s:m')} 
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            updated:
          </div>
          <div className='view-profile-details-main'>
            {moment(userProfileData.updatedAt).format('YYYY-MM-DD H:s:m')} 
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewUserProfile