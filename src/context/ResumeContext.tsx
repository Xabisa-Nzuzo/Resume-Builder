import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, ResumeSettings, ATSResult } from '../types';
import { initialResumeData } from '../utils/initialData';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  addExperience: (experience: ResumeData['experience'][0]) => void;
  updateExperience: (id: string, experience: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: ResumeData['education'][0]) => void;
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: ResumeData['skills'][0]) => void;
  updateSkill: (id: string, skill: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  settings: ResumeSettings;
  updateSettings: (settings: Partial<ResumeSettings>) => void;
  atsResult: ATSResult | null;
  updateATSResult: (result: ATSResult) => void;
  jobDescription: string;
  updateJobDescription: (description: string) => void;
  resetData: () => void;
}

const defaultSettings: ResumeSettings = {
  template: 'modern',
  colors: {
    primary: '#0F52BA',
    secondary: '#20B2AA',
    accent: '#8A2BE2',
  },
  fontSize: 'medium',
  spacing: 'normal',
  showPhoto: false,
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = getFromLocalStorage('resumeData');
    return savedData ? JSON.parse(savedData) : initialResumeData;
  });

  const [settings, setSettings] = useState<ResumeSettings>(() => {
    const savedSettings = getFromLocalStorage('resumeSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  const [atsResult, setATSResult] = useState<ATSResult | null>(() => {
    const savedResult = getFromLocalStorage('atsResult');
    return savedResult ? JSON.parse(savedResult) : null;
  });

  const [jobDescription, setJobDescription] = useState<string>(() => {
    const savedDescription = getFromLocalStorage('jobDescription');
    return savedDescription || '';
  });

  useEffect(() => {
    saveToLocalStorage('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    saveToLocalStorage('resumeSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (atsResult) {
      saveToLocalStorage('atsResult', JSON.stringify(atsResult));
    }
  }, [atsResult]);

  useEffect(() => {
    saveToLocalStorage('jobDescription', jobDescription);
  }, [jobDescription]);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  const updatePersonalInfo = (data: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const addExperience = (experience: ResumeData['experience'][0]) => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, experience],
    }));
  };

  const updateExperience = (id: string, experience: Partial<ResumeData['experience'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(item =>
        item.id === id ? { ...item, ...experience } : item
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id),
    }));
  };

  const addEducation = (education: ResumeData['education'][0]) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, education],
    }));
  };

  const updateEducation = (id: string, education: Partial<ResumeData['education'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item =>
        item.id === id ? { ...item, ...education } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id),
    }));
  };

  const addSkill = (skill: ResumeData['skills'][0]) => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const updateSkill = (id: string, skill: Partial<ResumeData['skills'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(item =>
        item.id === id ? { ...item, ...skill } : item
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id),
    }));
  };

  const updateSettings = (newSettings: Partial<ResumeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateATSResult = (result: ATSResult) => {
    setATSResult(result);
  };

  const updateJobDescription = (description: string) => {
    setJobDescription(description);
  };

  const resetData = () => {
    setResumeData(initialResumeData);
    setSettings(defaultSettings);
    setATSResult(null);
    setJobDescription('');
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        settings,
        updateSettings,
        atsResult,
        updateATSResult,
        jobDescription,
        updateJobDescription,
        resetData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};