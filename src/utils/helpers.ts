// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Format date for display (YYYY-MM to Month YYYY)
export const formatDate = (dateString: string, current: boolean = false): string => {
  if (!dateString && current) return 'Present';
  if (!dateString) return '';
  
  const [year, month] = dateString.split('-');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${months[parseInt(month) - 1]} ${year}`;
};

// Calculate duration between two dates
export const calculateDuration = (startDate: string, endDate: string, current: boolean): string => {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const end = current ? new Date() : new Date(endDate);
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  let totalMonths = years * 12 + months;
  if (totalMonths < 0) totalMonths = 0;
  
  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;
  
  if (displayYears > 0 && displayMonths > 0) {
    return `${displayYears} year${displayYears > 1 ? 's' : ''}, ${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
  } else if (displayYears > 0) {
    return `${displayYears} year${displayYears > 1 ? 's' : ''}`;
  } else {
    return `${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
  }
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Capitalize first letter of each word
export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

// Extract domain from URL
export const extractDomain = (url: string): string => {
  if (!url) return '';
  
  try {
    // Add https:// if not present
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch (e) {
    return url;
  }
};