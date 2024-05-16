import React from 'react'
import { Link } from 'react-router-dom'

import './button.css'

const Button = ({buttonWrapper, buttonClasses, onClickButton, linkButton, hrefHashTagButton, buttonClickWrap, onClickNavigate, isButtonDisabled, buttonIconBack, onClickName, buttonIcon, linkTo, linkClass, linkName, linkIcon, title}) => {
  
  const classNames = buttonClasses ? buttonClasses.join(' ') : '';
    
  return (
    <>
      <div className={buttonWrapper}>
        { onClickButton ? (
            <button className={`${buttonClickWrap} ${classNames}`} onClick={onClickNavigate} disabled={isButtonDisabled}>{buttonIconBack} {buttonIcon} {onClickName}</button>
        ) : linkButton ? (
            <Link to={linkTo} className={linkClass} title={title}>{linkName} {linkIcon}</Link>
        ) : hrefHashTagButton ? (
            <a href={`#${linkTo}`} className={linkClass} title={title}>{linkName} {linkIcon}</a>
        ) : null }
      </div>
    </>
  )
}

export default Button