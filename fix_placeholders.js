const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/i18n/translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

const additions = {
  vi: "    formPlaceholderName: 'VD: Nguyễn Văn A',\n    formPlaceholderEmail: 'VD: email@example.com',\n    formPlaceholderPhone: 'VD: 0901234567',",
  en: "    formPlaceholderName: 'Ex: John Doe',\n    formPlaceholderEmail: 'Ex: email@example.com',\n    formPlaceholderPhone: 'Ex: +1234567890',",
  zh: "    formPlaceholderName: '例如: 张三',\n    formPlaceholderEmail: '例如: email@example.com',\n    formPlaceholderPhone: '例如: 13800138000',",
  fr: "    formPlaceholderName: 'Ex: Jean Dupont',\n    formPlaceholderEmail: 'Ex: email@example.com',\n    formPlaceholderPhone: 'Ex: 0612345678',",
  es: "    formPlaceholderName: 'Ej: Juan Pérez',\n    formPlaceholderEmail: 'Ej: email@example.com',\n    formPlaceholderPhone: 'Ej: 600123456',",
  ja: "    formPlaceholderName: '例: 山田 太郎',\n    formPlaceholderEmail: '例: email@example.com',\n    formPlaceholderPhone: '例: 09012345678',",
  ko: "    formPlaceholderName: '예: 홍길동',\n    formPlaceholderEmail: '예: email@example.com',\n    formPlaceholderPhone: '예: 01012345678',",
  ru: "    formPlaceholderName: 'Напр: Иван Иванов',\n    formPlaceholderEmail: 'Напр: email@example.com',\n    formPlaceholderPhone: 'Напр: 9001234567',",
  de: "    formPlaceholderName: 'Bsp: Max Mustermann',\n    formPlaceholderEmail: 'Bsp: email@example.com',\n    formPlaceholderPhone: 'Bsp: 01512345678',",
  pt: "    formPlaceholderName: 'Ex: João Silva',\n    formPlaceholderEmail: 'Ex: email@example.com',\n    formPlaceholderPhone: 'Ex: 912345678',",
  it: "    formPlaceholderName: 'Es: Mario Rossi',\n    formPlaceholderEmail: 'Es: email@example.com',\n    formPlaceholderPhone: 'Es: 3331234567',",
  ar: "    formPlaceholderName: 'مثال: أحمد محمد',\n    formPlaceholderEmail: 'مثال: email@example.com',\n    formPlaceholderPhone: 'مثال: 0501234567',",
  hi: "    formPlaceholderName: 'उदा: राहुल कुमार',\n    formPlaceholderEmail: 'उदा: email@example.com',\n    formPlaceholderPhone: 'उदा: 9876543210',"
};

for (const [lang, addStr] of Object.entries(additions)) {
  // Find the block for the language
  const regex = new RegExp(`(${lang}: \\{[\\s\\S]*?footerBy: '[^']+')\\n\\s*\\}`, 'g');
  content = content.replace(regex, `$1,\n${addStr}\n  }`);
}

fs.writeFileSync(filePath, content);
console.log('Done!');
