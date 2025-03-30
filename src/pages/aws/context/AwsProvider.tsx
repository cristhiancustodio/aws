import React, { ReactNode, useContext, useEffect } from "react";
import { AwsContextProps } from "../type/ListarArchivosProps";
import { useAwsHook } from "../hook/useAwsHook";




const AwsProviderContext = React.createContext<AwsContextProps>(null!);

export function AwsProvider({ children }: { children: ReactNode }) {

    const { loading2, detalle, listarDetalle, form, loading, setForm, handleForm, eliminar } = useAwsHook();

    useEffect(() => {        
        listarDetalle();
    }, [])

    return (
        <AwsProviderContext.Provider value={{ form, loading, loading2, detalle, eliminar, setForm, handleForm }}>
            {children}
        </AwsProviderContext.Provider>
    )
}

export const useAws = () => {
    const context = useContext(AwsProviderContext)
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider')
    }
    return context
}