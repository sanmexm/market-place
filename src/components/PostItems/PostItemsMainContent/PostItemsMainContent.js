import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import {EmptyCard, FilterOptions, Loader, Pagination, PostTitle, SearchHeader, TruncatedText} from '../..'
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchFilteredPosts } from '../../../actions/posts';

import './postItemsMainContent.css'

const PostItemsMainContent = () => {
  const dispatch                                          = useDispatch();
  const location                                          = useLocation();
  const { title }                                         = useParams();
  const searchParams                                      = new URLSearchParams(location.search);
  const postType                                          = searchParams.get("postType") || "";
  const category                                          = searchParams.get("category") || "";
  const tag                                               = searchParams.get("tag") || "";
  const page                                              = searchParams.get("page") || 1
  const { isLoading, getAllFilteredPosts, numberOfPages } = useSelector((state) => state?.postList)
  const [allPosts, setAllPosts]                           = useState([]);
  const [isLoadingPage, setIsLoadingPage]                 = useState(isLoading);
  const [percentageDifferences, setPercentageDifferences] = useState([]);
  const totalNumber                                       = getAllFilteredPosts?.length

  useEffect(() => {
    setIsLoadingPage(true);
    dispatch(actionFetchFilteredPosts(postType, category, tag, page))
      .then((response) => {
        setAllPosts(response.data);
        setIsLoadingPage(false);
      })
      .catch((error) => {
          setIsLoadingPage(false);
          // Handle errors here
      });
}, [page, postType, category, tag, dispatch]);

  useEffect(() => {
    if (getAllFilteredPosts) {
      setAllPosts(getAllFilteredPosts);
    }
  }, [getAllFilteredPosts]);
  

  useEffect(() => {
    if (allPosts && allPosts.length > 0) {
      const differences = allPosts.map((item) => {
        if (item.oldPrice !== 0) {
          return ((item.price - item.oldPrice) / item.oldPrice) * 100;
        } else {
          return null;
        }
      });
      setPercentageDifferences(differences);
    }
  }, [allPosts]);
  

  return (
    <>
      <SearchHeader />
      <div className='post-title-header'>
        <span className='post-span-title'><PostTitle title={title} /></span>
        <FilterOptions postType={postType} category={category} tag={tag} page={page} />
      </div>
      <div className='post-item-wrapper'>
        <div className='post-item-body-container'>

        {isLoadingPage ? (
            <Loader />
          ) : allPosts && allPosts.length > 0 ? ( 
            allPosts.map((item, index) => {
              const result = percentageDifferences[index];

              return (
              <div key={index} className='post-item-container'>
                <div className='post-item-body'>
                  <Link to={`/posts/post/${item._id}`} className='post-item-image-body'>
                    <div className='post-item-image'>
                      <img src={item.selectedFile} alt='post' />
                    </div>
                    {item.oldPrice !== 0 ? (
                      <small className='post-item-discount'>{result}%</small>
                    ): null}
                  </Link>

                  <div className='post-item-details'>
                    <TruncatedText text={item.title} maxLength={20} />
                    <div className='post-item-price-detail'>
                      <span className='post-item-current-price'>&#8358;{item.price}</span>
                      {item.oldPrice !== 0 ? (
                        <span className='post-item-old-price'>&#8358;{item.oldPrice}</span>
                      ): null}
                    </div>
                  </div>
                </div>
              </div>
            )})
            ) : (
              <EmptyCard title="Posts" linkName="Post" link="/posts/create-post" />
          )}
        </div>
        <Pagination page={page} actionGet={actionFetchFilteredPosts} numberOfPages={numberOfPages} totalNumber={totalNumber} />
      </div>
    </>
  )
}

export default PostItemsMainContent