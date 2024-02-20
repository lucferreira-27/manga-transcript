import React from 'react';
import { Rect } from 'react-konva';

interface PanelBoundingBoxProps {
  bbox: number[]; // [x1, y1, x2, y2]
  color: string;
  opacity: number;
}

const PanelBoundingBox: React.FC<PanelBoundingBoxProps> = ({
  bbox,
  color,
  opacity,
}) => {
  return (
    <Rect
      x={bbox[0] * 0.25}
      y={bbox[1] * 0.25}
      width={(bbox[2] - bbox[0]) * 0.25}
      height={(bbox[3] - bbox[1]) * 0.25}
      stroke={"black"} // Specific color for panels
      strokeWidth={3}
      fill={color}
      opacity={opacity}
      cornerRadius={5} // Rounded corners
    />
  );
};

export default PanelBoundingBox;