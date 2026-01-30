document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');

    sendBtn.addEventListener('click', sendMessage);

    // Enable Cmd/Ctrl + Enter to submit
    input.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // 1. Add User Message to UI
        appendMessage('user', text);
        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;

        // 2. Add "Thinking" State
        const loadingId = appendMessage('assistant', 'Generating test cases...');

        try {
            // 3. Call Backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: text }]
                })
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();

            // 4. Update UI with Result
            updateMessage(loadingId, data.response);

        } catch (error) {
            updateMessage(loadingId, `**Error**: ${error.message}. Please ensure Ollama is running.`);
        } finally {
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }
    }

    function appendMessage(role, text) {
        const id = Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', role);
        msgDiv.id = `msg-${id}`;

        if (role === 'assistant' && text === 'Generating test cases...') {
            msgDiv.innerHTML = `<em>${text}</em>`;
        } else {
            msgDiv.innerText = text; // Content populated via marked later for assistants
        }

        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return id;
    }

    function updateMessage(id, markdown) {
        const msgDiv = document.getElementById(`msg-${id}`);
        if (msgDiv) {
            msgDiv.innerHTML = marked.parse(markdown);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }
});
