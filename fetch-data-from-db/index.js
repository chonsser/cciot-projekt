module.exports = async function (context, req) {
    const path = require("path");
    const fs = require("fs");

    const indexPath = path.join(context.executionContext.functionDirectory, 'temperatura.json');
    const responseMessage = fs.readFileSync(indexPath)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}