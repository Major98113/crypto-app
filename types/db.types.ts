export interface DBInterface {
    setUser: ( id: string ) => void,
    getUser: ( id: string ) => { userId: string } | null,
    removeUser: ( id: string ) => void,
}

export const DB = Symbol.for('DB');
