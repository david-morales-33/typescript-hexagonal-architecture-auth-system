import sql, { ConnectionPool } from 'mssql';

type paramType = | sql.ISqlTypeFactoryWithLength
    | sql.ISqlTypeFactoryWithNoParams
    | sql.ISqlTypeFactoryWithPrecisionScale
    | sql.ISqlTypeFactoryWithScale
    | sql.ISqlTypeFactoryWithTvpType;

export type DbParameters = {
    name: string;
    type: paramType;
    value: any
}
export abstract class SQLServerRepository {

    constructor(private _pool: Promise<ConnectionPool>) { }

    protected pool(): Promise<ConnectionPool> {
        return this._pool;
    }

    protected async connection() {
        return (await this._pool).connect()
    }
    protected async disconnection() {
        return (await this._pool).close()
    }

    protected storedProcedure(spName: string): (params: DbParameters[] | []) => Promise<sql.IRecordSet<any>> {
        return async (params: DbParameters[] | []) => {
            const query = (await this.connection()).request();

            params.forEach(element => { query.input(element.name, element.type, element.value) });

            const { recordset, returnValue } = await query.execute(spName);
            if (returnValue !== 1)
                this.throwQueryError(recordset[0]);
            return recordset;
        }
    }

    protected throwQueryError(message: string) {
        throw new Error(message)
    }
}
