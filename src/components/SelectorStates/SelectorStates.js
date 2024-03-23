import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Loader} from '../'
// import { fetchContactMessages } from '../../actions/contactUs'
// import { getDoctors } from '../../actions/doctors'
// import { getNurses } from '../../actions/nurses'
// import { getPatients } from '../../actions/patients'
// import { getPharmacists } from '../../actions/pharmacists'

import { actionFetchPostsByUser } from '../../actions/posts'

// const CountMessagesSelector = () => {
//     const dispatch                    = useDispatch();
//     const { isLoading, totalNumber, currentPage }    = useSelector((state) => state.contactUsLists)
//     useEffect(() => {
//         dispatch(fetchContactMessages(currentPage)); // You can pass the page number as needed
//     }, [dispatch, currentPage]);
//   return (
//     <>
//         { isLoading ? <Loader /> : (
//             <>{totalNumber}</>
//         )}
//     </>
//   )
// }

const CountPostsByOwnerSelector = () => {
    const authData                   = JSON.parse(localStorage.getItem('authData'))
    const dispatch                   = useDispatch();
    const userUniqueId               = authData?.result?._id
    const { isLoading, totalNumber } = useSelector((state) => state.postsList)

    useEffect(() => {
        dispatch(actionFetchPostsByUser(userUniqueId, 1))
    }, [userUniqueId, dispatch])
  
  return (
    <>
        { isLoading ? <Loader /> : (
            <>{totalNumber}</>
        )}
    </>
  )
}

// const GetDoctorName = ({ assignedDoctorId }) => {
    // const { doctor, isLoading }   = useSelector((state) => state.doctorLists);
    // const dispatch                = useDispatch()
    
    // dispatch(getDoctor(assignedDoctorId));
  
    // if (!doctor && !isLoading) {
    //   // Doctor data is not available yet
    //   return null;
    // }
    // const { firstName, lastName } = doctor;
    
    // return (
    //     <>
    //       {isLoading ? <Loader /> : (
    //         <span>{firstName} {lastName}</span>
    //       )}
    //     </>
    // )
//   }

export  {
    // CountMessagesSelector,
    CountPostsByOwnerSelector,
}