import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Link from 'next/link';
import LyricsIcon from '@mui/icons-material/Lyrics';

function Footer() {
  return (
    <Box sx={{ zIndex: 1300, bottom: 0, width: '100%', alignItems:'center', backgroundColor: '#F1F1F1', color: '#FFFFFF', py: 0.5, position: 'fixed', display: 'flex', justifyContent: 'center' }}>
      <Container >
        <Typography variant="body2" align="left" gutterBottom sx={{color: 'black', m: 'auto', display: 'flex', alignItems: 'center', justifyContent:'flex-start'}}>
        <LyricsIcon sx={{ color: 'black', mr: 1, fontSize: '25px' }} /> &copy; 2024 Lyric Checker. All rights reserved.
        </Typography>
      </Container>
      <Container sx={{ ml: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {['Terms of Service', 'Privacy Policy'].map((item) => (
            <Link key={item} href="#" passHref>
              <Typography variant="body2" sx={{ color: 'black', textDecoration: 'none', mx: 1, '&:hover': { textDecoration: 'underline' } }}>
                {item}
              </Typography>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
