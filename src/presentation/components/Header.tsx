import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <nav className="flex gap-6">
            <Link
              to="/about"
              className={`transition-colors font-medium ${
                isActive('/about')
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Acerca de
            </Link>
            <Link
              to="/faq"
              className={`transition-colors font-medium ${
                isActive('/faq')
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
