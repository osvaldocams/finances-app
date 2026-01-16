
import { Tag, Edit2, Trash2, Plus, Calendar, ArrowRightLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MovementDetailView() {
    return (
        <>
        <h1 className="text-5xl font-black">Detalle del Movimiento</h1>
        <p className="tect-2xl font-light text-gray-500 mt-5">Revisa el detalle de tu movimiento</p>
        <nav className="my-5">
            <Link 
                to="/movements/create"
                className="bg-gray-400 hover:bg-gray-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
            >
                Volver a Mis Movimientos
            </Link>
        </nav>
        <div className="mt-5 max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-slate-100">
            {/* 1. Header: Tipo y Monto */}
            <div className="bg-slate-50 p-6 text-center border-b border-slate-100">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-green-100 text-green-700 mb-2">
                    Ingreso
                </span>
                <h2 className="text-3xl font-bold text-slate-800">$1,250.00</h2>
                <p className="text-slate-500 text-sm mt-1 italic">"Pago de freelance proyecto web"</p>
            </div>
            <div className="p-6 space-y-6">
                {/* 2. Detalles Principales */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Fecha</p>
                            <p className="text-sm text-slate-700 font-medium">15 Ene, 2026</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ArrowRightLeft className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Cuentas</p>
                            <p className="text-sm text-slate-700 font-medium">BBVA → Ahorros</p>
                        </div>
                    </div>
                </div>
                <hr className="border-slate-100" />
                {/* 3. Sección de Tags (Lo complicado) */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-slate-700">
                            <Tag className="w-4 h-4" />
                            <span className="font-semibold text-sm">Etiquetas</span>
                        </div>
                        {/* Botón Nuevo Tag */}
                        <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition">
                            <Plus className="w-3 h-3" />
                            Añadir
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {/* Tag Item */}
                        {['Trabajo', 'Efectivo', 'Extra'].map((tag) => (
                            <div key={tag} className="group flex items-center gap-2 bg-slate-100 text-slate-600 pl-3 pr-1 py-1 rounded-full text-xs border border-slate-200">
                                <span>{tag}</span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:text-blue-600 bg-white rounded-full shadow-sm border border-slate-200">
                                        <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button className="p-1 hover:text-red-600 bg-white rounded-full shadow-sm border border-slate-200">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}    
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}    