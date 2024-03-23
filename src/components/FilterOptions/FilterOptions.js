import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {FormField} from '../'
import { selectOptions } from '../../utils/constants'
import { actionFetchFilteredPosts } from '../../actions/posts'

import './filterOptions.css'

const FilterOptions = ({postType, category, tag, page}) => {
  const dispatch                            = useDispatch();
  const navigate                            = useNavigate();
  const [ postData, setPostData ]           = useState({selectedOption: ''})
  const [ isLoadingBtn, setIsLoadingBtn ]   = useState({selectedOption: false })

  const useDebounce = (value, delay ) => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() =>{
      const handler = setTimeout(() => {
        setDebounced(value)
      }, delay);
      return () => clearTimeout(handler)
    }, [value, delay])

    return debounced
  }

  const debouncedPostData = useDebounce(postData, 500)

  useEffect(() => {
    const validateSelectedOption = () => {
      setIsLoadingBtn((prevState) => ({
        ...prevState,
        selectedOption: false,
      }));
      return;
    };
    validateSelectedOption()
  }, [debouncedPostData])

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setIsLoadingBtn((prevState) => ({ ...prevState, selectedOption: true }));
    setPostData((prevState) => ({ ...prevState, selectedOption: value }));
    navigate(`?sort=${value}`);
  }, [navigate]);

  useEffect(() => {
    dispatch(actionFetchFilteredPosts(postType, category, tag, postData.selectedOption, page))
  }, [postType, category, tag, postData, page, dispatch]);

  return (
    <>
      <div className='filter-options-wrapper'>
        <span>Sort by:</span>

        <FormField selectType labelBoolean name="selectedOption" value={postData.selectedOption} handleChange={handleChange} options={selectOptions} isLoadingBtn={isLoadingBtn.selectedOption} />
      </div>
    </>
  )
}

export default FilterOptions