
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Tag, Edit2, Trash2, Plus, Calendar, ArrowRightLeft, AlertCircle } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

    const { data, isLoading, error} = useQuery<Movement>({
		queryKey: ['movement',movementId],
		queryFn: () => getMovementById(movementId),
        retry: 1
	})

    const queryClient = useQueryClient()

    const {mutate:handleDelete, isPending: isDeleting} = useMutation({
        mutationFn: deleteMovement,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Movimiento Eliminado Correctamente')
            queryClient.invalidateQueries({queryKey:['movements']})
            queryClient.invalidateQueries({queryKey:['accounts']})
            navigate('/movements')
        }
    })
    const onDelete = async () => {
        if(window.confirm('¿Estás seguro de eliminar este movimiento?')){
            handleDelete(movementId)
        }
    }

	if(isLoading){
        return(
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }
	if(error){
        return(
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto mt-8">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-lg font-semibold text-red-800">Error al cargar el movimiento</h3>
                        <p className="text-red-700 mt-1">{error.message}</p>
                        <Link
                            to="/movements"
                            className="inline-block mt-4 text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                            ← Volver a movimientos
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
	if(!data) return null

    const movementConfig = MOVEMENT_TYPES[data.type as MovementType]

    return (
        <>
        <PageHeader
            title="Detalle del Movimiento"
            description="Revisa el detalle de tu movimiento"
            backTo="/movements"
            backLabel="Volver"
        />
        <div className="mt-5 max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-slate-100">
            {/* 1. Header: Tipo y Monto */}
            <div className="bg-slate-50 p-6 text-center border-b border-slate-100">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${movementConfig.bg} ${movementConfig.color} mb-2`}>
                    {movementConfig.label}
                </span>
                <h2 className="text-3xl font-bold text-slate-800">{formatCurrency(data.amount)} </h2>
                <p className="text-slate-500 text-sm mt-1 italic">"{data.description}"</p>
            </div>
            <div className="p-2 space-y-6">
                {/* 2. Detalles Principales */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Fecha</p>
                            <p className="text-sm text-slate-700 font-medium">{formatDate(new Date(data.date))}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ArrowRightLeft className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                            {data.type === 'income' || data.type ==='expense' ? (
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">
                                        {data.type === 'income' ? 'entra a:' : 'sale de:'}{' '}
                                        <br />
                                        <span className="text-xs text-slate-700  capitalize font-bold">{data.incomeAccount?.name || data.expenseAccount?.name}</span>
                                    </p>
                                </div>
                            ):(
                                <p className="text-xs text-slate-400 uppercase font-bold">
                                    sale de: <span className="text-xs text-slate-700  capitalize font-bold">{data.expenseAccount?.name}</span> 
                                    <br />
                                    entra a: <span className="text-xs text-slate-700  capitalize font-bold">{data.incomeAccount?.name}</span> 
                                </p>
                            )}
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
                <hr className="border-slate-100" />
                <div className='mt-8'>
                    <button 
                        onClick={onDelete}
                        disabled={isDeleting}
                        className={`flex items-center gap-2 text-red-500 hover:text-red-700 font-bold transition-colors text-sm border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 ${isDeleting ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed': 'text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50'}`}
                    >
                        {isDeleting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400" />
                                Eliminando...
                            </>
                        ):(
                            <>
                                <Trash2 className="w-4 h-4" />
                                Eliminar Movimiento
                            </>
                        )}
                    </button>                                                                 
                </div>
            </div>
        </div>
        </>
    )
}