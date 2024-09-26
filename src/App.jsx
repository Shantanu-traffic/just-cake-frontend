import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import { Login, Admin, Payment, Cart } from "./Pages"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/order' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
