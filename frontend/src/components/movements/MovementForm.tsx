import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Account, MovementFormInputs } from "../../types";
import { MOVEMENT_TYPES } from "../../constants/movementTypes";
import ErrorMessage from "../ErrorMessage";


type MovementFormProps = {
    register: UseFormRegister<MovementFormInputs>
    errors: FieldErrors<MovementFormInputs>
    movementType?: string
    accounts:Account[]
    isLoadingAccounts:boolean
}


export default function MovementForm({register, errors, movementType, accounts, isLoadingAccounts}:MovementFormProps) {
    return (
        <>
            <div className="flex flex-col gap-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Movimiento
                </label>
                <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
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
                <label className="block text-sm font-medium text-gray-700 my-1 ">
                    TAG
                </label>
                <select
                    disabled={!movementType}
                    {...register('tags')}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${!movementType ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                    <option value="">--- Seleccionar ---</option>
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
                        disabled={!movementType}
                        type="date"
                        {...register('date')}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${!movementType ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    {errors.date && (
                        <ErrorMessage message={errors.date.message} />
                    )}
                </div>

                <div>
                    <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Monto ($)
                    </label>
                    <input
                        disabled={!movementType}
                        type="number"
                        placeholder="Ej: 50.00"
                        {...register('amount', {valueAsNumber: true})}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${!movementType ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    {errors.amount && (
                        <ErrorMessage message={errors.amount.message} />
                    )}
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
                        disabled={isLoadingAccounts || !movementType || movementType === 'expense'}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${!movementType || movementType === 'expense' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        {...register('incomeAccount')}
                    >
                        <option value="">
                            {isLoadingAccounts ? 'Cargando cuentas...': '-- Seleccionar --'}
                        </option>
                        {accounts.map((account)=>(
                            <option key={account._id} value={account.name}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                    {errors.incomeAccount && (
                        <ErrorMessage message={errors.incomeAccount.message} />
                    )}
                </div>

                <div>
                    <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Cuenta Egreso
                    </label>
                    <select
                        disabled={isLoadingAccounts || !movementType || movementType === 'income'}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${!movementType || movementType === 'income' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        {...register('expenseAccount')}
                    >
                        <option value="">
                            {isLoadingAccounts ? 'Cargando cuentas...': '-- Seleccionar --'}
                        </option>
                        {accounts.map((account)=>(
                            <option key={account._id} value={account.name}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                    {errors.expenseAccount && (
                        <ErrorMessage message={errors.expenseAccount.message} />
                    )}
                </div>
            </div>

            <div>
                <label
                    className= "block text-sm font-medium text-gray-700 mb-1" 
                >
                Descripción
                </label>
                <textarea
                    disabled={!movementType}
                    placeholder="Detalles del movimiento (Ej: Pago de renta, Venta freelance)."
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${!movementType ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    {...register('description')}
                ></textarea>
            </div>
        </>
    )
}
