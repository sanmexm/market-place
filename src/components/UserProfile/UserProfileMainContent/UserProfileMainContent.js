import React, { useEffect, useRef, useState } from 'react'
import {Button, EditUserLogin, EditUserPassword, EditUserProfile, EditUserProfileImage, EmptyCard, Loader, UserHeader, ViewUserProfile} from '../..';
import { AddBoxRoundedIcon } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchUserProfile } from '../../../actions/profiles';
// import { actionFetchUser } from '../../../actions/users';

import './userProfileMainContent.css'

const UserProfileMainContent = () => {
    const authData                        = JSON.parse(localStorage.getItem('authData'))
    const userId                          = authData?.result?._id
    const dispatch                        = useDispatch();
    const {isLoading, singleUserProfile } = useSelector((state) => state.profileList)
    const [onePost, setOnePost]           = useState(null);
    const lineRef                         = useRef(null);
    const [activeTab, setActiveTab]       = useState(0);
    const tabButtons                      = ['Profile', 'Edit profile', 'Edit Image', 'Edit login details', 'Change password'];

    const handleTabClick = (index) => {
      setActiveTab(index);
    };

    useEffect(() => {
      if (singleUserProfile && singleUserProfile.userId === userId) {
        setOnePost(singleUserProfile);
      } else {
        setOnePost(null);
      }
    }, [userId, singleUserProfile]);

    useEffect(() => {
      dispatch(actionFetchUserProfile(userId))
    }, [userId, dispatch])

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
                    <ViewUserProfile authData={authData} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 1 ? 'active' : ''}`}>
                    {/* <EditUserProfile id={userId} /> */}
                  </div>
                  <div className={`user-profile-content ${activeTab === 2 ? 'active' : ''}`}>
                    {/* <EditUserProfileImage /> */}
                  </div>
                  <div className={`user-profile-content ${activeTab === 3 ? 'active' : ''}`}>
                    {/* <EditUserLogin />  */}
                  </div>
                  <div className={`user-profile-content ${activeTab === 4 ? 'active' : ''}`}>
                    {/* <EditUserPassword /> */}
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