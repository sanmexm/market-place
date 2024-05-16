import React from 'react'

import './pleaseNote.css'

const PleaseNote = ({title, note}) => {
  return (
    <>
        <div className='please-note-wrapper'>
            <h3>{title}</h3>
            <span>{note}</span>
        </div>
    </>
  )
}

export default PleaseNote