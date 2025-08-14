'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setEmail('')
      setIsLoading(false)
      setTimeout(() => setIsSubscribed(false), 5000)
    }, 2000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <EnvelopeIcon className="w-5 h-5 text-white ml-2" />
              <span className="text-white font-semibold">خبرنامه ونتورا</span>
            </motion.div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              از آخرین اخبار و 
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"> تخفیف‌ها </span>
              باخبر شوید
            </h2>
            <p className="text-xl text-green-100 leading-relaxed">
              عضو خبرنامه ونتورا شوید و از جدیدترین محصولات و پیشنهادات ویژه مطلع باشید
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div 
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isSubscribed ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckIcon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">عضویت موفق!</h3>
                <p className="text-green-100">با موفقیت عضو خبرنامه شدید</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل خود را وارد کنید"
                    className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'عضویت'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Features */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 md:space-x-reverse text-green-100"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: '🚫', text: 'بدون اسپم' },
              { icon: '🎯', text: 'محتوای هدفمند' },
              { icon: '💰', text: 'تخفیف‌های ویژه' },
              { icon: '🔓', text: 'لغو عضویت آسان' }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center space-x-3 space-x-reverse"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}