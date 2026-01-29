import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Menu, X, LogOut, User, Settings2 } from "lucide-react"
import { RxDashboard } from "react-icons/rx"
import { HiOutlineArrowsUpDown } from "react-icons/hi2"
import { SiSimpleanalytics } from "react-icons/si"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const navigation = [
    { name: 'Dashboard', href: '/', icon: RxDashboard },
    { name: 'Movimientos', href: '/movements', icon: HiOutlineArrowsUpDown },
    { name: 'Analítico', href: '/analytics', icon: SiSimpleanalytics },
    { name: 'Configuración', href: '/settings', icon: Settings2 }
]

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-obsidian shadow-md">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-sage hover:bg-clay-gray hover:text-linen-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-linen-light"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <span className="sr-only">Abrir menú</span>
                            {sidebarOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>

                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <div className="text-linen-light text-xl sm:text-2xl font-bold">
                                💰 MonkFlow
                            </div>
                        </Link>

                        {/* User menu */}
                        <div className="flex items-center gap-3">
                            <button className="hidden sm:flex items-center gap-2 rounded-lg border border-clay-gray bg-obsidian px-3 py-2 text-sm font-medium nth-2:text-linen-light nth-1:text-sage nth-1:hover:text-linen-light hover:bg-clay-gray transition-colors">
                                <User className="h-4 w-4 " />
                                <span className="hidden md:inline">Mi cuenta</span>
                            </button>
                            <button className="rounded-lg bg-obsidian p-2 text-sage border border-clay-gray hover:border-ritual-red hover:text-linen-light hover:bg-ritual-red transition-colors">
                                <LogOut className="h-5 w-5" />
                                <span className="sr-only">Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex h-[calc(100vh-4rem)]">
                {/* Sidebar Desktop */}
                <aside className="hidden lg:flex shrink-0">
                    <div className="flex w-64 flex-col bg-sage">
                        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                            {/* Navigation */}
                            <nav className="flex-1 space-y-1 px-3">
                                {navigation.map((item) => {
                                    const Icon = item.icon
                                    const active = isActive(item.href)
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`
                                                group flex items-center rounded-lg px-3 py-2.5 text-md font-medium transition-colors
                                                ${active
                                                    ? 'bg-green-balance text-linen-light'
                                                    : 'text-obsidian hover:bg-linen-light'
                                                }
                                            `}
                                        >
                                            <Icon
                                                className={`mr-3 h-5 w-5 shrink-0 ${
                                                    active ? 'text-linen-light font-black' : 'text-obsidian'
                                                }`}
                                            />
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </nav>
                            {/* Sidebar Footer */}
                            <div className="flex shrink-0 border-t border-green-balance p-4">
                                <button className="group flex w-full items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-linen-light flex items-center justify-center">
                                            <User className="h-5 w-5 text-obsidian" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-obsidian">Usuario</p>
                                            <p className="text-xs text-obsidian">Ver perfil</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* Sidebar Mobile */}
                {sidebarOpen && (
                    <div className="lg:hidden">
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 z-40 bg-obsidian opacity-20"
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Sidebar panel */}
                        <div className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sage">
                            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                                {/* Close button */}
                                <div className="flex items-center justify-between px-4 mb-4">
                                    <span className="text-lg font-bold text-obsidian">Menú</span>
                                    <button
                                        type="button"
                                        className="rounded-md text-obsidian hover:text-linen-light"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                                {/* Navigation */}
                                <nav className="flex-1 space-y-1 px-3">
                                    {navigation.map((item) => {
                                        const Icon = item.icon
                                        const active = isActive(item.href)
                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`
                                                    group flex items-center rounded-lg px-3 py-2.5 text-md font-medium transition-colors
                                                    ${active
                                                        ? 'bg-green-balance text-linen-light'
                                                        : 'text-obsidian hover:bg-linen-light'
                                                    }
                                                `}
                                            >
                                                <Icon
                                                    className={`mr-3 h-5 w-5 shrink-0 ${
                                                        active ? 'text-linen-light' : 'text-obsidian'
                                                    }`}
                                                />
                                                {item.name}
                                            </Link>
                                        )
                                    })}
                                </nav>
                                {/* User section (mobile) */}
                                <div className="flex shrink-0 border-t border-linen-light p-4">
                                    <button className="group flex w-full items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-linen-light flex items-center justify-center">
                                            <User className="h-5 w-5 text-obsidian" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-obsidian">Mi cuenta</p>
                                            <p className="text-xs text-obsidian">Ver perfil</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-linen-light">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Footer (visible just on desktop) */}
            <footer className="hidden lg:block border-t border-clay-gray bg-linen-light">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-obsidian">
                        © {new Date().getFullYear()} MonkFlow. Todos los derechos reservados.
                    </p>
                </div>
            </footer>

            {/* Toast notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </div>
    )
}