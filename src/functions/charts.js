const {app} = require("@azure/functions");

app.http('charts', {
    methods: ['GET'],
    handler: async (req, context) => {
        const path = require('path')
        const fs = require('fs')

        let responseMessage = 'Not found';

        let filename = req.query.get('filename');

        if (!filename) {
            filename = 'index.html'
        }

        let allowedAssets = [
            'medium.png',
            'hot.png',
            'cold.png',
            'index.html'
        ]
        if (allowedAssets.includes(filename)) {
            const filePath = path.join('src', 'functions', 'front', filename);
            responseMessage = fs.readFileSync(filePath)
        } else {
            responseMessage = 'Not found'
        }

        return {
            body: responseMessage
        };
    }
})
