'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { HeartIcon, ShoppingCartIcon, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import axios from 'axios'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])
  const { addToCart } = useCart()
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    fetchProducts()
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products?featured=true&limit=3')
      setProducts(response.data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([
        {
          _id: '1',
          name: 'چادر کوهنوردی ۴ نفره',
          price: 1299000,
          originalPrice: 1599000,
          discount: 19,
          category: { name: 'چادر' },
          brand: 'Coleman',
          rating: { average: 4.8, count: 124 },
          images: [{ url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg' }]
        },
        {
          _id: '2',
          name: 'کوله پشتی ۶۰ لیتری',
          price: 899000,
          originalPrice: 1099000,
          discount: 18,
          category: { name: 'کوله پشتی' },
          brand: 'Deuter',
          rating: { average: 4.6, count: 89 },
          images: [{ url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg' }]
        },
        {
          _id: '3',
          name: 'کیسه خواب زمستانی',
          price: 649000,
          originalPrice: 799000,
          discount: 19,
          category: { name: 'کیسه خواب' },
          brand: 'North Face',
          rating: { average: 4.7, count: 156 },
          images: [{ url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg' }]
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId]
    
    setWishlist(newWishlist)
    localStorage.setItem('wishlist', JSON.stringify(newWishlist))
  }

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-6 animate-pulse">
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
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
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 dark:bg-orange-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-200 dark:bg-red-800 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center bg-orange-100 dark:bg-orange-900/30 px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-orange-700 dark:text-orange-300 font-semibold">محصولات ویژه</span>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            محصولات 
            <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent"> تخفیف‌دار</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            بهترین تجهیزات کمپینگ با تخفیف‌های ویژه
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center">
                    <div className="text-6xl opacity-50">
                      {product.category?.name === 'چادر' && '🏕️'}
                      {product.category?.name === 'کوله پشتی' && '🎒'}
                      {product.category?.name === 'کیسه خواب' && '🛏️'}
                    </div>
                  </div>
                  
                  {/* Discount Badge */}
                  {product.discount && (
                    <motion.div 
                      className="absolute top-4 left-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    >
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {product.discount}٪ تخفیف
                      </span>
                    </motion.div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4 space-x-reverse">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleWishlist(product._id)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                    >
                      {wishlist.includes(product._id) ? (
                        <HeartSolidIcon className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartIcon className="w-6 h-6" />
                      )}
                    </motion.button>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={`/products/${product.slug || product._id}`}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors shadow-lg"
                      >
                        <EyeIcon className="w-6 h-6" />
                      </Link>
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors shadow-lg"
                    >
                      <ShoppingCartIcon className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
                      {product.category?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {product.price?.toLocaleString()} تومان
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Products */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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