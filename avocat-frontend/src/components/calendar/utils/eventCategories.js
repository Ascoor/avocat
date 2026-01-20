// 📁 utils/eventCategories.js

// Define event categories with labels and associated colors for better UI differentiation
// Each category is assigned a label in Arabic and a distinct color for display purposes
export const eventCategories = {
  session: { label: 'جلسة قانونية', color: '#4CAF50' }, // Green color for legal sessions to signify importance
  procedure: { label: 'إجراء قانوني', color: '#FF9800' }, // Orange color for legal procedures to highlight process
  ad: { label: 'إعلان قانوني', color: '#2196F3' }, // Blue color for legal ads to distinguish announcements
  meeting: { label: 'اجتماع', color: '#9C27B0' }, // Purple color for meetings to differentiate discussions
  alert: { label: 'تنبيه', color: '#F44336' }, // Red color for alerts to indicate urgency
};

// 📁 utils/dateFormatter.js

// Function to format dates into a readable Arabic format (DD-MM-YYYY)
// This ensures that dates are displayed consistently across the application
export const formatDate = (date) => {
  const d = new Date(date); // Convert input to a Date object
  const day = d.getDate().toString().padStart(2, '0'); // Extract day with leading zero if needed
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Extract month with leading zero
  const year = d.getFullYear(); // Extract year
  return `${day}-${month}-${year}`; // Return formatted date in DD-MM-YYYY format
};

// Function to convert English numbers to Arabic Hindi numerals for localization support
export const arabicToHindiNumbers = (num) => {
  const hindiNumerals = '٠١٢٣٤٥٦٧٨٩'; // Arabic Hindi numerals for localization
  return num.toString().replace(/[0-9]/g, (digit) => hindiNumerals[digit]); // Replace digits
};
