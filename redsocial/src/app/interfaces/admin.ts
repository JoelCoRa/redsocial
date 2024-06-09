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
    rol: string,
    asunto: string,
    descripcion: string,
    fechaSolicitud: string,
    userId: number,
}