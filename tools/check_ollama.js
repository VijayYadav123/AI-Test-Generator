const http = require('http');

function generate(model) {
    console.log(`Testing generation with ${model}...`);
    const data = JSON.stringify({
        model: model,
        prompt: "Say 'System Operational'",
        stream: false
    });

    const req = http.request({
        hostname: '127.0.0.1',
        port: 11434,
        path: '/api/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }, (res) => {
        let responseData = '';
        res.on('data', d => responseData += d);
        res.on('end', () => {
            try {
                const json = JSON.parse(responseData);
                console.log('--- GENERATION TEST ---');
                console.log(`RESPONSE: ${json.response.trim()}`);
                console.log('--- SUCCESS ---');
            } catch (e) {
                console.error('Generation Failed:', e.message);
            }
        });
    });

    req.on('error', e => console.error('Generation Error:', e.message));
    req.write(data);
    req.end();
}

const req = http.request({
    hostname: '127.0.0.1',
    port: 11434,
    path: '/api/tags',
    method: 'GET',
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const models = JSON.parse(data).models;
            const llama32 = models.find(m => m.name.includes('llama3.2'));

            if (llama32) {
                console.log('SUCCESS: Model found.');
                generate(llama32.name);
            } else {
                console.error('WAITING: llama3.2 not found yet.');
                console.log('Current models:', models.map(m => m.name));
            }
        } catch (e) {
            console.error('Error parsing tags:', e.message);
        }
    });
});

req.on('error', (e) => console.error('Ollama connection failed:', e.message));
req.end();
