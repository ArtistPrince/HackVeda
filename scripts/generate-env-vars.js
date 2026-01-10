const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '..', 'python_script', 'credentials.json');
const tokenPath = path.join(__dirname, '..', 'python_script', 'token.json');

console.log('='.repeat(80));
console.log('Gmail API Environment Variables for Production');
console.log('='.repeat(80));
console.log('');

try {
  if (fs.existsSync(credentialsPath)) {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
    console.log('GMAIL_CREDENTIALS=');
    console.log(JSON.stringify(credentials));
    console.log('');
  } else {
    console.log('❌ credentials.json not found at:', credentialsPath);
    console.log('');
  }

  if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    console.log('GMAIL_TOKEN=');
    console.log(JSON.stringify(token));
    console.log('');
  } else {
    console.log('❌ token.json not found at:', tokenPath);
    console.log('');
  }

  console.log('='.repeat(80));
  console.log('Copy the above values and add them to your Vercel environment variables');
  console.log('='.repeat(80));
} catch (error) {
  console.error('Error:', error.message);
}
