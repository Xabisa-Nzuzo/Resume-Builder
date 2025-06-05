import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useResumeContext } from '../context/ResumeContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import TextArea from '../components/ui/TextArea';
import { analyzeResume } from '../utils/ats';
import { CheckCircle, XCircle, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

const ATSOptimize: React.FC = () => {
  const { 
    resumeData, 
    atsResult, 
    updateATSResult, 
    jobDescription, 
    updateJobDescription 
  } = useResumeContext();
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateJobDescription(e.target.value);
  };
  
  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const result = analyzeResume(resumeData, jobDescription);
      updateATSResult(result);
      setIsAnalyzing(false);
    }, 1500);
  };
  
  const renderScoreIndicator = () => {
    if (!atsResult) return null;
    
    let color, icon;
    
    if (atsResult.score >= 80) {
      color = 'text-success-500';
      icon = <CheckCircle className="h-6 w-6" />;
    } else if (atsResult.score >= 60) {
      color = 'text-warning-500';
      icon = <AlertCircle className="h-6 w-6" />;
    } else {
      color = 'text-error-500';
      icon = <XCircle className="h-6 w-6" />;
    }
    
    return (
      <div className="flex items-center">
        <span className={`text-4xl font-bold ${color}`}>{atsResult.score}</span>
        <span className="text-xl text-gray-600">/100</span>
        <span className={`ml-2 ${color}`}>{icon}</span>
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ATS Resume Optimization</h1>
            <p className="text-gray-600 mb-6">
              Analyze your resume against job descriptions to ensure it passes Applicant Tracking Systems (ATS).
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Job Description Input */}
              <div>
                <TextArea
                  label="Paste Job Description"
                  placeholder="Paste the full job description here to analyze your resume compatibility..."
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  fullWidth
                  className="h-64"
                />
                
                <div className="mt-4">
                  <Button
                    variant="primary"
                    leftIcon={isAnalyzing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    onClick={handleAnalyze}
                    disabled={!jobDescription.trim() || isAnalyzing}
                    fullWidth
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                  </Button>
                </div>
              </div>
              
              {/* Analysis Results */}
              <div>
                {atsResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">ATS Compatibility Score</h3>
                      {renderScoreIndicator()}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Keyword Matches</h3>
                      {atsResult.matchedKeywords.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {atsResult.matchedKeywords.map((keyword, index) => (
                            <div key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                              {keyword}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No keyword matches found.</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Missing Keywords</h3>
                      {atsResult.missingKeywords.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {atsResult.missingKeywords.map((keyword, index) => (
                            <div key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                              {keyword}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-green-600 text-sm">Great job! Your resume includes all the important keywords.</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Recommendations</h3>
                      {atsResult.recommendations.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {atsResult.recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 text-sm">No recommendations available.</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Formatting Issues</h3>
                      {atsResult.formattingIssues.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {atsResult.formattingIssues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-green-600 text-sm">No formatting issues detected.</p>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-8">
                    <div>
                      <Sparkles className="h-12 w-12 text-gray-300 mx-auto" />
                      <h3 className="mt-4 text-lg font-medium text-gray-700">
                        Paste a job description and analyze your resume
                      </h3>
                      <p className="mt-2 text-gray-500">
                        We'll check your resume's compatibility with the job requirements and provide optimization suggestions.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ATSOptimize;