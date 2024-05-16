import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, CreatePostMainItem, PleaseNote, UserHeader } from '../../..';
import { AddBoxRoundedIcon } from '../../../../utils/constants';
import { actionFetchProfiles, actionFetchUserProfile } from '../../../../actions/profiles';
import { actionFetchStoresByUser } from '../../../../actions/stores';

import './createPostMainContent.css'

const CreatePostMainContent = () => {
  const authData                        = JSON.parse(localStorage.getItem('authData'))
  const navigate                        = useNavigate()
  const userId                          = authData?.result?._id
  const dispatch                        = useDispatch();
  const location                        = useLocation();
  const searchParams                    = new URLSearchParams(location.search);
  const page                            = searchParams.get("page") || 1
  // const { singleUserProfile }           = useSelector((state) => state.profileList)
  const { singleUserProfile, getAllProfiles }   = useSelector((state) => state.profileList)

  const {getStoresByUser}               = useSelector((state) => state.storeList)
  const [allPosts, setAllPosts]         = useState(getStoresByUser);
  //grab the store Id
  const [onePost, setOnePost]           = useState(null);
  const lineRef                         = useRef(null);
  const [activeTab, setActiveTab]       = useState(0);
  const tabButtons                      = ['create post', 'Please Note'];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {

  }, [allPosts])

  useEffect(() => {
    dispatch(actionFetchProfiles(page))
  }, [page, dispatch])

  useEffect(() => {
    //create your store condition
    if(Array.isArray(getStoresByUser) && getStoresByUser.find(store => store.userId === userId)){
      setAllPosts(getStoresByUser);
    }else {
      navigate(`/stores/create-store?new-store=true`);
      // window.location.replace('/stores/create-store?new-store=true');
    }
  }, [userId, navigate, getStoresByUser]);

  useEffect(() => {
    // create your profile condition
    if (Array.isArray(getAllProfiles) && getAllProfiles.find(profile => profile.userId === userId)) {
    // if (singleUserProfile && singleUserProfile.userId === userId) {
      setOnePost(singleUserProfile);
    } else {
      navigate(`/users/create-profile`);
    }
  }, [userId, singleUserProfile, getAllProfiles, navigate]);

  useEffect(() => {
    dispatch(actionFetchStoresByUser(userId, page))
  }, [page, userId, dispatch])

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
      <div className='create-post-wrapper'>
        <div className='create-post-header'>
          <div className='create-post-header-left'>
              <UserHeader userProfile={onePost} />
          </div>

          <div className='create-post-header-right'>
              {/* <SearchProfileHeader /> */}
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/my-posts" linkClass="link-wrapper" linkName="view posts" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        <div className='create-post-body'>
          <div className='create-post-tab-box'>
            {tabButtons.map((tab, index) => (
              <button key={index} className={`create-post-tab-btn ${activeTab === index ? 'active' : ''}`} onClick={() => handleTabClick(index)} >
                {tab}
              </button>
            ))}
            <div className='create-post-btn-line' ref={lineRef}></div>
          </div>

            <div className='create-post-content-box'>
              <div className={`create-post-content ${activeTab === 0 ? 'active' : ''}`}>
                <CreatePostMainItem />
              </div>
              <div className={`create-post-content ${activeTab === 1 ? 'active' : ''}`}>
                <PleaseNote title="Creating a post" note="Please note that every post is attached to a specific store." />
              </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default CreatePostMainContent