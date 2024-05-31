export interface ReporteAdmin{
    id: number,
    descripcion: string,
    fechaReporte: string,
    userId: number,
    forumId: number
}
export interface ContactoAdmin{
    id: number,
    rol: string,
    asunto: string,
    descripcion: string,
    fechaSolicitud: string,
    userId: number,
}