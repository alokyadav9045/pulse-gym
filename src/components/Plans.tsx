'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: '₹999',
    duration: 'per month',
    features: [
      'Access to gym equipment',
      'Locker facility',
      'Basic fitness assessment',
      'Group classes access',
      '24/7 gym access'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Premium',
    price: '₹1999',
    duration: 'per month',
    features: [
      'All Basic features',
      'Personal trainer sessions (2/month)',
      'Nutrition consultation',
      'Sauna & steam access',
      'Priority booking',
      'Guest passes (2/month)'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Elite',
    price: '₹2999',
    duration: 'per month',
    features: [
      'All Premium features',
      'Unlimited personal training',
      'Advanced fitness assessment',
      'Massage therapy sessions',
      'VIP locker',
      'Free merchandise',
      'Dedicated support'
    ],
    popular: false
  }
]

export default function Plans() {
  return (
    <section id="plans" className="py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Membership <span className="text-primary">Plans</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan that fits your fitness journey and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden md:scale-100 ${
                plan.popular ? 'ring-2 ring-primary md:scale-105' : ''
              }`}>
              {plan.popular && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-primary text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                  <Star className="w-3 sm:w-4 h-3 sm:h-4" />
                  Most Popular
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{plan.price}</div>
                  <div className="text-sm sm:text-base text-gray-600">{plan.duration}</div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 sm:py-3 px-6 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary-dark text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                  Choose Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12">
          <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
            Need a custom plan? Contact us for personalized membership options.
          </p>
          <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  )
}