import { Dispatch } from "react";


export interface BilleteraContextProps {
    state: State;
    dispatch: Dispatch<Actions>;
    total: number,
    restante: number,
    progreso: number
}

export interface ListaGastosProps {
    id: string
    categoria: string;
    descripcion: string;
    monto: number;
}

// ESTO PARA EL REDUCER
export interface State {
    presupuesto: number;
    lista_gastos: ListaGastosProps[];
    editando?: ListaGastosProps['id'],
}

export type Actions =
    { type: 'add-presupuesto', payload: number } |
    { type: 'add-gastos', payload: ListaGastosProps } |
    { type: 'reset' } |
    { type: 'edit', payload: { editando: ListaGastosProps['id'] } } |
    { type: 'delete', payload: { id: ListaGastosProps['id'] } } |
    { type: 'get-billetera', payload: { id: ListaGastosProps['id'] } }

