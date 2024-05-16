import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateStoreForm from './CreateStoreForm'
import {Button, UserHeader} from '../..'
import { AddBoxRoundedIcon } from '../../../utils/constants'
import { actionFetchStore } from '../../../actions/stores'
import { actionFetchUserProfile } from '../../../actions/profiles'

import './createUserStoreMainContent.css'

const CreateUserStoreMainContent = () => {
  const dispatch                        = useDispatch();
  const location                        = useLocation();
  const authData                        = JSON.parse(localStorage.getItem('authData'))
  const userId                          = authData?.result?._id
  const navigate                        = useNavigate()
  const { singleUserProfile, getAllProfiles } = useSelector((state) => state.profileList)
  const [onePost, setOnePost]           = useState(null);
  const [isNewStore, setIsNewStore]     = useState(false)

  useEffect(() => {
    //this is coming from the action method to ensure that the user gets the registration message 
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("new-store") === "true") {
      setIsNewStore(true);
    }
  }, [location.search]);

  // if profile account doesn't have an Id, navigate to create profile
  useEffect(() => {
    // if (Array.isArray(getAllProfiles) && getAllProfiles.find(profile => profile.userId === userId)) {
    if (singleUserProfile && singleUserProfile.userId === userId) {
      setOnePost(singleUserProfile);
    } else {
      navigate(`/users/create-profile`);
    }
  }, [userId, navigate, getAllProfiles, singleUserProfile]);

  useEffect(() => {
    dispatch(actionFetchUserProfile(userId))
  }, [userId, dispatch])

  useEffect(() => {
    dispatch(actionFetchStore(userId))
  }, [userId, dispatch])


  return (
    <>
      <div className='dashboard-post-wrapper'>
        <div className='dashboard-post-header'>
          <div className='dashboard-post-header-left'>
            <UserHeader userProfile={onePost} />
          </div>

          <div className='dashboard-post-header-right'>
            {/* <SearchProfileHeader /> */}
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/create-post" linkClass="link-wrapper" linkName="Create post" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        {isNewStore && (
          <div className="registration-success-message">
            <p className="success-msg">Please create your first store.</p>
          </div>
        )}

        <div className='dashboard-post-body'>
          <div className='dashboard-post-body-head'>
            <h2>Create a Store</h2>
          </div>
            <CreateStoreForm userId={userId} />
        </div>
      </div>
    </>
  )
}

export default CreateUserStoreMainContent