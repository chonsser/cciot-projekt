const { app } = require('@azure/functions');
const { parseConnectionString } = require('@tediousjs/connection-string');
const sql = require('mssql');


async function executeSQL(query) {
    let configFromConnectionString = parseConnectionString(process.env['SqlConnectionString'])
    const config = {
        user: configFromConnectionString['user id'],
        password: configFromConnectionString['password'] ,
        server: 'cciot-projekt-db.database.windows.net',
        port: 1433,
        database: 'cciot-projekt-db',
        authentication: {
            type: 'default'
        },
        options: {
            encrypt: true
        }
    }

    try {
        const poolConnection = await sql.connect(config);
        const resultSet = await poolConnection.request().query(query);
        poolConnection.close();
        return resultSet
    } catch (err) {
        console.error(err.message);
    }
}

app.http('fetch-data-from-db', {
    methods: ['GET'],
    handler: async (req, context) => {
        const query = 'SELECT * FROM WeatherData';
        try {
            const rows = await executeSQL(query)
            if(rows.recordsets.length > 0) {
                return {
                    body: JSON.stringify(rows.recordsets[0])
                }
            }
            return {
                body: []
            }
        } catch (err) {
            console.error(err)
            return {
                body: JSON.stringify(err)
            }
        }

    }
})