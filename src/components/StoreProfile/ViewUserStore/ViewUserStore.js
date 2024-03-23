import React from 'react'

import './viewUserStore.css'

const ViewUserStore = ({authData}) => {

  return (
    <>
      <div className='view-profile-body-wrapper'>
        <div className='view-profile-body-head'>
          <h3>Store information</h3>
        </div>
        
        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            Name:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.name}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            title:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.title}
          </div>
        </div>

        <div className='view-profile-body-details-wrapper'>
          <div className='view-profile-details-title'>
            description:
          </div>
          <div className='view-profile-details-main'>
            {authData?.result?.description}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewUserStore