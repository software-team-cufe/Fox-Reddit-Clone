import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <>
  //   <App />
  //     <ToastContainer
  //       position="top-right"
  //       autoClose={3000}
  //       hideProgressBar={false}
  //       newestOnTop={false}
  //       closeOnClick
  //       rtl={true}
  //       pauseOnFocusLoss
  //       draggable
  //       pauseOnHover
  //     />
  // </>



  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-left"
      autoClose={30000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>,
)




