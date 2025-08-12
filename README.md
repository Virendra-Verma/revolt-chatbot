Revolt Motors Voice Chatbot Clone
This project is a replication of the Revolt Motors voice chatbot, built with the Gemini Live API, Node.js, Express, and WebSockets.

Features
Real-time Conversation: Engage in natural, real-time conversations with the AI.

Interruption Handling: The user can interrupt the AI at any time, and the AI will respond to the new input.

Low Latency: Optimized for quick responses.

Server-to-Server Architecture: The backend handles the communication with the Gemini Live API.

Prerequisites
Node.js and npm installed

A Google AI Studio API Key

Setup
Clone the repository:

git clone <your-repo-link>
cd <your-repo-folder>

Install dependencies:

npm install

Create a .env file in the root of the project and add your Google AI Studio API key:

GEMINI_API_KEY=YOUR_API_KEY

Start the server:

npm start

Open your browser and navigate to http://localhost:3000.

Project Structure
.
├── public
│   ├── index.html
│   └── styles.css
├── server.js
├── package.json
└── README.md

public/: Contains the frontend files.

server.js: The backend Node.js/Express server.

package.json: Project dependencies and scripts.

README.md: This file.

System Instructions Prompt
To ensure the AI only talks about Revolt Motors, the following system instruction is used in server.js:

const systemInstruction = {
  parts: [
    {
      text: "You are a friendly and helpful assistant for Revolt Motors. Your role is to answer questions and provide information exclusively about Revolt Motors' products, services, and company. Do not discuss any other topics. If a user asks about something unrelated to Revolt Motors, politely steer the conversation back to Revolt Motors.",
    },
  ],
  role: "system",
};
