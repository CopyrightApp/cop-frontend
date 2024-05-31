'use client';
import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import './styles.css'
import Navbar from '../components/navbar';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default function Component() {
  return (
    <>
    <Navbar />
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <nav>
            {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
              <Link key={item} href="#" passHref>
                <Typography variant="button" sx={{ color: 'inherit', textDecoration: 'none', mx: 1, '&:hover': { textDecoration: 'underline' } }}>
                  {item}
                </Typography>
              </Link>
            ))}
          </nav>
        </Toolbar>
      </AppBar>
      <main>
        <section sx={{ backgroundColor: '#F7FAFC', py: { xs: 6, md: 12 } }}>
          <Container>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography mt={25} variant="h4" component="h2" gutterBottom sx={{color:'black'}}>
                  Protect Your Lyrics
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Lyric Protector is an AI-powered application that detects plagiarism in song lyrics. Ensure the
                  originality of your creative work and get recommendations to improve your lyrics.
                </Typography>
                <Button variant="contained" sx={{bgcolor:'black', color:'white'}}>
                  Try Now
                </Button>
              </Grid>
            </Grid>
          </Container>
        </section>
        <section sx={{ py: { xs: 6, md: 12 } }}>
          <Container>
            <Typography mt={35} variant="h4" component="h2" gutterBottom align="center" sx={{color:'black'}}>
              Key Features
            </Typography>
            <Grid container spacing={4}>
              {[
                { icon: <SearchIcon />, title: 'Plagiarism Detection', description: 'Our AI-powered algorithm analyzes your lyrics and identifies any potential plagiarism.' },
                { icon: <EditIcon />, title: 'Ease of Use', description: 'Our intuitive interface makes it easy to upload and analyze your lyrics. No technical expertise required.' },
                { icon: <LightbulbIcon />, title: 'Lyric Recommendations', description: 'Receive personalized suggestions to improve your lyrics and make them more engaging.' }
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Card sx={{ backgroundColor: '#FFFFFF', p: 4 }}>
                    <CardContent>
                      {feature.icon}
                      <Typography variant="h6" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
      </main>
      <footer sx={{ backgroundColor: '#1A202C', color: '#FFFFFF', py: 6 }}>
        <Container>
          <Typography variant="body2" align="center" gutterBottom>
            &copy; 2024 Lyric Protector. All rights reserved.
          </Typography>
          <nav style={{ textAlign: 'center' }}>
            {['Terms of Service', 'Privacy Policy'].map((item) => (
              <Link key={item} href="#" passHref>
                <Typography variant="body2" sx={{ color: 'inherit', textDecoration: 'none', mx: 1, '&:hover': { textDecoration: 'underline' } }}>
                  {item}
                </Typography>
              </Link>
            ))}
          </nav>
        </Container>
      </footer>
    </React.Fragment>
    </>
  );
}
