import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { actionDeleteStore, actionFetchStoresByUser } from '../../../actions/stores'
import { Button, EmptyCard, Loader, Pagination, UserHeader } from '../..'
import { AddBoxRoundedIcon, DeleteRoundedIcon, EditRoundedIcon, PageviewRoundedIcon } from '../../../utils/constants'
import { Link, useLocation } from 'react-router-dom'

import './userStoreMainContent.css'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const UserStoreMainContent = () => {
  const authData                                                   = JSON.parse(localStorage.getItem('authData'))
  const userUniqueId                                               = authData?.result?._id
  const dispatch                                                   = useDispatch();
  const query                                                      = useQuery();
  const page                                                       = query.get('page') || 1;
  const {isLoading, getStoresByUser, totalNumber, numberOfPages }  = useSelector((state) => state.storeList)
  const [allPosts, setAllPosts]                                    = useState(getStoresByUser);
  const [isEdit, setIsEdit]                                        = useState(false)

  const handleEditClick = (index) => () => {
    setIsEdit(prev => ({ [index]: !prev[index]}))
  }

  const handleDeletePost = (detailId, title) => {
    if (window.confirm(`Are you sure you want to delete this post ${title}?`)) {
      // Dispatch the deletePost action here
      dispatch(actionDeleteStore(detailId))
        .then(() => {
          setAllPosts(allPosts.filter(post => post._id !== detailId));
          // Show success toast after successfully deleting the post
          toast.success('post deleted successfully');
        })
        .catch((error) => {
          // Handle any errors that occur during the deletion process
          toast.error('Error deleting post: ' + error.message);
        });
    }
  };

  useEffect(() => {
    dispatch(actionFetchStoresByUser(userUniqueId, page))
  }, [page, userUniqueId, dispatch])

  return (
    <>
      <div className='store-post-wrapper'>
        <div className='store-post-header'>
          <div className='store-post-header-left'>
              <UserHeader />
          </div>

          <div className='store-post-header-right'>
              {/* <SearchProfileHeader /> */}
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/my-posts" linkClass="link-wrapper" linkName="view posts" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        <div className='store-post-body'>
          <div className='store-post-body-head'>
            <h2>Stores</h2>
            <span>Results found - {totalNumber}</span>
          </div>
          {isLoading ? (
            <Loader />
          ) : allPosts && allPosts.length > 0 ? ( 
            getStoresByUser.map((result, index) => (
              <div key={index} className='store-post-body-posts'>
                <div className='store-post-body-title'>
                  <Link to={`/stores/view-store/${result?._id}`} className='store-post-body-view-post'>View store</Link>
                  <div className='store-post-body-title-icons-wrapper'>
                    <div className='store-post-body-title-icons'>
                      <Button linkButton linkTo={`/stores/view-store/${result?._id}`} title="view post" linkIcon={<PageviewRoundedIcon />} />
                      <Button onClickButton title="Edit store" buttonIcon={<EditRoundedIcon />} onClickNavigate={handleEditClick(index)} />
                      <Button onClickButton title="Delete store" buttonIcon={<DeleteRoundedIcon />} onClickNavigate={() => handleDeletePost(result?._id, result?.firstName)} />
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
          <Pagination pageName="stores/my-store" page={page} actionGet={actionFetchStoresByUser} id={userUniqueId} numberOfPages={numberOfPages} totalNumber={totalNumber} /> 
        </div>
      </div>
    </>
  )
}

export default UserStoreMainContent