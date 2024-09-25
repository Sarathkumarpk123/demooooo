import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/Place Order/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Menu from './pages/Menu/Menu';
import Allfood from './components/Allfood/Allfood';
import Payment from './components/Payment/Payment';
import Header from './components/Header/Header';
import './App.css'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");
  const [cart, setCart] = useState([]);

  // Check if token is already stored in localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Set token if found in localStorage
    }
  }, []);

  // Pass cart state and methods to Navbar and Allfood components
  return (
    <>
      {/* Show the LoginPopup and pass setShowLogin to allow closing it */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='headpart'>
        {/* Pass setShowLogin, token, and cart-related props to Navbar */}
        <Navbar 
          setShowLogin={setShowLogin} 
          token={token} 
          setToken={setToken} 
          cart={cart} 
          setCart={setCart}
        />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/menu' element={<Menu/>} />
          {/* Pass cart-related props to Allfood component */}
          <Route path='/all-food' element={<Allfood cart={cart} setCart={setCart} />} />
          {/* Pass cart-related props to Cart component */}
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/payment' element={<Payment/>} />
          <Route path='/menu' element={<Header/>} />
          
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
