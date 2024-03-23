import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CreateStoreForm from './CreateStoreForm'
import {Button, Loader, UserHeader} from '../..'
import { AddBoxRoundedIcon } from '../../../utils/constants'
import { actionFetchStore } from '../../../actions/stores'

import './createUserStoreMainContent.css'

const CreateUserStoreMainContent = () => {
  const authData                  = JSON.parse(localStorage.getItem('authData'))
  const userUniqueId              = authData?.result?._id
  const dispatch                  = useDispatch();
  const navigate                  = useNavigate()
  const {isLoading, singleStore } = useSelector((state) => state.storeList)

  useEffect(() => {
    dispatch(actionFetchStore(userUniqueId))
  }, [userUniqueId, dispatch])

  useEffect(() => {
    if (singleStore) {
      navigate(`/stores/user-store`);
    }
  }, [singleStore, navigate]);

  return (
    <>
      <div className='dashboard-post-wrapper'>
        <div className='dashboard-post-header'>
          <div className='dashboard-post-header-left'>
            <UserHeader />
          </div>

          <div className='dashboard-post-header-right'>
            {/* <SearchProfileHeader /> */}
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/create-post" linkClass="link-wrapper" linkName="Create post" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        <div className='dashboard-post-body'>
          <div className='dashboard-post-body-head'>
            <h2>Create a Store</h2>
          </div>
          {!isLoading ? (
            <Loader />
          ) : !singleStore ? (
            <CreateStoreForm userId={userUniqueId} />
          ) : null }
        </div>
      </div>
    </>
  )
}

export default CreateUserStoreMainContent