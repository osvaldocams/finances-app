import { Link } from "react-router-dom";

export default function MovementView() {
    return (
        <>
            <h1 className="text-5xl font-black">Mis Movimientos</h1>
            <p className="tect-2xl font-light text-gray-500 mt-5">Crea y Administra tus Movimientos</p>
            <nav className="my-5">
                <Link 
                    to="/movements/create"
                    className="bg-gray-400 hover:bg-gray-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                >
                    Nuevo Movimiento
                </Link>
            </nav>
            
			<div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
				<h3 className="text-xl font-normal mb-4 text-gray-800">Movimientos Recientes</h3>

				<div className="grid grid-cols-[0.7fr_0.7fr_1fr_0.8fr_0.8fr_1fr_0.8fr] text-sm font-semibold text-gray-500 border-b border-gray-300 pb-2 mb-2">
					<span>Fecha</span>
					<span>Tipo</span>
					<span>Descripción</span>
					<span>Tag</span>
					<span className="text-center">Origen</span>
					<span className="text-right">Monto</span>
					<span className="text-center">Detalle</span>
				</div>

				<div className="space-y-3">

					<div className="grid grid-cols-[0.7fr_0.7fr_1fr_0.8fr_0.8fr_1fr_0.8fr] items-center text-sm border-b border-gray-100 pb-2">
						<span className="text-gray-600">13 Nov</span>
						<span className="text-red-600 font-medium">Gasto</span>
						<span className="text-gray-800 truncate">Suscripción SaaS</span>
						<span className="text-gray-500 font-normal">Servicios</span>
						<span className="text-center text-gray-600">Principal</span>
						<span className="text-red-600 font-semibold text-right">-$15.99</span>
						<span className="text-center">
							<a href="/movimiento/123" className="text-blue-600 hover:text-blue-800 text-xs font-medium">Ver</a>
						</span>
					</div>

					<div className="grid grid-cols-[0.7fr_0.7fr_1fr_0.8fr_0.8fr_1fr_0.8fr] items-center text-sm border-b border-gray-100 pb-2">
						<span className="text-gray-600">12 Nov</span>
						<span className="text-green-600 font-medium">Ingreso</span>
						<span className="text-gray-800 truncate">Pago Cliente Freelance</span>
						<span className="text-gray-500 font-normal">Trabajo</span>
						<span className="text-center text-gray-400">-</span>
						<span className="text-green-600 font-semibold text-right">+$500.00</span>
						<span className="text-center">
							<a href="/movimiento/124" className="text-blue-600 hover:text-blue-800 text-xs font-medium">Ver</a>
						</span>
					</div>

					<div className="grid grid-cols-[0.7fr_0.7fr_1fr_0.8fr_0.8fr_1fr_0.8fr] items-center text-sm border-b border-gray-100 pb-2">
						<span className="text-gray-600">10 Nov</span>
						<span className="text-blue-600 font-medium">Transf.</span>
						<span className="text-gray-800 truncate">Ahorro para Viaje</span>
						<span className="text-gray-500 font-normal">Ahorro</span>
						<span className="text-center text-gray-600">Principal &rarr; Ahorro</span>
						<span className="text-blue-600 font-semibold text-right">-$200.00</span> 
						<span className="text-center">
							<a href="/movimiento/125" className="text-blue-600 hover:text-blue-800 text-xs font-medium">Ver</a>
						</span>
					</div>

					<div className="grid grid-cols-[0.7fr_0.7fr_1fr_0.8fr_0.8fr_1fr_0.8fr] items-center text-sm border-b border-gray-100 pb-2">
						<span className="text-gray-600">08 Nov</span>
						<span className="text-gray-800 font-medium">Depósito</span>
						<span className="text-gray-800 truncate">Depósito Cajero Automático</span>
						<span className="text-gray-500 font-normal">Efectivo</span>
						<span className="text-center text-gray-400">-</span>
						<span className="text-green-600 font-semibold text-right">+$350.00</span>
						<span className="text-center">
							<a href="/movimiento/126" className="text-blue-600 hover:text-blue-800 text-xs font-medium">Ver</a>
						</span>
					</div>
				</div>

				<div className="mt-4 text-center">
					<button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition duration-150">
					Ver historial completo &rarr;
					</button>
				</div>
			</div>
        </>
    )
}