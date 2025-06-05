import React, { useState } from 'react';
import { ExperienceItem } from '../../types';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { generateId } from '../../utils/helpers';
import { Building, Briefcase, MapPin, Calendar, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceFormProps {
  data: ExperienceItem[];
  onAdd: (experience: ExperienceItem) => void;
  onUpdate: (id: string, experience: Partial<ExperienceItem>) => void;
  onRemove: (id: string) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
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
  
  const handleChange = (id: string, field: keyof ExperienceItem) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(id, { [field]: e.target.value });
  };
  
  const handleCheckboxChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(id, { current: e.target.checked });
  };
  
  const handleAchievementChange = (id: string, index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAchievements = [...data.find(exp => exp.id === id)!.achievements];
    newAchievements[index] = e.target.value;
    onUpdate(id, { achievements: newAchievements });
  };
  
  const addAchievement = (id: string) => {
    const newAchievements = [...data.find(exp => exp.id === id)!.achievements, ''];
    onUpdate(id, { achievements: newAchievements });
  };
  
  const removeAchievement = (id: string, index: number) => {
    const newAchievements = [...data.find(exp => exp.id === id)!.achievements];
    newAchievements.splice(index, 1);
    onUpdate(id, { achievements: newAchievements });
  };
  
  const handleAddExperience = () => {
    const newId = generateId();
    onAdd({
      id: newId,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    });
    
    // Auto-expand the new item
    setExpandedItems(prev => ({
      ...prev,
      [newId]: true
    }));
  };
  
  return (
    <div className="space-y-6">
      {data.map((experience) => {
        const isExpanded = expandedItems[experience.id] !== false; // Default to expanded
        
        return (
          <div key={experience.id} className="border rounded-lg overflow-hidden bg-white">
            <div 
              className="p-4 border-b bg-gray-50 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpanded(experience.id)}
            >
              <div>
                <h3 className="font-medium">
                  {experience.position || 'New Position'}
                </h3>
                <p className="text-sm text-gray-500">
                  {experience.company || 'Company Name'}
                  {experience.location && ` • ${experience.location}`}
                </p>
              </div>
              <div className="flex items-center">
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(experience.id);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    placeholder="Google"
                    value={experience.company}
                    onChange={handleChange(experience.id, 'company')}
                    fullWidth
                    leftIcon={<Building className="h-5 w-5" />}
                  />
                  
                  <Input
                    label="Position"
                    placeholder="Senior Software Engineer"
                    value={experience.position}
                    onChange={handleChange(experience.id, 'position')}
                    fullWidth
                    leftIcon={<Briefcase className="h-5 w-5" />}
                  />
                </div>
                
                <Input
                  label="Location"
                  placeholder="Mountain View, CA"
                  value={experience.location}
                  onChange={handleChange(experience.id, 'location')}
                  fullWidth
                  leftIcon={<MapPin className="h-5 w-5" />}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="month"
                    value={experience.startDate}
                    onChange={handleChange(experience.id, 'startDate')}
                    fullWidth
                    leftIcon={<Calendar className="h-5 w-5" />}
                  />
                  
                  <div className="space-y-1">
                    <Input
                      label="End Date"
                      type="month"
                      value={experience.endDate}
                      onChange={handleChange(experience.id, 'endDate')}
                      disabled={experience.current}
                      fullWidth
                      leftIcon={<Calendar className="h-5 w-5" />}
                    />
                    
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                        checked={experience.current}
                        onChange={handleCheckboxChange(experience.id)}
                      />
                      <span className="ml-2 text-sm text-gray-600">Current Position</span>
                    </label>
                  </div>
                </div>
                
                <TextArea
                  label="Description"
                  placeholder="Describe your role and responsibilities..."
                  value={experience.description}
                  onChange={handleChange(experience.id, 'description')}
                  fullWidth
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Achievements
                  </label>
                  
                  {experience.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        placeholder="Increased sales by 20% through..."
                        value={achievement}
                        onChange={handleAchievementChange(experience.id, index)}
                        fullWidth
                        className="flex-grow"
                      />
                      
                      <button
                        className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                        onClick={() => removeAchievement(experience.id, index)}
                        disabled={experience.achievements.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Plus className="h-4 w-4" />}
                    onClick={() => addAchievement(experience.id)}
                    className="mt-2"
                  >
                    Add Achievement
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      <Button
        variant="outline"
        leftIcon={<Plus className="h-5 w-5" />}
        onClick={handleAddExperience}
        fullWidth
      >
        Add Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;