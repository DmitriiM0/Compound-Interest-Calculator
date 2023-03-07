import React, { useState } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Header from './components/Header';
import Calculator from './components/Calculator';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

const userLanguage = navigator.language.slice(0, 2);



export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: '#1c1b1f',
          pb: { xs: '2rem', md: '3rem' },
        }}
      >
        <Container maxWidth="md">
          <Header language={userLanguage} />
          <Calculator />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
