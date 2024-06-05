export type ICustomOption = Omit<RequestInit,  'method'> & {
    baseUrl?: string | undefined
}

export interface IEntityError {
    message: string;
    error: {
        field: string;
        message: string
    }[]
}