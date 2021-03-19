export interface UserServiceInterface {
    login( userId: string ): void,
    authorize( userId: string ): { userId: string } | null
}
