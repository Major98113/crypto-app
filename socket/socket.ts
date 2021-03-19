import { CryptoService } from "../services/crypto.service";
import {UsersService} from "../services/users.service";
import { serviceContainer } from '../config/inversify.config';
import { DB, DBInterface } from '../types/db.types';
import {Logger, LoggerInterface} from "../types/logger.types";
import { WS_CONSTANTS } from "./ws-constants";

import Timeout = NodeJS.Timeout;

const GETTING_PRICE_INTERVAL = 1000 * 5; // 5 sec

const CryptoServiceInstance = new CryptoService();
const UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );
const loggerInstance = serviceContainer.get<LoggerInterface>(Logger);

const socketConnector = (io) => {
  io.on( WS_CONSTANTS.CONNECTION, (socket) => {
    loggerInstance.logServiceRequest('socket connection');

    let socketUserId: string = null;
    let intervalId: Timeout = null;

    socket.on( WS_CONSTANTS.GET_PRICE, ( id: string ) => {
      socketUserId = id;

      intervalId = setInterval(async () => {
        if( UserServiceInstance.authorize(id))
          io.emit(
              WS_CONSTANTS.NEW_PRICE,
              await CryptoServiceInstance.getCryptoPrice()
          );

      }, GETTING_PRICE_INTERVAL );
    });


    socket.on( WS_CONSTANTS.DISCONNECTION, () => {
      UserServiceInstance.logOff( socketUserId );
      clearInterval( intervalId );
      loggerInstance.logServiceRequest('socket disconnection');
    });
  });
};

export { socketConnector };
