import { Actions, State } from "src/pages/Billetera/Interface/Billetera-Type";

export const BilleteraReducer = (state: State, action: Actions) => {
    if (action.type == 'add-presupuesto') {
        return {
            ...state,
            presupuesto: action.payload
        }
    } else if (action.type == 'reset') {
        return {
            ...state,
            presupuesto: 0,
            lista_gastos: []
        }
    } else if (action.type == 'add-gastos') {
        return {
            ...state,
            lista_gastos: [...state.lista_gastos, action.payload]
        }
    }
    else if(action.type == 'get-billetera'){
        return {
            ...state,
            lista_gastos: state.lista_gastos.filter((item, index) => item.id == action.payload.id)
        }
    }
    else if (action.type == 'delete') {
        return {
            ...state,
            lista_gastos: state.lista_gastos.filter((item, index) => item.id != action.payload.id)
        }
    }
    else if (action.type == 'edit') {
        return {
            ...state,
            editando: action.payload.editando
        }
    }


    return state;
}