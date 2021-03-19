import { injectable } from 'inversify';
import 'reflect-metadata';
import { DBInterface } from '../types/db.types';

@injectable()
class LocalDB implements DBInterface{
    private users: { userId: string }[];

    constructor() {
        this.users = []
    }

    setUser( id: string ): void {
        const desiredUser = this.users.find( ({ userId }) => id === userId );

        if ( !desiredUser )
            this.users.push({ userId: id });
    }
}

export { LocalDB };
