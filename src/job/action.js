var genericProcess = require('./process');
var data = require('../data');

module.exports = {
    genericAction: function(title, cmd, parser) {
        genericProcess(cmd, parser)
            .then(function(result) {
                data[title] = result;
            }, function() {
                console.error('Error job:', title);
            });
    },
    serviceTaskAction: function(title, cmd, parser) {
        if(data.services) {
            data.services.forEach(function(service) {
                genericProcess(cmd+service.name, parser)
                    .then(function(result) {
                        data.services.find(function(obj) {
                            return obj.name === service.name;
                        }).tasks = result;
                    }, function() {
                        console.error('Error job:', title);
                    });
            });
        }
    },
    serviceInspectAction: function(title, cmd) {
        if(data.services) {
            data.services.forEach(function(service) {
                genericProcess(cmd+service.name, function(out){return out;})
                    .then(function(result) {
                        data.services.find(function(obj) {
                            return obj.name === service.name;
                        }).inspect = JSON.parse(result);
                    }, function() {
                        console.error('Error job:', title);
                    });
            });
        }
    }
}
