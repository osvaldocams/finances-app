import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import MovementForm from "../../components/movements/MovementForm"
import type { Account, MovementFormInputs } from "../../types"
import { movementDtoSchema, movementFormSchema } from "../../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { createMovement } from "../../api/MovementApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllAccounts } from "../../api/AccountApi"


export default function CreateMovementView() {

    const [submitAttempted, setSubmitAttempted] = useState(false)

    const navigate = useNavigate()

    const defaultValues:MovementFormInputs = {
        type: '',
        date: new Date().toISOString().split('T')[0],
        amount: undefined,
        description: '',
        incomeAccountId: undefined,
        expenseAccountId: undefined,
        tags: []
    }

    const {register, handleSubmit, watch, setValue, formState:{errors}} = useForm<MovementFormInputs>({
        resolver: zodResolver(movementFormSchema),
        defaultValues})

    const movementType = watch('type')
    const incomeAccountId = watch('incomeAccountId')
    const expenseAccountId = watch('expenseAccountId')

    const { data:Account = [], isLoading} = useQuery<Account[]>({
        queryKey: ['accounts'],
        queryFn: getAllAccounts
    })    
    
    const { mutate } = useMutation({
        mutationFn: createMovement,
        onError: (error)=>{
            console.log(error.message)
        },
        onSuccess: () => {
            navigate('/movements')
        }
    })

    // Reset accounts when movement type changes
    useEffect(() => {
        if (movementType === 'income') {
            setValue('expenseAccountId', undefined)
        } else if (movementType === 'expense') {
            setValue('incomeAccountId', undefined)
        }
    }, [movementType, setValue])

    const handleForm = (rawData:MovementFormInputs) => mutate(movementDtoSchema.parse(rawData))
    // const handleForm = async (rawData:MovementFormInputs) =>{
    //     const parsed = movementDtoSchema.parse(rawData)
    //     await createMovement(parsed)
    //     navigate('/movements')
    // }

    const onSubmit = async (data: MovementFormInputs) => {
        setSubmitAttempted(true)
        await handleForm(data)
    }

    const onError = () => {
        setSubmitAttempted(true)
    }

    const hasErrors = Object.keys(errors).length > 0

    return (
        <>
            <h1 className="text-5xl font-black">Crear Movimiento</h1>
            <p className="tect-2xl font-light text-gray-500 mt-5">Llena el formulario para crear un nuevo movimiento</p>
            <nav className="my-5">
                <Link 
                    to="/movements"
                    className="bg-gray-400 hover:bg-gray-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                >
                    Volver a Mis Movimientos
                </Link>
            </nav>
            
            <div className="flex-1 p-8">
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 max-w-2xl mx-auto">
                    {submitAttempted && hasErrors && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-red-800">
                                        Hay errores en el formulario
                                    </h3>
                                    <p className="text-sm text-red-700 mt-1">
                                        Por favor corrige los campos marcados en rojo antes de continuar.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <form 
                        className="space-y-5"
                        onSubmit={handleSubmit(onSubmit, onError)}
                        noValidate
                    >
                        <MovementForm
                            register={register}
                            errors={errors}
                            movementType={movementType}
                            accounts={Account}
                            selectedExpenseAccountId={expenseAccountId}
                            selectedIncomeAccountId={incomeAccountId}
                            isLoadingAccounts={isLoading}
                        />

                        <div className="pt-4">
                            <input
                            type="submit"
                            className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${!movementType ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}`}
                            value='Crear Movimiento'
                            disabled={!movementType}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}