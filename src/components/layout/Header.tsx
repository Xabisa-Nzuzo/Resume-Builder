import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Settings, Download, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-primary-600">
              <FileText className="h-6 w-6 mr-2" />
              <span>ResumeGenius</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Editor
            </Link>
            <Link
              to="/templates"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/templates') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Templates
            </Link>
            <Link
              to="/optimize"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/optimize') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ATS Optimize
            </Link>
            <Link
              to="/export"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/export') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Export
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Settings className="h-4 w-4" />}
              className="hidden md:flex"
              onClick={() => {}}
            >
              Settings
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => {}}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="grid grid-cols-4 divide-x divide-gray-200">
          <Link
            to="/"
            className={`flex flex-col items-center py-2 ${
              isActive('/') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs mt-1">Editor</span>
          </Link>
          
          <Link
            to="/templates"
            className={`flex flex-col items-center py-2 ${
              isActive('/templates') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Templates</span>
          </Link>
          
          <Link
            to="/optimize"
            className={`flex flex-col items-center py-2 ${
              isActive('/optimize') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <CheckCircle className="h-5 w-5" />
            <span className="text-xs mt-1">Optimize</span>
          </Link>
          
          <Link
            to="/export"
            className={`flex flex-col items-center py-2 ${
              isActive('/export') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <Download className="h-5 w-5" />
            <span className="text-xs mt-1">Export</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;