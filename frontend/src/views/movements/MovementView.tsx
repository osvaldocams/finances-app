import { useQuery } from "@tanstack/react-query"
import MovementsList from "../../components/movements/MovementsList";
import { getMovements } from "../../api/MovementApi";
import PageHeader from "../../components/ui/PageHeader";

export default function MovementView() {
	const { data, isLoading, error} = useQuery({
		queryKey: ['movements'],
		queryFn: getMovements,
		select: (movements) => [...movements].sort((a, b) => //FIXME:ordenar en movementController
        new Date(b.date).getTime() - new Date(a.date).getTime()),
		retry: false
	})
	if(isLoading)return <p>Cargando...</p>
	if(error)return <p>Error fetching data</p>
	if(!data) return null
    return (
        <>
            <PageHeader
                title="Mis Movimientos"
                description="Crea y Administra tus Movimientos"
                backTo="/movements/create"
                backLabel="Crear Movimiento"
            />
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