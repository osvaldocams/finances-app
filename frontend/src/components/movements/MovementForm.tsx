import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Account, MovementFormInputs, Tag } from "../../types";
import { MOVEMENT_TYPES } from "../../constants/movementTypes";
import ErrorMessage from "../ui/ErrorMessage";
import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { TAG_COLORS } from "../../constants/tagColors";

type MovementFormProps = {
    register: UseFormRegister<MovementFormInputs>
    errors: FieldErrors<MovementFormInputs>
    movementType?: string
    accounts:Account[]
    selectedExpenseAccountId?:string
    selectedIncomeAccountId?:string
    isLoadingAccounts:boolean
    Tags:Tag[]
    isLoadingTags:boolean
}


export default function MovementForm({
    register, 
    errors, 
    movementType, 
    accounts,
    selectedExpenseAccountId,
    selectedIncomeAccountId,
    isLoadingAccounts,
    Tags,
    isLoadingTags
}:MovementFormProps) {

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const { incomeAccounts, expenseAccounts } = useMemo(() => {
        let incomeBase = accounts
        let expenseBase = accounts

        if(movementType === 'deposit'){
            incomeBase = accounts.filter(account => account.kind === 'bank');
            expenseBase = accounts.filter(account => account.kind === 'cash');
        }
        if(movementType === 'withdrawal'){
            incomeBase = accounts.filter(account => account.kind === 'cash');
            expenseBase = accounts.filter(account => account.kind === 'bank');
        }

        if(movementType === 'transfer'){
            incomeBase = accounts.filter(account => account.kind === 'bank');
            expenseBase = accounts.filter(account => account.kind === 'bank');
            if(selectedExpenseAccountId){
                incomeBase = incomeBase.filter(account => account._id !== selectedExpenseAccountId)
            }
            if(selectedIncomeAccountId){
                expenseBase = expenseBase.filter(account => account._id !== selectedIncomeAccountId)
            }
        }
        return{
            incomeAccounts: incomeBase,
            expenseAccounts: expenseBase
        }
    }, [accounts, movementType, selectedExpenseAccountId, selectedIncomeAccountId]);

    const toggleTag = (tagId:string) => {
        setSelectedTags(prev => {
            if(prev.includes(tagId)){
                return prev.filter(id => id !== tagId)
            }
            return [...prev, tagId]
        })
    }

    return (
        <div className="space-y-5">
            {/* movement types */}
            <div>
                <label className="block text-sm font-medium text-obsidian mb-2">
                    Tipo de Movimiento
                </label>
                <select
                    className="w-full p-3 border border-green-balance rounded-lg focus:ring-sage focus:border-sage transition duration-150"
                    {...register('type')}
                >
                    <option value="">--- Seleccionar ---</option>
                    {Object.entries(MOVEMENT_TYPES).map(([value, config]) => (
                        <option
                            key={value} 
                            value={value}
                        >
                        {config.label}
                        </option>
                    ))}
                </select>
                {errors.type && (
                    <ErrorMessage message={errors.type.message} />
                )}
            </div>

            {/* Tags */}
            <div>
                <div className="flex items-center justify-between mb-2 border-green-balance">
                    <label className="block text-sm font-medium text-obsidian">
                        Tags
                    </label>
                    <button
                        type="button"
                        disabled={!movementType}
                        onClick={() => {
                            // TODO: Abrir modal para crear nuevo tag
                            console.log('Abrir modal de crear tag')
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${!movementType 
                            ? 'bg-clay-gray text-linen-light cursor-not-allowed' 
                            : 'bg-green-balance text-linen-light hover:bg-sage active:scale-95'
                        }`}
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Nuevo tag
                    </button>
                </div>
                {/* Pills de tags */}
                <div className={`flex gap-2 overflow-x-auto p-2 rounded-lg border border-green-balance bg-linen-light
                    ${!movementType ? 'opacity-50 pointer-events-none' : ''}`}>
                        {Tags.length > 0 ? (
                            Tags.map(tag => {
                                const config = TAG_COLORS[tag.variant as keyof typeof TAG_COLORS]
                                const isSelected = selectedTags.includes(tag._id)
                                return(
                                    <button
                                        key={tag._id}
                                        type="button"
                                        disabled={!movementType}
                                        onClick={() => toggleTag(tag._id)}
                                        className={`
                                            shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                                            ${isSelected 
                                                ? `${tag.variant} ${config.text} ${config.selected} ring-2 ring-offset-1 ring-sage shadow-sm` 
                                                : `${config.text} ${config.bg} border-linen-light hover:border-clay-gray hover:shadow-sm`
                                            }
                                            ${!movementType ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        {isSelected && <Plus className="w-3 h-3 rotate-45" />}
                                        {tag.slug}
                                    </button>
                                )
                            })
                        ) :(
                            <div className="flex-1 text-center py-4">
                                <p className="text-sm text-obsidian mb-2">No hay etiquetas disponibles</p>
                                <button
                                    type="button"
                                    disabled={!movementType}
                                    onClick={() => console.log('Abrir modal')}
                                    className={`
                                        inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg
                                        ${!movementType
                                            ? 'bg-clay-gray text-linen-light cursor-not-allowed'
                                            : 'bg-green-balance text-linen-light hover:bg-sage'
                                        }`}
                                    >
                                    <Plus className="w-4 h-4" />
                                    Crear tu primera etiqueta
                                </button>
                            </div>
                        )}
                </div>
                {/* Selected tags */}
                {selectedTags.length > 0 && (
                    <div className="mt-3 p-3 bg-sage-opaque rounded-lg border border-green-balance">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-green-balance">
                                Seleccionados ({selectedTags.length})
                            </p>
                            <button
                                type="button"
                                onClick={() => setSelectedTags([])}
                                className="text-xs text-green-balance hover:text-sage font-medium transition-colors"
                            >
                                Limpiar Todo
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map(tagId => {
                                const tag = Tags.find(t => t._id === tagId)
                                if(!tag) return null
                                const config = TAG_COLORS[tag.variant as keyof typeof TAG_COLORS]
                                return(
                                    <span
                                        key={tagId}
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.text} ${config.selected} shadow-sm`}
                                    >
                                        {tag.slug}
                                        <button
                                            type="button"
                                            onClick={() => toggleTag(tagId)}
                                            className="hover:bg-obsidian/10 rounded-full p-0.5 transition-colors"
                                            aria-label={`Quitar ${tag.slug}`}
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Date and Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label
                        className="block text-sm font-medium text-obsidian mb-2"
                    >
                    Fecha
                    </label>
                    <input
                        disabled={!movementType}
                        type="date"
                        {...register('date')}
                        className={`w-full p-3 border border-green-balance rounded-lg focus:ring-sage focus:border-sage transition duration-150 ${!movementType ? 'bg-linen-light cursor-not-allowed' : ''}`}
                    />
                    {errors.date && (
                        <ErrorMessage message={errors.date.message} />
                    )}
                </div>

                <div>
                    <label
                        className="block text-sm font-medium text-obsidian mb-2"
                    >
                    Monto ($)
                    </label>
                    <input
                        disabled={!movementType}
                        type="number"
                        placeholder="Ej: 50.00"
                        {...register('amount', {valueAsNumber: true})}
                        className={`w-full p-3 border border-green-balance rounded-lg focus:ring-sage focus:border-sage transition duration-150 ${!movementType ? 'bg-linen-light cursor-not-allowed' : ''}`}
                    />
                    {errors.amount && (
                        <ErrorMessage message={errors.amount.message} />
                    )}
                </div>
            </div>

            {/* Accounts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label
                        className="block text-sm font-medium text-obsidian mb-2"
                    >
                    Cuenta Ingreso
                    </label>
                    <select
                        disabled={isLoadingAccounts || !movementType || movementType === 'expense'}
                        className={`w-full p-3 border border-green-balance rounded-lg focus:ring-sage focus:border-sage transition duration-150 ${!movementType || movementType === 'expense' ? 'bg-linen-light cursor-not-allowed' : ''}`}
                        {...register('incomeAccountId')}
                    >
                        <option value="">
                            {isLoadingAccounts ? 'Cargando cuentas...': '-- Seleccionar --'}
                        </option>
                        {incomeAccounts.map((account)=>(
                            <option key={account._id} value={account._id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                    {errors.incomeAccountId && (
                        <ErrorMessage message={errors.incomeAccountId.message} />
                    )}
                </div>

                <div>
                    <label
                        className="block text-sm font-medium text-obsidian mb-2"
                    >
                    Cuenta Egreso
                    </label>
                    <select
                        disabled={isLoadingAccounts || !movementType || movementType === 'income'}
                        className={`w-full p-3 border border-green-balance rounded-lg focus:ring-sage focus:border-sage transition duration-150 ${!movementType || movementType === 'income' ? 'bg-linen-light cursor-not-allowed' : ''}`}
                        {...register('expenseAccountId')}
                    >
                        <option value="">
                            {isLoadingAccounts ? 'Cargando cuentas...': '-- Seleccionar --'}
                        </option>
                        {expenseAccounts.map((account)=>(
                            <option key={account._id} value={account._id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                    {errors.expenseAccountId && (
                        <ErrorMessage message={errors.expenseAccountId.message} />
                    )}
                </div>
            </div>

            {/* Description */}
            <div>
                <label
                    className="block text-sm font-medium text-obsidian mb-2"
                >
                Descripción
                </label>
                <textarea
                    disabled={!movementType}
                    placeholder="Detalles del movimiento (Ej: Pago de renta, Venta freelance)."
                    className={`w-full p-3 border border-green-balance rounded-lg focus:ring-sage focus:border-sage transition duration-150 ${!movementType ? 'bg-linen-light cursor-not-allowed' : ''}`}
                    {...register('description')}
                />
            </div>
        </div>
    )
}