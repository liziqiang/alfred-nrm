const alfy = require('alfy');
const fixPath = require('fix-path');
const exec = require('child_process').exec;
fixPath();
exec(`nrm use ${alfy.input}`, (err, stdout, stderr) => {

});
