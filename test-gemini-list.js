const https = require('https');

const url = 'https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBLjLJG9tuACWBAqK7tQehRt1RnjzCVSeo';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("Available Models:");
                json.models.forEach(m => console.log(m.name));
            } else {
                console.log("No models found or error:", json);
            }
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
            console.log(data);
        }
    });
}).on('error', (e) => {
    console.error("Got error: " + e.message);
});
