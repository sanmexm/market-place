import React from 'react'
import {Button} from '../..'
import { categoryList } from '../../../utils/constants'

import './category.css'

const Category = () => {
  return (
    <>
      <section className='category-wrapper'>
        <div className='category-header'>
          <h3>Our Categories</h3>
          <div className='category-header-list'>
            <h4>Various types of listing Categories for you</h4>
            <span>Search for what category of listing you want.</span>
          </div>
        </div>
        <div className='category-grid'>
          {categoryList.map((category) => (
            <div key={category.id} className='category-grid-box'>
              <div className='category-grid-icon' title={category.title}>
                {category.icon}
              </div>
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
        <Button buttonWrapper="button-wrapper" linkButton linkTo="/category" linkClass="link-wrapper" linkName="View Categories" />
      </section>
    </>
  )
}

export default Category