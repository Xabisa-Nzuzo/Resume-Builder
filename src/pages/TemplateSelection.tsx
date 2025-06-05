import React from 'react';
import { motion } from 'framer-motion';
import { useResumeContext } from '../context/ResumeContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import ModernTemplate from '../components/resume/templates/ModernTemplate';
import MinimalistTemplate from '../components/resume/templates/MinimalistTemplate';
import ProfessionalTemplate from '../components/resume/templates/ProfessionalTemplate';

const TemplateSelection: React.FC = () => {
  const { resumeData, settings, updateSettings } = useResumeContext();
  
  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];
  
  const spacingOptions = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'spacious', label: 'Spacious' },
  ];
  
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with a prominent header section.',
      component: <ModernTemplate data={resumeData} scale={0.3} />,
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Elegant and simple design with plenty of whitespace.',
      component: <MinimalistTemplate data={resumeData} scale={0.3} />,
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional two-column layout with emphasis on skills and experience.',
      component: <ProfessionalTemplate data={resumeData} scale={0.3} />,
    },
  ];
  
  const handleTemplateSelect = (templateId: string) => {
    updateSettings({ template: templateId as any });
  };
  
  const handleColorChange = (type: 'primary' | 'secondary' | 'accent') => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      colors: {
        ...settings.colors,
        [type]: e.target.value,
      },
    });
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Choose a Template</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg overflow-hidden transition-all hover:shadow-md ${
                    settings.template === template.id
                      ? 'border-primary-500 ring-2 ring-primary-200'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                    {template.component}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                    
                    <Button
                      variant={settings.template === template.id ? 'primary' : 'outline'}
                      className="mt-3 w-full"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      {settings.template === template.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customize Your Template</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Color settings */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Colors</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={settings.colors.primary}
                      onChange={handleColorChange('primary')}
                      className="h-10 w-full rounded-md border border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secondary Color
                    </label>
                    <input
                      type="color"
                      value={settings.colors.secondary}
                      onChange={handleColorChange('secondary')}
                      className="h-10 w-full rounded-md border border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Accent Color
                    </label>
                    <input
                      type="color"
                      value={settings.colors.accent}
                      onChange={handleColorChange('accent')}
                      className="h-10 w-full rounded-md border border-gray-300"
                    />
                  </div>
                </div>
              </div>
              
              {/* Typography settings */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Typography</h3>
                
                <Select
                  label="Font Size"
                  options={fontSizeOptions}
                  value={settings.fontSize}
                  onChange={(value) => updateSettings({ fontSize: value as any })}
                  fullWidth
                />
                
                <Select
                  label="Spacing"
                  options={spacingOptions}
                  value={settings.spacing}
                  onChange={(value) => updateSettings({ spacing: value as any })}
                  fullWidth
                />
                
                <div className="flex items-center mt-4">
                  <input
                    id="show-photo"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={settings.showPhoto}
                    onChange={(e) => updateSettings({ showPhoto: e.target.checked })}
                  />
                  <label htmlFor="show-photo" className="ml-2 block text-sm text-gray-700">
                    Show profile photo
                  </label>
                </div>
              </div>
              
              {/* Preview colors */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Color Preview</h3>
                
                <div className="space-y-2">
                  <div 
                    className="h-10 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: settings.colors.primary }}
                  >
                    Primary
                  </div>
                  
                  <div 
                    className="h-10 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: settings.colors.secondary }}
                  >
                    Secondary
                  </div>
                  
                  <div 
                    className="h-10 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: settings.colors.accent }}
                  >
                    Accent
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                  These colors will be applied to your selected template.
                </p>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateSelection;