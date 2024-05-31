export interface CrearForo {
    titulo: string,
    etiqueta: string,
    contenido: string,
    anonimo: boolean,
    userId: number
}
export interface ForoResultado {
    id: number,
    titulo: string,
    nombreUsuario: string, 
    // replicas: number,
    etiqueta: string,
    anonimo: boolean
}

export interface Foro{
    id: number,
    titulo: string,
    fechaCreacion: string,
    anonimo: boolean,
    etiqueta: string,
    contenido: string,
    userId: number,
    user: {
        nombreUsuario: string,
        imgPerfil: string
    }    
}
export interface ReplicaForo{
    id: string, 
    contenidoreplica: string,
    fechaCreado: string,
    userId: number,
    forumId: number,
    user: {
        nombreUsuario: string,
        imgPerfil: string
    }
}
export interface CrearReplica{
    contenidoreplica:string,
    userId: number
}
export interface ReporteForo{
    descripcion: string,
    userId: number,
    forumId: number
}