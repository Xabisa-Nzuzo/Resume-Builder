import React from 'react';
import { PersonalInfo } from '../../types';
import Input from '../ui/Input';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: Partial<PersonalInfo>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [field]: e.target.value });
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          value={data.firstName}
          onChange={handleChange('firstName')}
          fullWidth
          leftIcon={<User className="h-5 w-5" />}
        />
        
        <Input
          label="Last Name"
          placeholder="Doe"
          value={data.lastName}
          onChange={handleChange('lastName')}
          fullWidth
          leftIcon={<User className="h-5 w-5" />}
        />
      </div>
      
      <Input
        label="Professional Title"
        placeholder="Senior Software Engineer"
        value={data.title}
        onChange={handleChange('title')}
        fullWidth
        leftIcon={<Briefcase className="h-5 w-5" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          placeholder="john.doe@example.com"
          type="email"
          value={data.email}
          onChange={handleChange('email')}
          fullWidth
          leftIcon={<Mail className="h-5 w-5" />}
        />
        
        <Input
          label="Phone"
          placeholder="(123) 456-7890"
          value={data.phone}
          onChange={handleChange('phone')}
          fullWidth
          leftIcon={<Phone className="h-5 w-5" />}
        />
      </div>
      
      <Input
        label="Location"
        placeholder="New York, NY"
        value={data.location}
        onChange={handleChange('location')}
        fullWidth
        leftIcon={<MapPin className="h-5 w-5" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Website (Optional)"
          placeholder="yourwebsite.com"
          value={data.website || ''}
          onChange={handleChange('website')}
          fullWidth
          leftIcon={<Globe className="h-5 w-5" />}
        />
        
        <Input
          label="LinkedIn (Optional)"
          placeholder="linkedin.com/in/yourusername"
          value={data.linkedin || ''}
          onChange={handleChange('linkedin')}
          fullWidth
          leftIcon={<Linkedin className="h-5 w-5" />}
        />
      </div>
      
      <Input
        label="GitHub (Optional)"
        placeholder="github.com/yourusername"
        value={data.github || ''}
        onChange={handleChange('github')}
        fullWidth
        leftIcon={<Github className="h-5 w-5" />}
      />
    </div>
  );
};

export default PersonalInfoForm;