const { output } = require('@azure/functions');

const sendToSql = output.sql({
    commandText: 'dbo.WeatherData',
    connectionStringSetting: 'SqlConnectionString',
});

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const temp = req.query.temp;

    const data = JSON.stringify([
        {
            // create a random ID
            date: new Date(),
            temp: parseFloat(temp),
        },
    ]);

    // Output to Database
    context.extraOutputs.set(sendToSql, data);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: 'Saved to DB'
    };
}