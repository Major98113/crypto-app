import { injectable } from 'inversify';
import 'reflect-metadata';
import { DBInterface } from '../types/db.types';

@injectable()
class LocalDB implements DBInterface{
    private users: { userId: string }[];

    constructor() {
        this.users = [];
    }

    public getUser( id: string ): { userId: string } | null {
        const desiredUser = this.users.find( ({ userId }) => id === userId );

        if ( desiredUser ) {
            return desiredUser;
        }

        return  null;
    }

    public setUser( id: string ): void {
        const desiredUser = this.users.find( ({ userId }) => id === userId );

        if ( !desiredUser )
            this.users.push({ userId: id });
    }

    public removeUser( id: string ): void {
        this.users = this.users.filter( ({ userId }) => id !== userId );
    }
}

export { LocalDB };
