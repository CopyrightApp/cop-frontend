'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, IconButton, Divider, Button, Menu, MenuItem, Modal, List, ListItem, ListItemButton, TextareaAutosize } from '@mui/material';
import LyricsIcon from '@mui/icons-material/Lyrics';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie';
import Link from 'next/link';
import './styles.css';
import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useTranslation } from 'react-i18next';


import { useAppContext } from "../context";

const languages = ['English', 'Español', 'French', 'German', 'Chinese', 'Italian', 'Portuguese', 'Japanese'];

function Navbar({ component }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { setLanguage } = useAppContext();
  const { data: session, status } = useSession(); // Hook de NextAuth.js
  const [chat, setChat] = useState(false);
  const [image, setImage] = useState();
  const { t } = useTranslation();

  const handleChangeLanguage = (newLanguage) => {
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear()
    if (Cookies.get('jwtToken')) {
      Cookies.remove('jwtToken');
      setIsAuthenticated(false);
      handleMenuClose();
    } else[
      signOut()
    ]
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFeedbackModalOpen = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = async () => {
    console.log("feedback", feedback)
    try {
      const response = await fetch('http://localhost:4000/feedback/noti', {
        method: 'POST',
        body: JSON.stringify({ feedback }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("feed", data);
      } else {
        console.error('Error al recibir el feedback');
      }
    } catch (error) {
      console.log('Error de red:', error);
    }
    setIsFeedbackModalOpen(false);
  };

  useEffect(() => async () => {
    const token = Cookies.get('jwtToken');
    const nextAuthSession = await getSession();
    if (token || nextAuthSession)
      setIsAuthenticated(true);

    const getin = localStorage.getItem('getin');
    setChat(getin)

    const img = localStorage.getItem('image');
    console.log("img",img)
    setImage(img);
  }, []);

  return (
    <>
      <Box
        id="toolbar"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          height: '64px',
          backgroundColor: '#333',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem'
          }}
        >
          <Link href="/landing">
            <LyricsIcon sx={{ color: '#ffffff', mr: 1, fontSize: '40px' }} />
          </Link>
          <Link href="/landing">
            <Typography
              component="div"
              variant="h5"
              sx={{
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 'bold',
                color: '#ffffff',
                fontSize: '2rem',
              }}
            >
              {isMobile ? 'LC' : 'Lyric Checker'}
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {chat ? <Button
            variant="outlined"
            onClick={() => window.location.href = '/chat'}
            sx={{ color: '#ffffff', borderColor: '#ffffff', mr: 2, borderRadius: '20px', '&:hover': { borderColor: '#323232' } }}
          >
            Chat
          </Button>
          : null
          }
          {component ? <Button 
            variant="outlined"
            onClick={() => window.location.href = '/checker'}
            sx={{ color: '#ffffff', borderColor: '#ffffff', mr: 2, borderRadius: '20px', '&:hover': { borderColor: '#323232' } }}
          >
            New Check
          </Button>
            : null
          }
          <Button 
            variant="outlined" 
            sx={{ color: '#ffffff', borderColor: '#ffffff', mr: 2, borderRadius: '20px', '&:hover': { borderColor: '#323232' } }} 
            onClick={handleFeedbackModalOpen} // Agrega el evento onClick
          >
            Feedback
          </Button>
          <IconButton
            sx={{ color: '#ffffff', border: '2px solid #ffffff', borderRadius: '50%', padding: 0 }}
            onClick={handleMenuOpen}
          >
            {/* Si isAuthenticated es verdadero y hay una imagen, renderizar la imagen dentro del botón */}
            {isAuthenticated && (image || session?.user?.image) ? (
              <img src={session?.user?.image || image} alt="User Image" style={{ width: '100%', height: '100%', borderRadius: '50%', maxHeight: 40, maxWidth: 40 }} />
            ) : (
              // Si no hay imagen, renderizar el icono predeterminado
              isAuthenticated ? <PersonIcon sx={{ fontSize: '18px', margin: 1 }} /> : <MenuOpenOutlinedIcon sx={{ fontSize: '18px', margin: 1 }} />
            )}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                bgcolor: 'black',
                border: '1px solid #ffffff',
                borderRadius: '10%',
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  fontSize: '1rem',
                  color: 'white',
                  minHeight: 'auto',
                  py: 1,
                  px: 3.5,
                },
              },
            }}
          >
            <MenuItem onClick={isAuthenticated ? handleLogout : handleMenuClose}>
              <Link href="/login">
                <LoginIcon sx={{ mr: 1 }} />
                {isAuthenticated ? 'Logout' : 'Login'}
              </Link>
            </MenuItem>
            <Divider sx={{ bgcolor: 'white' }} />
            <MenuItem onClick={handleModalOpen}>
              <LanguageIcon sx={{ mr: 1 }} /> Language
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius:'15px'
          }}
        >
          <Typography color='black' fontWeight='bold' id="modal-modal-title" variant="h6" component="h2" gutterBottom >
            Select Language
          </Typography>
          <Divider sx={{ bgcolor: 'black' }} />
          <List>
            {languages.map((language) => (
              <ListItem key={language}>
                <ListItemButton sx={{ color: 'black' }} onClick={() => handleChangeLanguage(language)}>
                  {language}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>

      <Modal
        open={isFeedbackModalOpen}
        onClose={handleFeedbackModalClose}
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            borderRadius: '15px',
            p: 4,
            alignItems:'center',
            justifyContent:'center',
            display:'flex',
            flexDirection:'column',
            color:'black'
          }}
        >
          <Typography color='black' fontWeight='bold' id="feedback-modal-title" variant="h6" component="h2" gutterBottom >
            {t('Feedback')}
          </Typography>
          <Typography id="feedback-modal-description" sx={{ mt: 2, color:'black' }}>
            {t('FeedbackTitle')}
          </Typography>
          <TextareaAutosize
            aria-label="feedback textarea"
            minRows={5}
            maxRows={5}
            placeholder={t('FeedbackPlaceholder')}
            style={{ padding:'1rem', width: '100%', marginTop: '16px', borderRadius:'10px' }}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
          <Button 
            variant="contained" 
            sx={{ mt: 2, bgcolor:'black', width: '100%', '&:hover': { bgcolor: '#323232' } }} 
            onClick={handleFeedbackModalClose}
          >
            {t('FeedbackSubmit')}
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Navbar;
