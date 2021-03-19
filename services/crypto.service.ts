import { injectable } from 'inversify';
import 'reflect-metadata';

import { serviceLogger as log } from '../utils/logger.helpers';
import axios from "axios";

@injectable()
class CryptoService {
    private readonly cryptoUrl: string = "https://min-api.cryptocompare.com"

    @log
    async getCryptoPrice(): Promise<any> {
        const { data: { USD } } = await axios.get(`${ this.cryptoUrl }/data/price?fsym=BTC&tsyms=USD,EUR"`);
        return USD;
    }
}

export { CryptoService };
