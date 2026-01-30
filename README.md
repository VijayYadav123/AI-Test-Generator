# AI Test Generator

A local, privacy-focused tool that generates comprehensive test suites for your code using the **Llama 3.2** LLM.

![Status](https://img.shields.io/badge/Status-Active-success)
![LLM](https://img.shields.io/badge/LLM-Llama3.2-blue)
![Privacy](https://img.shields.io/badge/Privacy-Local--Only-green)

## 🏗️ Architecture & Flow

The application follows a **3-Layer Architecture** to ensure privacy and separation of concerns.

```mermaid
graph LR
    subgraph Client [Frontend Layer]
        UI[Web Chat UI]
        style UI fill:#1e293b,stroke:#3b82f6,color:#fff
    end

    subgraph Server [Logic Layer]
        Proxy[Node.js Proxy Server]
        Template[Prompt Template Injector]
        style Proxy fill:#0f172a,stroke:#3b82f6,color:#fff
    end

    subgraph AI [Model Layer]
        Ollama[Ollama API]
        Model[(Llama 3.2 Model)]
        style Ollama fill:#eab308,stroke:#000,color:#000
    end

    User((User)) -->|Pasts Code| UI
    UI -->|POST /api/chat| Proxy
    Proxy -->|Injects Context| Template
    Template -->|Formatted Prompt| Ollama
    Ollama -->|Generates Tokens| Model
    Model -->|Stream Response| Ollama
    Ollama -->|JSON Response| Proxy
    Proxy -->|Markdown| UI
    UI -->|Rendered Test Suite| User
```

## 🚀 Getting Started

### Prerequisites
1.  **Node.js** (v14 or higher)
2.  **Ollama** (Installed and running)
    *   [Download Ollama](https://ollama.com/)
    *   Run: `ollama pull llama3.2`

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/VijayYadav123/AI-Test-Generator.git
    cd AI-Test-Generator
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App
1.  Start the local server:
    ```bash
    node tools/server.js
    ```
2.  Open your browser to: **http://localhost:3000**

## 📂 Project Structure

*   `public/`: Frontend assets (Glassmorphism UI, Vanilla JS).
*   `tools/`: Backend tools and execution scripts.
    *   `server.js`: Connects the UI to your local Ollama instance.
*   `architecture/`: Technical SOPs and design docs.
*   `gemini.md`: Project Constitution and Schema definitions.

## 🛡️ Privacy
This tool runs **100% locally**. Your code and logic are never sent to the cloud.
