import React from 'react';
import { ResumeData } from '../../../types';
import { formatDate, calculateDuration } from '../../../utils/helpers';
import { Phone, Mail, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
  scale?: number;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, scale = 1 }) => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  return (
    <div 
      className="bg-white shadow-lg w-[210mm] mx-auto"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Header */}
      <header className="bg-primary-600 text-white p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl font-bold">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className="text-xl mt-1 text-primary-100">
              {personalInfo.title}
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <div className="flex items-center justify-end mt-1">
              <Mail className="h-4 w-4 mr-2" />
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center justify-end mt-1">
              <Phone className="h-4 w-4 mr-2" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center justify-end mt-1">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{personalInfo.location}</span>
            </div>
            
            {personalInfo.website && (
              <div className="flex items-center justify-end mt-1">
                <Globe className="h-4 w-4 mr-2" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.website.replace(/(^\w+:|^)\/\//, '')}
                </a>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center justify-end mt-1">
                <Linkedin className="h-4 w-4 mr-2" />
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.linkedin.replace(/(^\w+:|^)\/\//, '').replace('linkedin.com/in/', '')}
                </a>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center justify-end mt-1">
                <Github className="h-4 w-4 mr-2" />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.github.replace(/(^\w+:|^)\/\//, '').replace('github.com/', '')}
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="p-8">
        {/* Summary */}
        {summary && (
          <section>
            <h3 className="text-lg font-bold text-primary-600 border-b-2 border-primary-200 pb-1 mb-3">
              Professional Summary
            </h3>
            <p className="text-gray-700">
              {summary}
            </p>
          </section>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mt-6">
            <h3 className="text-lg font-bold text-primary-600 border-b-2 border-primary-200 pb-1 mb-3">
              Experience
            </h3>
            
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h4 className="font-bold">{exp.position}</h4>
                    <h5 className="text-gray-700">{exp.company}, {exp.location}</h5>
                  </div>
                  <div className="md:text-right mt-1 md:mt-0">
                    <span className="text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                    <div className="text-sm text-gray-500">
                      {calculateDuration(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                </div>
                
                {exp.description && (
                  <p className="mt-2 text-gray-700">
                    {exp.description}
                  </p>
                )}
                
                {exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                  <ul className="mt-2 list-disc list-inside text-gray-700">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section className="mt-6">
            <h3 className="text-lg font-bold text-primary-600 border-b-2 border-primary-200 pb-1 mb-3">
              Education
            </h3>
            
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                    <h5 className="text-gray-700">{edu.institution}, {edu.location}</h5>
                  </div>
                  <div className="md:text-right mt-1 md:mt-0">
                    <span className="text-gray-600">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </span>
                    {edu.gpa && (
                      <div className="text-sm text-gray-500">
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                </div>
                
                {edu.description && (
                  <p className="mt-2 text-gray-700">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section className="mt-6">
            <h3 className="text-lg font-bold text-primary-600 border-b-2 border-primary-200 pb-1 mb-3">
              Skills
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;