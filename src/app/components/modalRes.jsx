import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

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
};

const secondaryContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
};

const secondaryStyle = {
  width: 300,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

const modalTitleStyle = {
  marginBottom: '20px',
};

const ModalRes = ({ open, loading, result, onClose }) => {
  const [openPart2, setOpenPart2] = useState(false);
  const [openPart3, setOpenPart3] = useState(false);

  const result1 = "Esta letra ya existe o es similar a De musica ligera by Soda Stereo. *Opcion 1: Podrias cambiar el primer verso a De aquel amor, de musica sincera. Esto le daria un giro distinto a la letra original. *Opcion 2: Podrias agregar algun detalle mas descriptivo en el segundo verso, por ejemplo Nada nos libra, solo la hoguera. Esto aniadiria un elemento visual interesante a la letra."

  const splitResult = (text) => {
    const parts = text.split('*');
    const part1 = parts[0].trim();
    const part2 = parts[1].trim();
    const part3 = parts[2].trim();
    return { part1, part2, part3 };
  };

  const { part1, part2, part3 } = splitResult(result1);

  const handleSecondaryOpen = () => {
    setOpenPart2(true);
    setOpenPart3(true);
  };

  const handleSecondaryClose = () => {
    setOpenPart2(false);
    setOpenPart3(false);
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
              Esperando análisis...
            </Typography>
          ) : (
            <>
              <Typography id="modal-modal-part1" variant="h6" component="p">
                {part1}
              </Typography>
              <Typography variant="body1" component="p" sx={{ mt: 2 }}>
                Si quieres sugerencias para el cambio de letra da click en{' '}
                <Button onClick={handleSecondaryOpen} color="primary">
                  recibir opciones
                </Button>
              </Typography>
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
            ¿Cuál opción prefieres para recibir más retroalimentación acerca de ella?
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={secondaryStyle}>
              <Typography id="modal-part2-title" variant="h6" component="h2">
                {part2}
              </Typography>
            </Box>
            <Box sx={secondaryStyle}>
              <Typography id="modal-part3-title" variant="h6" component="h2">
                {part3}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalRes;
