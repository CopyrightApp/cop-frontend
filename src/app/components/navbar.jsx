'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, IconButton, Divider, Button, Menu, MenuItem, Modal, List, ListItem, ListItemButton } from '@mui/material';
import LyricsIcon from '@mui/icons-material/Lyrics';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie';
import Link from 'next/link';
import './styles.css';

import { useAppContext } from "../context";

const languages = ['English', 'Español', 'French', 'German', 'Chinese', 'Italian', 'Portuguese', 'Japanese'];

function Navbar({ component }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setLanguage } = useAppContext();

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    setIsAuthenticated(false);
    handleMenuClose();
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    setIsAuthenticated(!!token);
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
          >
            Feedback
          </Button>
          <IconButton 
            sx={{ color: '#ffffff', border: '2px solid #ffffff', borderRadius: '50%' }} 
            onClick={handleMenuOpen}
          >
            { isAuthenticated ? <PersonIcon sx={{fontSize:'18px'}}/> :
              <MenuOpenOutlinedIcon sx={{fontSize:'18px'}}/>
            }
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
            bgcolor: '#F1F1F1',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography color='black' fontWeight='bold' id="modal-modal-title" variant="h6" component="h2" gutterBottom >
            Select Language
          </Typography>
          <Divider sx={{ bgcolor: 'black' }} />
          <List>
            {languages.map((language) => (
              <ListItem key={language}>
                <ListItemButton sx={{color:'black'}} onClick={() => handleChangeLanguage(language)}>
                  {language}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
}

export default Navbar;
