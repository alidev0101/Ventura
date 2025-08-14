'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'

export default function BrandShowcase() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const brands = [
    { name: 'Jack Wolfskin', logo: 'JW', color: 'from-blue-500 to-blue-600' },
    { name: 'Coleman', logo: 'CO', color: 'from-red-500 to-red-600' },
    { name: 'The North Face', logo: 'TNF', color: 'from-gray-700 to-gray-800' },
    { name: 'Patagonia', logo: 'PAT', color: 'from-green-500 to-green-600' },
    { name: 'Mammut', logo: 'MAM', color: 'from-orange-500 to-orange-600' },
    { name: 'Salomon', logo: 'SAL', color: 'from-purple-500 to-purple-600' },
    { name: 'Deuter', logo: 'DEU', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Osprey', logo: 'OSP', color: 'from-teal-500 to-teal-600' }
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
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-800 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Jack Wolfskin Featured Section */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-8">
                <motion.div 
                  className="flex items-center space-x-4 space-x-reverse"
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">JW</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      کوله‌های پشتی سری
                    </h3>
                    <p className="text-orange-600 dark:text-orange-400 font-bold text-lg">JACK WOLFSKIN</p>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  کوله‌های پشتی جک ولف‌اسکین با کیفیت بالا و طراحی ارگونومیک، 
                  همراه ایده‌آل شما در تمام ماجراجویی‌ها
                </motion.p>

                <motion.div 
                  className="grid grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  {[
                    { number: '۲۰+', label: 'مدل متنوع' },
                    { number: '۵ سال', label: 'گارانتی' },
                    { number: '۴.۸', label: 'امتیاز کاربران' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    مشاهده محصولات
                  </Button>
                </motion.div>
              </div>

              {/* Visual */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-800/50 dark:to-orange-700/50 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                  {/* Animated Backpack */}
                  <motion.div
                    animate={{ 
                      y: [-10, 10, -10],
                      rotate: [-2, 2, -2]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg width="200" height="280" viewBox="0 0 200 280" className="drop-shadow-2xl">
                      <defs>
                        <linearGradient id="backpackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F97316" />
                          <stop offset="100%" stopColor="#EA580C" />
                        </linearGradient>
                      </defs>
                      {/* Main Body */}
                      <rect x="40" y="80" width="120" height="160" rx="25" fill="url(#backpackGradient)" stroke="#C2410C" strokeWidth="3" />
                      
                      {/* Top Flap */}
                      <rect x="50" y="60" width="100" height="50" rx="20" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
                      
                      {/* Side Pockets */}
                      <ellipse cx="25" cy="140" rx="18" ry="35" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
                      <ellipse cx="175" cy="140" rx="18" ry="35" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
                      
                      {/* Straps */}
                      <rect x="65" y="250" width="15" height="25" rx="7" fill="#8B4513" />
                      <rect x="120" y="250" width="15" height="25" rx="7" fill="#8B4513" />
                      
                      {/* Details */}
                      <circle cx="100" cy="120" r="10" fill="#FFF" stroke="#C2410C" strokeWidth="2" />
                      <rect x="75" y="150" width="50" height="6" rx="3" fill="#C2410C" />
                      <rect x="80" y="170" width="40" height="6" rx="3" fill="#C2410C" />
                      
                      {/* Logo */}
                      <text x="100" y="210" textAnchor="middle" className="fill-white font-bold text-lg">JW</text>
                    </svg>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div 
                    className="absolute top-8 right-8 w-12 h-12 bg-orange-400 rounded-full opacity-60 blur-sm"
                    animate={{ y: [-5, 5, -5], x: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                  <motion.div 
                    className="absolute bottom-8 left-8 w-8 h-8 bg-orange-300 rounded-full opacity-40 blur-sm"
                    animate={{ y: [5, -5, 5], x: [2, -2, 2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* All Brands Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            برندهای 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> معتبر</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            با بهترین برندهای دنیا همراه باشید
          </p>
        </motion.div>

        {/* Brands Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${brand.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <span className="text-white font-bold text-lg">{brand.logo}</span>
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {brand.name}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}