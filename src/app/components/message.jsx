import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Message = ({ msg }) => {
  const isUser = msg.role === 'user';

  return (
    <Box display="flex" justifyContent={isUser ? 'flex-end' : 'flex-start'} style={{ margin: '1rem 0' }}>
      <Box display="flex" alignItems="center" style={{ flexDirection: isUser ? 'row' : 'row-reverse', maxWidth: isUser ? '80%' : '80%' }}>
        <Paper
          elevation={3}
          style={{
            backgroundColor: isUser ? 'black' : 'white',
            color: isUser ? 'white' : 'black',
            borderRadius: '10px',
            padding: '1rem',
            maxWidth: '100%',
            wordBreak: 'break-word',
          }}
        >
          <Typography style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;
