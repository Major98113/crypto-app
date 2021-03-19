import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { config } from 'dotenv';
import 'reflect-metadata';

import { DBInterface } from '../types/db.types';
import { serviceLogger as log } from '../utils/logger.helpers';

@injectable()
class UsersService implements UserServiceInterface {
    private User: any;

    constructor( DB: DBInterface ) {
        this.User = DB;
    }


    @log
    public async login( userId: string ) {
        // @ts-ignore
        const { JWT_KEY } = config().parsed;
        const [ user ] = await this.getUserByCredentials( login, password );

        if (user)
            return jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    user: user.id},
                JWT_KEY
            );

        return null;
    }


}

export { UsersService };
