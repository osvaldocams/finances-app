import { Link } from "react-router-dom"
import { Calendar, Eye } from "lucide-react"
import { MOVEMENT_TYPES, type MovementType } from "../../constants/movementTypes"
import { formatCurrency } from "../../helpers/formatCurrency"
import { formatDate } from "../../helpers/formatDate"
import type { MovementList } from "../../types"

type MovementListProps = {
    movements: MovementList
}

export default function MovementsList({ movements }: MovementListProps) {
    return (
        <div className="bg-white rounded-lg shadow-md border border-linen-light">
            <div className="p-5 border-b border-linen-light">
                <h3 className="text-xl font-semibold text-obsidian">Movimientos Recientes</h3>
            </div>

            {/* Grid de Cards - Responsivo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                {movements.map((movement) => {
                    const config = MOVEMENT_TYPES[movement.type as MovementType]
                    return (
                        <div
                            key={movement._id}
                            className={`border border-linen-light rounded-lg p-4 hover:shadow-md transition-all hover:border-gray-300`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                                    {config.label}
                                </span>
                                <span className="text-xs text-obsidian flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatDate(new Date(movement.date))}
                                </span>
                            </div>

                            {/* Monto */}
                            <div className="mb-3">
                                <p className="text-2xl font-bold text-obsidian">
                                    {formatCurrency(movement.amount)}
                                </p>
                            </div>

                            {/* Descripción */}
                            <p className="text-sm text-obsidian mb-4 line-clamp-2 min-h-10">
                                {movement.description || 'Sin descripción'}
                            </p>

                            {/* Cuentas (si aplica) */}
                            {(movement.incomeAccount || movement.expenseAccount) && (
                                <div className="mb-3 pb-3 border-b border-gray-100">
                                    {movement.type === 'income' || movement.type === 'expense' ? (
                                        <p className="text-xs text-clay-gray">
                                            <span className="font-medium">
                                                {movement.type === 'income' ? 'Entra a:' : 'Sale de:'}
                                            </span>{' '}
                                            <span className="capitalize text-obsidian">
                                                {movement.incomeAccount?.name || movement.expenseAccount?.name}
                                            </span>
                                        </p>
                                    ) : (
                                        <div className="text-xs text-clay-gray space-y-1">
                                            <p>
                                                <span className="font-medium">De:</span>{' '}
                                                <span className="capitalize text-obsidian">{movement.expenseAccount?.name}</span>
                                            </p>
                                            <p>
                                                <span className="font-medium">A:</span>{' '}
                                                <span className="capitalize text-obsidian">{movement.incomeAccount?.name}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Botón Ver */}
                            <Link
                                to={`/movements/${movement._id}`}
                                className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-green-balance hover:bg-green-balance-opaque rounded-lg transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                Ver detalle
                            </Link>
                        </div>
                    )
                })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 text-center">
                <button className="text-sm text-green-balance hover:text-green-balance font-medium transition-colors">
                    Ver historial completo →
                </button>
            </div>
        </div>
    )
}