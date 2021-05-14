const fs = require('fs');
const path = require('path');
const Expedition = require('./expedition');

function main() {
  const input = fs.readFileSync(path.join(__dirname, 'input')).toString().trim();
  const expedition = Expedition.fromString(input);
  const result = expedition.start();
  console.log(result);
}

main();
