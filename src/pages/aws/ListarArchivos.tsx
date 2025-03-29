import { Box, EmptyState, Spinner, Text, VStack } from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";
import { CardArchivos } from "./CardArchivo";
import { useAws } from "./context/AwsProvider";

export default function ListarArchivos() {

    const { loading2, detalle } = useAws();

    return (
        <Box w="2xl" m={"auto"} flex={1}>
            {
                loading2 ?
                    <VStack colorPalette="" mt={20}>
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600" fontWeight="semibold" >Listando...</Text>
                    </VStack>
                    :
                    <>
                        {
                            detalle.length == 0 ?
                                <>
                                    <EmptyState.Root>
                                        <EmptyState.Content>
                                            <EmptyState.Indicator>
                                                <LuShoppingCart />
                                            </EmptyState.Indicator>
                                            <VStack textAlign="center">
                                                <EmptyState.Title>No hay datos a mostrar</EmptyState.Title>
                                                <EmptyState.Description>
                                                    Registre un usuario para listar
                                                </EmptyState.Description>
                                            </VStack>
                                        </EmptyState.Content>
                                    </EmptyState.Root>
                                </>
                                :
                                <>
                                    <Box pl={5}>
                                        <Text fontSize="small" color="gray.500" fontStyle="italic" >{detalle.length} elementos</Text>
                                    </Box>
                                    {

                                        detalle.map((item, index) => (
                                            // <Box><Text>{item.apellido}</Text></Box>
                                            <CardArchivos key={item.id} data={item} />
                                        ))
                                    }
                                </>
                        }

                    </>
            }
        </Box>
    )
}