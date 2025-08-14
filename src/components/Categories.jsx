'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

export default function Categories() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const categories = [
    {
      id: 1,
      name: 'چادر و سرپناه',
      icon: '🏕️',
      count: 25,
      color: 'from-green-500 to-green-600',
      href: '/categories/tents'
    },
    {
      id: 2,
      name: 'کوله پشتی',
      icon: '🎒',
      count: 18,
      color: 'from-orange-500 to-orange-600',
      href: '/categories/backpacks'
    },
    {
      id: 3,
      name: 'صندلی و میز',
      icon: '🪑',
      count: 12,
      color: 'from-blue-500 to-blue-600',
      href: '/categories/furniture'
    },
    {
      id: 4,
      name: 'لوازم آشپزی',
      icon: '🍳',
      count: 30,
      color: 'from-red-500 to-red-600',
      href: '/categories/cooking'
    },
    {
      id: 5,
      name: 'کیسه خواب',
      icon: '🛏️',
      count: 15,
      color: 'from-purple-500 to-purple-600',
      href: '/categories/sleeping'
    },
    {
      id: 6,
      name: 'چراغ و روشنایی',
      icon: '🔦',
      count: 22,
      color: 'from-yellow-500 to-yellow-600',
      href: '/categories/lighting'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center bg-green-100 dark:bg-green-900/30 px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-green-700 dark:text-green-300 font-semibold">دسته‌بندی محصولات</span>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            دسته‌بندی 
            <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent"> تجهیزات</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            تجهیزات مورد نیاز خود را از دسته‌بندی‌های مختلف انتخاب کنید
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={category.href}
                className="group block"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 text-center mb-6">
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-3xl">{category.icon}</span>
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.count} محصول
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    initial={{ scaleX: 0 }}
                  ></motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/categories"
              className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>مشاهده همه دسته‌بندی‌ها</span>
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}