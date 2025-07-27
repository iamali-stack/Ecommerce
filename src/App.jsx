import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import WishList from './components/WishList/WishList'
import Register from './components/Register/Register'
import Login from './components/auth/Login/Login'
import ForegetPassword from './components/auth/ForegetPassword/ForegetPassword'
import ResetPassword from './components/auth/ResetPassword/ResetPassword'
import VerifyRestCode from './components/auth/VerifyRestCode/VerifyRestCode'
import NotFound from './components/NotFound/NotFound'
import ProtectRoute from './components/ProtectRoute/ProtectRoute'
import Checkout from './components/Checkout/Checkout'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from "react-hot-toast";



const router = createHashRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      { index: true, element:<ProtectRoute><Home /></ProtectRoute>  },
      { path: 'home', element:<ProtectRoute><Home /></ProtectRoute> },
      { path: 'products', element: <ProtectRoute><Products /></ProtectRoute> },
      { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: 'wishlist', element: <ProtectRoute><WishList /></ProtectRoute> },
      { path: 'checkout', element: <ProtectRoute><Checkout /></ProtectRoute> },
      { path: 'products/:id', element: <ProtectRoute><ProductDetails /></ProtectRoute> },

      // Authentication routes
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgetpassword', element: <ForegetPassword /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'verifyresetcode', element: <VerifyRestCode /> },
      { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    basename: '/Ecommerce',
  }
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App
