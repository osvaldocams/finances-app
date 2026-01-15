import { Link } from "react-router-dom"
import { MOVEMENT_TYPES, type MovementType } from "../../constants/movementTypes"
import { formatCurrency } from "../../helpers/formatCurrency"
import { formatDate } from "../../helpers/formatDate"
import type { MovementList } from "../../types"

type MovementListProps = {
    movements: MovementList
}

export default function MovementsList({movements}: MovementListProps) {
    return (
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-normal mb-4 text-gray-800">Movimientos Recientes</h3>

            <div className="grid grid-cols-[0.7fr_0.7fr_0.8fr_0.8fr_0.7fr] text-sm font-semibold text-gray-500 border-b border-gray-300 pb-2 mb-2">
                <span>Fecha</span>
                <span>Tipo</span>
                <span>Descripción</span>
                <span className="text-right">Monto</span>
                <span className="text-center">Detalle</span>
            </div>

            <div className="space-y-3">
                {movements.map(movement => (
                    <div key={movement._id} 
                        className="grid grid-cols-[0.7fr_0.7fr_0.8fr_0.8fr_0.7fr] items-center text-sm border-b border-gray-100 pb-2">
                            <span className="text-gray-600">{formatDate(new Date(movement.date)) }</span>
                            <span className={MOVEMENT_TYPES[movement.type as MovementType].color}>{MOVEMENT_TYPES[movement.type as MovementType].label}</span>
                            <span className="text-gray-800 truncate">{movement.description}</span>
                            <span className="text-red-600 font-semibold text-right">{formatCurrency(movement.amount) }</span>
                            <Link
                                to={'/movements'}
                                className="text-center text-blue-600 hover:text-blue-800 text-xs font-medium">
                                Ver
                            </Link>
                    </div>
                ))}
            </div> 
            <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition duration-150">
                Ver historial completo &rarr;
                </button>
            </div>
        </div>
    )
}