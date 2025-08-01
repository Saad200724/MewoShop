import { Link } from "wouter";
import logoUrl from "@assets/logo_1754019999406.png";

export function Footer() {
  return (
    <footer className="bg-brand-green text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src={logoUrl} alt="Meow Meow Pet Shop" className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold">Meow Meow</h3>
                <p className="text-xs opacity-75">PET SHOP</p>
              </div>
            </div>
            <p className="text-sm opacity-75 mb-4">
              Your trusted partner in pet care. We provide premium quality products to keep your furry friends happy and healthy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-brand-yellow transition-colors">
                Facebook
              </a>
              <a href="#" className="text-white hover:text-brand-yellow transition-colors">
                Instagram
              </a>
              <a href="#" className="text-white hover:text-brand-yellow transition-colors">
                Twitter
              </a>
              <a href="#" className="text-white hover:text-brand-yellow transition-colors">
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Shop All Products
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=cat-food">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Cat Food
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=dog-food">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Dog Food
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=toys">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Pet Toys
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Accessories
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=healthcare">
                  <a className="text-sm opacity-75 hover:opacity-100 hover:text-brand-yellow transition-colors">
                    Healthcare
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-brand-yellow">📞</span>
                <span className="text-sm">01408076089</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-brand-yellow">✉️</span>
                <span className="text-sm">info@mewmewpetshop.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-brand-yellow">📍</span>
                <span className="text-sm">
                  123 Pet Street<br />
                  Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-brand-yellow">🕘</span>
                <span className="text-sm">Open 9 AM - 10 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-600 mt-8 pt-8 text-center">
          <p className="text-sm opacity-75">
            &copy; 2024 Meow Meow Pet Shop. All rights reserved. |{" "}
            <Link href="/privacy">
              <a className="hover:text-brand-yellow">Privacy Policy</a>
            </Link>{" "}
            |{" "}
            <Link href="/terms">
              <a className="hover:text-brand-yellow">Terms of Service</a>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
