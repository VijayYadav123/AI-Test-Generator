# Technical SOP: Local Testcase Generator

## 1. Goal
Create a Browser-based Chat Interface that accepts user logic/code and returns generated test cases using a local `llama3.2` model via Ollama.

## 2. Architecture & Data Flow
**Flow**: User UI -> Node.js Proxy -> Ollama API -> Node.js Proxy -> User UI

### Inputs
- **User Message**: Raw text/code string.
- **Prompt Template**: Hardcoded structure to guide the LLM.

### Outputs
- **LLM Response**: Streaming or buffered Markdown text containing test cases.

## 3. Tool Logic (Layer 3)
### `tools/server.js` (Backend)
- **Role**: API Gateway & Template Injector.
- **Route**: `POST /api/chat`
    - **Step 1**: Validate input (not empty).
    - **Step 2**: Load Prompt Template.
    - **Step 3**: Construct Ollama Payload (`model: llama32`).
    - **Step 4**: Call Ollama (`http://localhost:11434/api/generate`).
    - **Step 5**: Stream response to client.
- **Dependencies**: `express` (Server), `cors` (Middleware), `axios` or native `http` (Ollama req).

### `public/` (Frontend)
- **`index.html`**: Chat container, input field, send button.
- **`app.js`**: 
    - Handle Submit -> Send POST -> UI "Thinking" state -> Render Markdown.
- **`style.css`**: Dark mode, glassmorphism, responsive.

## 4. Edge Cases
- **Ollama Offline**: Client shows "Connection Error" if backend fails to reach Ollama.
- **Model Missing**: Backend checks model availability, returns friendly error if `llama3.2` not found.
- **Empty Input**: Backend rejects 400.
