import { Link } from 'react-router-dom';
import { PencilLineIcon } from 'lucide-react';

export function Header() {
  return <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-purple-600">
          <PencilLineIcon size={28} />
          <span>SmilePost</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link to="/create" className="text-gray-600 hover:text-purple-600 transition-colors">
            Create Card
          </Link>
          <Link to="/gallery" className="text-gray-600 hover:text-purple-600 transition-colors">
            Gallery
          </Link>
        </nav>
        <Link to="/create" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <PencilLineIcon size={18} />
          <span>Create Card</span>
        </Link>
      </div>
    </header>;
}
