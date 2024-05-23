export interface User{
    nombre: string, 
    apellido: string,
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
    imgPerfil:string,
    descripcion: string,
    cuentasSeguidas: number,
    seguidores: number,
    totalPosts: number
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
