import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Tag, Edit2, Trash2, Plus, Calendar, ArrowRightLeft, AlertCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteMovement, getMovementById } from '../../api/MovementApi'
import type { Movement } from '../../types'
import { MOVEMENT_TYPES, type MovementType } from '../../constants/movementTypes'
import { formatDate } from '../../helpers/formatDate'
import { formatCurrency } from '../../helpers/formatCurrency'
import { toast } from 'react-toastify'
import PageHeader from '../../components/ui/PageHeader'


export default function MovementDetailView() {
    const navigate = useNavigate()
    const params = useParams()
    const movementId = params.movementId!
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery<Movement>({
        queryKey: ['movement', movementId],
        queryFn: () => getMovementById(movementId),
        retry: 1
    })

    const { mutate: handleDelete, isPending: isDeleting } = useMutation({
        mutationFn: deleteMovement,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Movimiento eliminado correctamente')
            queryClient.invalidateQueries({ queryKey: ['movements'] })
            queryClient.invalidateQueries({ queryKey: ['accounts'] })
            navigate('/movements')
        }
    })

    const onDelete = () => {
        if (window.confirm('¿Estás seguro de eliminar este movimiento? Esta acción no se puede deshacer.')) {
            handleDelete(movementId)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando movimiento...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <>
                <PageHeader
                    title="Error"
                    backTo="/movements"
                    backLabel="Volver a movimientos"
                />
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-800">
                                Error al cargar el movimiento
                            </h3>
                            <p className="text-red-700 mt-1">{error.message}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (!data) return null

    const movementConfig = MOVEMENT_TYPES[data.type as MovementType]

    return (
        <>
            <PageHeader
                title="Detalle del Movimiento"
                description="Revisa y administra tu movimiento"
                backTo="/movements"
                backLabel="Mis Movimientos"
            />

            {/* Contenedor principal responsive */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                    {/* Header: Tipo y Monto */}
                    <div className=" bg-clay-gray-opaque  p-6 sm:p-8 text-center border-b border-linen-light">
                        <span 
                            className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider ${movementConfig.bg} ${movementConfig.color} mb-3 shadow-sm`}
                        >
                            {movementConfig.label}
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-obsidian mb-2">
                            {formatCurrency(data.amount)}
                        </h2>
                        {data.description && (
                            <p className="text-obsidian text-sm sm:text-base mt-2 italic max-w-md mx-auto">
                                "{data.description}"
                            </p>
                        )}
                    </div>

                    {/* Detalles */}
                    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                        {/* Grid responsive de detalles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Fecha */}
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <Calendar className="w-5 h-5 text-obsidian" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-clay-gray uppercase tracking-wide">
                                        Fecha
                                    </p>
                                    <p className="text-sm sm:text-base font-medium text-obsidian mt-1">
                                        {formatDate(new Date(data.date))}
                                    </p>
                                </div>
                            </div>

                            {/* Cuentas */}
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <ArrowRightLeft className="w-5 h-5 text-obsidian" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-clay-gray uppercase tracking-wide mb-1">
                                        Cuentas
                                    </p>
                                    {data.type === 'income' || data.type === 'expense' ? (
                                        <div className="text-sm">
                                            <span className="text-obsidian font-medium">
                                                {data.type === 'income' ? 'Entra a' : 'Sale de'}:
                                            </span>
                                            <p className="font-medium text-obsidian capitalize">
                                                {data.incomeAccount?.name || data.expenseAccount?.name}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-sm space-y-1">
                                            <div>
                                                <span className="text-clay-gray font-medium">De:</span>
                                                <span className="ml-1 font-medium text-obsidian capitalize">
                                                    {data.expenseAccount?.name}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-clay-gray font-medium">A:</span>
                                                <span className="ml-1 font-medium text-obsidian capitalize">
                                                    {data.incomeAccount?.name}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <hr className="border-clay-gray" />

                        {/* Sección de Tags */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-obsidian">
                                    <Tag className="w-5 h-5" />
                                    <span className="font-semibold text-base">Etiquetas</span>
                                </div>
                                <button className="flex items-center gap-1.5 text-xs sm:text-sm text-green-balance font-bold cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    Añadir
                                </button>
                            </div>

                            {/* Tags */}
                            {data.tags && data.tags.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag, index) => (
                                        <div
                                            key={`${tag}-${index}`}
                                            className="group flex items-center gap-2 bg-gray-100 text-gray-700 pl-3 pr-1 py-1.5 rounded-full text-xs sm:text-sm border border-gray-200 hover:border-gray-300 transition-all"
                                        >
                                            <span>{tag}</span>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    className="p-1 hover:text-blue-600 bg-white rounded-full shadow-sm border border-gray-200 transition-colors"
                                                    aria-label={`Editar ${tag}`}
                                                >
                                                    <Edit2 className="w-3 h-3" />
                                                </button>
                                                <button 
                                                    className="p-1 hover:text-red-600 bg-white rounded-full shadow-sm border border-gray-200 transition-colors"
                                                    aria-label={`Eliminar ${tag}`}
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-clay-gray">
                                    <Tag className="w-8 h-8 text-clay-gray mx-auto mb-2" />
                                    <p className="text-sm text-clay-gray">Sin etiquetas</p>
                                    <button className="mt-3 text-sm text-green-balance hover:text-sage cursor-pointer font-medium">
                                        Añadir la primera etiqueta
                                    </button>
                                </div>
                            )}
                        </div>

                        <hr className="border-clay-gray" />

                        {/* Acciones */}
                        <button
                            onClick={onDelete}
                            disabled={isDeleting}
                            className={`
                                flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all
                                ${isDeleting
                                    ? 'bg-linen-light text-clay-gray border-clay-gray cursor-not-allowed'
                                    : 'text-ritual-red hover:text-ritual-red border border-red-200 hover:bg-ritual-red-opaque cursor-pointer'
                                }
                            `}
                        >
                            {isDeleting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-clay-gray" />
                                    <span>Eliminando...</span>
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    <span>Eliminar Movimiento</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Información adicional (opcional) */}
                <div className="mt-6 p-4 bg-sage-opaque border border-sage rounded-lg">
                    <p className="text-sm text-green-balance">
                        <span className="font-medium">💡 Consejo:</span> Añade etiquetas para una mejor organización.
                    </p>
                </div>
            </div>
        </>
    )
}