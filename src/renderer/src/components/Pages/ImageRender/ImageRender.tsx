import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Page } from '../Pages';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva';

interface ImageRenderProps {
  currentPage: Page | null;  // URL of the image to display
  alt?: string; // Alt text for the image
}
const ImageRender: React.FC<ImageRenderProps> = ({ currentPage }) => {
  const [image] = useImage(currentPage?.url || 'https://via.placeholder.com/1500x2250');
  const stageRef = useRef(null);

  return (
    <Stage width={image?.width * 0.25} height={image?.height * 0.25} ref={stageRef}>
      <Layer>
        <Image
            image={image}
            // Optional: scaling to fit within a specific width/height while maintaining aspect ratio
            scaleX={0.25}
            scaleY={0.25}
          />
        </Layer>
    </Stage>
    );
  };

export default ImageRender;