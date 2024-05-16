import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { KeyboardArrowDownRoundedIcon, faqs } from '../../utils/constants'
import { SubHeaders } from '../../components'

import './faq.css'

const AccordionItem = (props) => {
    const contentEl                     = useRef(null)
    const { handleToggle, active, faq } = props
    const { header, id, text }          = faq
  
    return (
      <>
        <div className={active === id ? "faq-header active" : "faq-header"} onClick={() => handleToggle(id)}>
          <h2>{header}</h2>
          <span><KeyboardArrowDownRoundedIcon /></span>
        </div>
  
        <div
         ref={contentEl} 
         className={`faq-collapse ${active === id ? "show" : ""}`} 
         style={active === id ? { height: contentEl.current.scrollHeight } : { height: "0px" }}>
            <p>{text}</p>
        </div>
      </>
    )
  }
  
  const Faq = () => {
    const [active, setActive] = useState(null)
  
    const handleToggle = (index) => {
      if(active === index){
        setActive(null)
      }else{
        setActive(index)
      }
    }
  
    return (
      <>
          <Helmet><title>Frequently asked questions</title></Helmet>
          <div className='faq-section-wrapper'>
              <SubHeaders pageTitle="Frequently asked questions" headerText="Find answers to commonly asked questions, and your submit requests to us and get a feedback in 24 hours" />
  
              <article className='faq-container'>
                {faqs.map((faq, index) => {
                  return(
                    <AccordionItem 
                      key={index}
                      active={active}
                      handleToggle={handleToggle}
                      faq={faq}
                    />
                  )
                })}
              </article>
          </div>
      </>
    )
  }

export default Faq