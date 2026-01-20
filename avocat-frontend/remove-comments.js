const fs = require('fs');
const path = require('path');

// دالة لإزالة التعليقات
const removeComments = (code) => {
  // إزالة التعليقات أحادية السطر
  code = code.replace(/\/\/[^\n]*\n/g, '');

  // إزالة التعليقات متعددة الأسطر
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');

  return code;
};

// دالة لتنظيف ملف
const cleanFile = (filePath) => {
  try {
    // قراءة محتوى الملف
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // إزالة التعليقات من المحتوى
    fileContent = removeComments(fileContent);

    // حفظ المحتوى النظيف في نفس الملف
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    console.log(`تم تنظيف الملف: ${filePath}`);
  } catch (error) {
    console.error(`حدث خطأ أثناء معالجة الملف ${filePath}: ${error.message}`);
  }
};

// قراءة الملفات من مجلد معين
const processDirectory = (dirPath) => {
  try {
    // قراءة جميع الملفات في المجلد
    const files = fs.readdirSync(dirPath);

    // تصفية الملفات التي تنتهي بامتداد .jsx
    const jsxFiles = files.filter(file => file.endsWith('.jsx'));

    // تنظيف كل ملف
    jsxFiles.forEach(file => {
      const filePath = path.join(dirPath, file);
      cleanFile(filePath);
    });
  } catch (error) {
    console.error(`حدث خطأ أثناء معالجة المجلد: ${error.message}`);
  }
};

// التحقق من أن المستخدم قد أدخل المجلد كوسيط
if (process.argv.length !== 3) {
  console.log('يرجى تحديد المسار إلى المجلد كوسيط.');
  process.exit(1);
}

// الحصول على مسار المجلد من سطر الأوامر
const directoryPath = process.argv[2];

// معالجة المجلد
processDirectory(directoryPath);
