import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
// import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { actionFirstPaySession, actionSuccessPaySession, actionUpdatePaymentSession } from '../../actions/payments'
import { CheckCircleOutlineRoundedIcon, DownloadRoundedIcon } from '../../utils/constants'
import { actionUpdatePaymentOrder } from '../../actions/orders'
import { actionClearCartItems } from '../../actions/cart'
import { Button, Loader } from '../../components'

import './successPayment.css'

const SuccessPayment = () => {
  const componentRef                              = useRef();
  const dispatch                                  = useDispatch()
  const location                                  = useLocation();
  const searchParams                              = new URLSearchParams(location.search);
  const sessionId                                 = searchParams.get('session_id');
  const {paymentUserPayReceipt, confirmedPaymentReceipt}   = useSelector((state) => state?.paymentList)
  const [errorMessage, setErrorMessage]           = useState(null)
  const [onePost, setOnePost]                     = useState(null)

  // const formatUnixTimestamp = (unixTimestamp) => {
  //   return unixTimestamp ? moment.unix(unixTimestamp).format('MMMM Do YYYY, h:mm:ss a') : ''; // Customize the format as needed
  // };
  const formatUnixTimestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
    return date.toLocaleString(); // Convert to local date and time format
  };
  
  // Usage:
  // const paymentTime = formatUnixTimestamp(paymentUserPayReceipt?.created);
  useEffect(() => {
    // use the referenceId to find the _id, orderId, then update the necessary fields
    dispatch(actionFirstPaySession(sessionId))
  }, [dispatch, sessionId])

  useEffect(() => {
    if(sessionId){
      // update the order details for this particular session with the orderId
      dispatch(actionSuccessPaySession(sessionId));
      if(sessionId){
        // confirmedPaymentReceipt is the payment receipt data from the database
        // paymentUserPayReceipt is the retrieved data receipt from stripe server
        dispatch(actionUpdatePaymentOrder(sessionId, confirmedPaymentReceipt))
        // Assuming actionUpdatePaymentOrder returns a Promise
        dispatch(actionUpdatePaymentSession(sessionId, confirmedPaymentReceipt));
      }
      } else {
      // Handle the case where payment was not successful
        setErrorMessage("Payment was not successful");
      }
  }, [dispatch, location, sessionId, confirmedPaymentReceipt]);

  useEffect(() => {
    if (paymentUserPayReceipt && paymentUserPayReceipt?.id === sessionId) {
      setOnePost(paymentUserPayReceipt);
    } else {
      setOnePost(null);
    }
  }, [sessionId, paymentUserPayReceipt]);

  useEffect(() => {
    dispatch(actionClearCartItems())
  }, [dispatch])

  //handle printing
  const handleDownloadReceiptClick = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `success payment for my market place item ${sessionId}`,
  });

  return (
    <>
      {onePost ? (
        <div className='success-payment-wrapper'>
          <div className='success-payment-main-container'>
            <div className='success-payment-detail' ref={componentRef}>
              <div className="success-payment-svg-wrapper verified"><CheckCircleOutlineRoundedIcon /></div>
              <h3>Payment successful</h3>
              
              <div className='success-payment-detail-info-wrapper'>
                <div className='success-payment-detail-info-title'>Payment details</div>
                <div className='success-payment-info-main'>
                  <span className='success-payment-info-span-title'>Ref. Number</span>
                  <span className='success-payment-info-span-detail'>{paymentUserPayReceipt?.payment_intent}</span>
                </div>
                <div className='success-payment-info-main'>
                  <span className='success-payment-info-span-title'>Payment Time</span>
                  <span className='success-payment-info-span-detail'>
                    {formatUnixTimestamp(paymentUserPayReceipt?.created)}
                  {/* {paymentUserPayReceipt?.created} */}
                  </span>
                </div>
                <div className='success-payment-info-main'>
                  <span className='success-payment-info-span-title'>Payment Method</span>
                  <span className='success-payment-info-span-detail'>{paymentUserPayReceipt?.payment_method_types}</span>
                </div>
                <div className='success-payment-info-main'>
                  <span className='success-payment-info-span-title'>Amount Paid</span>
                  <span className='success-payment-info-span-detail'>&#8358;{paymentUserPayReceipt?.amount_total/100}</span>
                </div>
              </div>
            </div>
            <Button onClickButton buttonClickWrap="wide-cart-button-click" buttonIcon={<DownloadRoundedIcon />} onClickNavigate={handleDownloadReceiptClick} onClickName="Download Receipt" />
            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
          </div>
        </div>
      ) : (
        <div className='success-payment-wrapper'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default SuccessPayment