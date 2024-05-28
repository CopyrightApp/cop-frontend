'use client'
import { useLayoutEffect, useState } from 'react';
import { Container, Box, Typography, Button, Paper, Input, TextareaAutosize, Tooltip } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';

import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation'
import withAuth from '../utils/withAuth';

import { handleTranscribe } from '../functionsApi/api';

import './styles.css'

function Checker() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [transcribed, setTranscribed] = useState(false);
  const [lyricsVerified, setLyricsVerified] = useState(false);
  const [lyricCheck, setLyricCheck] = useState("");

  const router = useRouter()

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

  const handleLogout = () =>{
    Cookies.remove('jwtToken');
    router.push('/login')
  }

  const handleVerify = async () => {
    try {
      const response = await fetch('http://localhost:4000/check', {
        method: 'POST',
        body: transcription,
      });

      if (response.ok) {
        const data = await response.json()
        setLyricCheck(data.text);
      } else {
        console.error('Error al recibir la letra')
      }

    } catch (error) {
      console.log('Error de red:', error)
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#F1F1F1' }}>

      <Paper elevation={3} sx={{ maxWidth: 'lg', width: '95%', p: 6, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }} >
          <Button onClick={handleLogout} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r mb-5">
            Logout
          </Button>
        </Box>
        <Typography mb={3} variant="h3" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Audio Transcription and Lyric Verification
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4}>
          <Box mt={2}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Upload Audio
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ cursor: 'pointer', height: '50%', border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, p: 4, bgcolor: 'grey.50', '&:hover': { bgcolor: '#eeeeee' } }}>
              {fileUploaded ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Typography variant="body2" color="textSecondary">File Uploaded</Typography>
                  <Button onClick={handleDeleteFile} variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                </Box>
              ) : (
                <label htmlFor="audio-upload" style={{ textAlign: 'center', cursor: 'pointer', width: '100%', height: '100%' }}>
                  <UploadIcon fontSize="large" sx={{ color: 'grey.500' }} />
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: 'bold' }}>Click to upload</span> or drag and drop
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    MP3, WAV, OGG up to 100MB
                  </Typography>
                  <Input id="audio-upload" type="file" accept="audio/*" onChange={handleFileChange} sx={{ display: 'none' }} />
                </label>
              )}
            </Box>
            
          </Box>
          <Box mt={2}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Transcription and Lyric Verification
            </Typography>
            <TextareaAutosize
              minRows={6}
              placeholder="Transcribed lyrics will appear here..."
              style={{ width: '100%', padding: 16, border: '1px solid', borderRadius: 10, borderColor: '#DEDEDE', backgroundColor: 'white' }}
              value={transcription}
              onChange={(e) => {
                setTranscription(e.target.value);
                setLyricsVerified(true);
              }}
            />
            <Box mt={2}>
              <Tooltip title="Sube un audio" disableHoverListener={file} arrow>
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
                    {loading ? 'Transcribing...' : 'Transcribe Audio'}
                  </Button>
                </span>
              </Tooltip>
            </Box>
            <Box mt={2}>
              <Tooltip title={"Escribe o transcribe alguna letra"} disableHoverListener={!(transcription === '')} arrow>
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
                    Verify Lyrics
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </Box>

      </Paper>

    </Container>
  );
}

export default withAuth(Checker)