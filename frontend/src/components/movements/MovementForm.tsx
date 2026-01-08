import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Account, MovementFormInputs } from "../../types";
import { MOVEMENT_TYPES } from "../../constants/movementTypes";
import ErrorMessage from "../ErrorMessage";
import { useMemo } from "react";


type MovementFormProps = {
    register: UseFormRegister<MovementFormInputs>
    errors: FieldErrors<MovementFormInputs>
    movementType?: string
    accounts:Account[]
    selectedExpenseAccountId?:string
    selectedIncomeAccountId?:string
    isLoadingAccounts:boolean
}


export default function MovementForm({register, errors, movementType, accounts,selectedExpenseAccountId, selectedIncomeAccountId, isLoadingAccounts}:MovementFormProps) {
    
    const { incomeAccounts, expenseAccounts } = useMemo(() => {
        let incomeBase = accounts
        let expenseBase = accounts

        if(movementType === 'deposit'){
            incomeBase = accounts.filter(account => account.kind === 'bank');
            expenseBase = accounts.filter(account => account.kind === 'cash');
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
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Cuenta Egreso
                    </label>
                    <select
                        disabled={isLoadingAccounts || !movementType || movementType === 'income'}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${!movementType || movementType === 'income' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
