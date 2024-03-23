import React from 'react'
import {Button} from '../'
import { userImg } from '../../assets'
import './userHeader.css'

const UserHeader = ({userProfile}) => {
    const authData = JSON.parse(localStorage.getItem('authData'))

  return (
    <>
      <div className='personal-profile-info-container'>
        <div className='personal-profile-info-container-inner'>
          <div className='personal-info-container-inner-main'>
            <div className='personal-info-container-inner-img-wrapper'> 
                <img src={authData ? userProfile?.selectedFile : userImg} alt="profile img" className='personal-info-picture' />
            </div>
            <div className='personal-info-container-inner-detail'>
              <h2>Welcome {authData?.result?.firstName} <span>.{authData?.result?.lastName.charAt(0)}</span></h2>
              <b>{userProfile?.category}</b>
              <p>{userProfile?.location}</p>
              <Button linkButton linkClass="transparent-link-wrapper" buttonWrapper="button-link-wrapper" linkTo={`/users/user-profile`} linkName="view profile" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHeader