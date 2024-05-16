import React from 'react'

import './viewUserSingleStore.css'
import moment from 'moment'

const ViewUserSingleStore = ({id, getStoreItemsById}) => {
    
  return (
    <>
      <div className='view-profile-body-wrapper'>
        <div className='view-profile-body-head'>
          <h3>Profile information</h3>
        </div>
        
        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            Store Name:
          </div>
          <div className='view-profile-details-main'>
            {getStoreItemsById?.result?.name}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            Title:
          </div>
          <div className='view-profile-details-main'>
            {getStoreItemsById?.result?.title}
          </div>
        </div>
        
        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            Description:
          </div>
          <div className='view-profile-details-main'>
            {getStoreItemsById?.result?.description}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            created:
          </div>
          <div className='view-profile-details-main'>
            {moment(getStoreItemsById?.result?.createdAt).format('YYYY-MM-DD H:s:m')} 
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            updated:
          </div>
          <div className='view-profile-details-main'>
            {moment(getStoreItemsById?.result?.updatedAt).format('YYYY-MM-DD H:s:m')} 
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewUserSingleStore