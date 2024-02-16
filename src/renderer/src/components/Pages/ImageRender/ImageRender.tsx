import React from 'react';
import { Box } from '@mui/material';
import { Page } from '../Pages';
interface ImageRenderProps {
  currentPage: Page | null;  // URL of the image to display
  alt?: string; // Alt text for the image
}
const ImageRender: React.FC<ImageRenderProps> = ({ currentPage }) => {
    return (
      <Box
        component="img"
        sx={{
          mt: '15px',
          maxWidth: '42%',
          border: '1px solid #0d0d0d', // Added white border
        }}
        src={currentPage?.url || 'https://via.placeholder.com/1500x2250'}
        alt={currentPage?.filename || 'No image selected'}
      />
    );
  };

export default ImageRender;