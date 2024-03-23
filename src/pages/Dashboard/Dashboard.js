import React from 'react'
import { Helmet } from 'react-helmet-async'
import { DashboardMainContent, DashboardSideContent } from '../../components'

import './dashboard.css'

const Dashboard = () => {
  return (
    <>
      <Helmet><title>dashboard</title></Helmet>
      <div className='container'>
        <div className='dashboard-main-content'>
            <DashboardMainContent />
        </div>
        <div className='dashboard-side-content'>
            <DashboardSideContent />
        </div>
      </div>
    </>
  )
}

export default Dashboard