import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image src="/vitalize-fitness.png" alt="Vitalize Fitness" width={36} height={36} priority className="logo w-9 sm:w-11 h-9 sm:h-11" />
              <h3 className="text-xl sm:text-2xl font-bold text-primary">Vitalize Fitness</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Transform your body, mind, and lifestyle with our expert trainers and state-of-the-art facilities.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#plans" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="#trainers" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Personal Training
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Group Classes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Nutrition Counseling
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Cardio Zone
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Strength Training
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Contact Info</h4>
            <div className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <p>123 Fitness Street</p>
              <p>Downtown City, ST 12345</p>
              <p>+1 (555) 123-4567</p>
              <p>info@vitalizefitness.com</p>
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              <p>Mon - Fri: 5:00 AM - 11:00 PM</p>
              <p>Sat - Sun: 6:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; {currentYear} Vitalize Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}