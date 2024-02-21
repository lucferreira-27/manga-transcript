import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, ThemeProvider } from '@mui/material';
import theme from '../../themes/MainTheme'; // Import the theme
import { useConfig } from '../../context/ConfigContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const UserConfiguration: React.FC = () => {
  const { config, setConfig } = useConfig();
  const [volumesPath, setVolumesPath] = useState(config.paths.volumesPath);
  const [annotationsPath, setAnnotationPath] = useState(config.paths.annotationsPath);
  const [open, setOpen] = useState(false);
  const [volumesPathError, setVolumesPathError] = useState(false);
  const [annotationPathError, setAnnotationPathError] = useState(false);

  const handleVolumesPathInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolumesPath(event.target.value);
  };
  const handleAnnotationPathInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnotationPath(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Volumes Path:', config.paths.volumesPath);
    console.log('Annotation Path:', config.paths.annotationsPath);

    if (volumesPath.length == 0 || annotationsPath.length == 0) {
      setVolumesPathError(volumesPath.length == 0);
      setAnnotationPathError(annotationsPath.length == 0);
      return
    }
    setConfig({ ...config, paths: { ...config.paths, volumesPath, annotationsPath } });
    setOpen(false);
  };

  useEffect(() => {
    if (volumesPath.length > 0) {
      setVolumesPathError(false);
    }
    if (annotationsPath.length > 0) {
      setAnnotationPathError(false);
    }
  }, [volumesPath, annotationsPath]);

  useEffect(() => {

  }, [annotationPathError, volumesPathError]);

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
        <AppBar sx={{ display: open ? 'flex' : 'none', width: '100vw', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ margin: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', width: '80%', gap: '15px' }}>
              <TextField
                error={volumesPathError}
                helperText={volumesPathError ? 'This field is required' : ''}
                label="Volumes Path"
                variant="outlined"
                value={volumesPath}
                onChange={handleVolumesPathInputChange}
                size="small"
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '80%' }}
              />
              <TextField
                error={annotationPathError}
                helperText={annotationPathError ? 'This field is required' : ''}
                label="Annotation Path"
                variant="outlined"
                value={annotationsPath}
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