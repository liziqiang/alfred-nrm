const alfy = require('alfy');
const util = require('./util');

function getList() {
    let promise = new Promise((resolve, reject) => {
        let cachedRepos = alfy.cache.get('npm_repo_list');
        if (cachedRepos) {
            resolve(cachedRepos);
        } else {
            util.exec('nrm ls', (err, stdout, stderr) => {
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
        let name;
        let repoUrl;
        if (isStar) {
            name = v[1];
            repoUrl = v[2];
        } else {
            name = v[0];
            repoUrl = v[1];
        }
        return {
            title: name,
            arg: name,
            subtitle: repoUrl,
            variables: { name, repoUrl }
        };
    });
    alfy.output(items);
});
