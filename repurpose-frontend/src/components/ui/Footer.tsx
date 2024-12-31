import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/Button";

const Footer = () => {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 mx-5">
          {/* Email Contact Section */}
          <div className="flex items-start space-x-4">
            <i className="fas fa-envelope text-4xl text-gray-700" /> {/* Font Awesome Email Icon */}
            <div>
              <h4 className="font-bold text-xl">Email</h4>
              <p className="text-sm text-gray-500">
                Our response time is 1 to 3 business days.
              </p>
              <a
                href="mailto:example@example.com"
                className="text-primary font-medium"
              >
                Send a Message
              </a>
            </div>
          </div>

          {/* WhatsApp Contact Section */}
          <div className="flex items-start space-x-4">
            <i className="fab fa-whatsapp text-4xl text-gray-700" /> {/* Font Awesome WhatsApp Icon */}
            <div>
              <h4 className="font-bold text-xl">Whatsapp</h4>
              <p className="text-sm text-gray-500">
                Our response time is 1 to 3 business days.
              </p>
              <a
                href="https://wa.me/yourphonenumber"
                className="text-primary font-medium"
              >
                Send a Message
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="text-center lg:text-left">
            <h4 className="font-bold text-3xl mb-2">Let’s keep in touch</h4>
            <p className="text-sm text-gray-500 mb-4">
              Get recommendations, tips, updates, promotions and more.
            </p>
            <form className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your E-mail Address"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-600"
              />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="border-t pt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 text-center lg:text-left">
          {/* Logo Section */}
          <div>
            <div className="w-full h-16 mb-4 flex items-center justify-center rounded-md">
              <Link href="/">
                <img
                  src="/head_logo.png"
                  alt="Logo"
                  className="w-full h-full"
                />
              </Link>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h5 className="font-bold mb-4">Get to Know Us</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  News & Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  Sell on Thrift
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h5 className="font-bold mb-4">Customer Service</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  Payment Method
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h5 className="font-bold mb-4">Orders & Returns</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500">
                  Track your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500">
                  Return & Exchange
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
