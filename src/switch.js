const alfy = require('alfy');
const util = require('./util');
util.exec(`nrm use ${alfy.input}`, () => {
    util.getRepos();
});
