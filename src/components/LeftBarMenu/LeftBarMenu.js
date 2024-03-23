import React from 'react'
import { Link } from 'react-router-dom'
import { PersonRoundedIcon, leftbarLink } from '../../utils/constants'
import { add } from '../../assets'

import './leftBarMenu.css'

const LeftBarMenu = () => {
  return (
    <>
        <div className='leftbar-wrapper'>
            <div className='leftbar-sub-links'>
                <div className='leftbar-sub-icon'>
                    <PersonRoundedIcon />
                    <span>My Account</span>
                </div>
                <div className='leftbar-link-wrapper'>
                    {leftbarLink.map((link, index) => (
                        <Link key={index} to={link.link} className='leftbar-link'>
                            <div className='leftbar-link-img'><img src={link.icon} alt='' /></div>
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="leftbar-bottom-links">
                <Link to="/posts/create-post" className='leftbar-link-bottom'><div className='leftbar-link-img'><img src={add} alt='' /></div>Create Post</Link>
            </div>
        </div>   
    </>
  )
}

export default LeftBarMenu