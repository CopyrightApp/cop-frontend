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

import { useTranslation } from 'react-i18next'; 


export default function Component() {
  const { t } = useTranslation();
  
  return (
    <>
      <Navbar component={false}/>
      <React.Fragment>
        <Box sx={{ pt: 8, pb: 10 }}>
        <main>
          <section sx={{ backgroundColor: '#F7FAFC', py: { xs: 6, md: 12 } }}>
            <Container>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography mt={15} variant="h4" component="h2" gutterBottom sx={{ color: 'black' }}>
                    {t('ProtectYourLyrics')}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    {t('LandingDesc')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link href={'/login'}>
                      <Button variant="contained" sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#323232' } }}>
                        {t('TryNow')}
                      </Button>
                    </Link>
                    <ScrollLink to="key-features" smooth={true} duration={500} offset={-70}>
                      <Typography variant="body1" sx={{ ml: 2, color: 'grey.600', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                        {t('LearnMore')}
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
                  {t('KeyFeatures')}
                </Typography>
                <Grid container spacing={4}>
                  {[
                    { icon: <SearchIcon />, title: t('PlagiarismDetection'), description: t('PlagiarismDetectionDescription') },
                    { icon: <EditIcon />, title: t('EaseOfUse'), description: t('EaseOfUseDescription') },
                    { icon: <LightbulbIcon />, title: t('LyricRecommendations'), description: t('LyricRecommendationsDescription') }
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
