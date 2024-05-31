'use client';
import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Button, IconButton, Menu, MenuItem } from '@mui/material';
import LyricsIcon from '@mui/icons-material/Lyrics';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import './styles.css';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box 
      id="toolbar" 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: '64px',
        backgroundColor: '#333', // Ajusta el color de fondo según tus necesidades
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '1rem'
        }}
      >
        <LyricsIcon sx={{ color: '#ffffff', mr: 1, fontSize: '40px' }} />
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
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button 
          variant="outlined" 
          sx={{ color: '#ffffff', borderColor: '#ffffff', mr: 2 }} 
          startIcon={<FeedbackIcon />}
        >
          Feedback
        </Button>
        <IconButton 
          sx={{ color: '#ffffff' }} 
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              '& .MuiMenuItem-root': {
                fontSize: '1rem',
                minHeight: 'auto',
                py: 1,
              },
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <LoginIcon sx={{ mr: 1 }} /> Login
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <LanguageIcon sx={{ mr: 1 }} /> Language
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default Navbar;
