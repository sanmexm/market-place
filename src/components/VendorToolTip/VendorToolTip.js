import React, { useState } from 'react'
import { chat, email, phone, userImg, whatsapp } from '../../assets'
import { Link } from 'react-router-dom'

import './vendorToolTip.css'

const VendorToolTip = ({vendorProfile, vendorUser}) => {
    const [vendorOpen, setVendorOpen]                 = useState(false)

    const handleVendorAccountClick = () => {
        setVendorOpen((prev) => !prev)
    }

  return (
    <>
        <div className='vendor-display-wrapper'>
            <h3>Vendor</h3>
            <div className={vendorOpen ? 'vendor-display-img active' : 'vendor-display-img'} onClick={handleVendorAccountClick}>
                <img src={vendorProfile?.selectedFile || userImg} alt='user img' />
            </div>
            <div className={vendorOpen ? 'vendor-card-tooltip active' : 'vendor-card-tooltip'}>
                <div className='vendor-card-content'>
                    <div className='vendor-card-header'>
                        <span>{vendorProfile?.category} account</span>

                        <div className='vendor-card-social'>
                            <Link className='vendor-card-social-img'><img src={whatsapp} alt='whatsapp' /></Link>
                            <Link className='vendor-card-social-img'><img src={email} alt='email' /></Link>
                            <Link className='vendor-card-social-img'><img src={phone} alt='phone' /></Link>
                        </div>
                    </div>
                    <div className='vendor-card-data'>
                        <div className='vendor-card-profile-image'>
                            <div className='vendor-card-profile-image-mask'>
                                <img src={vendorProfile?.selectedFile || userImg} alt="vendor img" />
                            </div>

                            <span className='vendor-card-profile-status'></span>
                        </div>

                        <div className='vendor-card-name'>
                            {vendorUser?.firstName} {vendorUser?.lastName}
                        </div>
                        <small>Engineer</small>

                        <div className='vendor-card-button'>
                            <div className='vendor-card-chat-button'><img src={chat} alt='chat' /></div>
                            <span>Send message</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VendorToolTip