export interface Organizacion{
    nombre: string, 
    razonSocial: string,
    rfc: string,
    sector: string
    correo: string, 
    direccion: string,
    telefono: string,
    password: string
}
export interface OrganizacionLogin{
    correo: string,
    password: string
}