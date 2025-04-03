import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Input,
    Textarea,
    VStack,
    Heading,
} from '@chakra-ui/react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { useToast } from '@chakra-ui/toast';
import ListaPacientes from './ListaPacientes';
import { usePaciente } from './store';

type Usuario = {
    nombre: string,
    apellido: string,
    dni: string,
    comentario: string,
}

const PracticaZustand = () => {

    const initialize = {
        nombre: '',
        apellido: '',
        dni: '',
        comentario: ''
    }

    const [formData, setFormData] = useState(initialize);

    const [errors, setErrors] = useState<Partial<Usuario>>(initialize);
    const { addPatient, id_actual, pacientes, updatePatient } = usePaciente();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validarFormulario = () => {
        const nuevosErrores: Partial<Usuario> = {};

        if (!formData.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio';
        }

        if (!formData.apellido.trim()) {
            nuevosErrores.apellido = 'El apellido es obligatorio';
        }
        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validarFormulario()) {
            // Aquí iría la lógica para enviar el formulario
            if (id_actual) {
                updatePatient(formData);
            } else {

                addPatient(formData);
            }
            setFormData(initialize);
        }
    };

    useEffect(() => {
        if (id_actual) {
            const paciente_edit = pacientes.filter((i) => i.id == id_actual)[0];
            setFormData({
                nombre: paciente_edit.nombre,
                apellido: paciente_edit.apellido,
                dni: paciente_edit.dni,
                comentario: paciente_edit.comentario
            })
        }
    }, [id_actual])





    return (
        <>

            <Box maxW="500px" mx="auto" mt="8" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Heading mb="6" size="lg" textAlign="center">Formulario de Contacto</Heading>

                <form onSubmit={handleSubmit}>

                    <FormControl isRequired isInvalid={!!errors.nombre}>
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Input
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre"
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.apellido}>
                        <FormLabel htmlFor="apellido">Apellido</FormLabel>
                        <Input
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            placeholder="Ingrese su apellido"
                        />
                        <FormErrorMessage>{errors.apellido}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.dni}>
                        <FormLabel htmlFor="dni">DNI</FormLabel>
                        <Input
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            placeholder="Ejemplo: 12345678A"
                        />
                        <FormErrorMessage>{errors.dni}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="comentario">Comentario</FormLabel>
                        <Textarea
                            id="comentario"
                            name="comentario"
                            value={formData.comentario}
                            onChange={handleChange}
                            placeholder="Escriba su comentario aquí"
                            rows={4}
                        />
                    </FormControl>

                    <Button type="submit" size="sm" width="full" mt="4">Enviar</Button>

                </form>
            </Box>
            <Box>
                <ListaPacientes />
            </Box>
        </>
    );
};

export default PracticaZustand;