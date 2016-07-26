function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

module.exports = function(stdout) {
    var data = [];
    let lines = stdout.split('\n');
    var props = [];
    lines.forEach(function(line, index) {
        if(index != lines.length-1) {
            if(index === 0) {
                props = line.replace(/  +/g,'$$$').toLowerCase().split('$$').map(function(o) {
                    return camelize(o.toLowerCase());
                });
            } else {
                let obj = {}
                line.replace(/  +/g,'$$$').replace(' *', '').split('$$').forEach(function(e, i) {
                    obj[props[i]] = e;
                });
                obj.systemUpdatedAt = new Date();
                data.push(obj);
            }
        }
    });
    return data;
}
