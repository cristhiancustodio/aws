"use client"

import { Box, Button, EmptyState, Field, FileUpload, Input, Spinner, Stack, Text, VStack } from "@chakra-ui/react"
import { ChangeEvent, use, useEffect, useState } from "react"
import { HiUpload } from "react-icons/hi"
import { ListarArchivos } from "./ListarArchivos";
import { api_client } from "./service-api";
import { ArchivoProps, ListarArchivosProps } from "./type/ListarArchivosProps";
import { LuShoppingCart } from "react-icons/lu";
import { toaster } from "src/components/ui/toaster";

type Form = {
    nombre: string,
    apellido: string,
    archivo: File | null
}
const readFileAsBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
            const base64Content = btoa(
                new Uint8Array(reader.result as ArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            resolve(base64Content);
        };
        // Manejar errores en la lectura del archivo
        reader.onerror = () => {
            reject(new Error("Error al leer el archivo."));
        };
    });
};


export default function AWS() {

    const initialize = {
        nombre: '',
        apellido: '',
        archivo: null
    }

    const [form, setForm] = useState<Form>(initialize);
    const [detalle, setDetalle] = useState<ArchivoProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(true);


    const handleForm = async () => {
        setLoading(true);
        let contenidoArchivo = await readFileAsBase64(form.archivo!);
        const data = {
            fileContent: contenidoArchivo,
            fileName: form.archivo?.name!,
            fileType: form.archivo?.type!,
            nombre: form.nombre,
            apellido: form.apellido,
        }

        const res = await api_client.post('/crea-usuario', data, { headers: { 'Content-Type': 'application/json' } });
        if (res.data) {
            listarDetalle();
            limpiarFormulario();
        }
        setLoading(false);
    }

    const limpiarFormulario = () => {
        setForm(initialize);
    }
    const listarDetalle = async () => {
        setLoading2(true);
        const res = await api_client.get("listar");
        if (res) {
            setDetalle(res.data.data);
        }
        setLoading2(false);

    }
    const eliminar = async (id: ListarArchivosProps['data']['id']) => {
        const toastId = toaster.create({
            title: 'Eliminando',
            type: 'loading'
        })

        const { data } = await api_client.post('eliminar/' + id);

        if (data) {
            if (!data.error) {
                toaster.update(toastId, {
                    title: data.response, type: 'success'
                });
                listarDetalle();
            } else {
                toaster.update(toastId, {
                    title: data.response, type: 'error'
                })

            }
        }
    }
    useEffect(() => {

        listarDetalle();

    }, []);

    return (
        <Box>
            <Text textAlign="center" fontWeight='semibold'>Mi fomulario S3</Text>
            <Box w="sm" m={"auto"} flex={1} >
                <Stack alignContent="center" >
                    <Box>
                        <Field.Root>
                            <Field.Label>Nombre</Field.Label>
                            <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} ></Input>
                        </Field.Root>
                    </Box>
                    <Box>
                        <Field.Root>
                            <Field.Label>Apellido</Field.Label>
                            <Input value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} ></Input>
                        </Field.Root>
                    </Box>
                    <Box>
                        <Field.Root>

                            <FileUpload.Root onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, archivo: e.target.files![0] })}>
                                <FileUpload.Label>Archivo S3</FileUpload.Label>
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload />Cargar archivo
                                    </Button>
                                </FileUpload.Trigger>

                            </FileUpload.Root>

                        </Field.Root>
                    </Box>
                </Stack>
                <Box mt={5}>
                    <Button size="xs" loading={loading} w="full" loadingText='Subiendo...' onClick={handleForm} >Enviar</Button>
                </Box>
            </Box>
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
                                                <ListarArchivos key={item.id} data={item} eliminar={eliminar} />
                                            ))
                                        }
                                    </>
                            }

                        </>
                }
            </Box>
        </Box>
    )
}