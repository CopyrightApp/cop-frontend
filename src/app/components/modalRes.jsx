import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/index';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
  borderRadius:'15px'
};

const secondaryContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'center',
  gap: '20px',
  borderRadius:'15px'
};

const secondaryStyle = {
  width: 300,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
  cursor: 'pointer',
  borderRadius:'15px'
};

const modalTitleStyle = {
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ModalRes = ({ open, loading, result, onClose }) => {
  const [openPart2, setOpenPart2] = useState(false);
  const [openPart3, setOpenPart3] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { setSuggestion } = useAppContext();
  const [splitResultData, setSplitResultData] = useState(null);

  const splitResult = (text) => {
    console.log("text", text)
    const hasAsterisk = text.includes('*');
    if (!hasAsterisk) {
      return { part1: text, part2: '', part3: '' };
    }
    const parts = text.split('*');
    const part1 = parts[0].trim();
    const part2 = parts[1].trim();
    const part3 = parts[2].trim();
    return { part1, part2, part3 };
  };

  useEffect(() => {
    if (result) {
      const splitData = splitResult(result);
      setSplitResultData(splitData);
    }
  }, [result]);

  const handleSecondaryOpen = () => {
    setOpenPart2(true);
    setOpenPart3(true);
  };

  const handleSecondaryClose = () => {
    setOpenPart2(false);
    setOpenPart3(false);
  };

  const handleModalClick = (text) => {
    setSuggestion(text);
    localStorage.setItem('change', true);
    localStorage.setItem('suggestion', text);
    localStorage.setItem('song', splitResultData.part1);
    router.push('/chat');
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t('ModalWaiting')}
            </Typography>
          ) : (
            <>
              {splitResultData && splitResultData.part1 && (
                <div>
                  <Typography id="modal-modal-part1" variant="h6" component="p">
                    {splitResultData.part1}
                  </Typography>
                  {splitResultData.part2 || splitResultData.part3 ? (
                    <Typography variant="body1" component="p" sx={{ mt: 2 }}>
                      {t('ModalSugg')}{' '}
                      <Button onClick={handleSecondaryOpen} color="primary">
                      {t('ModalButton')}
                      </Button>
                    </Typography>
                  ) : null}
                </div>
              )}
            </>
          )}
        </Box>
      </Modal>
      <Modal
        open={openPart2 || openPart3}
        onClose={handleSecondaryClose}
        aria-labelledby="modal-secondary-container"
        aria-describedby="modal-secondary-container-description"
      >
        <Box sx={secondaryContainerStyle}>
          <Typography variant="h6" component="p" sx={modalTitleStyle}>
          {t('ModalRes')}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            {splitResultData && (
              <>
                {splitResultData.part2 ? (
                  <Box sx={secondaryStyle} onClick={() => handleModalClick(splitResultData.part2)}> 
                    <Typography id="modal-part2-title" variant="h6" component="h2">
                      {splitResultData.part2}
                    </Typography>
                  </Box>
                ): null}
                {splitResultData.part3 ? (
                  <Box sx={secondaryStyle} onClick={() => handleModalClick(splitResultData.part3)}>
                    <Typography id="modal-part3-title" variant="h6" component="h2">
                      {splitResultData.part3}
                    </Typography>
                  </Box>
                ): null}
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};


export default ModalRes;
