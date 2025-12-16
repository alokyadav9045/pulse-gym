'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Users, Trophy, Heart } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: Users, value: '1000+', label: 'Happy Members' },
    { icon: Award, value: '50+', label: 'Expert Trainers' },
    { icon: Trophy, value: '10+', label: 'Years Experience' },
    { icon: Heart, value: '100+', label: 'Success Stories' }
  ]

  return (
    <section id="about" className="py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-64 xs:h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
                alt="Vitalize Fitness Interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">State-of-the-Art Facilities</h3>
                <p className="text-sm opacity-90">Equipped with the latest fitness technology</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                About <span className="text-primary">Vitalize Fitness</span>
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full mb-4 sm:mb-6"></div>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              At Vitalize Fitness, we believe that fitness is not just about working out—it&apos;s about transforming your entire lifestyle. Founded over a decade ago, we&apos;ve been helping individuals achieve their fitness goals through personalized training, cutting-edge equipment, and a supportive community.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Our expert trainers are dedicated to providing you with the knowledge, motivation, and guidance you need to succeed. Whether you&apos;re a beginner or an experienced athlete, we have the perfect program for you.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6 mt-6 sm:mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-md">
                  <stat.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-1 sm:mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <button className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base w-full sm:w-auto">
                Join Our Community
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}