import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

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

const ModalRes = ({ open, loading, result, onClose }) => {
  return (
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {result}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ModalRes;
