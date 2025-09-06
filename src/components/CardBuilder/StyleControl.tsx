import { CardElement } from './CardBuilder';
import { PaintBucketIcon } from 'lucide-react';

interface StyleControlProps {
  background: string;
  onChangeBackground: (color: string) => void;
  selectedElement: CardElement | undefined;
  onUpdateElement: (id: string, updates: Partial<CardElement>) => void;
}

export function StyleControl({
  background,
  onChangeBackground,
}: StyleControlProps) {
  const backgroundColors = ['#ffffff', '#f8f9fa', '#e9ecef', '#f8f0fc', '#ebf4ff', '#ebfbee', '#fff5f5', '#fff9db' // light yellow
  ];
  return <div className="space-y-6">
      <div>
        <h3 className="font-medium flex items-center gap-2 mb-3">
          <PaintBucketIcon size={18} />
          Card Background
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {backgroundColors.map((color, index) => <button key={index} className={`w-full h-12 rounded-md border ${background === color ? 'ring-2 ring-purple-500 border-purple-500' : 'border-gray-200'}`} style={{
          backgroundColor: color
        }} onClick={() => onChangeBackground(color)} />)}
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Color
          </label>
          <input type="color" value={background} onChange={e => onChangeBackground(e.target.value)} className="w-full h-10 p-1 border border-gray-300 rounded-md" />
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200">
        <h3 className="font-medium mb-3">Card Templates</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="border border-gray-200 rounded-md p-3 hover:border-purple-400 transition-colors">
            <div className="bg-blue-50 h-24 mb-2 rounded flex items-center justify-center text-blue-500">
              Birthday
            </div>
            <p className="text-sm text-gray-700">Birthday Card</p>
          </button>
          <button className="border border-gray-200 rounded-md p-3 hover:border-purple-400 transition-colors">
            <div className="bg-red-50 h-24 mb-2 rounded flex items-center justify-center text-red-500">
              Love
            </div>
            <p className="text-sm text-gray-700">Valentine's Day</p>
          </button>
          <button className="border border-gray-200 rounded-md p-3 hover:border-purple-400 transition-colors">
            <div className="bg-green-50 h-24 mb-2 rounded flex items-center justify-center text-green-500">
              Congrats
            </div>
            <p className="text-sm text-gray-700">Congratulations</p>
          </button>
          <button className="border border-gray-200 rounded-md p-3 hover:border-purple-400 transition-colors">
            <div className="bg-yellow-50 h-24 mb-2 rounded flex items-center justify-center text-yellow-600">
              Thank You
            </div>
            <p className="text-sm text-gray-700">Thank You Card</p>
          </button>
        </div>
      </div>
    </div>;
}
