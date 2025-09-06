import { useState } from 'react';
import { CardCanvas } from './CardCanvas';
import { ControlPanel } from './ControlPanel';

export type CardElement = {
  id: string;
  type: 'text' | 'image';
  content: string;
  style: {
    fontSize?: string;
    fontFamily?: string;
    color?: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation?: number;
  };
};

export function CardBuilder() {
  const [cardElements, setCardElements] = useState<CardElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [cardBackground, setCardBackground] = useState('#ffffff');
  const addTextElement = () => {
    const newElement: CardElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Click to edit text',
      style: {
        fontSize: '16px',
        fontFamily: 'Arial',
        color: '#000000',
        x: 100,
        y: 100
      }
    };
    setCardElements([...cardElements, newElement]);
    setSelectedElement(newElement.id);
  };
  const addImageElement = (imageUrl: string) => {
    const newElement: CardElement = {
      id: `image-${Date.now()}`,
      type: 'image',
      content: imageUrl,
      style: {
        x: 100,
        y: 100,
        width: 200,
        height: 200
      }
    };
    setCardElements([...cardElements, newElement]);
    setSelectedElement(newElement.id);
  };
  const updateElement = (id: string, updates: Partial<CardElement>) => {
    setCardElements(cardElements.map(element => element.id === id ? {
      ...element,
      ...updates
    } : element));
  };
  const deleteElement = (id: string) => {
    setCardElements(cardElements.filter(element => element.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };
  return <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Design Your Card</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <CardCanvas elements={cardElements} background={cardBackground} selectedElement={selectedElement} onSelectElement={setSelectedElement} onUpdateElement={updateElement} />
        </div>
        <div className="lg:w-1/3">
          <ControlPanel elements={cardElements} selectedElement={selectedElement} onAddText={addTextElement} onAddImage={addImageElement} onUpdateElement={updateElement} onDeleteElement={deleteElement} background={cardBackground} onChangeBackground={setCardBackground} />
        </div>
      </div>
    </div>;
}
