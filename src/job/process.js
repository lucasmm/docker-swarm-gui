const exec = require('child_process').exec;
const dockmachine = 'docker-machine ssh master ';

function genericProcess(cmd, parser) {
    return new Promise(function (resolve, reject) {
        exec(dockmachine+cmd, {encoding: 'utf8'}, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
            }
            resolve(parser(stdout));
        });
    });
}

module.exports = genericProcess;
