# Project Constitution

## Data Schemas

### 1. Chat Application State
```json
{
  "messages": [
    {
      "id": "uuid",
      "role": "user",
      "content": "Raw code or requirements string"
    },
    {
      "id": "uuid",
      "role": "assistant",
      "content": "Generated Test Cases (Markdown/Code)"
    }
  ],
  "isGenerating": boolean
}
```

### 2. Ollama API Payload
**Endpoint**: `POST /api/generate` (Standard Ollama API)
**Request**:
```json
{
  "model": "llama3.2",
  "prompt": "[SYSTEM_PROMPT] + [USER_INPUT]",
  "stream": false
}
```
**Response**:
```json
{
  "response": "Generated text...",
  "done": true
}
```

## Behavioral Rules
1. **Template Adherence**: The System must ALWAYS wraps user input in the pre-defined `PROMPT_TEMPLATE`.
2. **Visual Feedback**: UI must show a "Thinking" state while Ollama is generating.
3. **No Storage**: Data is transient (session-based) unless otherwise requested.

## Architectural Invariants
1. **Frontend**: HTML/JS/CSS (Vanilla or Simple Framework) for the Chat UI.
2. **Backend**: Local Proxy or Direct Browser-to-Ollama (if CORS configured). *Recommendation: Simple Node.js/Python proxy to handle CORS and Template injection if needed, or direct if User allows.*
   - *Decision*: We will use a lightweight Node.js Express server to serve the UI and proxy requests to Ollama to manage CORS and safely inject the prompt template.
3. **Model**: Hardcoded to `llama3.2` as requested.
