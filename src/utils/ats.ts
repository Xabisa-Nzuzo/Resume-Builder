import { ResumeData } from '../types';

const COMMON_ATS_KEYWORDS = {
  'software engineer': [
    'javascript', 'react', 'node.js', 'typescript', 'aws', 'api', 'restful',
    'github', 'git', 'agile', 'scrum', 'sql', 'nosql', 'docker', 'kubernetes',
    'ci/cd', 'full-stack', 'backend', 'frontend', 'testing', 'jest', 'mocha'
  ],
  'data scientist': [
    'python', 'r', 'sql', 'machine learning', 'deep learning', 'tensorflow',
    'pytorch', 'pandas', 'numpy', 'scikit-learn', 'data visualization',
    'statistics', 'analytics', 'hadoop', 'spark', 'big data', 'nlp', 'ai'
  ],
  'product manager': [
    'agile', 'scrum', 'product development', 'user stories', 'roadmap',
    'stakeholder', 'requirements', 'market research', 'user experience',
    'analytics', 'kpi', 'metrics', 'strategy', 'competitive analysis', 'jira'
  ],
  'marketing': [
    'seo', 'sem', 'social media', 'content marketing', 'google analytics',
    'campaign management', 'email marketing', 'digital marketing', 'branding',
    'marketing strategy', 'hubspot', 'mailchimp', 'conversion rate', 'roi'
  ],
  'finance': [
    'financial analysis', 'accounting', 'budgeting', 'forecasting', 'excel',
    'financial reporting', 'variance analysis', 'balance sheet', 'income statement',
    'cash flow', 'financial modeling', 'sap', 'risk management', 'auditing'
  ],
  'sales': [
    'account management', 'client relationship', 'crm', 'salesforce', 'hubspot',
    'lead generation', 'negotiation', 'closing', 'pipeline management', 'quotas',
    'b2b', 'b2c', 'sales strategy', 'presentation', 'customer acquisition'
  ],
  'human resources': [
    'recruiting', 'onboarding', 'employee relations', 'benefits administration',
    'performance management', 'talent acquisition', 'hris', 'compensation',
    'hr policies', 'diversity', 'inclusion', 'training', 'development'
  ],
  'design': [
    'figma', 'sketch', 'adobe creative suite', 'ui/ux', 'prototyping',
    'wireframing', 'user research', 'typography', 'color theory', 'responsive design',
    'visual design', 'design systems', 'photoshop', 'illustrator', 'indesign'
  ],
};

// Extract keywords from job description
export const extractKeywords = (jobDescription: string): string[] => {
  if (!jobDescription) return [];
  
  const keywords: string[] = [];
  const lowerCaseDescription = jobDescription.toLowerCase();
  
  // Check all common keyword sets
  Object.values(COMMON_ATS_KEYWORDS).forEach(keywordSet => {
    keywordSet.forEach(keyword => {
      if (lowerCaseDescription.includes(keyword.toLowerCase()) && 
          !keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    });
  });
  
  return keywords;
};

// Find missing keywords in resume
export const findMissingKeywords = (
  resumeData: ResumeData, 
  jobKeywords: string[]
): string[] => {
  if (!resumeData || !jobKeywords.length) return [];
  
  const resumeText = JSON.stringify(resumeData).toLowerCase();
  return jobKeywords.filter(keyword => 
    !resumeText.includes(keyword.toLowerCase())
  );
};

// Generate recommendations based on missing keywords
export const generateRecommendations = (
  resumeData: ResumeData, 
  missingKeywords: string[]
): string[] => {
  if (!resumeData || !missingKeywords.length) return [];
  
  const recommendations: string[] = [];
  
  // Check summary
  if (missingKeywords.length > 0 && resumeData.summary) {
    recommendations.push('Consider adding some of the missing keywords to your professional summary.');
  }
  
  // Check experience descriptions
  if (resumeData.experience.some(exp => !exp.description || exp.description.length < 50)) {
    recommendations.push('Expand your experience descriptions to include more relevant keywords and achievements.');
  }
  
  // Check skills
  if (missingKeywords.length > 0) {
    recommendations.push('Add missing skills that are relevant to the job description, especially: ' + 
      missingKeywords.slice(0, 3).join(', '));
  }
  
  // Check for quantifiable achievements
  const hasQuantifiableAchievements = resumeData.experience.some(exp => 
    exp.achievements.some(achievement => 
      /\d+%|\d+ percent|increased|decreased|reduced|improved|generated|saved|delivered/i.test(achievement)
    )
  );
  
  if (!hasQuantifiableAchievements) {
    recommendations.push('Add quantifiable achievements with metrics to your experience section.');
  }
  
  // Add generic recommendations if needed
  if (recommendations.length < 2) {
    recommendations.push('Use action verbs at the beginning of your bullet points.');
    recommendations.push('Tailor your resume to match the specific job requirements.');
  }
  
  return recommendations;
};

// Check for formatting issues
export const checkFormattingIssues = (resumeData: ResumeData): string[] => {
  const issues: string[] = [];
  
  // Check personal info
  const { personalInfo } = resumeData;
  if (!personalInfo.email || !personalInfo.phone) {
    issues.push('Missing contact information (email or phone).');
  }
  
  // Check summary length
  if (!resumeData.summary) {
    issues.push('Missing professional summary section.');
  } else if (resumeData.summary.length < 50) {
    issues.push('Professional summary is too short, aim for 3-5 impactful sentences.');
  } else if (resumeData.summary.length > 500) {
    issues.push('Professional summary is too long, keep it concise.');
  }
  
  // Check experience entries
  if (!resumeData.experience.length) {
    issues.push('No work experience entries found.');
  } else {
    const hasEmptyFields = resumeData.experience.some(exp => 
      !exp.company || !exp.position || !exp.startDate
    );
    
    if (hasEmptyFields) {
      issues.push('Some work experience entries have missing information.');
    }
  }
  
  // Check education entries
  if (!resumeData.education.length) {
    issues.push('No education entries found.');
  } else {
    const hasEmptyEducationFields = resumeData.education.some(edu => 
      !edu.institution || !edu.degree || !edu.startDate
    );
    
    if (hasEmptyEducationFields) {
      issues.push('Some education entries have missing information.');
    }
  }
  
  // Check skills
  if (!resumeData.skills.length) {
    issues.push('No skills listed. Add relevant technical and soft skills.');
  } else if (resumeData.skills.length < 5) {
    issues.push('Consider adding more skills (aim for at least 8-12 relevant skills).');
  }
  
  return issues;
};

// Calculate ATS score based on various factors
export const calculateATSScore = (
  resumeData: ResumeData, 
  jobKeywords: string[],
  missingKeywords: string[],
  formattingIssues: string[]
): number => {
  let score = 70; // Base score
  
  // Keyword match score (up to +20 points)
  if (jobKeywords.length > 0) {
    const matchedKeywords = jobKeywords.length - missingKeywords.length;
    const keywordScore = Math.round((matchedKeywords / jobKeywords.length) * 20);
    score += keywordScore;
  }
  
  // Formatting issues penalty (up to -15 points)
  score -= formattingIssues.length * 3;
  
  // Completeness bonus (up to +10 points)
  let completenessScore = 0;
  
  // Check personal info completeness
  const { personalInfo } = resumeData;
  if (personalInfo.firstName && personalInfo.lastName && personalInfo.email && 
      personalInfo.phone && personalInfo.location && personalInfo.title) {
    completenessScore += 2;
  }
  
  // Check summary
  if (resumeData.summary && resumeData.summary.length >= 100) {
    completenessScore += 2;
  }
  
  // Check experience details
  const experienceComplete = resumeData.experience.every(exp => 
    exp.company && exp.position && exp.startDate && 
    (exp.current || exp.endDate) && exp.description &&
    exp.achievements.length > 0 && exp.achievements[0] !== ''
  );
  
  if (experienceComplete && resumeData.experience.length >= 2) {
    completenessScore += 3;
  }
  
  // Check education details
  const educationComplete = resumeData.education.every(edu => 
    edu.institution && edu.degree && edu.field && 
    edu.startDate && (edu.current || edu.endDate)
  );
  
  if (educationComplete) {
    completenessScore += 1;
  }
  
  // Check skills
  if (resumeData.skills.length >= 8) {
    completenessScore += 2;
  }
  
  score += completenessScore;
  
  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, Math.round(score)));
};

// Main function to analyze resume against job description
export const analyzeResume = (resumeData: ResumeData, jobDescription: string) => {
  const jobKeywords = extractKeywords(jobDescription);
  const missingKeywords = findMissingKeywords(resumeData, jobKeywords);
  const formattingIssues = checkFormattingIssues(resumeData);
  const recommendations = generateRecommendations(resumeData, missingKeywords);
  
  const score = calculateATSScore(
    resumeData,
    jobKeywords,
    missingKeywords,
    formattingIssues
  );
  
  return {
    score,
    missingKeywords,
    recommendations,
    formattingIssues,
    matchedKeywords: jobKeywords.filter(k => !missingKeywords.includes(k)),
  };
};