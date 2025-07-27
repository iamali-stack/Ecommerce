import {NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import cart from '../../assets/images/shopping-cart.png'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const isLoggedIn = localStorage.getItem('usertoken') !== null
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('usertoken')
    navigate('/login')
  }
const numOfCartItems = useSelector(state => state.cart.numOfCartItems);

  return (
    <>
      <nav className="w-full p-2 bg-white md:fixed top-0 left-0 right-0 z-50 shadow-md" >
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="mb-2  md:mb-0 ">
          <NavLink to="/home">
            <img src={logo} alt="FreshCart Logo" className="h-10" />
          </NavLink>
          </div>
          
          {isLoggedIn && (
            <ul className="flex flex-col md:flex-row items-center gap-8">
              <li>
                <NavLink to="/home" className="text-xl text-slate-800">Home</NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-xl text-slate-800">Products</NavLink>
              </li>
              <li>
                <NavLink to="/brands" className="text-xl text-slate-800">Brands</NavLink>
              </li>
              <li>
                <NavLink to="/categories" className="text-xl text-slate-800">Categories</NavLink>
              </li>
              <li>
                <NavLink to="/wishlist" className="text-xl text-slate-800">Wishlist</NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="text-xl text-slate-800">Cart</NavLink>
              </li>
             
            </ul>
          )}

          {/* 🟠 روابط الحساب (يمين) */}
          <ul className="flex flex-col md:flex-row items-center gap-3 mt-2 md:mt-0">
           
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to="/register" className="text-xl text-slate-800">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="text-xl text-slate-800">Login</NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
               <li>
          <NavLink to="/cart" className='relative'><img className='w-[70px] px-5' src={cart} alt="cart" />
        {numOfCartItems > 0 && (
        <span className="absolute -top-2 -right-1 inline-flex items-center
         justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full">
          {numOfCartItems}
        </span>)}
                </NavLink>
              </li>
              <li>
                  <NavLink to="/login" onClick={handleLogout} className="text-xl text-slate-800">Logout</NavLink>
                </li>
              </>
              
            )}
          </ul>

        </div>
      </nav>
    </>
  )
}
