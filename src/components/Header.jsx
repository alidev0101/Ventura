'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  UserIcon, 
  SunIcon, 
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  BellIcon
} from '@heroicons/react/24/outline'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'خانه', href: '/' },
    { name: 'محصولات', href: '/products' },
    { name: 'دسته‌بندی‌ها', href: '/categories' },
    { name: 'وبلاگ', href: '/blog' },
    { name: 'درباره ما', href: '/about' },
    { name: 'تماس با ما', href: '/contact' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="flex items-center">
                🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان
              </span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/track-order" className="hover:text-green-200 transition-colors">
                پیگیری سفارش
              </Link>
              <span>|</span>
              <Link href="/help" className="hover:text-green-200 transition-colors">
                راهنما
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 space-x-reverse group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ونتورا
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">تجهیزات کمپینگ</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors group py-2"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="relative hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                {theme === 'light' ? (
                  <MoonIcon className="w-5 h-5" />
                ) : (
                  <SunIcon className="w-5 h-5" />
                )}
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <BellIcon className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <Link href="/wishlist">
                  <HeartIcon className="w-5 h-5" />
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <Link href="/cart">
                  <ShoppingCartIcon className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-bounce">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </Button>

              {/* User Menu */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  {user ? (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                        {user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <UserIcon className="w-5 h-5" />
                  )}
                </Button>
                
                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {user ? (
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                      <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <UserIcon className="w-4 h-4 ml-3" />
                        پنل کاربری
                      </Link>
                      <Link href="/orders" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <ShoppingCartIcon className="w-4 h-4 ml-3" />
                        سفارش‌های من
                      </Link>
                      <Link href="/wishlist" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <HeartIcon className="w-4 h-4 ml-3" />
                        علاقه‌مندی‌ها
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <span className="w-4 h-4 ml-3">⚙️</span>
                          پنل مدیریت
                        </Link>
                      )}
                      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="w-4 h-4 ml-3">🚪</span>
                        خروج
                      </button>
                    </div>
                  ) : (
                    <div className="py-2">
                      <Link href="/login" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <span className="w-4 h-4 ml-3">🔑</span>
                        ورود
                      </Link>
                      <Link href="/register" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <span className="w-4 h-4 ml-3">📝</span>
                        ثبت نام
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-5 h-5" />
                ) : (
                  <Bars3Icon className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">جستجو در محصولات و وبلاگ</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <XMarkIcon className="w-5 h-5" />
              </Button>
            </div>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="نام محصول، برند، دسته‌بندی یا مقاله را جستجو کنید..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  autoFocus
                />
                <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600">
                جستجو
              </Button>
            </form>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">جستجوهای پرطرفدار:</p>
              <div className="flex flex-wrap gap-2">
                {['چادر', 'کوله پشتی', 'کیسه خواب', 'چراغ قوه', 'راهنمای کمپینگ'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term)
                      handleSearch({ preventDefault: () => {} })
                    }}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 text-sm rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}