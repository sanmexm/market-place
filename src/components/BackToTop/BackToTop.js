import React, { useState } from 'react'
import { KeyboardArrowUpRoundedIcon } from '../../utils/constants'


import './backToTop.css'

const BackToTop = () => {
    const [visible, setVisible] = useState(false)
  
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 100){
            setVisible(true)
        }
        else if (scrolled <= 100){
            setVisible(false)
        }
    };
    
    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    window.addEventListener('scroll', toggleVisible);

  return (
    <div className='back-to-top'>
        <div id={visible ? 'circular-wrapper' : ''} onClick={scrollToTop}>
            <div className="move-up">
                <span id="arrow-top">
                    <KeyboardArrowUpRoundedIcon />
                </span>
            </div>
        </div>
    </div>
  )
}

export default BackToTop