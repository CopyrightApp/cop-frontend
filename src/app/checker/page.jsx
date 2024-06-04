'use client';
import React, { useState } from 'react';
import { Container, Box, Typography, Button, Paper, Input, TextareaAutosize, Tooltip, CircularProgress  } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import withAuth from '../utils/withAuth';
import { handleTranscribe } from '../functionsApi/api';
import './styles.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import ModalRes from '../components/modalRes';

import { useTranslation } from 'react-i18next'; 

function Checker() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [transcribed, setTranscribed] = useState(false);
  const [lyricsVerified, setLyricsVerified] = useState(false);
  const [lyricCheck, setLyricCheck] = useState("Plagio y es: sdadadsadasdasdadsadas");
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  
  const router = useRouter();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUploaded(true);
  };

  const transcribeFile = async () => {
    setLoading(true);
    const result = await handleTranscribe(file);

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
    try {
      const response = await fetch('http://localhost:4000/verify/check', {
        method: 'POST',
        body: JSON.stringify({ transcription }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLyricCheck(data.content);
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

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#F1F1F1' }}>
        <Paper elevation={3} sx={{ maxWidth: 'lg', width: '95%', p: 6, borderRadius: 2, bgcolor: 'background.paper', mt:'50px' }}>
          <Typography mb={3} variant="h3" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', display:'flex', justifyContent:'center', alignItems:'center' }}>
            {t('Title')}
          </Typography>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4}>
            <Box mt={2}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t('UploadAudio')}
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
            </Box>
            <Box mt={2}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t('Transcription')}
              </Typography>
              <TextareaAutosize
                minRows={6}
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

    </Container>
    <Footer />
    {loading && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress sx={{color:'white'}} />
          <Typography variant="h6" sx={{ ml: 2, color:'white' }}>{t('TranscribeButton2')}</Typography>
        </Box>
      )}
    </>
  );
}

export default withAuth(Checker)