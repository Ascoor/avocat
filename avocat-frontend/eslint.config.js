import { defineConfig } from 'eslint-define-config';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default defineConfig({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2021, // استخدام النسخة الأخيرة من ECMAScript
      sourceType: 'module', // يسمح باستخدام `import`/`export`
      jsx: true, // تمكين JSX
    },
    globals: {
      browser: true, // تعريف المتغيرات العالمية
      node: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // اكتشاف تلقائي لإصدار React
    },
  },
  plugins: {
    react: eslintPluginReact,
    'react-hooks': eslintPluginReactHooks,
  },
  rules: {
    // أفضل الممارسات وجودة الكود
    'no-unused-vars': 'warn', // تحذير من المتغيرات غير المستخدمة
    'no-console': 'off', // السماح باستخدام console (يمكنك إيقافه إذا لزم الأمر)
    'react/prop-types': 'off', // إيقاف فحص prop-types في React
    'react/react-in-jsx-scope': 'off', // ليس ضروريًا في React 17+ مع التحويل الجديد لـ JSX

    // قواعد React Hooks
    'react-hooks/rules-of-hooks': 'error', // فحص قواعد الـ Hooks
    'react-hooks/exhaustive-deps': 'warn', // تحذير إذا كانت dependencies غير مكتملة في الـ Hooks
  },
});
