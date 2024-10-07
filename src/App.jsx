import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import { Login, Admin, Payment, Cart, OrderHistoryAdmin } from "./Pages"
import Cookies from 'js-cookie';
import { OrderPlaced } from './Components';
import RequestOrder from './Pages/RequestOrder/RequestOrder';

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
          <Route path='/requestOrder' element={<RequestOrder />} />
          {user && <Route path='/payment' element={<Payment />} />}
          {user && <Route path='/orderplaced' element={<OrderPlaced />} />}
          {isAdmin && <Route path='/admin' element={<Admin />} />}
          {isAdmin && <Route path='/orders' element={<OrderHistoryAdmin />} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
