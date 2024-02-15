import React from 'react';
import { Box } from '@mui/material';

interface ImageRenderProps {
  src: string; // URL of the image to display
  alt?: string; // Alt text for the image
}
const ImageRender: React.FC<ImageRenderProps> = ({ src, alt }) => {
    return (
      <Box
        component="img"
        sx={{
          mt: '15px',
          maxWidth: '42%',
          border: '1px solid #0d0d0d', // Added white border
        }}
        src={src}
        alt={alt || 'Image'}
      />
    );
  };

export default ImageRender;