import { injectable } from 'inversify';
import 'reflect-metadata';

import { DBInterface } from '../types/db.types';
import { UserServiceInterface } from '../types/user.types';
import { serviceLogger as log } from '../utils/logger.helpers';

@injectable()
class UsersService implements UserServiceInterface {
    private readonly DB: DBInterface;

    constructor( DB: DBInterface ) {
        this.DB = DB;
    }


    @log
    public login( userId: string ): void {
        this.DB.setUser( userId );
    }

    @log
    public authorize( userId: string ): { userId: string } | null {
        return this.DB.getUser( userId );
    }

    @log
    public logOff( userId: string ): void {
        this.DB.removeUser( userId );
    }
}

export { UsersService };
