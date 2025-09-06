import { CardElement } from './CardBuilder';
import { PlusCircleIcon } from 'lucide-react';

interface TextControlProps {
  onAddText: () => void;
  selectedElement: CardElement | undefined;
  onUpdateElement: (id: string, updates: Partial<CardElement>) => void;
}

export function TextControl({
  onAddText,
  selectedElement,
  onUpdateElement
}: TextControlProps) {
  const isTextSelected = selectedElement && selectedElement.type === 'text';
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isTextSelected) {
      onUpdateElement(selectedElement.id, {
        content: e.target.value
      });
    }
  };
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isTextSelected) {
      onUpdateElement(selectedElement.id, {
        style: {
          ...selectedElement.style,
          fontFamily: e.target.value
        }
      });
    }
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTextSelected) {
      onUpdateElement(selectedElement.id, {
        style: {
          ...selectedElement.style,
          color: e.target.value
        }
      });
    }
  };
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isTextSelected) {
      onUpdateElement(selectedElement.id, {
        style: {
          ...selectedElement.style,
          fontSize: e.target.value
        }
      });
    }
  };
  return <div>
      <button className="w-full py-3 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors mb-6" onClick={onAddText}>
        <PlusCircleIcon size={20} />
        <span>Add New Text</span>
      </button>
      {isTextSelected ? <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edit Text
            </label>
            <textarea value={selectedElement.content} onChange={handleTextChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Family
              </label>
              <select value={selectedElement.style.fontFamily} onChange={handleFontChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <select value={selectedElement.style.fontSize} onChange={handleFontSizeChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="24px">24px</option>
                <option value="32px">32px</option>
                <option value="48px">48px</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Color
            </label>
            <input type="color" value={selectedElement.style.color} onChange={handleColorChange} className="w-full h-10 p-1 border border-gray-300 rounded-md" />
          </div>
        </div> : <div className="text-center py-6 text-gray-500">
          <p>Select a text element on the card to edit it, or add a new one.</p>
        </div>}
    </div>;
}
