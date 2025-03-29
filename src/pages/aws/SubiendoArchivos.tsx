"use client"

import { Box } from "@chakra-ui/react"

import FormularioAws from "./Formulario";
import ListarArchivos from "./ListarArchivos";
import { AwsProvider } from "./context/AwsProvider";

export default function AWS() {

    return (
        <Box>
            <AwsProvider>
                <FormularioAws />
                <ListarArchivos />
            </AwsProvider>
        </Box>
    )
}