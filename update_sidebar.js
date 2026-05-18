const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Ganapathi\\\\Projects\\\\School';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const regex = /\.nav-item\s*\{.*?\}.*?\.nav-item:hover\s*\{.*?\}.*?\.nav-item\.active\s*\{.*?\}[\s\n]*(?:\.nav-item\.active::before\s*\{.*?\})?/s;

const replacementStyles = `.nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;cursor:pointer;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);color:rgba(255,255,255,.7);font-size:13px;font-weight:500;margin-bottom:2px;text-decoration:none;position:relative}
.nav-item:hover{background:var(--sidebar-hover);color:#fff;transform:translateX(5px);box-shadow:0 4px 12px rgba(0,0,0,0.15)}
.nav-item.active{background:linear-gradient(90deg, rgba(96,165,250,0.2) 0%, transparent 100%);color:#fff;font-weight:600}
.nav-item.active::before{content:'';position:absolute;left:0px;top:15%;height:70%;width:4px;background:#60a5fa;border-radius:0 4px 4px 0;box-shadow:0 0 8px rgba(96,165,250,0.6)}`;

let count = 0;
files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  if (regex.test(content)) {
    content = content.replace(regex, replacementStyles);
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log('Updated ' + f);
  } else {
    console.log('Did NOT update ' + f);
  }
});
console.log('Total updated: ' + count);
