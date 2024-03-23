import React from 'react'

import './truncatedText.css'

const TruncatedText = ({ text, maxLength }) => {
    if (text.length <= maxLength) {
        return <span className='truncated-text'>{text}</span>;
    }

    const truncatedText = `${text.slice(0, maxLength)}...`;

    return <small className='truncated-text' title={text}>{truncatedText}</small>;
}

export default TruncatedText