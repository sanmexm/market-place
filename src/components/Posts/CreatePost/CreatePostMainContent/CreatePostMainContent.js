import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, CreatePostMainItem, PleaseNote, UserHeader } from '../../..';
import { AddBoxRoundedIcon } from '../../../../utils/constants';
import { actionFetchUserProfile } from '../../../../actions/profiles';

import './createPostMainContent.css'

const CreatePostMainContent = () => {
  const authData                        = JSON.parse(localStorage.getItem('authData'))
  const userId                          = authData?.result?._id
  const dispatch                        = useDispatch();
  const { singleUserProfile }           = useSelector((state) => state.profileList)
  const [onePost, setOnePost]           = useState(null);
  const lineRef                         = useRef(null);
  const [activeTab, setActiveTab]       = useState(0);
  const tabButtons                      = ['create post', 'Please Note'];

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
                <PleaseNote />
              </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default CreatePostMainContent