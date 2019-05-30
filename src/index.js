const alfy = require('alfy');
const fixPath = require('fix-path');
const exec = require('child_process').exec;

fixPath();

function getList() {
    let promise = new Promise((resolve, reject) => {
        let cachedRepos = alfy.cache.get('npm_repo_list');
        if (cachedRepos) {
            resolve(cachedRepos);
        } else {
            exec('nrm ls', (err, stdout, stderr) => {
                let list = stdout.replace(/^\s*|\s*$/, '').split('\n').map((v) => v.trim()).filter((v) => v).map((v) => v.split(/[\s-]+/));
                if (list) {
                    // cache 5分钟内有效
                    alfy.cache.set('npm_repo_list', list, { maxAge: 60 * 5 * 1000 });
                    resolve(list);
                }
            });
        }
    });
    return promise;
}

getList().then((list) => {
    let items = list.map((v) => {
        let isStar = v[0] === '*';
        return {
            title: isStar ? v[1] : v[0],
            subtitle: isStar ? v[2] : v[1],
            variables: { item: v }
        };
    });
    alfy.output(items);
});
