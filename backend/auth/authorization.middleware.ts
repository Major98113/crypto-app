import * as express from "express";
import {UsersService} from "../services/users.service";
import {serviceContainer} from "../config/inversify.config";
import {DB, DBInterface} from "../types/db.types";

const UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );

export const authorization = async (req: express.Request, _res: express.Response, next: any) => {
    const { userId = '' } = req.body;

    if( UserServiceInstance.authorize( userId ) )
        return next();


    return next({
        statusCode: 401,
        message: 'User id is incorrect!'
    });
};
