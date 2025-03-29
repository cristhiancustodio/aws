import { Box, Button, Card, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import Progreso from "./Progreso";
import { useBilletera } from "./Context/BilleteraProvider";



export default function VistaPresupuesto() {

    const { state, total, restante, dispatch, progreso } = useBilletera();

    return (
        <Box flex={1} justifyItems={"center"}>
            <Card.Root style={{ width: '60%' }} shadow={"lg"}>
                <Card.Body >
                    <SimpleGrid columns={{ base: 2 }}>
                        <Box textAlign={"center"}>
                            <Progreso valor={progreso}></Progreso>
                        </Box>
                        <Box>
                            <Box>
                                <Button w="full" size="sm" colorPalette="cyan" onClick={() => dispatch({ type: 'reset' })}>Resetear Conteo</Button>
                            </Box>
                            <Text fontWeight="semibold">
                                <Box as='text' color="blue.700" >Presupuesto </Box>
                                ${state.presupuesto.toFixed(2)}
                            </Text>
                            <Text fontWeight="semibold">
                                <Box as='text' color="blue.700" >Disponible </Box>
                                ${restante.toFixed(2)}
                            </Text>
                            <Text fontWeight="semibold">
                                <Box as='text' color="blue.700" >Gastado </Box>
                                ${total.toFixed(2)}
                            </Text>

                        </Box>
                    </SimpleGrid>
                </Card.Body>
                <Card.Footer >
                </Card.Footer>
            </Card.Root>
        </Box>
    )
}