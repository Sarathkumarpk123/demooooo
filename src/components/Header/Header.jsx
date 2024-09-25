import React from 'react'
import './Header.css'
import { Navigate } from 'react-router-dom'
const Header = () => {
  const useNavigate=Navigate
  const handleProceedToMenu=()=>{
    Navigate('/menu')
  }

  return (
    <div className='header'>
       <div className='header-contents'>
       <h2>Order Your Favourite Food Here...</h2>
       <p>"Welcome to Cucumber , where you can easily order your favorite meals from local restaurants. Browse menus, place your order, and enjoy fast delivery—all from the comfort of your home."</p>
       <button onClick={handleProceedToMenu}>Explore Menu </button>
       </div>
      
    </div>
  )
}

export default Header
