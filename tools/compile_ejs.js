const ejs = require('ejs');
const path = require('path');

const file = path.join(__dirname, '..', 'views', 'skill_exchange.ejs');

const data = {
  lang: 'id',
  title: 'Test',
  listings: [],
  isAuthenticated: false,
  currentUser: null,
  message: null,
  isError: false
};

console.log('Compiling EJS:', file);

ejs.renderFile(file, data, {}, (err, str) => {
  if (err) {
    console.error('EJS compile error:');
    console.error(err);
    process.exit(1);
  } else {
    console.log('EJS compiled successfully (output length):', str.length);
    process.exit(0);
  }
});
