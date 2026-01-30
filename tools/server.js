const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const OLLAMA_HOST = '127.0.0.1';
const OLLAMA_PORT = 11434;

// Template for Test Case Generation
const PROMPT_TEMPLATE = (userVal) => `
You are an expert QA Automation Engineer. I need test cases for the following logic/code:

---
${userVal}
---

Generate a comprehensive test suite in Markdown format. 
Include:
1. Title and Description.
2. List of Test Cases (ID, Description, Expected Result).
3. Sample Code Implementation (if applicable).

Output ONLY the Markdown.
`;

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.messages.find(m => m.role === 'user')?.content;

    if (!userMessage) {
        return res.status(400).json({ error: 'No user message found' });
    }

    const fullPrompt = PROMPT_TEMPLATE(userMessage);

    const data = JSON.stringify({
        model: "llama3.2",
        prompt: fullPrompt,
        stream: false
    });

    const options = {
        hostname: OLLAMA_HOST,
        port: OLLAMA_PORT,
        path: '/api/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    console.log(`[Proxy] Sending request to Ollama...`);

    const ollamaReq = http.request(options, (ollamaRes) => {
        let responseData = '';

        ollamaRes.on('data', (chunk) => {
            responseData += chunk;
        });

        ollamaRes.on('end', () => {
            try {
                const json = JSON.parse(responseData);
                res.json({
                    response: json.response,
                    done: true
                });
                console.log(`[Proxy] Response sent to client.`);
            } catch (e) {
                console.error('[Proxy] Error parsing Ollama response:', e);
                res.status(500).json({ error: 'Failed to parse model response' });
            }
        });
    });

    ollamaReq.on('error', (e) => {
        console.error(`[Proxy] Connection Error: ${e.message}`);
        res.status(502).json({ error: 'Ollama is offline or unreachable.' });
    });

    ollamaReq.write(data);
    ollamaReq.end();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Serving UI from ../public`);
});
