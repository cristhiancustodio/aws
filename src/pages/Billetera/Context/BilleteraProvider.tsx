import React, { ReactNode, useContext, useMemo, useReducer } from "react";
import { createContext } from "react";
import { BilleteraReducer } from "src/reducer/reducer-billetera";
import type { BilleteraContextProps, State } from "../Interface/Billetera-Type";

const BilleteraContext = React.createContext<BilleteraContextProps>(null!);

export function BilleteraProvider({ children }: { children: ReactNode }) {

    const initialize = {
        presupuesto: 0,
        lista_gastos: []
    }

    const [state, dispatch] = useReducer(BilleteraReducer, initialize);

    const total = useMemo(() => state.lista_gastos.reduce((total, item) => item.monto + total, 0), [state.lista_gastos]);
    const restante = state.presupuesto - total;

    let progreso = 0;
    if (state.presupuesto > 0) {
        progreso = total * 100 / state.presupuesto;
    }

    return (
        <BilleteraContext.Provider value={{ state, dispatch, total, restante, progreso }}>
            {children}
        </BilleteraContext.Provider>
    )
}


export const useBilletera = () => {
    const context = useContext(BilleteraContext)
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider')
    }
    return context
}