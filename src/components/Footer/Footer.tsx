
export default function Footer() {
  return (
    <footer className="bg-white border-t z-50  border-gray-200">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {/* Logo, Description, Socials */}
          <div>
            <div className="flex items-center mb-3">
              <span className="text-2xl font-bold">
                <span className="text-green-600">Fresh</span><span className="text-black">Cart</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4 text-start">
              FreshCart is your one-stop destination for fresh groceries, organic produce, and household essentials delivered right to your doorstep.
            </p>
            <div className="flex space-x-4 text-gray-500 text-lg">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest" /></a>
            </div>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>Fruits & Vegetables</li>
              <li>Dairy & Eggs</li>
              <li>Bakery & Snacks</li>
              <li>Meat & Seafood</li>
              <li>Beverages</li>
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Shipping Policy</li>
            </ul>
          </div>
          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>My Account</li>
              <li>Order History</li>
              <li>Wishlist</li>
              <li>Returns & Refunds</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />
        <div className="text-center text-gray-500 text-sm">
          © 2023 FreshCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
