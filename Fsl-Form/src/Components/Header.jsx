import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import Logo from "../assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
       
        <div className="w-[50px]">
          <img src={Logo} alt="Logo" className="w-full" />
        </div>

     
        <nav className="hidden md:flex gap-10 text-lg font-medium items-center">
          <Link to="/" className="text-[#f27144] hover:text-black">Home</Link>
          <Link to="/about" className="text-[#f27144] hover:text-black">About</Link>
          <Link to="/blog" className="text-[#f27144] hover:text-black">Blog</Link>
          <Link to="/contact" className="text-[#f27144] hover:text-black">Contact Us</Link>
          <Link className="text-[#f27144]">
                <button className="border-3 border-black px-[13px] py-[9px] text-[20px] rounded-xl bg-[#f27144] text-white">
                  Login
                </button>
              </Link>
        </nav>

      
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

   
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow-md">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link to="/" onClick={toggleMenu} className="text-[#f27144] hover:text-black">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="text-[#f27144] hover:text-black">About</Link>
            <Link to="/blog" onClick={toggleMenu} className="text-[#f27144] hover:text-black">Blog</Link>
            <Link to="/contact" onClick={toggleMenu} className="text-[#f27144] hover:text-black">Contact Us</Link>
            <Link to="/login" onClick={toggleMenu}>
              <button className="bg-[#f27144] text-white w-full py-2 rounded-xl hover:bg-[#d85c32] transition-all">
                Login
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
