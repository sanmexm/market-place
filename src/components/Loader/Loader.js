import React from 'react'

import './loader.css'

const Loader = () => {
  return (
    <div className='loading-state'>
      <svg viewBox='0 0 50 50' className='svg-loader'>
        <circle className='circle-loader' cx='25' cy='25' r='20' />
      </svg>
    </div>
  )
}

export default Loader