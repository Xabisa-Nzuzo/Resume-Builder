import React, { useRef, useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import Layout from '../components/layout/Layout';
import ResumePreview from '../components/resume/ResumePreview';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { exportToPDF, exportToHTML, exportToDOCX } from '../utils/export';
import { Download, FileType, Code, File as FilePdf, Check } from 'lucide-react';

const Export: React.FC = () => {
  const { resumeData, settings } = useResumeContext();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [fileName, setFileName] = useState('my-resume');
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async (format: 'pdf' | 'html' | 'docx') => {
    try {
      setIsExporting(true);
      setExportSuccess(null);
      
      const formattedFileName = `${fileName}.${format}`;
      
      switch (format) {
        case 'pdf':
          await exportToPDF('resume-content', formattedFileName);
          break;
        case 'html':
          exportToHTML('resume-content', formattedFileName);
          break;
        case 'docx':
          await exportToDOCX(resumeData, formattedFileName);
          break;
      }
      
      setExportSuccess(format);
      setTimeout(() => setExportSuccess(null), 3000);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Export Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Export Options</h1>
                
                <div className="space-y-6">
                  <Input
                    label="File Name"
                    value={fileName}
                    onChange={handleFileNameChange}
                    fullWidth
                  />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Select Format</h3>
                    
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        leftIcon={<FilePdf className="h-5 w-5" />}
                        onClick={() => handleExport('pdf')}
                        fullWidth
                        isLoading={isExporting && exportSuccess === 'pdf'}
                        disabled={isExporting}
                        rightIcon={exportSuccess === 'pdf' ? <Check className="h-4 w-4 text-green-500" /> : undefined}
                      >
                        Export as PDF
                      </Button>
                      
                      <Button
                        variant="outline"
                        leftIcon={<FileType className="h-5 w-5" />}
                        onClick={() => handleExport('docx')}
                        fullWidth
                        isLoading={isExporting && exportSuccess === 'docx'}
                        disabled={isExporting}
                        rightIcon={exportSuccess === 'docx' ? <Check className="h-4 w-4 text-green-500" /> : undefined}
                      >
                        Export as DOCX
                      </Button>
                      
                      <Button
                        variant="outline"
                        leftIcon={<Code className="h-5 w-5" />}
                        onClick={() => handleExport('html')}
                        fullWidth
                        isLoading={isExporting && exportSuccess === 'html'}
                        disabled={isExporting}
                        rightIcon={exportSuccess === 'html' ? <Check className="h-4 w-4 text-green-500" /> : undefined}
                      >
                        Export as HTML
                      </Button>
                    </div>
                  </div>
                  
                  {exportSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">
                            Your resume has been successfully exported as {exportSuccess.toUpperCase()}!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="font-medium text-blue-700 mb-2">Export Tips</h4>
                    <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                      <li>PDF is recommended for most job applications</li>
                      <li>DOCX is useful if you need to make edits in Microsoft Word</li>
                      <li>HTML can be used for online portfolios or websites</li>
                      <li>Always review your exported resume before submitting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <ResumePreview 
              data={resumeData} 
              template={settings.template}
              onPrint={() => handleExport('pdf')}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Export;