// 📁 utils/dateFormatter.js

// Function to format dates into a readable Arabic format (DD-MM-YYYY)
export const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`; // Return formatted date as DD-MM-YYYY
};

// Function to convert English numbers to Arabic Hindi numerals
export const arabicToHindiNumbers = (num) => {
  const hindiNumerals = '٠١٢٣٤٥٦٧٨٩';
  return num.toString().replace(/[0-9]/g, (digit) => hindiNumerals[digit]);
};
