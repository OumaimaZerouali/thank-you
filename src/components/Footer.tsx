import { Link } from 'react-router-dom';
import { HeartIcon } from 'lucide-react';

export function Footer() {
  return <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-purple-600">
              SmilePost
            </Link>
            <p className="text-gray-500 mt-1">
              Create and send beautiful digital cards
            </p>
          </div>
          <div className="flex gap-8">
            <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-purple-600 transition-colors">
              Help
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p className="flex items-center justify-center gap-1">
            Made with <HeartIcon size={16} className="text-red-500" /> by
            SmilePost Team
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} CardCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}
