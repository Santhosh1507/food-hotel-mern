import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import Update from './pages/Update/Update'
import Editfood from './pages/Editfood.jsx/Editfood'

function App() {

  const url = "https://food-hotel-mern-backend.onrender.com"

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr/>
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
          <Route path='/Update/:id' element={<Update url={url} />} />
          <Route path='/editfood/:id' element={<Editfood  />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
