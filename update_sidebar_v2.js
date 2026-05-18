const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Ganapathi\\\\Projects\\\\School';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacementStyles = `.nav-item{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;cursor:pointer;transition:all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);color:rgba(255,255,255,0.65);font-size:13.5px;font-weight:500;margin-bottom:6px;text-decoration:none;position:relative;overflow:hidden;z-index:1}
  .nav-item::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.08);border-radius:10px;z-index:-1;transform:scaleX(0);transform-origin:left;transition:transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)}
  .nav-item:hover{color:#fff;transform:translateX(6px)}
  .nav-item:hover::before{transform:scaleX(1)}
  .nav-item i{font-size:18px;width:20px;text-align:center;transition:all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)}
  .nav-item:hover i{transform:scale(1.25) rotate(10deg);color:#60a5fa}
  .nav-item.active{color:#fff;background:linear-gradient(135deg, #3b82f6, #1d4ed8);font-weight:600;box-shadow:0 6px 16px rgba(37,99,235,0.4);transform:translateY(-2px)}
  .nav-item.active::before{display:none}
  .nav-item.active i{color:#fff;transform:none}
`;

let count = 0;
files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  const startIndex = content.indexOf('.nav-item{');
  let endIndex = content.indexOf('.badge{');
  
  if (endIndex === -1) {
    // some files might not have .badge, fallback to .sidebar-footer or .user-card
    const altEnd = content.indexOf('.sidebar-footer{');
    if (altEnd !== -1) endIndex = altEnd;
  }

  if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    const before = content.slice(0, startIndex);
    const after = content.slice(endIndex);
    const newContent = before + replacementStyles + "  " + after;
    fs.writeFileSync(filePath, newContent, 'utf8');
    count++;
    console.log('Updated ' + f);
  } else {
    console.log('Did NOT update ' + f);
  }
});
console.log('Total updated: ' + count);
