'use client';
import React, { useState } from 'react';
import { Box, Button, Container, TextareaAutosize, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '../components/message';
import './styles.css'

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const userInput = () => {
    if (!message.trim()) return;

    setMessages([...messages, { role: 'user', content: message }]);
    setMessage('');

      const simulate = "holaa"
      setMessages([...messages, { role: 'user', content: message }, { role: 'bot', content: simulate }]);
  };

  return (
    <div className="chat-container">
      <Container maxWidth="md" style={{ marginTop: '1rem', maxHeight: '60vh', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <Message key={index} msg={message} />
        ))}
      </Container>
      <Container maxWidth="md" style={{ marginTop: '1rem', padding: '1rem', display: 'flex', alignItems: 'center' }}>
        <TextareaAutosize
          minRows={3}
          placeholder="¿Qué quieres preguntar acerca de tu letra?"
          style={{ width: '80%', marginRight: '1rem' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={userInput} endIcon={<SendIcon />}>
          Enviar
        </Button>
      </Container>
    </div>
  );
};

export default Chat;
