export type ArchivoProps = {
    id: string,
    nombre: string,
    apellido: string,
    fileName: string,
    link?: string,
}

export interface ListarArchivosProps {
    data: ArchivoProps,
    eliminar: (id: ArchivoProps['id']) => void

}