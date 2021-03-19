export interface DBInterface {
    setUser: ( id: string ) => void
}

export const DB = Symbol.for('DB');
