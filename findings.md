# Project Findings & Constraints

## Research & Discoveries
## Research & Discoveries
- **North Star**: Local LLM Testcase generator with a UI Chat interface.
- **Model**: Ollama (llama3.2).
- **Core Feature**: Store a "Testcase Template" in code, fill with user input, generate via Ollama.

## Constraints
- **Strict Rule**: No scripts in `tools/` until Blueprint is approved.
- **UI**: Must be a Web UI (Chat interface).
- **Invariants**: 
    - Use Ollama API.
    - Template-based generation.
