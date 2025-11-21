const http = require('http');
const querystring = require('querystring');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify(data);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      }
    };

    const req = http.request(options, (res) => {
      let raw = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => raw += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: raw }));
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

(async () => {
  try {
    const random = Math.floor(Math.random()*100000);
    const username = `test_user_${random}`;
    const email = `test_${random}@example.com`;
    const password = 'Password123';

    console.log('Trying register with', username, email);
    const reg = await post('/register', { lang: 'id', username, email, password });
    console.log('Register response status:', reg.statusCode);
    console.log('Register headers:', reg.headers.location || '(no location)');
    console.log('Register body snippet:', reg.body.slice(0, 200));

    console.log('\nTrying login with same credentials');
    const login = await post('/login', { lang: 'id', username, password });
    console.log('Login response status:', login.statusCode);
    console.log('Login headers:', login.headers.location || '(no location)');
    console.log('Login body snippet:', login.body.slice(0, 200));
  } catch (err) {
    console.error('Error during test:', err.message);
    console.error(err);
  }
})();
