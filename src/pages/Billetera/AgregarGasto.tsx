import { v4 as uuidv4 } from 'uuid'
import { Box, Button, Card, Field, Input, NativeSelect } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ListaGastosProps } from "./Interface/Billetera-Type";
import { useBilletera } from "./Context/BilleteraProvider";

const listaCategoria = ["Ocio", "Comida", "Ropa", "Salida Mujeres"];


export default function AgregarGasto() {
    const { state, dispatch } = useBilletera();


    const initialize = {
        id: uuidv4(),
        categoria: '',
        descripcion: '',
        monto: 0,
    }
    const [gasto, setGasto] = useState<ListaGastosProps>(initialize);
    

    useEffect(() => {       
        if(state.editando){
            console.log("ee",state.editando);
            
            let gasto = state.lista_gastos.find((item, index) => item.id == state.editando)!;
            console.log(gasto);
            
            setGasto(gasto)
        }
      
    }, [state.editando])
    


    const agregar = () => {
        dispatch({ type: 'add-gastos', payload: gasto });
        setGasto(initialize);
    }

    
    return (
        <Box flex={1} justifyItems={"center"}>
            <Card.Root style={{ width: '60%' }} shadow={"lg"}>
                <Card.Header>
                    <Card.Title textAlign="center">Agregar Gastos</Card.Title>
                </Card.Header>
                <Card.Body spaceY={3}>
                    <Box>
                        <Field.Root>
                            <Field.Label>Descripcion</Field.Label>
                            <Input value={gasto.descripcion} onChange={(e) => setGasto({ ...gasto, descripcion: e.target.value })}></Input>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Descripcion</Field.Label>
                            <NativeSelect.Root size="sm" width="100%" >
                                <NativeSelect.Field placeholder="Select option" name="categoria" value={gasto.categoria} onChange={(e) => setGasto({ ...gasto, categoria: e.target.value })}>
                                    {
                                        listaCategoria.map((item) =>
                                            <option key={item} value={item}>{item}</option>
                                        )
                                    }
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Monto</Field.Label>
                            <Input type="number" value={gasto.monto} onChange={(e) => setGasto({ ...gasto, monto: parseFloat(e.target.value) })}></Input>
                        </Field.Root>
                    </Box>
                </Card.Body>
                <Card.Footer >
                    <Button onClick={agregar}>Agregar</Button>
                </Card.Footer>
            </Card.Root>
        </Box>
    )
}