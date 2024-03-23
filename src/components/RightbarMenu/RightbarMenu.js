import React from 'react'
import {PersonRoundedIcon, rightbarLink } from '../../utils/constants'
import { Link } from 'react-router-dom'

import './rightbarMenu.css'
import { add } from '../../assets'

const RightbarMenu = () => {

  return (
    <>
        <div className='rightbar-wrapper'>
            <div className='rightbar-sub-links'>
                <div className='rightbar-sub-icon'>
                    <PersonRoundedIcon />
                    <span>My Account</span>
                </div>
                <div className='rightbar-link-wrapper'>
                    {rightbarLink.map((link, index) => (
                        <Link key={index} to={link.link} className='rightbar-link'>
                            <div className='rightbar-link-img'><img src={link.icon} alt='' /></div>
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="rightbar-bottom-links">
                <Link to="/posts/create-post" className='rightbar-link-bottom'><div className='rightbar-link-img'><img src={add} alt='' /></div>Create Post</Link>
            </div>
        </div>   
    </>
  )
}

export default RightbarMenu