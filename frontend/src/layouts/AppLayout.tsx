import { Outlet } from "react-router-dom"
import { RxDashboard } from "react-icons/rx"
import { HiOutlineArrowsUpDown } from "react-icons/hi2"
import { MdDeliveryDining } from "react-icons/md"
import { FaHandHoldingHeart } from "react-icons/fa6"
import { SiSimpleanalytics } from "react-icons/si"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function AppLayout() {
    return (
        <>
            <div className="grid h-screen grid-rows-[auto_1fr_auto]">
                <header className="bg-gray-800 p-5">
                    <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                        <div className="w-64 text-white text-2xl font-bold">
                            Logo
                        </div>
                    </div>
                </header>
                
                <div className="flex bg-gray-50 text-gray-800">
                    <aside className="w-64 bg-gray-200 p-4 flex flex-col space-y-4"> 
                        <div className="p-3 bg-gray-300 rounded-lg text-center font-semibold text-lg hover:bg-gray-300 cursor-pointer">
                            Logo
                        </div>
                        <nav className="space-y-1">
                            <a 
                                href="#" 
                                className="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                                    <RxDashboard className="w-5 h-5 mr-3"/>
                                    Dashboard
                            </a>
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                                <HiOutlineArrowsUpDown className="w-5 h-5 mr-3"/>
                                Flujo de dinero
                            </a>
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                                <MdDeliveryDining  className="w-5 h-5 mr-3"/>
                                Ingresos de trabajo
                            </a>
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                                <FaHandHoldingHeart className="w-5 h-5 mr-3"/>
                                Propinas
                            </a>
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                                <SiSimpleanalytics  className="w-5 h-5 mr-3"/>
                                Analítico de trabajo
                            </a>
                        </nav>
                    </aside>
                    <main className="flex-1 p-8 flex flex-col overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
                <footer className="py-5">
                    <p className="text-center">Todos los derechos reservados {new Date().getFullYear()} </p>
                </footer>
                <ToastContainer 
                    pauseOnHover={false}
                    pauseOnFocusLoss={false}
                />
            </div>
        </>
    )
}
