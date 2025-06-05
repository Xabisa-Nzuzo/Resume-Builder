import React from 'react';
import { ResumeData } from '../../../types';
import { formatDate, calculateDuration } from '../../../utils/helpers';

interface MinimalistTemplateProps {
  data: ResumeData;
  scale?: number;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ data, scale = 1 }) => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  return (
    <div 
      className="bg-white shadow-lg w-[210mm] mx-auto font-serif"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Header */}
      <header className="p-8 text-center border-b">
        <h1 className="text-3xl font-light tracking-wide uppercase">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-lg text-gray-600 mt-1">
          {personalInfo.title}
        </h2>
        
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 text-sm text-gray-600">
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
      
      {/* Content */}
      <div className="p-8">
        {/* Summary */}
        {summary && (
          <section>
            <h3 className="text-lg uppercase tracking-wide font-light mb-3">
              Profile
            </h3>
            <p className="text-gray-700">
              {summary}
            </p>
          </section>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mt-6">
            <h3 className="text-lg uppercase tracking-wide font-light mb-3">
              Experience
            </h3>
            
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h4 className="font-medium">{exp.position}</h4>
                    <h5 className="text-gray-600">{exp.company}, {exp.location}</h5>
                  </div>
                  <div className="md:text-right mt-1 md:mt-0 text-gray-600 text-sm">
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
        
        {/* Education */}
        {education.length > 0 && (
          <section className="mt-6">
            <h3 className="text-lg uppercase tracking-wide font-light mb-3">
              Education
            </h3>
            
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                    <h5 className="text-gray-600">{edu.institution}, {edu.location}</h5>
                  </div>
                  <div className="md:text-right mt-1 md:mt-0 text-gray-600 text-sm">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
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
            <h3 className="text-lg uppercase tracking-wide font-light mb-3">
              Skills
            </h3>
            
            <div className="text-gray-700">
              {skills.map((skill, index) => (
                <React.Fragment key={skill.id}>
                  <span>{skill.name}</span>
                  {index < skills.length - 1 && <span className="mx-1">•</span>}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalistTemplate;