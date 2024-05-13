export type ICustomOption = Omit<RequestInit,  'method'> & {
    baseUrl?: string | undefined
}