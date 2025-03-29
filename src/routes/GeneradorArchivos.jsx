import { useId, useState } from 'react'
import { Alert, Box, Button, Input, Text, Textarea } from '@chakra-ui/react'
import axios from 'axios'


import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'



export default function GeneradorArchivos() {
    const [count, setCount] = useState(0)

    const [ruta_copiar, setRutaCopiar] = useState('');
    const [copiar_desde, setCopiarDesde] = useState('');
    const [text_archivos, setTextArchivos] = useState('');

    const [esperando, setEsperando] = useState(false);

    const id = useId();
    const procesar = async () => {
        const lista_archivos = separarTexto(text_archivos);

        const data = {
            ruta_copiar: ruta_copiar,
            copiar_desde: copiar_desde,
            lista_archivos: lista_archivos,
        }
        if (text_archivos.trim() == '') {
            return alert('No puedes');
        }

        //setEsperando(true);
        const resultado = await axios.post("http://localhost:5000/generar-archivos", data);
        let resp = resultado.data;
        if (!resp.error) {
            toaster.success({
                title: 'Creado correctamente'
            });
        }


        //setEsperando(false);
    }
    const separarTexto = (texto) => {
        let listado = texto.split('\n');
        return listado.map(elemento => elemento.trim())

    }

    return (
        <>
            <Box>
                <Field label='Ruta donde copiar' required>
                    <Input size="xs" placeholder='C:/Documentos...' value={ruta_copiar} onChange={(e) => setRutaCopiar(e.target.value)}></Input>
                </Field>
            </Box>
            <Box>
                <Field label='Copiar desde' required>
                    <Input size="xs" placeholder='documentos...' value={copiar_desde} onChange={(e) => setCopiarDesde(e.target.value)}></Input>
                </Field>
            </Box>
            <Box>
                <Text >Lista archivos</Text>
            </Box>
            <Textarea rows={8} onChange={(e) => setTextArchivos(e.target.value)} value={text_archivos}></Textarea>
            <Button onClick={procesar} loading={esperando} loadingText='Generando archivos'>Generar</Button>
        </>
    )
}