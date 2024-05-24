
const { app, output } = require('@azure/functions');

const sendToSql = output.sql({
    commandText: 'dbo.WeatherData',
    connectionStringSetting: 'SqlConnectionString',
});

app.http('receive-data', {
    methods: ['GET'],
    extraOutputs: [sendToSql],
    handler: async (req, context) => {
        context.log('JavaScript HTTP trigger function processed a request.');

        const temp = req.query.get('temp');

        if(temp) {
            const data = JSON.stringify([
                {
                    // create a random ID
                    date: new Date(),
                    temperature: parseFloat(temp),
                },
            ]);

            // Output to Database
            context.extraOutputs.set(sendToSql, data);

            return {
                body: 'Saved to DB'
            };
        } else {
            return {
                body: 'Missing temp query param'
            };
        }
    }
})