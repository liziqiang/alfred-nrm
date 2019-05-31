const alfy = require('alfy');
const util = require('./util');
const STAR = '*';
function isInUse(repo) {
    return repo[0] === STAR;
}

util.getList().then((list) => {
    let items = alfy.matches(alfy.input, list, (item, input) => {
        let inUse = isInUse(item);
        return inUse ? item[1].includes(input) : item[0].includes(input);
    }).map((v) => {
        let inUse = isInUse(v);
        let startIdx = inUse ? 1 : 0;
        let name = v[startIdx];
        return {
            title: `${name} ${inUse ? STAR : ''}`,
            arg: name,
            subtitle: v[startIdx + 1],
            variables: { name },
            icon: {
                path: alfy.icon.like
            }
        };
    });
    alfy.output(items);
});
