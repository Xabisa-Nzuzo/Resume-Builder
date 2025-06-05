import React from 'react';
import { ResumeData } from '../../../types';
import { formatDate, calculateDuration } from '../../../utils/helpers';

interface ProfessionalTemplateProps {
  data: ResumeData;
  scale?: number;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, scale = 1 }) => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  return (
    <div 
      className="bg-white shadow-lg w-[210mm] mx-auto"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Header */}
      <header className="bg-secondary-600 text-white p-8">
        <h1 className="text-3xl font-bold text-center">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl mt-1 text-center text-secondary-100">
          {personalInfo.title}
        </h2>
        
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 text-sm">
          {personalInfo.email && (
            <span>{personalInfo.email}</span>
          )}
          
          {personalInfo.phone && (
            <span>{personalInfo.phone}</span>
          )}
          
          {personalInfo.location && (
            <span>{personalInfo.location}</span>
          )}
          
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {personalInfo.website.replace(/(^\w+:|^)\/\//, '')}
            </a>
          )}
          
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          )}
          
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
          )}
        </div>
      </header>
      
      {/* Two column layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left column */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-secondary-600 border-b-2 border-secondary-200 pb-1 mb-3">
                Skills
              </h3>
              
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.category}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-secondary-500 h-1.5 rounded-full" 
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-bold text-secondary-600 border-b-2 border-secondary-200 pb-1 mb-3">
                Education
              </h3>
              
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <div className="text-gray-700">{edu.field}</div>
                  <div className="text-gray-600">{edu.institution}</div>
                  <div className="text-gray-500 text-sm">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                  {edu.gpa && (
                    <div className="text-sm text-gray-600 mt-1">
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
          
          {/* Certifications or additional sections can go here */}
        </div>
        
        {/* Right column */}
        <div className="w-full md:w-2/3 p-6">
          {/* Summary */}
          {summary && (
            <section>
              <h3 className="text-lg font-bold text-secondary-600 border-b-2 border-secondary-200 pb-1 mb-3">
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
              <h3 className="text-lg font-bold text-secondary-600 border-b-2 border-secondary-200 pb-1 mb-3">
                Experience
              </h3>
              
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{exp.position}</h4>
                      <h5 className="text-gray-700">{exp.company}, {exp.location}</h5>
                    </div>
                    <div className="text-right text-gray-600 text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
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
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;