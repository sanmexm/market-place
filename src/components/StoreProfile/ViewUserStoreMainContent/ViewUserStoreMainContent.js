import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { stores, trash } from '../../../assets'
import { Button, DeletePopUp, EmptyCard, Loader, Pagination } from '../..'
import { DeleteRoundedIcon, EditRoundedIcon, PageviewRoundedIcon } from '../../../utils/constants'
import { actionFetchUserStoreItems } from '../../../actions/stores'
import { actionFetchPostsByStoreId } from '../../../actions/posts'

import './viewUserStoreMainContent.css'

const ViewUserStoreMainContent = () => {
  const { id }                                  = useParams();
  const dispatch                                = useDispatch();
  const location                                = useLocation();
  const searchParams                            = new URLSearchParams(location.search);
  const page                                    = searchParams.get("page") || 1
  const {getStoreItemsById}                     = useSelector((state) => state.storeList)
  const {isLoading, getPostsByStoreId, totalNumber, numberOfPages} = useSelector((state) => state.postList)
  const [onePost, setOnePost]                   = useState();
  const [allPosts, setAllPosts]                 = useState([]);
  const [isEdit, setIsEdit]                     = useState(false);
  const [onOpen, setOnOpen]                     = useState({});

  useEffect(() => {
    dispatch(actionFetchUserStoreItems(id))
  }, [id, dispatch]);

  useEffect(() => {
    if (getStoreItemsById && getStoreItemsById?._id === id) {
      setOnePost(getStoreItemsById);
    }
  }, [id, getStoreItemsById]);

  useEffect(() => {
    if (getPostsByStoreId) {
      setAllPosts(getPostsByStoreId);
    }
  }, [getPostsByStoreId]);

  useEffect(() => {
    dispatch(actionFetchPostsByStoreId(id, page))
  }, [page, id, dispatch]);

  const handleEditClick = (index) => () => {
    setIsEdit(prev => ({ ...prev, [index]: !prev[index] }));
  }

  const handleDeletePost = async(index) => {
    setOnOpen((prevIndex) => (prevIndex === index ? null : index));
  }

  const cancelPostDeletion = (index) => {
    setOnOpen(null);
  };

  const confirmPostDeletion = async(detailId, index) => {
    try {
      // await dispatch(actionDeletePost(detailId));
      setOnePost(onePost.filter((post) => post._id !== detailId));
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
        <div className='view-store-main-wrapper'>
          <div className='view-store-header-background' style={{backgroundImage: `url(${getStoreItemsById?.result?.coverFile})`}}>
            <Link to={`/stores/edit-store-image-cover/${id}`} className='view-store-edit-background'>Edit background</Link>
            <div className='view-store-header-image'>
              <img src={getStoreItemsById?.result?.selectedFile || stores} alt='img main' />
            </div>
          </div>

          <div className='view-store-main-body'>
            <div className='view-store-main-body-head'>
              <h2>{getStoreItemsById?.result?.name}</h2>
              <span>Results found - {totalNumber}</span>
            </div>

            {isLoading ? (
            <Loader />
          ) : allPosts && allPosts?.length > 0 ? ( 
            allPosts?.map((result, index) => (
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
                        <Link to={`/posts/view-user-post/${result?._id}`} className='edit-store-menu-detail '>
                          view post
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
              <EmptyCard title="Items" linkName="Items in Store" link="/posts/create-post" />
          )}
          <Pagination pageName={`stores/view-user-store/${id}`} page={page} actionGet={actionFetchPostsByStoreId} id={id} numberOfPages={numberOfPages} totalNumber={totalNumber} />
          </div>
        </div>
    </>
  )
}

export default ViewUserStoreMainContent