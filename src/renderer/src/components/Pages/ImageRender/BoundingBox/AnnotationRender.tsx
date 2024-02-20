import React from 'react';
import { Rect } from 'react-konva';
import { Annotation } from '../../Pages';
import PanelBoundingBox from './PanelBoundingBox';
import TextBoundingBox from './TextBoudingBox';
import GeminiBoundingBox from './GeminiBoundingBox';

interface AnnotationRenderProps {
  annotation: Annotation; // [x1, y1, x2, y2]
}

const AnnotationRender: React.FC<AnnotationRenderProps> = ({ annotation }) => {

  const panel_color = "#00FF00" //light green in hex
  const text_color = "yellow" //light red in hex

  return (
    <>
      {annotation.panels.map((panel, index) => (
        <PanelBoundingBox key={index} bbox={panel.bbox} color={panel_color} opacity={0.2} />
      ))}
      
      {annotation.texts.map((text, index) => (
        <TextBoundingBox key={index} bbox={text.bbox} color={text_color} opacity={0.5} />
      ))}
    
      {1 > 2 && annotation.gemini && annotation.gemini.map((block, index) => (
        <GeminiBoundingBox key={index} block={block}  />
      ))}
    </>
  );
};

export default AnnotationRender;