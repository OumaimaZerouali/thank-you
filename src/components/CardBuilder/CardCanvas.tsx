import React from 'react';
import { CardElement } from './CardBuilder';
import Draggable from 'react-draggable';

interface CardCanvasProps {
  elements: CardElement[];
  background: string;
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<CardElement>) => void;
}

export function CardCanvas({
  elements,
  background,
  selectedElement,
  onSelectElement,
  onUpdateElement
}: CardCanvasProps) {
  const handleDragStop = (id: string, e: any, data: {
    x: number;
    y: number;
  }) => {
    onUpdateElement(id, {
      style: {
        ...elements.find(el => el.id === id)?.style,
        x: data.x,
        y: data.y
      }
    });
  };
  return <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Card Header */}
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <h2 className="font-medium">Card Preview</h2>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full aspect-[7/5] overflow-hidden" style={{
      backgroundColor: background
    }} onClick={() => onSelectElement(null)}>
        {elements.map(element => <Draggable key={element.id} defaultPosition={{
        x: element.style.x,
        y: element.style.y
      }} onStop={(e, data) => handleDragStop(element.id, e, data)}>
            <div className={`absolute cursor-move ${selectedElement === element.id ? 'ring-2 ring-blue-500' : ''}`} onClick={e => {
          e.stopPropagation();
          onSelectElement(element.id);
        }}>
              {element.type === 'text' && <div style={{
            color: element.style.color,
            fontFamily: element.style.fontFamily,
            fontSize: element.style.fontSize
          }} className="p-1">
                  {element.content}
                </div>}
              {element.type === 'image' && <img src={element.content} alt="Card element" style={{
            width: element.style.width,
            height: element.style.height
          }} className="object-contain" />}
            </div>
          </Draggable>)}
      </div>

      {/* Card Footer */}
      <div className="bg-gray-100 p-4 border-t border-gray-200 flex justify-between">
        <button className="text-gray-500 text-sm">Card size: 5 × 7</button>
        <button className="text-purple-600 font-medium">
          Preview Full Screen
        </button>
      </div>
    </div>;
}
