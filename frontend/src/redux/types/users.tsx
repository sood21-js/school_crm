export interface IUser {
    name?: string
    lastName?: string
    middleName?: string

    login: string
    email: string

    group: string
    active: boolean

    position?: string
    education?: string
}