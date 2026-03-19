import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header-container'>
      <div className='link-container'>
        <Link to="/">Home</Link>
      </div>

      <div className='link-container'>
        <Link to="/">Main</Link>
      </div>

      <div className='link-container'>
        <Link to="/list">List</Link>
      </div>

      <div className='link-container'>
        <Link to="/login">Login</Link>

      </div>



    </div>
  )
}

export default Header