const fixPath = require('fix-path');
const exec = require('child_process').exec;
module.exports = {
    exec(...args) {
        fixPath();
        exec(...args);
    }
};
