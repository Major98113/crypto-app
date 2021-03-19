import { Container } from "inversify";

import { DBInterface, DB } from '../types/db.types';
import { LoggerInterface, Logger } from '../types/logger.types';

import { LocalDB } from '../loaders/localdb';
import {WinstonLogger} from '../loaders/winston-logger';

const serviceContainer = new Container();

serviceContainer.bind<DBInterface>(DB).to(LocalDB);
serviceContainer.bind<LoggerInterface>(Logger).to(WinstonLogger);

export { serviceContainer };
