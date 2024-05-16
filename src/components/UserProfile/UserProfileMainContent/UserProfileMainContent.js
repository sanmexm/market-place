import React, { useEffect, useRef, useState } from 'react'
import {Button, EditUserEmailAddress, EditUserProfile, EditUserProfileImage, EditUserUsername, EmptyCard, Loader, UserHeader, ViewUserProfile} from '../..';
import { AddBoxRoundedIcon } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchUserProfile } from '../../../actions/profiles';
import { actionFetchUser } from '../../../actions/users';
import { useNavigate } from 'react-router-dom';

import './userProfileMainContent.css'

const UserProfileMainContent = () => {
    const authData                        = JSON.parse(localStorage.getItem('authData'))
    const userId                          = authData?.result?._id
    const dispatch                        = useDispatch();
    const navigate                        = useNavigate();
    const {singleUser}                    = useSelector((state) => state.userList)
    const {isLoading, singleUserProfile, getAllProfiles } = useSelector((state) => state.profileList)
    const [onePost, setOnePost]           = useState(null);
    const lineRef                         = useRef(null);
    const [activeTab, setActiveTab]       = useState(0);
    const [userData, setUserData]         = useState(singleUser);
    const [userProfileData, setUserProfileData] = useState(singleUserProfile);
    const tabButtons                      = ['Profile', 'Edit profile', 'Edit Image', 'Edit Email', 'Edit Username'];

    const handleTabClick = (index) => {
      setActiveTab(index);
    };

    useEffect(() => {
      dispatch(actionFetchUserProfile(userId))
    }, [userId, dispatch])

    useEffect(() => {
      dispatch(actionFetchUser(userId))
    }, [userId, dispatch])

    useEffect(() => {
      async function fetchData() {
        if (!isLoading && singleUserProfile.length > 0) {
          const post = singleUserProfile[0]; // Assuming singleUserProfile has only one user
          try {
            const userDataResponse        = await dispatch(actionFetchUser(post.userId));
            const userProfileDataResponse = await dispatch(actionFetchUserProfile(post.userId));
            setUserData(userDataResponse);
            setUserProfileData(userProfileDataResponse);
          } catch (error) {
            console.error(error);
          }
        }
      }
      fetchData();
    }, [dispatch, isLoading, singleUserProfile]);

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
      if (lineRef.current) {
        const activeButton = lineRef.current.parentNode.querySelector('.active');
        if (activeButton) {
          lineRef.current.style.width = `${activeButton.offsetWidth}px`;
          lineRef.current.style.left = `${activeButton.offsetLeft}px`;
        }
      }
    }, [activeTab]);

  return (
    <>
      <div className='user-profile-wrapper'>
        <div className='user-profile-header'>
          <div className='user-profile-header-left'>
            <UserHeader userProfile={onePost} />
          </div>

          <div className='user-profile-header-right'>
            {/* <SearchProfileHeader /> */}
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/my-posts" linkClass="link-wrapper" linkName="view posts" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        {isLoading ? (
            <Loader />
          ) : onePost ? (
            <>
              <div className='user-profile-body'>
                <div className='user-profile-tab-box'>
                  {tabButtons.map((tab, index) => (
                    <button key={index} className={`user-profile-tab-btn ${activeTab === index ? 'active' : ''}`} onClick={() => handleTabClick(index)} >
                      {tab}
                    </button>
                  ))}
                  <div className='user-profile-btn-line' ref={lineRef}></div>
                </div>

                <div className='user-profile-content-box'>
                  <div className={`user-profile-content ${activeTab === 0 ? 'active' : ''}`}>
                    <ViewUserProfile authData={authData} userProfileData={userProfileData} userData={userData} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 1 ? 'active' : ''}`}>
                    <EditUserProfile id={userId} userProfileData={userProfileData} userData={userData}  />
                  </div>
                  <div className={`user-profile-content ${activeTab === 2 ? 'active' : ''}`}>
                    <EditUserProfileImage id={userId} userProfileData={userProfileData} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 3 ? 'active' : ''}`}>
                    <EditUserEmailAddress id={userId} userData={userData} /> 
                  </div>
                  <div className={`user-profile-content ${activeTab === 4 ? 'active' : ''}`}>
                    <EditUserUsername id={userId} userData={userData} /> 
                  </div>
                </div>
              </div>
            </>
            )
           : (
            // <>{userId}</>
            <EmptyCard title="profile" linkName="Profile" link="/users/create-profile" />
        )}
      </div>
    </>
  )
}

export default UserProfileMainContent