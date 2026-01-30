# Task Plan & Blueprint

## Phase 1: B - Blueprint (Vision & Logic) [DONE]
- [x] **Discovery**: Answer the 5 Core Questions
- [x] **Data-First Rule**: Define JSON Data Schema in `gemini.md`
- [ ] **Action Required**: Provide the **Master Prompt** text.
- [ ] **Approval**: User must approve the Blueprint below.

## Blueprint: Local LLM Testcase Generator

### Vision
A sleek, dark-mode Chat UI where users paste code/requirements. The system wraps this input in a specialized "Testcase Generator" prompt and sends it to a local Ollama instance (`llama3.2`). The result is displayed as a beautifully formatted chat message.

### Architecture
- **Frontend**: Vanilla HTML/CSS/JS (Vibrant, Glassmorphism design).
- **Backend**: Node.js (Express) server.
    - Serves static files.
    - `POST /chat`: Receives user input -> Inject into Template -> Call Ollama (`http://127.0.0.1:11434/api/generate`) -> Stream back response.

### Step-by-Step Implementation Plan
1.  **Project Setup**: Initialize Node.js project, install `express` and `cors` (if needed).
2.  **Ollama Check**: Script to verify `llama3.2` is running.
3.  **Backend Logic**: Create `server.js` with the prompt template injection.
4.  **Frontend Design**: Create `index.html`, `style.css` (Premium UI), and `app.js` (Chat logic).
5.  **Integration**: Connect Frontend to Backend.

## Phase 2: L - Link (Connectivity) [DONE]
- [x] **Verification**: Ollama Online (`gemma3:4b` found).
- [x] **Model Setup**: Pulling `llama3.2`... (Completed)
- [x] **Handshake**: Verify API response with `llama3.2`.
- [x] **Blocker**: Do not proceed if Link is broken.

## Phase 3: A - Architect (The 3-Layer Build) [DONE]
- [x] **Layer 1: Architecture**: Create `architecture/sop.md`.
    - Define technical SOPs, goals, inputs, tool logic, and edge cases.
- [x] **Layer 2: Tools**: Create scripts in `tools/`.
    - `tools/server.js`: Express server (Architecture logic).
    - `public/`: Frontend structure.

## Phase 4: S - Stylize (Refinement & UI) [DONE]
- [x] **Payload Refinement**: Format outputs (Markdown/Code Blocks).
- [x] **UI/UX**: Implement clean HTML/CSS/JS with intuitive layout (Glassmorphism).
- [x] **Feedback**: Present stylized results for feedback.

## Phase 5: T - Test (Validation)
- [ ] Validate End-to-End Flow.
- [ ] Stress test generator.

---

## Discovery Questions
**COMPLETED**
1. **North Star**: Local LLM Testcase Generator (Chat UI) via Ollama.
2. **Integrations**: Ollama (llama3.2).
3. **Source of Truth**: User Input in Chat.
4. **Delivery Payload**: Chat UI.
5. **Behavioral Rules**: Input -> Template -> Ollama -> Output.
