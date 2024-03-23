import React from 'react'
import { Link } from 'react-router-dom'
import { HourglassEmptyRoundedIcon } from '../../utils/constants'

import './emptyCard.css'

const EmptyCard = ({title, linkName, link}) => {
  return (
    <>
        <div className='empty-card-wrapper'>
            <div className='empty-card-header'>
                <h1>No {title} Found</h1>
                <span><HourglassEmptyRoundedIcon /></span>
            </div>
            <Link className='empty-card-link' to={link}>Create {linkName}</Link>
        </div>
    </>
  )
}

export default EmptyCard