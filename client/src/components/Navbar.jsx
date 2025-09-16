import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";



const Navbar = () => {

  // this is nothing I paste the navbar in prebuiltui.com sites:-
  const [open, setOpen] = useState(false);

  // User login and if the user click the logout button setUser null (means user log out), and if user click the myOrder directly go to the my orders page using navigate:- and setShowUserLogin to show the login form when user click the login button:-
  const { 
    user, 
    setUser, 
    navigate, 
    setShowUserLogin, 
    cartCount,  
    searchQuery, 
    setSearchQuery 
  } = useContext(AppContext);
  
  // if the user search the products the product redirect to the all products and the product will show
  useEffect(() => {
    if(searchQuery.length>0){
      navigate('/products');
    }
  }, [searchQuery]);


  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold text-orange-600">FreshCart</h1>
      </Link>

      {/* ---------------------------------
          DESKTOP MENU
      -----------------------------------------------*/}

      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Products</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              clip-rule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>


        {/* ---------------------------------
            CART SECTION
        -----------------------------------------------*/}

        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.cart_icon} alt="" className="w-6 h-6"/> 
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>



        {/* ---------------------------------
            CHECK USER LOGIN AND LOGOUT PAGE in DESKTOP MENU
        -----------------------------------------------*/}

        {user ? (
          <>
            <div className="relative group">
              <img src={assets.profile_icon} alt="" className="w-10" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-30 rounded-md z-40 text-sm">
                <li onClick={() => {
                    navigate('/my-orders');
                }} className="p-1.5 cursor-pointer">My Orders</li>
                <li onClick={() => setUser(null)} className="p-1.5 cursor-pointer">Logout</li>
              </ul>
            </div>
          </>
        ) : (

          // ------------------ If user is not logged in then show the login button and when user click the login button then setShowUserLogin true and show the login form:-------------------------------
        
          <button 
            onClick={() => {setShowUserLogin(true)}} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
            Login
          </button>
        )}
      </div>



      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>



      {/* ---------------------------------
          MOBILE MENU
      -----------------------------------------------*/}

      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Products</Link>

        
        {/* ---------------------------------
            CHECK USER LOGIN AND LOGOUT PAGE in MOBILE MENU
        -----------------------------------------------*/}

        {user ? (
          <>
            <div className="relative group">
              <img src={assets.profile_icon} alt="" className="w-10" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-30 rounded-md z-40 text-sm">
                <li onClick={() => {
                    navigate('/my-orders');
                }} className="p-1.5 cursor-pointer">My Orders</li>
                <li onClick={() => setUser(null)} className="p-1.5 cursor-pointer">Logout</li>
              </ul>
            </div>
          </>
        ) : (
          <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
