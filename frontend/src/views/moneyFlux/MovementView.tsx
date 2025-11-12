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
        </>
    )
}
