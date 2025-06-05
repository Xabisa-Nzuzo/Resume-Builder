import React from 'react';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { MessageSquare, Sparkles } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
  onGenerateSuggestion?: () => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ 
  summary, 
  onChange,
  onGenerateSuggestion 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="space-y-4">
      <TextArea
        label="Professional Summary"
        placeholder="Write a concise overview of your professional background, key skills, and career goals..."
        value={summary}
        onChange={handleChange}
        fullWidth
        helperText="Aim for 3-5 sentences that highlight your strongest qualifications and most relevant experience."
      />
      
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <div className="flex items-start">
          <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-700">Tips for a Great Summary</h4>
            <ul className="mt-2 text-sm text-blue-600 space-y-1">
              <li>• Start with a strong adjective to describe your professional persona</li>
              <li>• Include your years of experience and specialized areas</li>
              <li>• Mention 2-3 of your biggest achievements with metrics</li>
              <li>• Tailor it to match the specific job description</li>
              <li>• Keep it under 4-5 sentences for better readability</li>
            </ul>
          </div>
        </div>
        
        {onGenerateSuggestion && (
          <Button
            className="mt-3 ml-8"
            variant="outline"
            size="sm"
            leftIcon={<Sparkles className="h-4 w-4" />}
            onClick={onGenerateSuggestion}
          >
            Generate Suggestion
          </Button>
        )}
      </div>
    </div>
  );
};

export default SummaryForm;