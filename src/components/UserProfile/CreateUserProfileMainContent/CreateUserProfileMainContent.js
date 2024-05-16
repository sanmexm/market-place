import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionFetchUserProfile } from '../../../actions/profiles'
import { UserHeader, Button } from '../..'
import { AddBoxRoundedIcon } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import CreateProfileForm from './CreateProfileForm'

import './createUserProfileMainContent.css'

const CreateUserProfileMainContent = () => {
  const authData             = JSON.parse(localStorage.getItem('authData'))
  const userUniqueId         = authData?.result?._id
  const dispatch             = useDispatch();
  const navigate             = useNavigate()
  const {singleUserProfile}  = useSelector((state) => state.profileList)

  useEffect(() => {
    if (userUniqueId) {
      dispatch(actionFetchUserProfile(userUniqueId));
    }
  }, [userUniqueId, dispatch]);

  useEffect(() => {
    if (singleUserProfile) {
      if (singleUserProfile.userId === userUniqueId) {
        navigate(`/users/user-profile`);
      }
    }
  }, [userUniqueId, singleUserProfile, navigate]);

  return (
    <>
      <div className='dashboard-post-wrapper'>
        <div className='dashboard-post-header'>
          <div className='dashboard-post-header-left'>
            <UserHeader />
          </div>

          <div className='dashboard-post-header-right'>
            {/* <SearchProfileHeader /> */}
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/create-post" linkClass="link-wrapper" linkName="Create post" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        <div className='dashboard-post-body'>
          <div className='dashboard-post-body-head'>
            <h2>Please set up your profile</h2>
          </div>
          <CreateProfileForm userId={userUniqueId} />
        </div>
      </div>
    </>
  )
}

export default CreateUserProfileMainContent