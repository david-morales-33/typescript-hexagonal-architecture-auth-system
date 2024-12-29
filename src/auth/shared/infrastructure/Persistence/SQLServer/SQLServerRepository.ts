import sql, { ConnectionPool } from 'mssql';

type paramType = | sql.ISqlTypeFactoryWithLength
    | sql.ISqlTypeFactoryWithNoParams
    | sql.ISqlTypeFactoryWithPrecisionScale
    | sql.ISqlTypeFactoryWithScale
    | sql.ISqlTypeFactoryWithTvpType;

export type dbParameters = {
    name: string;
    type: paramType;
    value: any
}
export abstract class SQLServerRepository {

    constructor(private _pool: Promise<ConnectionPool>) {}

    protected abstract procedureStoreName(): string;

    protected pool(): Promise<ConnectionPool> {
        return this._pool;
    }

    protected async connection() {
        return (await this._pool).connect()
    }
    protected async disconnection() {
        return (await this._pool).close()
    }

    protected async execute(params: dbParameters[] | []): Promise<sql.IRecordSet<any>> {
        const query = (await this.connection()).request();

        params.forEach(element => { query.input(element.name, element.type, element.value) });

        const { recordset, returnValue } = await query.execute(this.procedureStoreName());
        if (returnValue !== 1)
            this.throwQueryError(recordset[0]);
        return recordset;
    }

    protected throwQueryError(message: string) {
        throw new Error(message)
    }
}
