'use client';
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Paper, Input, TextareaAutosize, Tooltip, CircularProgress, MenuItem, Select, FormControl, InputLabel, IconButton, Alert, Modal, Divider } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Cookies from 'js-cookie';

import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import { StarBorder } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


import { useRouter, useSearchParams } from 'next/navigation';
import withAuth from '../utils/withAuth';
import { handleTranscribe } from '../functionsApi/api';
import './styles.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import ModalRes from '../components/modalRes';
import { useAppContext } from '../context/index';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { useTranslation } from 'react-i18next';

function Checker() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [transcribed, setTranscribed] = useState(false);
  const [lyricsVerified, setLyricsVerified] = useState(false);
  const [lyricCheck, setLyricCheck] = useState("");
  const { t } = useTranslation();
  const { language } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ingles');
  const languages = {
    "espanol": {
      "codigo": "es-US",
      "model": "latest_long"
    },
    "ingles": {
      "codigo": "en-US",
      "model": "latest_long"
    },
    "frances": {
      "codigo": "fr-FR",
      "model": "latest_long"
    },
    "italiano": {
      "codigo": "it-IT",
      "model": "latest_long"
    },
    "aleman": {
      "codigo": "de-DE",
      "model": "latest_long"
    },
    "portugues": {
      "codigo": "pt-BR",
      "model": "latest_long"
    }
  }
  const [showModalFavorites, setShowModalFavorites] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSnack, setShowSnack] = useState(false)
  const [history, setHistory] = useState([])
  const router = useRouter();
  const searchParams = useSearchParams()

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const formatTimestampTo12Hour = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses son 0-indexados
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  };


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUploaded(true);
  };

  const transcribeFile = async () => {
    setLoading(true);
    const result = await handleTranscribe(file, languages[selectedLanguage]);

    if (result.success) {
      setTranscription(result.transcription);
      setTranscribed(true);
      setLyricsVerified(true);
    } else {
      console.error('Error al transcribir el audio');
    }

    setLoading(false);
  };

  const handleDeleteFile = () => {
    setFile(null);
    setFileUploaded(false);
    setTranscribed(false);
    setTranscription("");
    setLyricsVerified(false);
  };


  const handleVerify = async () => {
    setShowModal(true);
    setLoading(true);
    localStorage.setItem('lyric', transcription);
    try {
      const response = await fetch('http://localhost:4000/verify/check', {
        method: 'POST',
        body: JSON.stringify({ transcription, language }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLyricCheck(data);
      } else {
        console.error('Error al recibir la letra');
      }
    } catch (error) {
      console.log('Error de red:', error);
    }

    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    const image = searchParams.get('image')
    if (image) {
      setProfileImageUrl(image)
      localStorage.setItem('image', image)
      const currentUrl = window.location.toString();
      const baseUrl = currentUrl.split('?')[0];
      window.history.replaceState({}, '', baseUrl);
    }
  }, []);


  const handleSaveFavorite = async () => {
    if (transcription) {
      setIsFavorite(true)
      setShowSnack(true)
      try {
        var token = ""
        if (Cookies.get('jwtToken')) {
          token = Cookies.get('jwtToken')
        } else {
          //En la validación de github entraría en este condicional.
          token = ""
        }
        const response = await fetch('http://localhost:4000/history', {
          method: 'POST',
          body: JSON.stringify({ details: transcription }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
        } else {
          console.error('Error al agregar elemento al historial');
        }
      } catch (error) {
        console.log('Error de red:', error);
      }
      setTimeout(() => {
        setShowSnack(false);
      }, 1700);
    }
  }
  const handleFavoritesList = async () => {
    try {
      var token = ""
      if (Cookies.get('jwtToken')) {
        token = Cookies.get('jwtToken')
      } else {
        //En la validación de github entraría en este condicional.
        token = ""
      }
      const response = await fetch('http://localhost:4000/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history)
      } else {
        console.error('Error al recibir el historial');
      }
    } catch (error) {
      console.log('Error de red:', error);
    }
    setShowModalFavorites(true)
  }

  const handleCloseFavoritesList = () => {
    setShowModalFavorites(false)
  }

  const handleDeleteHistory = async (event) => {
    const index = event.currentTarget.getAttribute('data-index');
    try {
      var token = ""
      if (Cookies.get('jwtToken')) {
        token = Cookies.get('jwtToken')
      } else {
        //En la validación de github entraría en este condicional.
        token = ""
      }
      const response = await fetch(`http://localhost:4000/history/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHistory(data.history)
      } else {
        console.error('Error al recibir el historial');
      }
    } catch (error) {
      console.log('Error de red:', error);
    }

  }


  useEffect(() => {
    if (isFavorite) {
      setIsFavorite(false)
    }
    if (showSnack) {
      setShowSnack(false)
    }
  }, [transcription])

  return (
    <>
      <Modal
        open={showModalFavorites}
        onClose={handleCloseFavoritesList}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 500,
          bgcolor: 'white',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("FavoritesButton")}
          </Typography>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {history.map((item, index) => (
              <><ListItem>
                <ListItemAvatar>
                  {profileImageUrl ? <Avatar alt="Remy Sharp" src={profileImageUrl} /> : (<PersonIcon />)}
                </ListItemAvatar>
                <ListItemText primary={item.details} secondary={formatTimestampTo12Hour(item.timestamp)} />
                <IconButton onClick={handleDeleteHistory} data-index={index + 1} variant="outlined"><DeleteIcon /></IconButton>
              </ListItem><Divider /></>
            ))}
          </List>
        </Box>
      </Modal>
      <Navbar component={false} image={profileImageUrl} />
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#F1F1F1' }}>
        <Paper elevation={3} sx={{ maxWidth: 'lg', width: '95%', p: 6, borderRadius: 2, bgcolor: 'background.paper', mt: '50px' }}>
          <Typography mb={3} variant="h3" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {t('Title')}
          </Typography>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4}>
            <Box mt={2}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                {t('UploadAudio')}
                <Tooltip title={t('Tooltip3')} arrow>
                  <HelpOutlineIcon sx={{ ml: 1, cursor: 'pointer' }} />
                </Tooltip>
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ cursor: 'pointer', height: '50%', border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, p: 4, bgcolor: 'grey.50', '&:hover': { bgcolor: '#eeeeee' } }}>
                {fileUploaded ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="body2" color="textSecondary">{t('FileUploaded')}</Typography>
                    <Button onClick={handleDeleteFile} variant="outlined" startIcon={<DeleteIcon />}>{t('DeleteButton')}</Button>
                  </Box>
                ) : (
                  <label htmlFor="audio-upload" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer', width: '100%', height: '100%' }}>
                    <UploadIcon fontSize="large" sx={{ color: 'grey.500' }} />
                    <Typography variant="body2" color="textSecondary">
                      <span style={{ fontWeight: 'bold' }}>{t('ClickToUpload')}</span> {t('OrDragAudio')}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {t('TypesOfAudio')}
                    </Typography>
                    <Input id="audio-upload" type="file" accept="audio/*" onChange={handleFileChange} sx={{ display: 'none' }} />
                  </label>
                )}
              </Box>
              <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FormControl fullWidth>
                  <InputLabel id="language-select-label">{t('InputLabel')}</InputLabel>
                  <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={selectedLanguage}
                    label={t('InputLabel')}
                    onChange={handleLanguageChange}
                    MenuProps={{
                      PaperProps: { style: { maxHeight: '15%', borderColor: 'black', } }
                    }}
                  >
                    <MenuItem value="aleman">{t('Germian')}</MenuItem>
                    <MenuItem value="espanol">{t('Spanish')}</MenuItem>
                    <MenuItem value="frances">{t('French')}</MenuItem>
                    <MenuItem value="ingles">{t('English')}</MenuItem>
                    <MenuItem value="italiano">{t('Italian')}</MenuItem>
                    <MenuItem value="portugues">{t('Portuguese')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', padding: 0 }}>
                {t('Transcription')}
                <IconButton onClick={handleSaveFavorite} aria-label="delete" sx={{ color: '#e9d700', width: 60, height: 60, padding: 0, marginLeft: 2, marginBottom: 1 }}>
                  {isFavorite ? <StarIcon sx={{ width: '60%', height: '60%' }} /> :
                    <StarBorder sx={{ width: '60%', height: '60%' }}
                    />
                  }
                </IconButton>
                {showSnack && <Snackbar open={open} TransitionComponent={SlideTransition} autoHideDuration={6000} sx={{ marginBottom: 6 }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                  <Alert icon={<StarIcon sx={{ color: 'black' }} />} sx={{ backgroundColor: '#e9d700', color: 'black', textDecorationColor: 'white' }} severity="success">
                    {t("FavoritesAlert")}
                  </Alert>
                </Snackbar>}
              </Typography>
              <TextareaAutosize
                minRows={6}
                maxRows={6}
                placeholder={t('Description')}
                style={{ width: '100%', padding: 16, border: '1px solid', borderRadius: 10, borderColor: '#DEDEDE', backgroundColor: 'white' }}
                value={transcription}
                onChange={(e) => {
                  setTranscription(e.target.value);
                  setLyricsVerified(true);
                }}
              />

              <Box mt={2}>
                <Tooltip title={t('Tooltip')} disableHoverListener={file} arrow>
                  <span>
                    <Button
                      data-testid="transcribe-button"
                      variant="contained"
                      sx={{
                        fontSize: '100%',
                        borderRadius: '8px',
                        height: '50px',
                        bgcolor: 'black',
                        '&:hover': { bgcolor: '#323232' },
                        cursor: loading ? 'not-allowed' : 'pointer'
                      }}
                      fullWidth
                      onClick={transcribeFile}
                      disabled={loading || !file}
                    >
                      {loading ? t('TranscribeButton2') : t('TranscribeButton')}
                    </Button>
                  </span>
                </Tooltip>
              </Box>
              <Box mt={2}>
                <Tooltip title={t('Tooltip2')} disableHoverListener={!(transcription === '')} arrow>
                  <span>
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: '100%',
                        borderRadius: '8px',
                        height: '50px',
                        bgcolor: 'black',
                        '&:hover': { bgcolor: '#323232' },
                        cursor: !lyricsVerified ? 'not-allowed' : 'pointer'
                      }}
                      fullWidth
                      onClick={handleVerify}
                      disabled={!lyricsVerified || transcription === ''}
                    >
                      {t('VerifyButton')}
                    </Button>
                  </span>
                </Tooltip>
              </Box><Box mt={2}>
                <Tooltip title={t('Tooltip4')} disableHoverListener={!(transcription === '')} arrow>
                  <span>
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: '100%',
                        borderRadius: '8px',
                        height: '50px',
                        bgcolor: 'black',
                        '&:hover': { bgcolor: '#323232' },
                      }}
                      fullWidth
                      onClick={handleFavoritesList}
                    >
                      {t('FavoritesButton')}
                    </Button>
                  </span>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          {showModal && (
            <ModalRes
              open={showModal}
              loading={loading}
              result={lyricCheck}
              onClose={handleCloseModal}
            />
          )}
        </Paper>

      </Container >
      <Footer />
      {
        loading && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ ml: 2, color: 'white' }}>{t('TranscribeButton2')}</Typography>
          </Box>
        )
      }
    </>
  );
}

export default withAuth(Checker)
