const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemInstruction = {
    parts: [{
        text: "You are a friendly and helpful assistant for Revolt Motors. Your role is to answer questions and provide information exclusively about Revolt Motors' products, services, and company. Do not discuss any other topics. If a user asks about something unrelated to Revolt Motors, politely steer the conversation back to Revolt Motors."
    }],
    role: "system"
};

app.use(express.static('public'));

wss.on('connection', async(ws) => {
    console.log('Client connected');

    try {
        const chat = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest", // or gemini-2.0-flash-live-001 or gemini-live-2.5-flash-preview
            systemInstruction: systemInstruction,
        }).startChat();

        ws.on('message', async(message) => {
            try {
                // Assuming the message is audio data
                const audioData = message;

                // For this example, we're sending the audio data as a text prompt.
                // In a real application, you would send the raw audio bytes.
                // The Gemini Live API expects audio in a specific format.
                // This is a simplified representation.
                const result = await chat.sendMessage(audioData.toString());
                const response = await result.response;
                const text = response.text();

                ws.send(text);
            } catch (error) {
                console.error('Error processing message:', error);
                ws.send('Sorry, I encountered an error.');
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

    } catch (error) {
        console.error('Error starting chat:', error);
        ws.close();
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});