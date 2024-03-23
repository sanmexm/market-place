import React from 'react'

import './viewUserProfile.css'

const ViewUserProfile = ({authData}) => {

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
            {authData?.result?.firstName}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            middle name:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.middleName}
          </div>
        </div>
        
        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            last name:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.lastName}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            date of birth:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.dateOfBirth}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            sex:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.sex}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            primary Phone:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.primaryPhone}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            secondary Phone:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.secondaryPhone}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            profession:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.profession}
          </div>
        </div>
        
        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            Email Address:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.emailAddress}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            Username:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.username}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            street address:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.streetAddress}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            apartment number:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.apartmentNumber}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            city:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.city}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            state:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.state}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            zip code:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.zipCode}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewUserProfile