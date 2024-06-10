export interface ReporteAdmin{
    id: number,
    descripcion: string,
    fechaReporte: string,
    userId: number,
    forumId: number,
    user: {
        nombreUsuario: string
    }
}
export interface ContactoAdmin{
    id: number,
    asunto: string,
    descripcion: string,
    fechaSolicitud: string,
    userId: number,
    user:{
        nombreUsuario: string
    }
}
export interface ContactoAdminPortal{
    id: number,
    correo: string,
    asunto: string,
    descripcion: string,
    fechaSolicitud: string,
}