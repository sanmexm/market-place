import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import {Button, EditUserStore, EditUserStoreImage, EditUserStoreName, EmptyCard, Loader, UserHeader, ViewUserSingleStore} from '../..'
import { AddBoxRoundedIcon } from '../../../utils/constants'
import { actionFetchPostsByStoreId } from '../../../actions/posts'
import { actionFetchStores, actionFetchUserStoreItems } from '../../../actions/stores'

import './editUserSingleStoreMainContent.css'

const EditUserSingleStoreMainContent = () => {
    const authData                        = JSON.parse(localStorage.getItem('authData'))
    const userId                          = authData?.result?._id
    const { id }                          = useParams();
    const dispatch                        = useDispatch();
    const location                        = useLocation();
    const searchParams                    = new URLSearchParams(location.search);
    const page                            = searchParams.get("page") || 1
    const {isLoading, singleUserProfile } = useSelector((state) => state.profileList)
    const {getStoreItemsById, getAllStores, currentPage} = useSelector((state) => state.storeList)
    const [onePost, setOnePost]           = useState(null);
    const lineRef                         = useRef(null);
    const [activeTab, setActiveTab]       = useState(0);
    const tabButtons                      = ['Store', 'Edit Name', 'Edit details', 'Edit Image'];

    const handleTabClick = (index) => {
      setActiveTab(index);
    };

    // if profile account doesn't have an Id, navigate to create profile
    useEffect(() => {
      if (singleUserProfile && singleUserProfile.userId === userId) {
        setOnePost(singleUserProfile);
      }
    }, [userId, singleUserProfile]);

    useEffect(() => {
      dispatch(actionFetchUserStoreItems(id))
    }, [id, dispatch]);
  
    useEffect(() => {
      if (getStoreItemsById && getStoreItemsById?._id === id) {
        setOnePost(getStoreItemsById);
      }
    }, [id, getStoreItemsById]);
  
    useEffect(() => {
      dispatch(actionFetchPostsByStoreId(id, page)) //display posts based on user store
    }, [page, id, dispatch]);

    useEffect(() => {
      dispatch(actionFetchStores(currentPage)); // check stores to see if store already exist
    }, [dispatch, currentPage]);

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
                    <ViewUserSingleStore id={id} getStoreItemsById={getStoreItemsById} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 1 ? 'active' : ''}`}>
                    <EditUserStoreName id={id} getStoreItemsById={getStoreItemsById} getAllStores={getAllStores} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 2 ? 'active' : ''}`}>
                    <EditUserStore id={id} getStoreItemsById={getStoreItemsById} />
                  </div>
                  <div className={`user-profile-content ${activeTab === 3 ? 'active' : ''}`}>
                    <EditUserStoreImage id={id} getStoreItemsById={getStoreItemsById} />
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

export default EditUserSingleStoreMainContent