import React from 'react';
import { Rect } from 'react-konva';

interface TextBoundingBoxProps {
  bbox: number[]; // [x1, y1, x2, y2]
  color: string;
  opacity: number;
}

const TextBoundingBox: React.FC<TextBoundingBoxProps> = ({ bbox,color,opacity }) => {
  return (
    <Rect
      x={bbox[0] * 0.25}
      y={bbox[1] * 0.25}
      width={(bbox[2] - bbox[0]) * 0.25}
      height={(bbox[3] - bbox[1]) * 0.25}
      stroke={color} // Specific color for panels
      strokeWidth={1}
      fill={color}
      opacity={opacity}
    />
  );
};

export default TextBoundingBox;