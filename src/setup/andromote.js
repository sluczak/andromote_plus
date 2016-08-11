var _ = require('lodash');

function Andromote() {
    this.devices = [];
    Andromote.prototype.attachElements = function attachElements(configuration) {
        var self = this;
        _.forEach(configuration, function(entry) {
            entry.device.attach(entry.params);
            self.devices.push({name: entry.name, device: entry.device});
        });
    };

    Andromote.prototype.getElement = function getElement(elementName) {
        return _.find(this.devices, {'name': elementName}).device;
    }
}

var andromote = new Andromote();
module.exports = andromote;