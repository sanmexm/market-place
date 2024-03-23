import React, { useEffect, useState } from 'react'
import { FacebookRoundedIcon, InstagramIcon, SearchRoundedIcon, TwitterIcon } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logo } from '../../../assets'
import { Loader } from '../..'
import { actionFetchPosts } from '../../../actions/posts'

import './hero.css'

// setup url params to know which page we are currently on and what search term are we looking for
function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Hero = () => {
  const {isLoading, getAllPosts} = useSelector((state) => state.postList)
  const dispatch                 = useDispatch()
  const navigate                 = useNavigate()
  const query                    = useQuery()
  //this will read the url and see if a page is available
  const searchQuery              = query.get('searchQuery')
  const page                     = query.get('page') || 1
  const [search, setSearch]      = useState('')
  const [results, setResults]    = useState(false)
  const [allPosts, setAllPosts]  = useState([]);
  const keys                     = ["title", "description"]

  useEffect(() => {
    // dispatch(actionFetchPostsBySearch(searchQuery, page)) this action search will be used in the search page
    dispatch(actionFetchPosts(page))
  }, [searchQuery, page, dispatch])

  useEffect(() => {
    if (getAllPosts) {
      setAllPosts(getAllPosts);
    }
  }, [getAllPosts]);

  const searchPost = () => {
    if(search.trim()){
      // navigate(`/search/${searchPostId}/search?searchQuery=${search || 'none'}`)
      navigate(`/search?searchQuery=${search || 'none'}`)
    }else{
      navigate(`/search`)
    }
  }

  const handleSearchChange = (e) =>{
    setSearch(e.target.value)
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){ //this simply means the enter key
      searchPost();
    }
  }


  useEffect(() => {
    if(search === ''){
      setResults(false)
    }else{
      setResults(true)
    }
  }, [search])

  return (
    <>
      <div className='hero'>
        <div className="hero-content">
          <h1>Find a Shop</h1>
          <p>Find a new product</p>
          <form className='hero-form-wrapper'>
            <div className='hero-form-input-wrapper'>
              <input value={search} type="text" onChange={handleSearchChange} placeholder="search" onKeyDown={handleKeyPress} autoComplete='off' />
              <button onClick={() => searchPost(search)} className='hero-search-btn'><SearchRoundedIcon /></button>
            </div>
            <div className={results ? 'hero-form-result active' : 'hero-form-result'}>
              <div className='hero-result-wrapper'>
                {isLoading ? <Loader /> : allPosts.filter((result) => {
                  return keys.some((key) => result[key].toLowerCase().includes(search))
                }).splice(0, 5)
                .map((result, index) => (
                  <Link key={index} to={`/posts/post/${result._id}`} className='hero-dropdown-menu-details'>
                    <div className='hero-dropdown-menu-img'><img src={result.selectedFile} alt="profile-pic" /></div>
                    <span>{result.title}</span>
                  </Link>
                ))}
                <div className='hero-dropdown-menu-all-results' onClick={searchPost}>See all Results</div>
              </div>
            </div>
          </form>
          <div className='hero-social'>
            <span className='hero-social-title'>follow us</span>
            <div className='hero-social-icons'>
              <FacebookRoundedIcon />
              <TwitterIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
        <div className='hero-image-content'>
          <div className='hero-image'>
            <img src={logo} alt="img hero" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero