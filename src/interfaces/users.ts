export interface BasicUser {
    userId: number
}

export interface User extends BasicUser {
    name?: string,
    lastname?: string,
    email: string,
    password: string
}