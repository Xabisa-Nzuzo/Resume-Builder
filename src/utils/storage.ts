// Save data to localStorage
export const saveToLocalStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Get data from localStorage
export const getFromLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
};

// Remove data from localStorage
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Clear all data from localStorage
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Save the resume data with a specific name
export const saveResumeWithName = (name: string, data: string): void => {
  try {
    // Get existing saved resumes
    const savedResumesJson = localStorage.getItem('savedResumes');
    const savedResumes = savedResumesJson ? JSON.parse(savedResumesJson) : {};
    
    // Add new resume
    savedResumes[name] = {
      data,
      date: new Date().toISOString(),
    };
    
    // Save back to localStorage
    localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
  } catch (error) {
    console.error('Error saving resume:', error);
  }
};

// Get all saved resumes
export const getSavedResumes = (): Record<string, { data: string, date: string }> => {
  try {
    const savedResumesJson = localStorage.getItem('savedResumes');
    return savedResumesJson ? JSON.parse(savedResumesJson) : {};
  } catch (error) {
    console.error('Error getting saved resumes:', error);
    return {};
  }
};

// Delete a saved resume
export const deleteSavedResume = (name: string): void => {
  try {
    const savedResumesJson = localStorage.getItem('savedResumes');
    if (!savedResumesJson) return;
    
    const savedResumes = JSON.parse(savedResumesJson);
    delete savedResumes[name];
    
    localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
  } catch (error) {
    console.error('Error deleting saved resume:', error);
  }
};