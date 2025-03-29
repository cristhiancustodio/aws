"use client"
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { LuExternalLink, LuTrash2 } from "react-icons/lu";
import type { ListarArchivosProps } from "./type/ListarArchivosProps";
import { useAws } from "./context/AwsProvider";


export const CardArchivos = (({ data }: ListarArchivosProps) => {

    const { eliminar } = useAws();

    return (

        <Box border={1} boxShadow="sm" m={5} p={5}>
            <Box>
                <Flex justifyContent="space-between">
                    <Text fontWeight="semibold">Nombre: {data?.nombre}</Text>
                    <Button size={"xs"} rounded="full" variant="ghost" onClick={() => eliminar(data.id)} ><LuTrash2 /></Button>
                </Flex>
                <Text fontWeight="semibold">Apellido: {data?.apellido}</Text>
                <Text fontWeight="semibold">Archivo: {""}
                    <Link
                        variant="underline"
                        href={data.link}
                        colorPalette="teal"
                        target="_blank"
                    >
                        {data?.fileName}
                        <LuExternalLink />
                    </Link>
                </Text>
            </Box>
        </Box>

    )
});