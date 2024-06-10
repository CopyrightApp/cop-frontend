'use client';
import React, { useState, useRef, useEffect, use } from 'react';
import { Container, TextareaAutosize, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '../components/message';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import withAuth from '../utils/withAuth';
import { useAppContext } from '../context/index';
import { useTranslation } from 'react-i18next'; 

import './styles.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [getin, setGetin] = useState(false);
  const { t, i18n } = useTranslation();
  const [song, setSong] = useState('');
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [{ role: 'bot', content: t('ChatFirstBot') }];
  });
  const [lyrics, setLyrics] = useState('');
  const messagesEndRef = useRef(null);
  const { suggestion, setSuggestion } = useAppContext();

  const change = localStorage.getItem('change');

  useEffect(() => {
    console.log("change",change)
    if (change === 'true') {
      console.log("entré???SD")
      localStorage.removeItem('messages');
      setMessages([{ role: 'bot', content: t('ChatFirstBot') }]);
    }
    localStorage.setItem('change',false);
  }, [change]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'bot', content: t('ChatFirstBot') }]);
    }
  }, [i18n.language, messages.length]);

  useEffect(() => {
    setGetin(true);
    localStorage.setItem('getin', getin);
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const storedSuggestion = localStorage.getItem('suggestion');
    const storedLyric = localStorage.getItem('lyric');
    const storedSong = localStorage.getItem('song');
    if (storedSuggestion && storedLyric && storedSong) {
      setSuggestion(storedSuggestion);
      setLyrics(storedLyric);
      setSong(storedSong);
    }

  }, [setSuggestion]);


  const userInput = async () => {
    if (!message.trim()) return;

    const updatedMessages = [...messages, { role: 'user', content: message }];
    setMessages(updatedMessages);
    setMessage('');

    try {
      const response = await fetch('http://localhost:4000/chat/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, suggestion, song, lyrics}),
      });

      if (!response.ok) {
        throw new Error('Error al obtener la respuesta');
      }

      const responseData = await response.json();
      setMessages([...updatedMessages, { role: 'bot', content: responseData.choices[0].message.content }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      userInput();
    }
  };

  return (
    <>
      <Navbar component={true}/>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container maxWidth="md" style={{ padding: '1rem', flex: 1, marginTop: '5rem', position: 'relative', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          {messages.map((message, index) => (
            <Message key={index} msg={message} />
          ))}
          <div ref={messagesEndRef} />
        </Container>
        <Container maxWidth="md" style={{ padding: '1rem', display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            placeholder={t('ChatPlaceHolder')}
            style={{ width: '100%', marginRight: '0.1rem', color: 'white', backgroundColor: 'black', padding: '0.7rem', border: '1px solid', borderRadius: '30px', borderColor: '#DEDEDE' }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton sx={{color:'white', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'50%',minWidth:0,height:'2.8rem',width:'2.8rem',bgcolor:'black','&:hover':{bgcolor:'#323232'}}} onClick={userInput}>
            <SendIcon sx={{ fontSize: '1.5rem', marginLeft:'0.2rem',}} />
          </IconButton>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default withAuth(Chat);
