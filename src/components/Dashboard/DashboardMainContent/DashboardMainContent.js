import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Button, DeletePopUp, EmptyCard, Loader, Pagination, UserHeader } from '../..'
import { actionDeletePost, actionFetchPostsByUser } from '../../../actions/posts'
import { AddBoxRoundedIcon, DeleteRoundedIcon, EditRoundedIcon, PageviewRoundedIcon } from '../../../utils/constants'
import { actionFetchUserProfile } from '../../../actions/profiles'
import { trash } from '../../../assets'

import './dashboardMainContent.css'

const DashboardMainContent = () => {
  const authData                                                   = JSON.parse(localStorage.getItem('authData'))
  const userId                                                     = authData?.result?._id
  const dispatch                                                   = useDispatch();
  const location                                                   = useLocation();
  const searchParams                                               = new URLSearchParams(location.search);
  const page                                                       = searchParams.get("page") || 1
  const { singleUserProfile }                                      = useSelector((state) => state.profileList)
  const [onePost, setOnePost]                                      = useState(null);
  const {isLoading, getPostsByOwner, totalNumber, numberOfPages }  = useSelector((state) => state.postList)
  const [allPosts, setAllPosts]                                    = useState([]);
  const [isEdit, setIsEdit]                                        = useState(false);
  const [onOpen, setOnOpen]                                        = useState({});

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
    if (getPostsByOwner) {
      setAllPosts(getPostsByOwner);
    }
  }, [getPostsByOwner]);

  useEffect(() => {
    dispatch(actionFetchPostsByUser(userId, page))
  }, [page, userId, dispatch]);

  const handleEditClick = (index) => () => {
    setIsEdit(prev => ({ ...prev, [index]: !prev[index] }));
  }

  const handleDeletePost = async(index) => {
    setOnOpen((prevIndex) => (prevIndex === index ? null : index));
  }

  const cancelPostDeletion = () => {
    setOnOpen(null);
  };

  const confirmPostDeletion = async(detailId) => {
    try {
      await dispatch(actionDeletePost(detailId));
      setAllPosts(allPosts.filter((post) => post._id !== detailId));
      // Show success toast after successfully deleting the post
      toast.success('post deleted successfully');
    } catch (error) {
      // Handle any errors that occur during the deletion process
      toast.error('Error deleting post: ' + error.message);
    }
    setOnOpen(null);
  };

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

        <div className='dashboard-post-body'>
          <div className='dashboard-post-body-head'>
            <h2>Posts</h2>
            <span>Results found - {totalNumber}</span>
          </div>
          {isLoading ? (
            <Loader />
          ) : allPosts && allPosts.length > 0 ? ( 
            allPosts.map((result, index) => (
              <div key={index} className='dashboard-post-body-posts'>
                <div className='dashboard-post-body-title'>
                  <Link to={`/stores/view-user-store/${result?.storeId}`} className='dashboard-post-body-view-post'>View in store</Link>
                  <div className='dashboard-post-body-title-icons-wrapper'>
                    <div className='dashboard-post-body-title-icons'>
                      <Button linkButton linkTo={`/posts/view-user-post/${result?._id}`} title="view post" linkIcon={<PageviewRoundedIcon />} />
                      <Button onClickButton title="Edit post" buttonIcon={<EditRoundedIcon />} onClickNavigate={handleEditClick(index)} />

                      <div className='dashboard-post-body-title-delete-button-wrap'>
                        <DeletePopUp onOpen={onOpen === index} onClose={cancelPostDeletion} onConfirm={() => confirmPostDeletion(result?._id, index)} popUpImage={trash} prompt={`Are you sure you want to delete "${result?.title}"`} />

                        <Button onClickButton title="Delete post" buttonIcon={<DeleteRoundedIcon />} onClickNavigate={() => handleDeletePost(index)} />
                      </div>
                    </div>

                    <div className='edit-dashboard-menu-wrapper'>
                      <div className={isEdit[index] ? 'edit-dashboard-menu-option active' : 'edit-dashboard-menu-option'}>
                        <Link to={`/posts/view-user-post/${result?._id}`} className='edit-dashboard-menu-detail '>
                          view post
                        </Link>
                        <Link to={`/posts/promotion/${result?._id}`} className='edit-dashboard-menu-detail'>
                          promote post
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='dashboard-post-body-details'>
                  <div className='dashboard-post-body-image-wrapper'>
                    <img src={result?.selectedFile} alt='post img' />
                  </div>
                  <div className='dashboard-post-body-detail'>
                    <span>Title</span>
                    <small>{result?.title}</small>
                  </div>
                  <div className='dashboard-post-body-detail'>
                    <span>Category</span>
                    <small>{result?.category}</small>
                  </div>
                  <div className='dashboard-post-body-detail'>
                    <span>Tag</span>
                    <small>{result?.tag}</small>
                  </div>
                  <div className='dashboard-post-body-detail'>
                    <span>Price</span>
                    <small>{result?.price}</small>
                  </div>
                  <div className='dashboard-post-body-detail'>
                    <span>description</span>
                    <small>{result?.description}</small>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <EmptyCard title="Posts" linkName="Post" link="/posts/create-post" />
          )}
          <Pagination pageName="posts/my-posts" page={page} actionGet={actionFetchPostsByUser} id={userId} numberOfPages={numberOfPages} totalNumber={totalNumber} />
        </div>
      </div>
    </>
  )
}

export default DashboardMainContent