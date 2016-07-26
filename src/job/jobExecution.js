var queue = require('./queue');
var parser = require('./parser');
var action = require('./action');

module.exports = function() {
    queue.job().create('docker-node-ls', function() {
        action.genericAction('nodes', 'docker node ls', parser);
    }).delay(5000).save();

    queue.job().create('docker-service-ls', function() {
        action.genericAction('services', 'docker service ls', parser);
    }).delay(5000).save();

    queue.job().create('docker-service-tasks', function() {
        action.serviceTaskAction('tasks', 'docker service tasks ', parser);
    }).delay(5000).save();

    queue.job().create('docker-service-inspect', function() {
        action.serviceInspectAction('inspect', 'docker service inspect ');
    }).delay(5000).save();

    queue.start();
}
