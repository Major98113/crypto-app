import express from 'express';

import { serviceContainer } from '../config/inversify.config';
import { DB, DBInterface } from '../types/db.types';
import { UsersService } from '../services/users.service';
import { routerErrorLog } from '../utils/logger.helpers';

const router = express.Router();
const UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );

router.post('/', async ( req: express.Request, res: express.Response, next: any ) => {
    try {
        const { userId } = req.body;

        UserServiceInstance.login( userId );

        return res.status(200).json( { userId } );
    }
    catch( error ){
        next( routerErrorLog('POST /login', req.body, error ) );
    }
});

export default router;
