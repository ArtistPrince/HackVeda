const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = XLSX.readFile('F:\\Hackveda\\hackvedaiilm\\IBM-AWS HackVeda Registration Form (Responses) (5).xlsx');

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('Total rows:', data.length);
console.log('\nFirst row sample:', data[0]);

// Extract unique emails (assuming there's an email column)
// Find the email column name
const firstRow = data[0];
const emailColumn = Object.keys(firstRow).find(key => 
  key.toLowerCase().includes('email') && key.toLowerCase().includes('leader')
) || Object.keys(firstRow).find(key => 
  key.toLowerCase().includes('email')
);

console.log('\nDetected email column:', emailColumn);

if (emailColumn) {
  const emails = data
    .map(row => row[emailColumn])
    .filter(email => email && email.toString().trim()) // Remove empty values
    .map(email => email.toString().trim().toLowerCase()) // Convert to lowercase
    .filter((email, index, self) => self.indexOf(email) === index); // Remove duplicates

  console.log('\nExtracted emails:', emails.length);
  console.log('\nEmails:');
  emails.forEach(email => console.log(email));

  // Save to JSON file
  const outputPath = path.join(__dirname, '..', 'data', 'team-leader-emails.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify({ emails }, null, 2));
  console.log('\n✓ Emails saved to:', outputPath);
} else {
  console.log('\nAvailable columns:');
  console.log(Object.keys(firstRow));
}
