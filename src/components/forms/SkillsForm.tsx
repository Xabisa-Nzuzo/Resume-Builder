import React, { useState } from 'react';
import { SkillItem } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { generateId } from '../../utils/helpers';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  data: SkillItem[];
  onAdd: (skill: SkillItem) => void;
  onUpdate: (id: string, skill: Partial<SkillItem>) => void;
  onRemove: (id: string) => void;
}

const skillCategories = [
  { value: 'Technical', label: 'Technical' },
  { value: 'Programming Languages', label: 'Programming Languages' },
  { value: 'Frameworks', label: 'Frameworks' },
  { value: 'Tools', label: 'Tools' },
  { value: 'Soft Skills', label: 'Soft Skills' },
  { value: 'Languages', label: 'Languages' },
  { value: 'Design', label: 'Design' },
  { value: 'Database', label: 'Database' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Other', label: 'Other' },
];

const SkillsForm: React.FC<SkillsFormProps> = ({ 
  data, 
  onAdd, 
  onUpdate, 
  onRemove 
}) => {
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Technical',
    level: 3,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(prev => ({
      ...prev,
      name: e.target.value
    }));
  };
  
  const handleCategoryChange = (value: string) => {
    setNewSkill(prev => ({
      ...prev,
      category: value
    }));
  };
  
  const handleLevelChange = (value: string) => {
    setNewSkill(prev => ({
      ...prev,
      level: parseInt(value, 10)
    }));
  };
  
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    
    onAdd({
      id: generateId(),
      ...newSkill
    });
    
    setNewSkill({
      name: '',
      category: 'Technical',
      level: 3,
    });
  };
  
  const handleSkillUpdate = (id: string, field: keyof SkillItem, value: string | number) => {
    onUpdate(id, { [field]: value });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-medium mb-4">Add a New Skill</h3>
        
        <div className="space-y-4">
          <Input
            label="Skill Name"
            placeholder="JavaScript"
            value={newSkill.name}
            onChange={handleInputChange}
            fullWidth
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={skillCategories}
              value={newSkill.category}
              onChange={handleCategoryChange}
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency Level
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={newSkill.level}
                onChange={(e) => handleLevelChange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleAddSkill}
            disabled={!newSkill.name.trim()}
            leftIcon={<Plus className="h-5 w-5" />}
          >
            Add Skill
          </Button>
        </div>
      </div>
      
      {/* Skills List */}
      {data.length > 0 && (
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium mb-4">Your Skills</h3>
          
          <div className="space-y-4">
            {data.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.category}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-primary-500 h-1.5 rounded-full" 
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">{skill.level}/5</span>
                  </div>
                </div>
                
                <button
                  className="ml-4 p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => onRemove(skill.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;