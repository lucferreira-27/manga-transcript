import React, { useState } from 'react';
import { Box, TextField, Button, ThemeProvider } from '@mui/material';
import theme from '../../themes/MainTheme'; // Import the theme
import { useConfig } from '../../context/ConfigContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { listDirectoryContents } from '../../utils/files';

const UserConfiguration: React.FC = () => {
    const { config, setConfig } = useConfig();
    const [imagePath, setImagePath] = useState(config.paths.imagePath);
    const [open, setOpen] = useState(false);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setImagePath(event.target.value);
    };
  
    const handleSubmit = () => {
      console.log('Image Path:', imagePath);
      
      setConfig({ ...config, paths: { ...config.paths, imagePath } });
    

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
          <AppBar position="static" sx={{ display: open ? 'flex' : 'none' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'  }}>
              <TextField
                label="Image Path"
                variant="outlined"
                value={imagePath}
                onChange={handleInputChange}
                size="small"
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '80%' }}
              />
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