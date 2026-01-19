import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import MovementsList from "../../components/movements/MovementsList";
import { getMovements } from "../../api/MovementApi";

export default function MovementView() {
	const { data, isLoading, error} = useQuery({
		queryKey: ['movements'],
		queryFn: getMovements,
		retry: false
	})
	if(isLoading)return <p>Cargando...</p>
	if(error)return <p>Error fetching data</p>
	if(!data) return null
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
			{data.length ? (
				<MovementsList
					movements={data}
				/>
			): (
				<p className="text-gray-500">No hay movimientos registrados aun</p>
			)
			}
        </>
    )
}