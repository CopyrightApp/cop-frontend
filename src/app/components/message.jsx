import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Message = ({ msg }) => {
  const isUser = msg.role === 'user';

  return (
    <Box display="flex" justifyContent={isUser ? 'flex-end' : 'flex-start'} style={{ margin: '1rem 0' }}>
      <Paper
        elevation={3}
        style={{
          backgroundColor: isUser ? '#388e3c' : '#5E6868',
          color: 'white',
          borderRadius: '10px',
          padding: '1rem',
          maxWidth: isUser ? '70vw' : '100%',
          position: 'relative',
        }}
      >
        <Typography style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</Typography>
        {isUser ? (
          <AccountCircleIcon style={{ position: 'absolute', top: '10%', right: '-40px' }} />
        ) : (
          <Avatar
            alt="Bot Icon"
            src="/path-to-your-bot-icon.png"
            style={{display:'flex', position: 'absolute', top: '10%', left: '-30px', width: '35px', height: '35px' }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Message;
