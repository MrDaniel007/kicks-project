
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import "./Header.scss"
import logo from "../../assets/svg/logo.svg"
import search from "../../assets/image/searchb.png"
import account from "../../assets/image/accountb.png"
import Burger from '../burger/Burger'
import like from "../../assets/image/like.png"
import carts from "../../assets/image/carts.png"
import filter from "../../assets/image/filter.png"

// firebase
import { auth } from "../../firebase"
import { onAuthStateChanged } from "firebase/auth"

function Header() {

  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

useEffect(() => {
  document.body.className = darkMode ? "dark-theme" : "light-theme";
  localStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);


  
  const [isOpen, setIsOpen] = useState(false)
  const [showInput, setShowInput] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // const handleImageClick = () => {
  //   setShowInput(prev => !prev);
  // }

  // Генерация инициалов
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0];
    return parts[0][0] + parts[1][0];
  };

  const favoriteCount = useSelector((state) => state.kicks.favorites.length);

const cartCount = useSelector(state => state.cart.list.reduce((sum, i) => sum + i.quantity, 0));



const handleClose = () => {
  setShowMenu(false);
};

// useEffect(() => {
//   if (showMenu) {
//     document.body.style.position = "fixed";
//     document.body.style.top = "0";
//     document.body.style.left = "0";
//     document.body.style.right = "0";
//     document.body.style.width = "100%";
//   } else {
//     document.body.style.position = "";
//     document.body.style.top = "";
//     document.body.style.left = "";
//     document.body.style.right = "";
//     document.body.style.width = "";
//   }
// }, [showMenu]);

  return (
    <>
      <div data-aos="flip-right" data-aos-delay="100" className='header'>
        <div className='links'>
          {/* Бургер */}
          <div className="burger" onClick={() => { setIsOpen(!isOpen); console.log(isOpen); }}>
            ☰
          </div>
          <nav className="nav-home">
            <Link className='New-rubik link-underline' to="/">New Drops 1 <span className='rubik'></span></Link>
          <Link className='link-header link-underline' to="/men">Men</Link>
            <Link className='link-header2 link-underline' to="/women">Women</Link>
          </nav>
        </div>

        <img className='logo' src={logo} alt="" />

        <div className='search'>
          {/* {showInput && <input className='search-input' type="text" placeholder="Search ..." autoFocus />} */}
      <Link to="/searchpage">   <img className='search-icon' src={search} alt="" /></Link> 

   {/* <Link to="/profit">       {user ? (
            <div className="user-info">
              <div className="avatar">{getInitials(user.displayName || user.email)}</div>
            </div>
          ) : (
            <button>
              
                <img className='account' src={account} alt="" />
            </button>
          )}</Link> */}
{/* {showMenu && ( 
  <div className="account-sidebar">
    <div className="sidebar-content">
      {user ? (
        <Link to="/profile">👤 Аккаунт</Link>
      ) : (
        <Link to="/login">🔐 Войти</Link>
      )}
      <button onClick={() => setDarkMode(!darkMode)}>
        🌓 Тема: {darkMode ? "Тёмная" : "Светлая"}
      </button>
      <Link to="/filter">🛠 Фильтр</Link>
      <Link to="/about">ℹ️ About Us</Link>
      <Link to="/contact">📞 Contact</Link>
    </div>
  </div>
)}





{showMenu && (
  <div className="account-menu animate-pop">
    {user ? (
      <Link to="/profile">👤 Аккаунт</Link>
    ) : (
      <Link to="/login">🔐 Войти</Link>
    )}
    <button onClick={() => setDarkMode(!darkMode)}>
      🌓 Тема: {darkMode ? "Тёмная" : "Светлая"}
    </button>
    <Link to="/filter">🛠 Фильтр</Link>
    <Link to="/about">ℹ️ About Us</Link>
    <Link to="/contact">📞 Contact</Link>
  </div>
)} */}

  
   <Link to="/profit">  <img className="account" src={account} alt="Account" /></Link> 


  <Link to="/listing"><img className='filter-header' src={filter} alt="" /></Link>


    <Link to="/like">
  <div className="icon-wrapper">
    <img className="like-header" src={like} alt="" />
    {favoriteCount > 0 && <span className="badge">{favoriteCount}</span>}
  </div>
</Link>

<Link to="/cart">
  <div className="icon-wrapper">
    <img className="cart-header" src={carts} alt="" />
    {cartCount > 0 && <span className="badge">{cartCount}</span>}
  </div>
</Link>



        </div>
      </div>
      <Burger isOpen={isOpen} onClose={() => setIsOpen(false)} />




        {/* <div className="user-info" onClick={() => setShowMenu(prev => !prev)}>
  <div className="avatar">{getInitials(user.displayName || user.email)}</div>
</div> */}
    </>
  )
}

export default Header

//  onClick={handleImageClick}
//             style={{ cursor: 'pointer', width: '28px', height: '28px' }}