const fs = require('fs');
const path = require('path');

// 讀取 content.json
const contentPath = path.join(__dirname, 'data', 'content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

// 更新所有客戶評價的治療項目為16顆
content.testimonials.forEach(testimonial => {
  testimonial.treatment = "前牙16顆陶瓷貼片";
});

// 更新前後對比案例的治療項目為16顆
content.beforeAfterCases.forEach(case_ => {
  case_.treatment = "前牙16顆陶瓷貼片";
});

// 寫回文件
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');

console.log('已更新所有治療項目為16顆陶瓷貼片'); 