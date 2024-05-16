import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, EditPost, EditPostImage, EditPostSelectedImages, EmptyCard, Loader, UserHeader, ViewUserPostProfile } from '../../..'
import { actionFetchPost } from '../../../../actions/posts'
import { AddBoxRoundedIcon } from '../../../../utils/constants'

import './viewPostMainContent.css'
import { actionFetchUserStoreItems } from '../../../../actions/stores'

const ViewPostMainContent = () => {
    const authData                                = JSON.parse(localStorage.getItem('authData'))
    const userId                                  = authData?.result?._id
    const { id }                                  = useParams();
    const dispatch                                = useDispatch();
    const { singleUserProfile }                   = useSelector((state) => state.profileList)
    const {isLoading, singlePost }                = useSelector((state) => state.postList)
    const {getStoreItemsById}                     = useSelector((state) => state.storeList)
    const [oneProfile, setOneProfile]             = useState(null)
    const [onePost, setOnePost]                   = useState(null);
    const lineRef                                 = useRef(null);
    const [activeTab, setActiveTab]               = useState(0);
    const [storeProfileData, setStoreProfileData] = useState(getStoreItemsById);
    const tabButtons                              = ['Post', 'Edit Post', 'Edit Image', 'Edit Post Images'];

    const handleTabClick = (index) => {
      setActiveTab(index);
    };

    useEffect(() => {
      //if the storeId from the post is equal to the storeId in the store document data
      if (getStoreItemsById && getStoreItemsById?._id === singlePost?.storeId) {
        setStoreProfileData(getStoreItemsById);
      }
    }, [singlePost?.storeId, getStoreItemsById]);

    useEffect(() => {
      dispatch(actionFetchUserStoreItems(singlePost?.storeId))
    }, [singlePost?.storeId, dispatch]);

    // if profile account doesn't have an Id, navigate to create profile
    useEffect(() => {
      if (singleUserProfile && singleUserProfile.userId === userId) {
        setOneProfile(singleUserProfile);
      }
    }, [userId, singleUserProfile]);

    useEffect(() => {
      if (singlePost && singlePost._id === id) {
        setOnePost(singlePost);
      } else {
        setOnePost(null);
      }
    }, [id, singlePost]);
  
    useEffect(() => {
      dispatch(actionFetchPost(id))
      // once a rating is submitted, it should refresh the actionFetchPostRating
    }, [id, dispatch]);

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
            <UserHeader userProfile={oneProfile} />
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
                    <ViewUserPostProfile singlePost={singlePost} storeProfileData={storeProfileData} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 1 ? 'active' : ''}`}>
                    <EditPost id={id} singlePost={singlePost} storeProfileData={storeProfileData} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 2 ? 'active' : ''}`}>
                    <EditPostImage id={id} singlePost={singlePost} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 3 ? 'active' : ''}`}>
                    <EditPostSelectedImages id={id} singlePost={singlePost} />
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

export default ViewPostMainContent