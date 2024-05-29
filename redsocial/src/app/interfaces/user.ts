export interface User{
    nombre: string, 
    apellido: string,
    fechaNacimiento: string,
    sexo: string
    correo: string, 
    nombreUsuario: string,
    password: string
}
export interface UserLogin{
    nombreUsuario: string,
    password: string
}

export interface UserPerfil{
    id: number;
    nombre: string,
    apellido: string,
    nombreUsuario: string,
    correo: string,
    imgPerfil:string,
    descripcion: string,
    // cuentasSeguidas: number,
    // seguidores: number,
    // totalPosts: number,
    tipoUsuario: number
}
export interface UserDescripcion{
    id:number,
    descripcion: string
}
export interface SeguidoSeguidor{
    userIdSeguido: number,
    userIdSeguidor: number
}
export interface imgPerfilUser{
    imgPerfil: string
}

export interface UserAjustes{
    nombreUsuario:string,
    correo: string,
    password: string
}
export interface UserPassword{   
   password: string,
   validatePassword: string
}
export interface UsersAdmin{
    id: number,
    nombre: string,
    correo: string,
    nombreUsuario: string,
    // cuentasSeguidas: number,
    // seguidores: number,
    // publicaciones: number,
    // foros: number,
    // solicitudes: number,
    // reportes: number,
    tipoUsuario: number,
    isBlocked: number
}
export interface UserIsAdmin{
    id: number,
    tipoUsuario: boolean
}
export interface UserIsBlocked{
    id: number,
    isBlocked: boolean
}
export interface CorreoReset{
    correo: string
}