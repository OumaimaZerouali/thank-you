import React, { useState } from 'react';
import { CardElement } from './CardBuilder';
import { TextControl } from './TextControl';
import { ImageControl } from './ImageControl';
import { StyleControl } from './StyleControl';
import { SendCard } from './SendCard';
import { TypeIcon, ImageIcon, PaintBucketIcon, SendIcon, TrashIcon } from 'lucide-react';

interface ControlPanelProps {
  elements: CardElement[];
  selectedElement: string | null;
  onAddText: () => void;
  onAddImage: (imageUrl: string) => void;
  onUpdateElement: (id: string, updates: Partial<CardElement>) => void;
  onDeleteElement: (id: string) => void;
  background: string;
  onChangeBackground: (color: string) => void;
}

export function ControlPanel({
  elements,
  selectedElement,
  onAddText,
  onAddImage,
  onUpdateElement,
  onDeleteElement,
  background,
  onChangeBackground
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState('text');
  const selectedElementData = elements.find(el => el.id === selectedElement);
  return <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Control Panel Header */}
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <h2 className="font-medium">Card Editor</h2>
      </div>

    {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${activeTab === 'text' ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`} onClick={() => setActiveTab('text')}>
          <TypeIcon size={18} />
          <span>Text</span>
        </button>
        <button className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${activeTab === 'image' ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`} onClick={() => setActiveTab('image')}>
          <ImageIcon size={18} />
          <span>Images</span>
        </button>
        <button className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${activeTab === 'style' ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`} onClick={() => setActiveTab('style')}>
          <PaintBucketIcon size={18} />
          <span>Style</span>
        </button>
        <button className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${activeTab === 'send' ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`} onClick={() => setActiveTab('send')}>
          <SendIcon size={18} />
          <span>Send</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'text' && <TextControl onAddText={onAddText} selectedElement={selectedElementData} onUpdateElement={onUpdateElement} />}
        {activeTab === 'image' && <ImageControl onAddImage={onAddImage} selectedElement={selectedElementData} onUpdateElement={onUpdateElement} />}
        {activeTab === 'style' && <StyleControl background={background} onChangeBackground={onChangeBackground} selectedElement={selectedElementData} onUpdateElement={onUpdateElement} />}
        {activeTab === 'send' && <SendCard />}
        {/* Delete Button (only when an element is selected) */}
        {selectedElement && <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors" onClick={() => onDeleteElement(selectedElement)}>
              <TrashIcon size={18} />
              <span>Delete Element</span>
            </button>
          </div>}
      </div>
    </div>;
}
