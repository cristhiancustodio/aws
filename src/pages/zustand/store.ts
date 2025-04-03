import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'



interface PacienteProps {
    id?: string,
    nombre: string,
    apellido: string,
    dni: string,
    comentario: string,
}
interface usePacienteProps {
    pacientes: PacienteProps[],
    id_actual: PacienteProps['id'],
    addPatient: (data: PacienteProps) => void,
    eliminar: (id: PacienteProps['id']) => void,
    getPatient: (id: PacienteProps['id']) => void
    updatePatient: (data: PacienteProps) => void
}


const addPatient = (data: PacienteProps) => {
    return { ...data, id: crypto.randomUUID() }
}

export const usePaciente = create<usePacienteProps>()(
    devtools(
        persist((set) => ({
            pacientes: [],
            id_actual: '',
            addPatient: (data) => {
                const nuevo = addPatient(data);
                set((state) => ({
                    pacientes: [...state.pacientes, nuevo]
                }))
            },
            eliminar: (id: PacienteProps['id']) => {
                set((state) => ({
                    pacientes: state.pacientes.filter((item) => item.id != id)
                }));
            },
            getPatient: (id) => {
                set(() => ({
                    id_actual: id
                }))
            },
            updatePatient: (data) => {
                set((state) => ({
                    pacientes: state.pacientes.map((i) => i.id === state.id_actual ? { id: state.id_actual, ...data } : i),
                    id_actual: ''
                }))
            }
        }), {
            name: 'patient-storage'
        })
    ))