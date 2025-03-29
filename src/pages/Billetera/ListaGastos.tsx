import { Box, Button, Card, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useBilletera } from "./Context/BilleteraProvider";
import { ListaGastosProps } from "./Interface/Billetera-Type";


export default function ListaGasto() {

    const { state, dispatch } = useBilletera();

    const edit = (id: ListaGastosProps['id']) => {
        dispatch({ type: 'edit', payload: { editando: id } });
    }
    const eliminar = (id: ListaGastosProps['id']) => {
        dispatch({ type: 'delete', payload: { id } });
    }

    return (
        <Box flex={1} justifyItems={"center"}>
            <Card.Root style={{ width: '60%' }} shadow={"lg"}>
                <Card.Body spaceY={3}>
                    {
                        state.lista_gastos.length == 0
                            ?
                            < Text fontSize={25} fontWeight="semibold">NO HAY GASTOS</Text>
                            :
                            <>
                                <Text fontSize={25} fontWeight="semibold">Listado de Gastos</Text>
                                {
                                    state.lista_gastos.map((item, index) => (                                        
                                        <Box key={item.id}>
                                            <Flex justifyContent="space-between" px={10}>
                                                <Flex gap={8}>
                                                    <Box>
                                                    </Box>
                                                    <Box>
                                                        <Text>{item.id}</Text>
                                                        <Text>{item.categoria}</Text>
                                                        <Text>{item.descripcion}</Text>
                                                    </Box>
                                                </Flex>
                                                <Box>
                                                    <Text fontWeight="bold" fontSize={25}>${item.monto.toFixed(2)}</Text>
                                                    <Flex gap={3}>
                                                        <Button onClick={() => edit(item.id)}>Edit</Button>
                                                        <Button onClick={() => eliminar(item.id)}>Delete</Button>
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                            <hr />
                                        </Box>
                                    ))
                                }
                            </>
                    }
                </Card.Body>
            </Card.Root >
        </Box >
    )
}