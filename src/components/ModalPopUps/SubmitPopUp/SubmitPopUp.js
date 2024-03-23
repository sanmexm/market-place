import React from 'react'
import {Button} from '../..'
import {cancel} from '../../../assets'

import './submitPopUp.css'

const SubmitPopUp = ({onOpen, onClose, onConfirm, popUpImage, prompt}) => {

  return (
    <>
      {onOpen && (
        <>
          <div className='submit-popup-display-wrapper'>
            <div className={onOpen ? 'submit-popup-card-tooltip active' : 'submit-popup-card-tooltip'}>
              <div className='submit-popup-card-content'>
                <div className='submit-popup-card-close' onClick={onClose}>
                  <img src={cancel} alt="cancel-popup img" />
                </div>
                <div className='submit-popup-card-data'>
                  <div className='submit-popup-card-profile-image'>
                    <div className='submit-popup-card-profile-image-mask'>
                      <img src={popUpImage} alt="submit-popup img" />
                    </div>
                  </div>

                  <div className='submit-popup-card-name'>
                    <p>{prompt}?</p>
                  </div>

                  <div className='submit-popup-card-button'>
                    <Button buttonClickWrap="link-wrapper" onClickButton onClickNavigate={onConfirm} onClickName="Create"/>
                    <Button buttonClickWrap="transparent-link-wrapper" onClickButton onClickNavigate={onClose} onClickName="Cancel"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SubmitPopUp