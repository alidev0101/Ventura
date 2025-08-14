'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

export default function PopularProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products?popular=true&limit=4')
      setProducts(response.data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([
        {
          _id: '4',
          name: 'دوربین شکاری ۸x۲۵',
          price: 459000,
          originalPrice: 529000,
          category: { name: 'تجهیزات نظارتی' },
          rating: { average: 4.5, count: 67 }
        },
        {
          _id: '5',
          name: 'عینک آفتابی کوهنوردی',
          price: 189000,
          originalPrice: 229000,
          category: { name: 'لوازم جانبی' },
          rating: { average: 4.3, count: 43 }
        },
        {
          _id: '6',
          name: 'کیسه خواب تابستانی',
          price: 329000,
          originalPrice: 399000,
          category: { name: 'کیسه خواب' },
          rating: { average: 4.6, count: 89 }
        },
        {
          _id: '7',
          name: 'چراغ قوه LED قابل شارژ',
          price: 149000,
          originalPrice: 179000,
          category: { name: 'روشنایی' },
          rating: { average: 4.7, count: 156 }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          ref={ref}
          className="flex items-center justify-between mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.div 
              className="inline-flex items-center bg-purple-100 dark:bg-purple-900/30 px-6 py-3 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-purple-700 dark:text-purple-300 font-semibold">محصولات پرفروش</span>
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              محبوب‌ترین 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> محصولات</span>
            </h2>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Link
              href="/products"
              className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>مشاهده همه</span>
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

        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                    <div className="text-4xl opacity-50">
                      {product.category?.name === 'تجهیزات نظارتی' && '🔭'}
                      {product.category?.name === 'لوازم جانبی' && '🕶️'}
                      {product.category?.name === 'کیسه خواب' && '🛏️'}
                      {product.category?.name === 'روشنایی' && '🔦'}
                    </div>
                  </div>
                  
                  {/* Quick Add to Cart */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart({
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.images?.[0]?.url
                      })}
                      className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-purple-500 hover:text-white transition-colors shadow-lg flex items-center space-x-2 space-x-reverse"
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                      <span>افزودن به سبد</span>
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                      {product.category?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    <Link href={`/products/${product.slug || product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 space-x-reverse mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating?.average || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({product.rating?.count || 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {product.price?.toLocaleString()} تومان
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 md:hidden"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>مشاهده همه محصولات</span>
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