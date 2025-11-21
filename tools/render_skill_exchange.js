const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'views', 'skill_exchange.ejs');

const sampleListing = {
  _id: '612345abcde',
  title: 'videografer, fotografer',
  description: 'membuka jasa video foto dan editing',
  category: 'design',
  user_id: { username: 'Ananda Rafa Kavindra Romaz', _id: 'u1' }
};

const data = {
  lang: 'id',
  title: 'Tukar Keahlian',
  listings: [sampleListing],
  isAuthenticated: true,
  currentUser: { _id: 'u2', username: 'current_user' },
  message: null,
  isError: false
};

ejs.renderFile(file, data, {}, (err, str) => {
  if (err) {
    console.error('EJS render error:', err);
    process.exit(1);
  }
  const out = path.join(__dirname, '..', 'temp_skill_exchange_render.html');
  fs.writeFileSync(out, str, 'utf8');
  console.log('Rendered HTML written to', out);
});
