import { Box, Button, Card, Field, Input, Text } from "@chakra-ui/react";
import AsignarPresupuesto from "./AsignarPresupuesto";
import { useEffect, useReducer, useState } from "react";
import { BilleteraReducer } from "src/reducer/reducer-billetera";
import VistaPresupuesto from "./VistaPresupuesto";
import ListaGasto from "./ListaGastos";
import AgregarGasto from "./AgregarGasto";
import { useBilletera } from "./Context/BilleteraProvider";

export default function Billetera() {



    const { state } = useBilletera();

    return (
        <Box spaceY={4}>
            {
                state.presupuesto > 0
                    ?

                    <>
                        <VistaPresupuesto></VistaPresupuesto>
                        <AgregarGasto></AgregarGasto>
                        <ListaGasto></ListaGasto>
                        <Box>
                            <Button position="fixed"
                                bottom="20px"   // Distancia desde abajo
                                left="20px"     // Distancia desde la izquierda
                                colorScheme="teal"
                                boxShadow="lg"
                                fontSize={20}
                            //onClick={abrirModal}
                            >+</Button>
                        </Box>
                    </>


                    : <AsignarPresupuesto></AsignarPresupuesto>

            }

        </Box>
    )
}