import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import { Provider } from 'react-redux'
import { myStore } from './redux/store.js'
 import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={myStore}>
    <App />
    <ToastContainer/>
    </Provider>
  </StrictMode>,
)
