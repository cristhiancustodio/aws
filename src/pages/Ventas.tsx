

import { Box, Button, Flex, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React, { Component } from 'react'
import { lista_platos } from './lista_pedidos'
import { usePedido } from '../hooks/usePedido';


export default function Ventas() {

    const { total_compra, precio_total, agregarPedido, eliminarPedido, aumentarProducto, restarProducto, cancelarPedido, lista_pedido } = usePedido();
    
    return (
        <Box>
            <Flex gap="4" >
                <Box flex="1" spaceY="4">
                    <Box><Text fontSize="4xl" fontWeight="bolder">Menú</Text></Box>
                    {
                        lista_platos.map((item) =>

                            <Box key={item.id} as='button'
                                textAlign="left" width="full" gap={2} bg="green.200" rounded="md" p={3}  onClick={() => agregarPedido(item)}
                                _hover={{
                                    cursor: 'pointer'
                                }}
                            >
                                <Text fontWeight="bold">{item.nombre}</Text>
                                <Text>S/{item.precio.toFixed(2)}</Text>
                            </Box>
                        )
                    }
                    <Box>
                        <Button size="sm" colorPalette="orange" disabled={lista_pedido.length == 0} onClick={cancelarPedido} >Cancelar</Button>
                    </Box>
                </Box>
                <Box flex="1">
                    <Box><Text fontSize="4xl" fontWeight="bolder">Pedidos</Text></Box>
                    {
                        lista_pedido.map((item, index) =>
                            <SimpleGrid key={index} borderColor="blackAlpha.100" columns={3} my={2}>
                                <Box>
                                    <Text>Plato: {item.nombre}</Text>
                                    <Text>Sub total: {item.subtotal}</Text>
                                </Box>
                                <Box>
                                    <Flex gap="2">
                                        <Button variant="surface" size="xs" onClick={() => restarProducto(item.id)} disabled={item.cantidad == 1} >-</Button>
                                        <Text>{item.cantidad}</Text>
                                        <Button variant="surface" size="xs" onClick={() => aumentarProducto(item.id)} disabled={item.cantidad == 5} >+</Button>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Button size="xs" colorPalette="red" onClick={() => eliminarPedido(item.id)}>X</Button>
                                </Box>
                            </SimpleGrid>
                        )
                    }
                    <Box>
                        <Text fontWeight="bold">Total compra: {total_compra}</Text>
                        <Text fontWeight="bold">Precio total: {precio_total}</Text>
                    </Box>
                </Box>
            </Flex>
        </Box>

    )

}
