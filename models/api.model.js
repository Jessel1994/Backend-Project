const end = require('../endpoints.json')
const fs = require('fs/promises');
const path = require('path');

exports.showEndpoints = async () => {
    try {
        const filePath = path.join(__dirname, '../endpoints.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const endpoints = JSON.parse(fileContent);
        return endpoints;
    } catch (err) {
        console.error(err);
        
    }
};