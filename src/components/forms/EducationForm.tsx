import React, { useState } from 'react';
import { EducationItem } from '../../types';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { generateId } from '../../utils/helpers';
import { Building, GraduationCap, MapPin, Calendar, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface EducationFormProps {
  data: EducationItem[];
  onAdd: (education: EducationItem) => void;
  onUpdate: (id: string, education: Partial<EducationItem>) => void;
  onRemove: (id: string) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ 
  data, 
  onAdd, 
  onUpdate, 
  onRemove 
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleChange = (id: string, field: keyof EducationItem) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(id, { [field]: e.target.value });
  };
  
  const handleCheckboxChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(id, { current: e.target.checked });
  };
  
  const handleAddEducation = () => {
    const newId = generateId();
    onAdd({
      id: newId,
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      gpa: '',
    });
    
    // Auto-expand the new item
    setExpandedItems(prev => ({
      ...prev,
      [newId]: true
    }));
  };
  
  return (
    <div className="space-y-6">
      {data.map((education) => {
        const isExpanded = expandedItems[education.id] !== false; // Default to expanded
        
        return (
          <div key={education.id} className="border rounded-lg overflow-hidden bg-white">
            <div 
              className="p-4 border-b bg-gray-50 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpanded(education.id)}
            >
              <div>
                <h3 className="font-medium">
                  {education.degree || 'New Degree'} {education.field ? `in ${education.field}` : ''}
                </h3>
                <p className="text-sm text-gray-500">
                  {education.institution || 'Institution Name'}
                  {education.location && ` • ${education.location}`}
                </p>
              </div>
              <div className="flex items-center">
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(education.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {isExpanded ? 
                  <ChevronUp className="ml-2 h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="ml-2 h-5 w-5 text-gray-500" />
                }
              </div>
            </div>
            
            {isExpanded && (
              <div className="p-4 space-y-4">
                <Input
                  label="Institution"
                  placeholder="Harvard University"
                  value={education.institution}
                  onChange={handleChange(education.id, 'institution')}
                  fullWidth
                  leftIcon={<Building className="h-5 w-5" />}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Degree"
                    placeholder="Bachelor of Science"
                    value={education.degree}
                    onChange={handleChange(education.id, 'degree')}
                    fullWidth
                    leftIcon={<GraduationCap className="h-5 w-5" />}
                  />
                  
                  <Input
                    label="Field of Study"
                    placeholder="Computer Science"
                    value={education.field}
                    onChange={handleChange(education.id, 'field')}
                    fullWidth
                  />
                </div>
                
                <Input
                  label="Location"
                  placeholder="Cambridge, MA"
                  value={education.location}
                  onChange={handleChange(education.id, 'location')}
                  fullWidth
                  leftIcon={<MapPin className="h-5 w-5" />}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="month"
                    value={education.startDate}
                    onChange={handleChange(education.id, 'startDate')}
                    fullWidth
                    leftIcon={<Calendar className="h-5 w-5" />}
                  />
                  
                  <div className="space-y-1">
                    <Input
                      label="End Date"
                      type="month"
                      value={education.endDate}
                      onChange={handleChange(education.id, 'endDate')}
                      disabled={education.current}
                      fullWidth
                      leftIcon={<Calendar className="h-5 w-5" />}
                    />
                    
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                        checked={education.current}
                        onChange={handleCheckboxChange(education.id)}
                      />
                      <span className="ml-2 text-sm text-gray-600">Current Student</span>
                    </label>
                  </div>
                </div>
                
                <TextArea
                  label="Description (Optional)"
                  placeholder="Describe your studies, projects, or achievements..."
                  value={education.description || ''}
                  onChange={handleChange(education.id, 'description')}
                  fullWidth
                />
                
                <Input
                  label="GPA (Optional)"
                  placeholder="3.8"
                  value={education.gpa || ''}
                  onChange={handleChange(education.id, 'gpa')}
                  fullWidth
                />
              </div>
            )}
          </div>
        );
      })}
      
      <Button
        variant="outline"
        leftIcon={<Plus className="h-5 w-5" />}
        onClick={handleAddEducation}
        fullWidth
      >
        Add Education
      </Button>
    </div>
  );
};

export default EducationForm;