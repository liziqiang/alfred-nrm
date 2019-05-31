const alfy = require('alfy');
const util = require('./util');

util.getList().then((list) => {
    let items = list.map((v) => {
        const STAR = '*';
        let isStar = v[0] === STAR;
        let startIdx = isStar ? 1 : 0;
        let name = v[startIdx];
        let repoUrl = v[startIdx + 1];
        return {
            title: `${name} ${isStar ? STAR : ''}`,
            arg: name,
            subtitle: repoUrl,
            variables: { name, repoUrl },
            icon: {
                path: alfy.icon.like
            }
        };
    });
    alfy.output(items);
});
