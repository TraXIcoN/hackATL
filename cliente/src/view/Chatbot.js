import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ThumbsUp, ThumbsDown, Loader, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {generateResponse} from "./geminiAPI";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                {
                    id: 1,
                    text: "Welcome to the Urban Pulse Luminator. I'm your super charger, How may I assist you today?",
                    sender: 'bot'
                },
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const newUserMessage = { id: Date.now(), text: input, sender: 'user' };
            setMessages(prev => [...prev, newUserMessage]);
            setInput('');
            setIsLoading(true);
            setIsTyping(true);

            try {
                const response = await generateResponse(input);
                setIsTyping(false);
                setTimeout(() => {
                    const formattedResponse = formatResponse(response);
                    const newBotMessage = { id: Date.now(), text: formattedResponse, sender: 'bot' };
                    setMessages(prev => [...prev, newBotMessage]);
                    setIsLoading(false);
                }, 500);
            } catch (error) {
                console.error('Error generating response:', error);
                setMessages(prev => [...prev, { id: Date.now(), text: "I apologize, but I'm experiencing technical difficulties. Please try again later.", sender: 'bot' }]);
                setIsLoading(false);
                setIsTyping(false);
            }
        }
    };

    const formatResponse = (response) => {
        // Split the response into lines
        const lines = response.split('\n');
        // Add an extra newline between each point
        return lines.join('\n\n');
    };

    const handleReaction = (messageId, reaction) => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === messageId
                    ? { ...msg, reaction: msg.reaction === reaction ? null : reaction }
                    : msg
            )
        );
    };

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={toggleChat}
                        className="chatbot-toggle-btn"
                    >
                        <MessageSquare size={28} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="chatbot-window"
                    >
                        <div className="chatbot-header">
                            <h3 className="chatbot-title">
                                <Bot size={25} className="chatbot-icon" />
                                The Luminator
                            </h3>
                            <button onClick={toggleChat} className="chatbot-close-btn">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="chatbot-messages">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`chatbot-message ${msg.sender}`}
                                >
                                    <div className="message-content">
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                        {msg.sender === 'bot' && (
                                            <div className="message-reactions">
                                                <button
                                                    onClick={() => handleReaction(msg.id, 'like')}
                                                    className={`reaction-btn ${msg.reaction === 'like' ? 'active' : ''}`}
                                                    aria-label="Like"
                                                >
                                                    <ThumbsUp size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleReaction(msg.id, 'dislike')}
                                                    className={`reaction-btn ${msg.reaction === 'dislike' ? 'active' : ''}`}
                                                    aria-label="Dislike"
                                                >
                                                    <ThumbsDown size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="chatbot-message bot"
                                >
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSend} className="chatbot-input-area">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message here..."
                                className="chatbot-input"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="chatbot-send-btn"
                                aria-label="Send message"
                            >
                                {isLoading ? <Loader size={24} className="animate-spin" /> : <Send size={24} />}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;