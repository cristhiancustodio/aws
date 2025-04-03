import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { usePaciente } from "./store";
import { LuTrash2 } from "react-icons/lu";
import { HiPencil } from "react-icons/hi";


export default function ListaPacientes() {

    const { pacientes, eliminar, getPatient } = usePaciente();

    return (
        <>
            <Box flex={1} m="auto" alignContent="center" alignItems="center" justifyItems="center">
                {
                    (!pacientes.length) ?

                        <Box><Text>No hay datos</Text></Box>
                        :
                        pacientes.map((i, id) => (
                            <Box rounded="sm" borderRadius="md" borderWidth="1px" width="50%" p={5} my={5} key={i.id}>
                                <Flex justifyContent="space-between">

                                    <Text>ID: {i.id}</Text>
                                    <Box spaceX={2}>
                                        <Button size="xs" variant="outline" onClick={() => getPatient(i.id)}><HiPencil /></Button>
                                        <Button size="xs" variant="outline" onClick={() => eliminar(i.id)}><LuTrash2 /></Button>
                                    </Box>
                                </Flex>
                                <Text>Nombre: {i.nombre}</Text>
                                <Text>Apellido: {i.apellido}</Text>
                                <Text>DNI: {i.dni}</Text>
                                <Text>Comentario: {i.comentario}</Text>
                            </Box>
                        ))

                }
            </Box>
        </>
    )
}