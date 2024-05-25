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

export interface Foro{
    id: number,
    titulo: string,
    updatedAt: string,
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
    createdAt: string,
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