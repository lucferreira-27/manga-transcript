import React, { useRef } from 'react';
import { Stage, Layer, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import { Page } from '../Pages';
import AnnotationRender from './BoundingBox/AnnotationRender';

interface ImageRenderProps {
  currentPage: Page | null;
}

const ImageRender: React.FC<ImageRenderProps> = ({ currentPage }) => {
  const [image] = useImage(currentPage?.url || 'https://via.placeholder.com/1500x2250');
  const stageRef = useRef(null);

  // Define distinct colors for each annotation type
  const colors = {
    panels: 'green',
    texts: 'red',
    gemini: 'green',
  };

  // Helper function to draw rectangles for a given annotation type
  const drawAnnotations = (index: number, bbox: number[], color: string) => {
    return (
      <Rect
        key={index}
        x={bbox[0] * 0.25}
        y={bbox[1] * 0.25}
        width={(bbox[2] - bbox[0]) * 0.25}
        height={(bbox[3] - bbox[1]) * 0.25}
        stroke={color}
        strokeWidth={1}
        opacity={0.5}
        cornerRadius={5} // Rounded corners
        shadowColor="black"
        shadowBlur={10}
        shadowOffset={{ x: 5, y: 5 }}
        shadowOpacity={0.5}
      />
    );
  };

  return (
    <>
      {<Stage width={image ? image.width * 0.25 : 2037 * 0.25} height={image ? image.height * 0.25 : 3056 * 0.25} ref={stageRef}>
        <Layer>
          {
            image && <Image
              image={image}
              scaleX={0.25}
              scaleY={0.25}
            />
          }

          {currentPage && <AnnotationRender annotation={currentPage.annotation} />}
        </Layer>
      </Stage>
      }
    </>
  );
};

export default ImageRender;