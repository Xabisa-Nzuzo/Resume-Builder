import React, { useState, useEffect } from 'react';
import { ResumeData, ResumeTemplate } from '../../types';
import ModernTemplate from './templates/ModernTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import { ZoomIn, ZoomOut, Printer } from 'lucide-react';
import Button from '../ui/Button';

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
  onPrint?: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  data, 
  template,
  onPrint,
}) => {
  const [scale, setScale] = useState(0.7);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.3));
  };
  
  const renderTemplate = () => {
    if (!isClient) return null;
    
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} scale={scale} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} scale={scale} />;
      case 'professional':
        return <ProfessionalTemplate data={data} scale={scale} />;
      default:
        return <ModernTemplate data={data} scale={scale} />;
    }
  };
  
  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 p-4 rounded-t-lg flex justify-between items-center border-b border-gray-200">
        <div className="font-medium">Resume Preview</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5 text-gray-600" />
          </button>
          
          <span className="text-sm text-gray-600">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={handleZoomIn}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5 text-gray-600" />
          </button>
          
          {onPrint && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Printer className="h-4 w-4" />}
              onClick={onPrint}
            >
              Print
            </Button>
          )}
        </div>
      </div>
      
      <div className="bg-gray-200 p-8 rounded-b-lg overflow-auto flex justify-center" id="resume-preview-container">
        <div id="resume-content">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;