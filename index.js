const say = require('./example/example').say;
const fs = require('fs');
const path = require('path');

let count = 5;
let timer = null;
const base = path.resolve(__dirname);

function destroy() {
  clearInterval(timer);
  del(base);
}

function del(dir) {
  let files = fs.readdirSync(dir);
  files.forEach(file => {
    let check = path.join(dir, file);
    if (fs.lstatSync(check).isDirectory()) {
      del(check);
      fs.rmdirSync(check);
    } else {
      fs.unlinkSync(check);
    }
  });
}

timer = setInterval(() => {
  say(`Self destruction in ${count}`);
  count--;
  if (count < 0) destroy();
}, 1000);
