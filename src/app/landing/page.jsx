'use client';
import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Box } from '@mui/material';
import './styles.css';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

import { Link as ScrollLink, Element } from 'react-scroll';

import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import LightbulbIcon from '@mui/icons-material/Lightbulb';


const handleNavigation = (event) => {

};


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
        <Box sx={{ pt: 8, pb: 10 }}>
        <main>
          <section sx={{ backgroundColor: '#F7FAFC', py: { xs: 6, md: 12 } }}>
            <Container>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography mt={15} variant="h4" component="h2" gutterBottom sx={{ color: 'black' }}>
                    Protect Your Lyrics
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Lyric Protector is an AI-powered application that detects plagiarism in song lyrics. Ensure the
                    originality of your creative work and get recommendations to improve your lyrics.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link href={'/login'}>
                      <Button variant="contained" sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#323232' } }}>
                        Try Now
                      </Button>
                    </Link>
                    <ScrollLink to="key-features" smooth={true} duration={500} offset={-70}>
                      <Typography variant="body1" sx={{ ml: 2, color: 'grey.600', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                        Learn More
                      </Typography>
                    </ScrollLink>
                  </Box>
                </Grid>
                <Grid mt={14} item xs={12} md={6}>
                  <img src="/landing.jpg" alt="Lyric Protector App" style={{ width: '100%', borderRadius: '8px' }} />
                </Grid>
              </Grid>
            </Container>
          </section>
          <Box sx={{ height: '100vh' }}></Box>
          <Element name="key-features">
            <section sx={{ py: { xs: 6, md: 12 } }}>
              <Container>
                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ color: 'black', fontWeight: 'bold' }}>
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
                          <Typography variant="h6" component="h3" gutterBottom sx={{fontWeight: 'bold'}}>
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
          </Element>
        </main>
        <Footer />
        </Box>         
      </React.Fragment>
    </>
  );
}
