import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import "./App.css"
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"
import myRouter from './router'
import Women from './pages/Women'
import Header from './components/Header/Header'
import ScrollToTopButton from './components/Additional-f/scrollBtn/ScrollToButton'
import ScrollToTop from './components/Additional-f/scrollTop/ScrollToTop'
// импортируем AOS
import AOS from "aos"
import "aos/dist/aos.css"

function App() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartMap, setCartMap] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 1200,   // скорость анимации
      once: true,       // исправлено
    })
  }, [])
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <>
      <div className='app-body'>
        <RouterProvider router={myRouter}> 
           <ScrollToTop />
          {/* Header получает актуальные данные */}
{/* <Header
  wishlistCount={Object.keys(wishlistIds).length} // для сердечек
  cartCount={Object.values(cartMap).reduce((a,b) => a+b, 0)} // суммируем все items
/> */}
          {/* Women получает функции для обновления глобального состояния */}
          <Women
  wishlistIds={wishlistIds}
  cartMap={cartMap}
  onToggleWishlist={(newWishlistIds) => setWishlistIds(newWishlistIds)}
  onAddToCart={(newCartMap) => setCartMap(newCartMap)}
/>
        </RouterProvider>
        
      <ScrollToTopButton />

    
      </div>
    


      

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App