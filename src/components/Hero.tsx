'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const words = ["Transform", "Your", "Body"]

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const type = () => {
      const currentWord = words[currentWordIndex]
      const shouldDelete = isDeleting

      if (!shouldDelete) {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000)
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }

    const timer = setTimeout(type, isDeleting ? 100 : 200)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-0 lg:h-screen pb-12 xs:pb-16 sm:pb-20 md:pb-24 lg:pb-0">
      {/* Background Image - Functional Training Area */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/main.jpg)',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      ></div>

      {/* Overlay - Enhanced for better contrast on mobile */}
      <div className="absolute inset-0 bg-black/55 lg:bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-3 xs:px-4 sm:px-6 md:px-8 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight">
            <span className="block">Welcome to</span>
            <span className="block text-primary drop-shadow-lg">Vitalize Fitness</span>
          </h1>
          <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light mb-4 xs:mb-6 sm:mb-8 h-10 xs:h-12 sm:h-14 lg:h-16 flex items-center justify-center">
            <span>{currentText}</span>
            <span className="animate-pulse ml-1">|</span>
          </div>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-4 xs:mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Join the ultimate fitness community. Transform your body, mind, and lifestyle with our expert trainers and state-of-the-art facilities.
          </p>

          <div className="flex flex-col xs:flex-row gap-2.5 xs:gap-3 sm:gap-4 justify-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <button className="bg-primary hover:bg-primary-dark text-white px-5 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-xs xs:text-sm sm:text-base shadow-lg hover:shadow-xl">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-5 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-xs xs:text-sm sm:text-base shadow-lg hover:shadow-xl">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
          <div className="bg-white/15 backdrop-blur-md rounded-lg p-2 xs:p-3 sm:p-4 md:p-6 text-center hover:bg-white/20 transition-colors">
            <div className="text-base xs:text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold">1000+</div>
            <div className="text-xs xs:text-sm md:text-base mt-0.5 xs:mt-1 sm:mt-2">Happy Members</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-lg p-2 xs:p-3 sm:p-4 md:p-6 text-center hover:bg-white/20 transition-colors">
            <div className="text-base xs:text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold">50+</div>
            <div className="text-xs xs:text-sm md:text-base mt-0.5 xs:mt-1 sm:mt-2">Expert Trainers</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-lg p-2 xs:p-3 sm:p-4 md:p-6 text-center hover:bg-white/20 transition-colors">
            <div className="text-base xs:text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold">10+</div>
            <div className="text-xs xs:text-sm md:text-base mt-0.5 xs:mt-1 sm:mt-2">Years Experience</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-lg p-2 xs:p-3 sm:p-4 md:p-6 text-center hover:bg-white/20 transition-colors">
            <div className="text-base xs:text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold">100+</div>
            <div className="text-xs xs:text-sm md:text-base mt-0.5 xs:mt-1 sm:mt-2">Success Stories</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-5 xs:w-6 h-5 xs:h-6 text-white animate-bounce" />
      </motion.div>
    </section>
  )
}