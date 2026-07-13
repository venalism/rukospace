const fs = require('fs');
const realFiles = ['d:/litma/rukospace/frontend/src/pages/Home.tsx', 'd:/litma/rukospace/frontend/src/App.tsx'];

const replacements = {
  'py-3xl': 'py-16',
  'px-margin-mobile': 'px-4',
  'px-lg': 'px-6',
  'max-w-container-max': 'max-w-7xl',
  'space-y-xl': 'space-y-8',
  'gap-sm': 'gap-2',
  'px-md': 'px-4',
  'py-sm': 'py-2',
  'mr-sm': 'mr-2',
  'gap-lg': 'gap-6',
  'p-lg': 'p-6',
  'mb-md': 'mb-4',
  'mb-sm': 'mb-2',
  'mt-sm': 'mt-2',
  'mt-xs': 'mt-1',
  'top-sm': 'top-2',
  'right-sm': 'right-2',
  'px-sm': 'px-2',
  'py-xs': 'py-1',
  'gap-xs': 'gap-1',
  'p-md': 'p-4',
  'space-y-md': 'space-y-4',
  'pt-xs': 'pt-1',
  'mt-md': 'mt-4',
  'p-xl': 'p-8',
  'p-3xl': 'p-16',
  'bottom-md': 'bottom-4',
  'gap-xl': 'gap-8',
  'gap-md': 'gap-4',
  'ml-xs': 'ml-1',
  'py-md': 'py-4',
  'py-xl': 'py-8'
};

realFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [key, val] of Object.entries(replacements)) {
    // replace as whole word inside class names
    const regex = new RegExp("([\\'\\\"\\\\s])" + key + "([\\'\\\"\\\\s])", "g");
    content = content.replace(regex, '$1' + val + '$2');
  }
  fs.writeFileSync(file, content);
});
console.log('Done');
