import { DBInterface } from '../types/db.types';
import { UsersService } from './users.service';

class MockedDB implements DBInterface {
    public readonly client: any;

    constructor() {
        this.client = {
            define() {
                return {
                    findOne() {

                    },

                    findAll() {

                    },

                    create() {

                    },

                    update() {

                    }
                }
            }
        }
    }

    connect(){
        console.log("Mocked DB successfully connected!");
    }
}

const usersServiceInstance = new UsersService(new MockedDB);

describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });}
);
