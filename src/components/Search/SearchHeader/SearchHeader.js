import React, { useEffect, useState } from 'react'
import { actionFetchPosts } from '../../../actions/posts'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Loader} from '../..'
import { SearchRoundedIcon } from '../../../utils/constants'

import './searchHeader.css'

// setup url params to know which page we are currently on and what search term are we looking for
function useQuery(){
    return new URLSearchParams(useLocation().search)
}

const SearchHeader = ({searchCat}) => {
    const {isLoading, getAllPosts} = useSelector((state) => state.postList)
    const dispatch                 = useDispatch()
    const navigate                 = useNavigate()
    const query                    = useQuery()
    //this will read the url and see if a page is available
    const searchQuery              = query.get('searchQuery')
    const page                     = query.get('page') || 1
    const [search, setSearch]      = useState('')
    const [results, setResults]    = useState(false)
    const keys                     = ["title", "description"]

    const searchPost = () => {
        if(search.trim()){
        // navigate(`/search/${searchPostId}/search?searchQuery=${search || 'none'}`)
        navigate(`/search?searchQuery=${search || ''}`)
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
        // dispatch(actionFetchPostsBySearch(searchQuery, page)) this action search will be used in the search page
        dispatch(actionFetchPosts(page))
    }, [searchQuery, page, dispatch])

    useEffect(() => {
        if(search === ''){
            setResults(false)
        }else{
            setResults(true)
        }
    }, [search])


  return (
    <>
        <div className='search-header-container'>
            <form className='search-header-form-wrapper'>
                <div className='search-header-form-input-wrapper'>
                    <input value={search} type="text" onChange={handleSearchChange} placeholder={searchCat ? searchCat : "search"} onKeyDown={handleKeyPress} autoComplete='off' />
                    <button onClick={() => searchPost(search)} className='search-header-search-btn'><SearchRoundedIcon /></button>
                </div>
                <div className={results ? 'search-header-form-result active' : 'search-header-form-result'}>
                    <div className='search-header-result-wrapper'>
                        {isLoading ? <Loader /> : getAllPosts.filter((result) => {
                            return keys.some((key) => result[key].toLowerCase().includes(search))
                        }).splice(0, 5)
                        .map((result, index) => (
                        <Link key={index} to={`/posts/post/${result._id}`} className='search-header-dropdown-menu-details'>
                            <div className='search-header-dropdown-menu-img'><img src={result.selectedFile} alt="profile-pic" /></div>
                            <span>{result.title}</span>
                        </Link>
                        ))}
                        <div className='search-header-dropdown-menu-all-results' onClick={searchPost}>See all Results</div>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default SearchHeader