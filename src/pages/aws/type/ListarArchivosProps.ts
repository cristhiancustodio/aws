export type ArchivoProps = {
    id: string,
    nombre: string,
    apellido: string,
    fileName: string,
    link?: string,
}
export type Form = {
    nombre: string,
    apellido: string,
    archivo: File | null
}

export interface ListarArchivosProps {
    data: ArchivoProps,

}

export interface AwsContextProps {
    form: Form,
    setForm: React.Dispatch<React.SetStateAction<Form>>,
    loading: boolean,
    loading2: boolean,
    detalle: ArchivoProps[],
    handleForm: () => Promise<void>,
    eliminar: (id: ArchivoProps['id']) => Promise<void>,

}