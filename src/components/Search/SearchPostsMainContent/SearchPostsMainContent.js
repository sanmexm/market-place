import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import SearchHeader from '../SearchHeader/SearchHeader';
import TruncatedText from '../../TruncatedText/TruncatedText';
import { actionFetchPostsBySearch } from '../../../actions/posts';
import { EmptyCard, Loader, Pagination } from '../..';
import { useDispatch, useSelector } from 'react-redux';

import './searchPostsMainContent.css'

const SearchPostsMainContent = () => {
  const location                                               = useLocation();
  const dispatch                                               = useDispatch();
  const searchParams                                           = new URLSearchParams(location.search);
  const searchQuery                                            = searchParams.get("searchQuery");
  const page                                                   = searchParams.get("page") || 1
  const [searchCat, setSearchCat]                              = useState('');
  const [allPosts, setAllPosts]                                = useState([]);
  const [percentageDifferences, setPercentageDifferences]      = useState([]);
  const { isLoading, searchPost, numberOfPages }               = useSelector((state) => state.postList)
  const totalNumber                                            = searchPost.length

    useEffect(() => {
      dispatch(actionFetchPostsBySearch(searchQuery, page))
    }, [page, searchQuery, dispatch])

    useEffect(() => {
      if (searchQuery) {
        setSearchCat(searchQuery);
      }
    }, [searchQuery, setSearchCat]);

    useEffect(() => {
      if (searchPost) {
        setAllPosts(searchPost);
      }
    }, [searchPost, setAllPosts]);

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
      <SearchHeader searchCat={searchCat} />
      <div className='search-post-wrapper'>
        <div className='search-post-body-container'>
          {isLoading ? (
            <Loader />
          ) : allPosts && allPosts.length > 0 ? ( 
            allPosts.map((item, index) => {
              const result = percentageDifferences[index];
              return (
                <div key={index} className='search-post-container'>
                  <div className='search-post-body'>
                    <Link to={`/posts/post/${item._id}`} className='search-post-image-body'>
                      <div className='search-post-image'>
                        <img src={item.selectedFile} alt='post' />
                      </div>
                      {item.oldPrice !== 0 ? (
                        <small className='search-post-discount'>{result}%</small>
                      ): null}
                    </Link>
      
                    <div className='search-post-details'>
                      <TruncatedText text={item.title} maxLength={20} />
                      <div className='search-post-price-detail'>
                        <span className='search-post-current-price'>&#8358;{item.price}</span>
                        {item.oldPrice !== 0 ? (
                          <span className='search-post-old-price'>&#8358;{item.oldPrice}</span>
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

        <Pagination pageName="post-items" page={page} actionGet={actionFetchPostsBySearch} numberOfPages={numberOfPages} totalNumber={totalNumber} />
      </div>
    </>
  )
}

export default SearchPostsMainContent