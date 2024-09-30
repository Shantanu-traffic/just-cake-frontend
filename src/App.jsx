import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import { Login, Admin, Payment, Cart } from "./Pages"
import Cookies from 'js-cookie';

function App() {
  let isAdmin = false;
  let user = null
  const userCookie = Cookies.get('user');
  // Safely parse userCookie if it exists
  if (userCookie) {
    try {
      const parsedUserCookie = JSON.parse(userCookie);
      user = parsedUserCookie;
      isAdmin = parsedUserCookie.is_admin;
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/order' element={<Cart />} />
          {user && <Route path='/payment' element={<Payment />} />}
          {isAdmin && <Route path='/admin' element={<Admin />} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
