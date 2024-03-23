import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../'
import './ratePostDataResponse.css'

const RatePostDataResponse = ({responseData}) => {
    // const dispatch                                     = useDispatch() 
    const {isLoading, actualRate, totalRate, ratingSum} = useSelector((state) => state.postRatingList)
  return (
    <>
        {responseData && (
            <>
            Response Data:
            {isLoading ? (
                <Loader />
            ) : ratingSum? (
                <div>
                    <pre>{totalRate}, {ratingSum}, {actualRate}</pre>
                </div>
            ) : null}
            </>
        )}
    </>
  )
}

export default RatePostDataResponse