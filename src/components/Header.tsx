import React from 'react';
import type { View } from '../types';

interface NavLinkProps {
  view: View;
  title: string;
  currentView: View;
  onNavigate: (view: View) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ view, title, currentView, onNavigate }) => {
  const isActive = view === currentView;
  const activeClasses = 'text-secondary-600 dark:text-white font-semibold border-b-2 border-secondary-600 dark:border-white';
  const inactiveClasses = 'text-gray-900 dark:text-gray-100 hover:text-secondary-600 dark:hover:text-white transition-all duration-200';
  
  return (
    <button
      onClick={() => onNavigate(view)}
      className={`px-4 py-3 text-sm sm:text-base font-medium ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {title}
    </button>
  );
};


interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, theme, onToggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo a la izquierda */}
          <div className="flex-shrink-0">
            <img 
              className={`w-auto ${theme === 'light' ? 'h-12' : 'h-16'}`} 
              src={theme === 'light' 
                ? "/logo-light.png"
                : "/logo-dark.png"
              } 
              alt="Logo"
              onError={(e) => {
                // Si falla la carga, intentar con la URL externa
                const target = e.target as HTMLImageElement;
                if (theme === 'light') {
                  target.src = "https://www.webcincodev.com/blog/wp-content/uploads/2025/09/logoclaro.png";
                } else {
                  target.src = "https://www.webcincodev.com/blog/wp-content/uploads/2025/09/logo-dark.png";
                }
              }}
            />
          </div>
          
          {/* Menú de navegación centrado */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex items-center space-x-1 sm:space-x-4">
              <NavLink view="home" title="Inicio" currentView={currentView} onNavigate={onNavigate} />
              <NavLink view="test" title="Test" currentView={currentView} onNavigate={onNavigate} />
              <NavLink view="results" title="Resultados" currentView={currentView} onNavigate={onNavigate} />
              <NavLink view="settings" title="Políticas" currentView={currentView} onNavigate={onNavigate} />
            </nav>
          </div>
          
          {/* Controles a la derecha */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition-all duration-200 shadow-sm border border-primary-200 dark:border-primary-700"
              aria-label={theme === 'light' ? 'cambiar a modo oscuro' : 'cambiar a modo claro'}
            >
              {theme === 'light' ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;