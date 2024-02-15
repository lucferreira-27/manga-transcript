import React from 'react';
import { Container, Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';

interface BasePageProps {
  children: React.ReactNode;
  title?: string;
}

const MainContainer = styled(Container)({
  margin: 0,
  minWidth: '100%',
  minHeight: '100vh',
});

const BasePage: React.FC<BasePageProps> = ({ children, title }) => {
  return (
    <MainContainer>
      <CssBaseline /> {/* MUI component for CSS baseline */}
      <Container>
        <Box>
          {children} {/* Main content of the page */}
        </Box>
      </Container>

    </MainContainer>
  );
};

export default BasePage;