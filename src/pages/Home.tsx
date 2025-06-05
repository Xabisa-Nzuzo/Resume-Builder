import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '../types';
import { useResumeContext } from '../context/ResumeContext';
import Layout from '../components/layout/Layout';
import ResumePreview from '../components/resume/ResumePreview';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import SummaryForm from '../components/forms/SummaryForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import Button from '../components/ui/Button';
import { Save, ArrowLeft, ArrowRight, FileText, User, Briefcase, GraduationCap, Award } from 'lucide-react';

const tabs: Tab[] = [
  { id: 'personal', label: 'Personal Info', icon: <User className="h-5 w-5" /> },
  { id: 'summary', label: 'Summary', icon: <FileText className="h-5 w-5" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="h-5 w-5" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="h-5 w-5" /> },
  { id: 'skills', label: 'Skills', icon: <Award className="h-5 w-5" /> },
];

const Home: React.FC = () => {
  const { 
    resumeData, 
    updatePersonalInfo, 
    updateResumeData,
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
  } = useResumeContext();
  
  const [activeTab, setActiveTab] = useState<string>('personal');
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  const handleNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };
  
  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={updatePersonalInfo}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            summary={resumeData.summary}
            onChange={(summary) => updateResumeData({ summary })}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onRemove={removeExperience}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onAdd={addSkill}
            onUpdate={updateSkill}
            onRemove={removeSkill}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Form */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Tabs */}
              <div className="border-b">
                <div className="sm:hidden">
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={activeTab}
                    onChange={(e) => handleTabChange(e.target.value)}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="hidden sm:block">
                  <nav className="flex space-x-4 px-4 py-2 overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                          activeTab === tab.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => handleTabChange(tab.id)}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              
              {/* Tab content */}
              <div className="p-6">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </div>
              
              {/* Navigation buttons */}
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
                <Button
                  variant="outline"
                  leftIcon={<ArrowLeft className="h-4 w-4" />}
                  onClick={handlePrevious}
                  disabled={activeTab === tabs[0].id}
                >
                  Previous
                </Button>
                
                <Button
                  variant="primary"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  onClick={handleNext}
                  disabled={activeTab === tabs[tabs.length - 1].id}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right column - Preview */}
          <div className="w-full md:w-1/2">
            <ResumePreview 
              data={resumeData} 
              template={settings.template}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;