import { Box, Button, Field, FileUpload, Input, Stack, Text } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { ChangeEvent } from "react";
import { useAws } from "./context/AwsProvider";

export default function FormularioAws() {

    const { form, loading, setForm, handleForm } = useAws();

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
        </Box>
    )
}