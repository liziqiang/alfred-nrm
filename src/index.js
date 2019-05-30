const alfy = require('alfy');
const fixPath = require('fix-path');
const exec = require('child_process').exec;

fixPath();
exec('nrm ls', (err, stdout, stderr) => {
    let list = stdout.replace(/^\s*|\s*$/, '').split('\n').map((v) => v.trim()).filter((v) => v).map((v) => v.split(/[\s-]+/));
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

