const alfy = require('alfy');
const fixPath = require('fix-path');
const exec = require('child_process').exec;
module.exports = {
    exec(...args) {
        fixPath();
        exec(...args);
    },
    getList() {
        let promise = new Promise((resolve, reject) => {
            let cachedRepos = alfy.cache.get('npm_repo_list');
            if (cachedRepos) {
                resolve(cachedRepos);
            } else {
                this.getRepos().then((list) => resolve(list));
            }
        });
        return promise;
    },
    getRepos() {
        let promise = new Promise((resolve, reject) => {
            this.exec('/usr/local/bin/nrm ls', (err, stdout, stderr) => {
                let list = stdout.replace(/^\s*|\s*$/, '').split('\n').map((v) => v.trim()).filter((v) => v).map((v) => v.split(/[\s-]+/));
                if (list) {
                    // cache 5分钟内有效
                    alfy.cache.set('npm_repo_list', list, { maxAge: 60 * 5 * 1000 });
                    resolve(list);
                }
            });
        });
        return promise;
    }
};
