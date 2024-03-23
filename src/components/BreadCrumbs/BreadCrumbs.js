import React from 'react'
import { KeyboardArrowRightRoundedIcon } from '../../utils/constants'
import { Link, useLocation } from 'react-router-dom'
import './breadCrumbs.css'

const BreadCrumbs = () => {
  const location      = useLocation();
  const pathName      = location.pathname;
  const pathSegments  = pathName.split('/').filter(segment => segment !== '');
  
  return (
    <>
      <div className='bread-crumbs'>
          <Link to="/"> Home</Link>
          {pathSegments.map((segment, index) => (
            <div className='bread-links' key={index}>
              <KeyboardArrowRightRoundedIcon /><Link to={`../${segment}`}> {segment}</Link>
            </div>
          ))}
      </div>
    </>
  )
}

export default BreadCrumbs