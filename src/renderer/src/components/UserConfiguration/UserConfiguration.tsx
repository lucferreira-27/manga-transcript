import React, { useState } from 'react';
import { Box, TextField, Button, ThemeProvider } from '@mui/material';
import theme from '../../themes/MainTheme'; // Import the theme
import { useConfig } from '../../context/ConfigContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const UserConfiguration: React.FC = () => {
  const { config, setConfig } = useConfig();
  const [imagePath, setImagePath] = useState(config.paths.imagePath);
  const [annotationPath, setAnnotationPath] = useState(config.paths.annotationPath);
  const [open, setOpen] = useState(false);

  const handleImagePathInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagePath(event.target.value);
  };
  const handleAnnotationPathInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnotationPath(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Image Path:', imagePath);
    console.log('Annotation Path:', annotationPath);

    setConfig({ ...config, paths: { ...config.paths, imagePath, annotationPath } });
    setOpen(false);
  };

  const toggleAppBar = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleAppBar}
          sx={{ mr: 2, color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
        <AppBar sx={{ display: open ? 'flex' : 'none', width: '100vw',  zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ margin: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', width: '80%',gap: '15px' }}>
              <TextField
                label="Image Path"
                variant="outlined"
                value={imagePath}
                onChange={handleImagePathInputChange}
                size="small"
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '80%' }}
              />
              <TextField
                label="Annotation Path"
                variant="outlined"
                value={annotationPath}
                onChange={handleAnnotationPathInputChange}
                size="small"
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '80%' }}
              />
            </Box>

            <Button variant="contained" onClick={handleSubmit} sx={{ color: 'black' }}>
              Confirm
            </Button>
          </Toolbar>
        </AppBar>
      </>
    </ThemeProvider>
  );
};

export default UserConfiguration;