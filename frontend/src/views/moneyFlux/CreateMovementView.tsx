import { Link } from "react-router-dom";

export default function CreateMovementView() {
    return (
        <>
            <h1 className="text-5xl font-black">Crear Movimiento</h1>
            <p className="tect-2xl font-light text-gray-500 mt-5">Llena el formulario para crear un nuevo movimiento</p>
            <nav className="my-5">
                <Link 
                    to="/movements"
                    className="bg-gray-400 hover:bg-gray-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                >
                    Volver a Mis Movimientos
                </Link>
            </nav>
            
            <div className="flex-1 p-8">
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 max-w-2xl mx-auto">
                    <form className="space-y-5">
                        <div className="flex flex-col gap-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Movimiento
                            </label>
                            <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            >
                                <option>--- Seleccionar ---</option>
                                <option value="ingreso">Ingreso</option>
                                <option value="gasto">Gasto</option>
                                <option value="deposito">Depósito</option>
                                <option value="transferencia">Transferencia</option>
                            </select>
                            <label className="block text-sm font-medium text-gray-700 my-1 ">
                            TAG
                            </label>
                            <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            >
                                <option>--- Seleccionar ---</option>
                                <option value="ingreso">Trabajo</option>
                                <option value="gasto">Gasto de trabajo</option>
                                <option value="deposito">Gasto osvaldo</option>
                                <option value="transferencia">Propinas</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                
                                className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                Fecha
                                </label>
                                <input
                                type="date"
                                value="2025-11-13"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                />
                            </div>
                            <div>
                                <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                Monto ($)
                                </label>
                                <input
                                type="number"
                                placeholder="Ej: 50.00"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                Cuenta Ingreso
                                </label>
                                <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                >
                                    <option value="">-- Seleccionar --</option>
                                    <option value="principal">Cuenta Principal</option>
                                    <option value="ahorro">Cuenta de Ahorro</option>
                                </select>
                            </div>

                            <div>
                                <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                Cuenta Egreso
                                </label>
                                <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                >
                                    <option value="">-- Seleccionar --</option>
                                    <option value="principal">Cuenta Principal</option>
                                    <option value="inversiones">Inversiones</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            >
                            Descripción
                            </label>
                            <textarea
                            placeholder="Detalles del movimiento (Ej: Pago de renta, Venta freelance)."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                            Registrar Movimiento
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}