'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Menu,
  LogOut,
  Home,
  UserCheck,
  Users,
  CreditCard,
  BarChart3,
  FileText,
  Image,
  Award,
  Users as UsersIcon,
  Building,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/admin/dashboard' },
  { name: 'Attendance', icon: UserCheck, href: '/admin/attendance' },
  { name: 'Members', icon: Users, href: '/admin/members' },
  { name: 'Fees', icon: CreditCard, href: '/admin/fees' },
  { name: 'Reports', icon: BarChart3, href: '/admin/reports' },
  { name: 'divider1', type: 'divider' },
  { name: 'Content Management', type: 'header' },
  { name: 'Testimonials', icon: FileText, href: '/admin/testimonials' },
  { name: 'Partners & Logos', icon: Building, href: '/admin/partners' },
  { name: 'Membership Plans', icon: Award, href: '/admin/plans' },
  { name: 'Gallery', icon: Image, href: '/admin/gallery' },
  { name: 'Trainers', icon: UsersIcon, href: '/admin/trainers' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' }
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    // Redirect to the public root page after logout
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-lg h-14 sm:h-16">
        <div className="flex items-center justify-between px-3 sm:px-6 h-full">
          <div className="flex items-center min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-blue-600 mr-2"
            >
              <Menu className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-2 rounded-md text-white hover:bg-blue-600 mr-2"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" /> : <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />}
            </button>
            <Link href="/admin/dashboard" className="text-sm sm:text-xl font-bold truncate">
              Vitalize Fitness Admin
            </Link>
          </div>
          <div className="flex items-center flex-shrink-0 ml-2">
            <button
              onClick={handleLogout}
              className="flex items-center px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-white text-primary border border-white rounded-md hover:bg-gray-50 whitespace-nowrap"
            >
              <LogOut className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-14 sm:pt-16">
        {/* Sidebar */}
        <aside className={`fixed lg:fixed top-14 sm:top-16 bottom-0 left-0 z-40 bg-white shadow-lg transform transition-all duration-300 ease-in-out overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          sidebarCollapsed ? 'lg:w-16' : 'lg:w-56'
        } w-56`}>
          <nav className="py-3 sm:py-4">
            <div className="px-2 sm:px-3 space-y-0.5 sm:space-y-1">
              {menuItems.map((item) => {
                if (item.type === 'divider') {
                  return <div key={item.name} className="border-t border-gray-200 mx-2 sm:mx-3 my-2 sm:my-3"></div>
                }
                if (item.type === 'header') {
                  return (
                    <div key={item.name} className={`px-2 sm:px-3 py-2 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {item.name}
                      </h3>
                    </div>
                  )
                }
                if (item.href) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-2 sm:px-3 py-2 sm:py-3 rounded-lg text-sm transition-colors ${
                        pathname === item.href
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                      } ${sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''}`}
                      title={sidebarCollapsed ? item.name : undefined}
                    >
                      <item.icon className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
                      <span className={`ml-2 sm:ml-3 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>{item.name}</span>
                    </Link>
                  )
                }
                return null
              })}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className={`flex-1 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-56'
        }`}>
          {/* Breadcrumbs */}
          <nav className="bg-white px-3 sm:px-6 py-2 sm:py-3 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
              <Link href="/admin/dashboard" className="hover:text-primary whitespace-nowrap">Dashboard</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium capitalize whitespace-nowrap">
                {pathname.split('/').pop()?.replace('-', ' ')}
              </span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="bg-white px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize truncate">
              {pathname.split('/').pop()?.replace('-', ' ')}
            </h1>
          </div>

          {/* Page content */}
          <div className="p-3 sm:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}