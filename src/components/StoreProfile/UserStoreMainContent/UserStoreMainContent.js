import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { actionDeleteStore, actionFetchStoresByUser } from '../../../actions/stores'
import { Button, DeletePopUp, EmptyCard, Loader, Pagination, UserHeader } from '../..'
import { actionFetchUserProfile } from '../../../actions/profiles'
import { AddBoxRoundedIcon, DeleteRoundedIcon, EditRoundedIcon, PageviewRoundedIcon } from '../../../utils/constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { trash } from '../../../assets'

import './userStoreMainContent.css'

const UserStoreMainContent = () => {
  const authData                                = JSON.parse(localStorage.getItem('authData'))
  const userId                                  = authData?.result?._id
  const dispatch                                = useDispatch();
  const navigate                                = useNavigate();
  const location                                = useLocation();
  const searchParams                            = new URLSearchParams(location.search);
  const page                                    = searchParams.get("page") || 1
  const { isLoading, singleUserProfile }        = useSelector((state) => state.profileList)
  const [onePost, setOnePost]                   = useState(null);
  const {getStoresByUser, numberOfPages, totalNumber} = useSelector((state) => state.storeList)
  const [allPosts, setAllPosts]                 = useState(getStoresByUser);
  const [isEdit, setIsEdit]                     = useState(false)
  const [onOpen, setOnOpen]                     = useState({});

  useEffect(() => {
    if (singleUserProfile && singleUserProfile.userId === userId) {
      setOnePost(singleUserProfile);
    }
  }, [userId, singleUserProfile]);
  
  useEffect(() => {
    if(Array.isArray(getStoresByUser) && getStoresByUser.find(store => store.userId === userId)){
      setAllPosts(getStoresByUser);
    }else {
      navigate(`/stores/create-store?new-store=true`);
      // window.location.replace('/stores/create-store?new-store=true');
    }
  }, [userId, navigate, getStoresByUser]);

  useEffect(() => {
    dispatch(actionFetchStoresByUser(userId, page))
  }, [page, userId, dispatch])

  // useEffect(() => {
  //   dispatch(actionFetchUserStore(userId))
  // }, [userId, dispatch])

  useEffect(() => {
    dispatch(actionFetchUserProfile(userId))
  }, [userId, dispatch])
  
  const handleEditClick = (index) => () => {
    setIsEdit(prev => ({ [index]: !prev[index]}))
  }

  const handleDeletePost = async(index) => {
    setOnOpen((prevIndex) => (prevIndex === index ? null : index));
  }

  const cancelPostDeletion = (index) => {
    setOnOpen(null);
  };

  const confirmPostDeletion = async(detailId, index) => {
    try {
      await dispatch(actionDeleteStore(detailId));
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
      <div className='store-post-wrapper'>
        <div className='store-post-header'>
          <div className='store-post-header-left'>
              <UserHeader userProfile={onePost} />
          </div>

          <div className='store-post-header-right'>
              {/* <SearchProfileHeader /> */}
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/my-posts" linkClass="link-wrapper" linkName="view posts" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        <div className='store-post-body'>
          <div className='store-post-body-head'>
            <h2>Stores</h2>
            <Link to="/stores/create-store" className='store-post-create-new-store'>create new store</Link>
            <span>Results found - {totalNumber}</span>
          </div>
          {isLoading ? (
            <Loader />
          ) : allPosts && allPosts?.length > 0 ? ( 
            getStoresByUser?.map((result, index) => (
              <div key={index} className='store-post-body-posts'>
                <div className='store-post-body-title'>
                  <Link to={`/stores/view-user-store/${result?._id}`} className='store-post-body-view-post'>View store</Link>
                  <div className='store-post-body-title-icons-wrapper'>
                    <div className='store-post-body-title-icons'>
                      <Button linkButton linkTo={`/stores/view-store/${result?._id}`} title="view post" linkIcon={<PageviewRoundedIcon />} />
                      <Button onClickButton title="Edit store" buttonIcon={<EditRoundedIcon />} onClickNavigate={handleEditClick(index)} />

                      <div className='dashboard-post-body-title-delete-button-wrap'>
                        <DeletePopUp onOpen={onOpen === index} onClose={() => cancelPostDeletion(index)} onConfirm={() => confirmPostDeletion(result?._id, index)} popUpImage={trash} prompt={`Are you sure you want to delete "${result?.title}"`} />

                        <Button onClickButton title="Delete store" buttonIcon={<DeleteRoundedIcon />} onClickNavigate={() => handleDeletePost(index)} />
                      </div>
                    </div>

                    <div className='edit-store-menu-wrapper'>
                      <div className={isEdit[index] ? 'edit-store-menu-option active' : 'edit-store-menu-option'}>
                        <Link to={`/stores/edit-store/${result?._id}`} className='edit-store-menu-detail '>
                          edit store
                        </Link>
                        <Link to={`/posts/utilization/${result?._id}`} className='edit-store-menu-detail'>
                          promote store
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='store-post-body-details'>
                  <div className='store-post-body-image-wrapper'>
                    <img src={result?.selectedFile} alt='post img' />
                  </div>
                  <div className='store-post-body-detail'>
                    <span>Title</span>
                    <small>{result?.title}</small>
                  </div>
                  <div className='store-post-body-detail'>
                    <span>description</span>
                    <small>{result?.description}</small>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <EmptyCard title="stores" linkName="Store" link="/stores/create-store" />
          )}
          <Pagination pageName="stores/user-store" page={page} actionGet={actionFetchStoresByUser} id={userId} numberOfPages={numberOfPages} totalNumber={totalNumber} />
        </div>
      </div>
    </>
  )
}

export default UserStoreMainContent