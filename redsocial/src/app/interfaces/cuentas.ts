
export interface Cuentas{
    userIdSeguido: number,
    userIdSeguidor: number,
    nombreUserSeguido: string,
    nombreUserSeguidor: string,
    // imgPerfil: string
}
export interface MostrarCuentas{
    userIdSeguido: number,
    userIdSeguidor: number,
    nombreUserSeguido: string,
    nombreUserSeguidor: string,
    imgPerfil: string
}
export interface Seguidos{
    totalseguidores?: number
}
export interface CuentasResult{
    id: number,
    nombreUsuario: string,
    descripcion: string,
    imgPerfil: string
}