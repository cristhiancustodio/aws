import { Box, Button, Card, Field, Input, Text } from "@chakra-ui/react";
import { useBilletera } from "./Context/BilleteraProvider";
import { useState } from "react";



export default function AsignarPresupuesto() {

    const { dispatch } = useBilletera();
    const [monto, setmonto] = useState(0);
    const asignar = () => {
        dispatch({ type: 'add-presupuesto', payload: monto });
        setmonto(0);
    }
    return (
        <>
            <Box>
                <Text fontSize="2xl" fontWeight="semibold" textAlign="center">Mi billetera</Text>
            </Box>
            <Box flex={1} justifyItems={"center"}>
                <Card.Root style={{ width: '60%' }} shadow={"lg"}>

                    <Card.Header>
                        <Card.Title textAlign="center">Definir Presupuesto</Card.Title>
                    </Card.Header>
                    <Card.Body spaceY={3}>
                        <Box>
                            <Field.Root>
                                <Input value={monto} onChange={(e) => setmonto(parseFloat(e.target.value))} ></Input>
                            </Field.Root>
                        </Box>
                        <Box>
                            <Button w={"full"} onClick={asignar} >Asignar</Button>
                        </Box>
                    </Card.Body>
                    <Card.Footer >
                    </Card.Footer>
                </Card.Root>
            </Box>


        </>
    )
}