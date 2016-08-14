var _ = require('lodash');
var queue = require('block-queue');
var Guid = require('guid');
var eventEmitter = require('../core/common_event_emitter');

function Andromote() {
    this.devices = [];
    this.tasksQueue = queue(1, function(task, done) {
        var guid = Guid.raw();
        task.execute(guid);
        eventEmitter.once('done_' + guid, function() {
            done();
        });
    });

    Andromote.prototype.attachElements = function attachElements(configuration) {
        var self = this;
        _.forEach(configuration, function(entry) {
            entry.device.attach(entry.params);
            self.devices.push({name: entry.name, device: entry.device});
        });
    };

    Andromote.prototype.getElement = function getElement(elementName) {
        return _.find(this.devices, {'name': elementName}).device;
    };

    Andromote.prototype.exec = function exec(task) {
        this.tasksQueue.push(task);
    };
}

var andromote = new Andromote();
module.exports = andromote;