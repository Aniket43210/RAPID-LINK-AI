import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input) return;

        setMessages([...messages, { text: input, sender: "user" }]);
        
        try {
            const response = await axios.post("http://localhost:5000/analyze", { symptoms: input });
            setMessages([...messages, { text: input, sender: "user" }, { text: response.data.analysis, sender: "bot" }]);
        } catch (error) {
            setMessages([...messages, { text: input, sender: "user" }, { text: "Error connecting to AI.", sender: "bot" }]);
        }
        
        setInput("");
    };

    return (
        <div>
            <h1>DisasterMed Chatbot</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index} style={{ color: msg.sender === "user" ? "blue" : "green" }}>
                        {msg.sender === "user" ? "You" : "Bot"}: {msg.text}
                    </p>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter symptoms..." />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chatbot;
