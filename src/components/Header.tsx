import { Link } from 'react-router-dom';
import { PencilLineIcon, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { unifiedAuthService } from '../services/unifiedAuthService';
import { useState } from 'react';

export function Header() {
  const { user, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await unifiedAuthService.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

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
          {user && (
            <>
              <Link to="/create" className="text-gray-600 hover:text-purple-600 transition-colors">
                Create Card
              </Link>
              <Link to="/gallery" className="text-gray-600 hover:text-purple-600 transition-colors">
                Gallery
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
          ) : user ? (
            <>
              <Link
                to="/create"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PencilLineIcon size={18} />
                <span>Create Card</span>
              </Link>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={18} />
                  <span className="text-sm">{user.email}</span>
                </div>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors px-2 py-1 rounded disabled:opacity-50"
                  title="Sign out"
                >
                  <LogOut size={16} />
                  {isLoggingOut ? 'Signing out...' : 'Sign out'}
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/create"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <User size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>;
}
