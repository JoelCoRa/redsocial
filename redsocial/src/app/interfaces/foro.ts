export interface CrearForo {
    titulo: string,
    etiqueta: string,
    contenido: string,
    anonimo: boolean,
    userId: number
}
export interface ForoResultado {
    titulo: string,
    nombreUsuario: string, 
    replicas: number,
    etiqueta: string,
    anonimo: boolean
}