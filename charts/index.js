const path = require("path");
const fs = require("fs");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const path = require('path')
    const fs = require('fs')

    let responseMessage = 'Not found';

    const filename = req.query.filename

    if(filename) {
        let allowedAssets = [
            'medium.png',
            'temperatura.json',
            'hot.png',
            'cold.png'
        ]
        if(allowedAssets.includes(filename)) {
            const indexPath = path.join(context.executionContext.functionDirectory, 'front', filename);
            responseMessage = fs.readFileSync(indexPath)
        } else {
            responseMessage = 'Not found'
        }
    } else {
        const indexPath = path.join(context.executionContext.functionDirectory, 'front', 'index.html');
        responseMessage = fs.readFileSync(indexPath)
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}