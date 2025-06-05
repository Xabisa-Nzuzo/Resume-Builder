export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  gpa?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages?: { name: string; proficiency: string }[];
  certifications?: { name: string; issuer: string; date: string; url?: string }[];
  projects?: { name: string; description: string; url?: string; technologies?: string[] }[];
  interests?: string[];
}

export interface ATSResult {
  score: number;
  missingKeywords: string[];
  recommendations: string[];
  formattingIssues: string[];
}

export type ResumeTemplate = 'modern' | 'minimalist' | 'professional';

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ResumeSettings {
  template: ResumeTemplate;
  colors: TemplateColors;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'spacious';
  showPhoto: boolean;
}