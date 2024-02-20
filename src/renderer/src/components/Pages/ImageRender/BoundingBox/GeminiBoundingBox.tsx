import React from 'react';
import { Rect } from 'react-konva';

interface Gemini{
    xyxy: number[];
    gemini_block: boolean
    text: string[]
}

interface GeminiBoundingBoxProps {
  block: Gemini; // [x1, y1, x2, y2]
}

const GeminiBoundingBox: React.FC<GeminiBoundingBoxProps> = ({ block }) => {
  const {xyxy,gemini_block,text} = block
  return (
    <Rect
      x={xyxy[0] * 0.25}
      y={xyxy[1] * 0.25}
      width={(xyxy[2] - xyxy[0]) * 0.25}
      height={(xyxy[3] - xyxy[1]) * 0.25}
      stroke={gemini_block ? "red" : "yellow"} // Specific color for panels
      strokeWidth={1}
      cornerRadius={5} // Rounded corners
      fill={text && text.length > 1 ? "red" : "blue"}
      shadowColor="black"
      opacity={0.5}
      shadowBlur={10}
      shadowOffset={{ x: 5, y: 5 }}
      shadowOpacity={0.5}
    />
  );
};

export default GeminiBoundingBox;