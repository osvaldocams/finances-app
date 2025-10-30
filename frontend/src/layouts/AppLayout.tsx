import { Outlet } from "react-router-dom"
import { RxDashboard } from "react-icons/rx"
import { HiOutlineArrowsUpDown } from "react-icons/hi2"
import { MdDeliveryDining } from "react-icons/md"
import { FaHandHoldingHeart } from "react-icons/fa6"
import { SiSimpleanalytics } from "react-icons/si"

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
                                {/* <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg> */}
                                Flujo de dinero
                            </a>
                            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                                <MdDeliveryDining  className="w-5 h-5 mr-3"/>
                                {/* <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12h-8l-2 8-2-8H3"></path></svg> */}
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
            </div>
                
            {/* <footer class="mt-10 pt-4 border-t border-gray-300 text-center text-sm text-gray-500">
            Todos los derechos reservados © {{ currentYear }}
            </footer> */}
        </>
    )
}
{/* <div class="flex h-screen bg-gray-50 text-gray-800">
    <aside class="w-64 bg-gray-200 p-4 flex flex-col space-y-4">
        <div class="p-3 bg-gray-300 rounded-lg text-center font-semibold text-lg hover:bg-gray-300 cursor-pointer">
            Logo
        </div>
        <nav class="space-y-1">
            <a href="#" class="flex items-center p-3 rounded-lg bg-gray-300 text-gray-800 font-medium transition duration-150">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            Dashboard
            </a>

            <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                Flujo de dinero
            </a>
            <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12h-8l-2 8-2-8H3"></path></svg>
                Ingresos de trabajo
            </a>
            <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2-3 .895-3 2m-6 0h.01M18 10h.01M12 21.6l-6-3.75V8.15l6-3.75 6 3.75v9.7l-6 3.75z"></path></svg>
                Propinas
            </a>
            <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-300 transition duration-150">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.07C7.39 4.07 3.5 7.96 3.5 12.55s3.89 8.48 8.49 8.48 8.49-3.89 8.49-8.48S16.61 4.07 12 4.07zM12 7.07v5.48l3.12 1.87"></path></svg>
                Analítico de trabajo
            </a>
        </nav>
    </aside> */}

    {/* <main class="flex-1 p-8 overflow-y-auto">

        <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-normal">Octubre 2025</h2>
            <div class="text-2xl font-bold">
                Saldo: <span class="text-black">$2,200</span>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-6 mb-8">
        
            <div class="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                <p class="text-lg font-normal mb-1">Ingresos</p>
                <p class="text-3xl font-semibold text-gray-800">$3,200</p>
            </div>

            <div class="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                <p class="text-lg font-normal mb-1">Gastos</p>
                <p class="text-3xl font-semibold text-gray-800">$1,000</p>
            </div>

            <div class="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                <p class="text-lg font-normal mb-1">Ahorro</p>
                <p class="text-3xl font-semibold text-gray-800">$1,200</p>
            </div>
        </div>

    <div class="grid grid-cols-2 gap-8">
        <div class="space-y-6">
            <h3 class="text-xl font-normal">Registro de movimientos</h3>

            <div class="space-y-2">
                <label class="block text-sm font-medium">Fecha</label>
                <input type="date" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            </div>
        
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label class="block text-sm font-medium">Tipo</label>
                    <select class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option>-- Seleccionar --</option>
                        <option>Ingreso</option>
                        <option>Gasto</option>
                    </select>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium">Monto</label>
                    <input type="number" placeholder="0.00" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                </div>            
            </div>

            <div class="space-y-2">
                <label class="block text-sm font-medium">Etiqueta</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            </div>

            <div class="border-t border-gray-300 pt-4">
                <p class="text-sm text-gray-500">Fecha</p>
                <p class="text-sm text-gray-500">Monto</p>
            </div>
        </div>
    
        <div>
            <h3 class="text-xl font-normal mb-3">Movimientos</h3>
        
            <div class="grid grid-cols-2 text-sm font-medium border-b border-gray-300 pb-2">
                <span>Fecha</span>
                <span class="text-right">Monto</span>
            </div>

            <div class="space-y-3 pt-3">
                <div class="h-8 border border-gray-300 rounded-md"></div>
                <div class="h-8 border border-gray-300 rounded-md"></div>
                <div class="h-8 border border-gray-300 rounded-md"></div>
                <div class="h-8 border border-gray-300 rounded-md"></div>
                <div class="h-8 border border-gray-300 rounded-md"></div>
                <div class="h-8 border border-gray-300 rounded-md"></div>
            </div>
        </div>
    </div>

    </main> 
</div>*/}
