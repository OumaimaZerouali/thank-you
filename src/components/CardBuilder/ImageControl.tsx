import React, { useState } from 'react';
import { CardElement } from './CardBuilder';
import { UploadIcon } from 'lucide-react';

interface ImageControlProps {
  onAddImage: (imageUrl: string) => void;
  selectedElement: CardElement | undefined;
  onUpdateElement: (id: string, updates: Partial<CardElement>) => void;
}

export function ImageControl({
  onAddImage,
  selectedElement,
  onUpdateElement
}: ImageControlProps) {
  const [imageUrl, setImageUrl] = useState('');
  const isImageSelected = selectedElement && selectedElement.type === 'image';
  const handleAddImage = () => {
    if (imageUrl) {
      onAddImage(imageUrl);
      setImageUrl('');
    }
  };
  const handleSizeChange = (dimension: 'width' | 'height', value: string) => {
    if (isImageSelected) {
      onUpdateElement(selectedElement.id, {
        style: {
          ...selectedElement.style,
          [dimension]: parseInt(value)
        }
      });
    }
  };
  // Sample stock images
  const stockImages = ['https://images.unsplash.com/photo-1496483648148-47c686dc86a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'];
  return <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Add Image from URL
        </label>
        <div className="flex gap-2">
          <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Paste image URL here" className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
          <button className="bg-purple-600 text-white px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center" onClick={handleAddImage}>
            <UploadIcon size={18} />
          </button>
        </div>
      </div>
      {isImageSelected && <div className="mb-6 space-y-4">
          <h3 className="font-medium">Adjust Image Size</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width
              </label>
              <input type="number" value={selectedElement.style.width} onChange={e => handleSizeChange('width', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <input type="number" value={selectedElement.style.height} onChange={e => handleSizeChange('height', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
            </div>
          </div>
        </div>}
      <div>
        <h3 className="font-medium mb-3">Stock Images</h3>
        <div className="grid grid-cols-2 gap-3">
          {stockImages.map((img, index) => <div key={index} className="border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:border-purple-400 transition-colors" onClick={() => onAddImage(img)}>
              <img src={img} alt={`Stock image ${index + 1}`} className="w-full h-24 object-cover" />
            </div>)}
        </div>
      </div>
    </div>;
}
