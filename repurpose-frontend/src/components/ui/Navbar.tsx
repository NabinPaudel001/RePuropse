"use client";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);

  // Dummy cart data
  const cartItems = [
    {
      id: 1,
      name: "Asgaard Sofa",
      quantity: 1,
      price: 250000,
      image: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Casaliving Wood",
      quantity: 1,
      price: 270000,
      image: "https://via.placeholder.com/100", // Replace with actual image URL
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCartClick = () => {
    if (isSmallDevice) {
      window.location.href = "/shop_cart"; // Redirect for small devices
    } else {
      setIsCartDialogOpen(true); // Open dialog for larger devices
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 backdrop-blur border-b z-10">
      {/* Logo */}
      <div className="flex h-15">
        <a href="/">
          <img src="#" alt="Logo" className="w-18 h-12" />
        </a>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-10 text-gray-800 font-medium justify-center">
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          Home
        </li>
        <Link href="/shop">
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          Shop
        </li>
        </Link>
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          About
        </li>
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          Donate
        </li>
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          Contact
        </li>
      </ul>

      {/* Cart Icon and Dialog */}
      <div className="relative">
      <div className="hidden md:flex space-x-7 text-gray-800">
        <Button>Login</Button>
        <Button variant="outline">Join Us</Button>
        <button className="hover:text-gray-600">
          <i className="fas fa-user"></i>
        </button>
      
        <button
          className="hover:text-gray-600"
          onClick={handleCartClick}
        >
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>


      {/* Responsive Menu Button */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <i className="fas fa-bars hover:text-gray-600"></i>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                <ul className="space-y-4 text-gray-800 font-medium">
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    Home
                  </li>
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    Sell
                  </li>
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    About
                  </li>
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    Donate
                  </li>
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    Contact
                  </li>
                </ul>
                <div className="mt-4 space-y-2">
                  <Button className="w-full">Login</Button>
                  <Button className="w-full">Signup</Button>
                  <div className="flex justify-around mt-2">
                    <button className="hover:text-gray-600">
                      <i className="fas fa-user"></i>
                    </button>
                    <button className="hover:text-gray-600">
                      <i className="fas fa-search"></i>
                    </button>
                  
                    <button
                      className="hover:text-gray-600"
                      onClick={handleCartClick}
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>



        {/* Cart Dialog */}
        {isCartDialogOpen && (
          <div className="absolute right-0 mt-2 bg-white p-6 rounded-lg shadow-lg w-80 z-20">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>
                        {item.quantity} x Rs. {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-red-600">
                    <i className="fas fa-times"></i>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold">
                Subtotal: Rs. {subtotal.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <Button>Cart</Button>
              <Button>Checkout</Button>
              <Button variant={"outline"} onClick={() => setIsCartDialogOpen(false)}>Close</Button>
              
           
            </div>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;