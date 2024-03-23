import React from 'react'
import {Button} from '../..'
import { cancel } from '../../../assets'

import './deletePopUp.css'

const DeletePopUp = ({onOpen, onClose, onConfirm, popUpImage, prompt}) => {
  return (
    <>
      {onOpen && (
        <div className='delete-popup-display-wrapper'>
          <div className={onOpen ? 'delete-popup-card-tooltip active' : 'delete-popup-card-tooltip'}>
            <div className='delete-popup-card-content'>
              <div className='delete-popup-card-close' onClick={onClose}>
                <img src={cancel} alt="cancel-popup img" />
              </div>
              <div className='delete-popup-card-data'>
                <div className='delete-popup-card-profile-image'>
                  <div className='delete-popup-card-profile-image-mask'>
                    <img src={popUpImage} alt="delete-popup img" />
                  </div>
                </div>

                <div className='delete-popup-card-name'>
                  <p>{prompt}?</p>
                </div>

                <div className='delete-popup-card-button'>
                  <Button buttonClickWrap="link-wrapper" onClickButton onClickNavigate={onConfirm} onClickName="Delete"/>
                  <Button buttonClickWrap="transparent-link-wrapper" onClickButton onClickNavigate={onClose} onClickName="Cancel"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeletePopUp